<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $approvedSellers = \App\Models\User::where('role', 'seller')
        ->where('application_status', 'approved')
        ->whereNotNull('store_name')
        ->select('id', 'store_name', 'store_address', 'name')
        ->latest()
        ->get();

    $allProducts = \App\Models\Product::with('user:id,store_name,store_address')->latest()->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'activeStores' => $approvedSellers,
        'products' => $allProducts,
    ]);
});

Route::get('/dashboard', function (\Illuminate\Http\Request $request) {
    $user = $request->user();
    
    $isSeller = $user->role === 'seller' && $user->application_status === 'approved';

    if ($isSeller) {
        $products = $user->products()->latest()->get();
        $orders = \App\Models\Order::where('seller_id', $user->id)->with('buyer:id,name,email')->latest()->get();
        
        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'products' => $products,
            'orders' => $orders,
        ]);
    } elseif ($user->application_status === 'pending') {
        return Inertia::render('Seller/Waiting');
    } else {
        $products = \App\Models\Product::with('user:id,store_name,store_address')->latest()->get();
        $cartItems = \App\Models\Cart::where('user_id', $user->id)->with('product.user')->get();

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'products' => $products,
            'cartItems' => $cartItems,
        ]);
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ==========================================
// BUYER CART & CHECKOUT ROUTES
// ==========================================
Route::middleware(['auth'])->group(function () {
    Route::post('/cart', function (\Illuminate\Http\Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = $request->user()->id;
        $productId = $request->product_id;
        $addQty = $request->quantity;

        $cartItem = \App\Models\Cart::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();

        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + $addQty
            ]);
        } else {
            \App\Models\Cart::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'quantity' => $addQty,
            ]);
        }

        return back()->with('success', 'Naidagdag na sa iyong cart!');
    })->name('cart.store');

    Route::post('/checkout', function (\Illuminate\Http\Request $request) {
        $user = $request->user();
        $cartItems = \App\Models\Cart::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Walang laman ang iyong cart.');
        }

        $groupedBySeller = $cartItems->groupBy(function ($item) {
            return $item->product->user_id;
        });

        foreach ($groupedBySeller as $sellerId => $items) {
            $totalAmount = $items->sum(function ($item) {
                return $item->product->price * $item->quantity; 
            });

            \App\Models\Order::create([
                'user_id' => $user->id,
                'seller_id' => $sellerId,
                'items' => $items->map(function ($item) {
                    return [
                        'product_name' => $item->product->name,
                        'price' => $item->product->price,
                        'quantity' => $item->quantity,
                    ];
                })->toArray(),
                'total_amount' => $totalAmount,
                'shipping_address' => $request->shipping_address ?? 'Standard Delivery Address',
                'status' => 'pending',
            ]);

            foreach ($items as $item) {
                if ($item->product) {
                    $item->product->decrement('stock', $item->quantity);
                }
            }
        }

        \App\Models\Cart::where('user_id', $user->id)->delete();

        return redirect()->route('dashboard')->with('success', 'Matagumpay na nailagay ang iyong order at bayad!');
    })->name('checkout.store');
});

// ==========================================
// ADMIN ROUTES
// ==========================================
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/pending-sellers', function () {
        $pendingSellers = \App\Models\User::whereNotNull('store_name')
            ->where('application_status', 'pending')
            ->get();

        return Inertia::render('Admin/PendingSellers', [
            'applications' => $pendingSellers
        ]);
    })->name('sellers.pending');

    Route::post('/sellers/{user}/approve', function (\Illuminate\Http\Request $request, \App\Models\User $user) {
        $user->update(['application_status' => 'approved', 'role' => 'seller']);
        return back();
    })->name('sellers.approve');

    Route::post('/sellers/{user}/decline', function (\Illuminate\Http\Request $request, \App\Models\User $user) {
        $user->update([
            'application_status' => 'declined',
            'store_name' => null,
            'store_address' => null,
            'role' => 'buyer'
        ]);
        return back();
    })->name('sellers.decline');
});

// ==========================================
// SELLER ROUTES & PROCESS ORDER STATUS
// ==========================================
Route::middleware(['auth'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('/apply', function () {
        return Inertia::render('Seller/Apply');
    })->name('apply');

    Route::post('/apply', function (\Illuminate\Http\Request $request) {
        $request->validate([
            'store_name' => 'required|string|max:255',
            'store_address' => 'required|string',
        ]);

        $request->user()->update([
            'store_name' => $request->store_name,
            'store_address' => $request->store_address,
            'application_status' => 'pending'
        ]);

        return redirect()->route('seller.waiting');
    })->name('apply.submit');

    Route::get('/waiting', function () {
        return Inertia::render('Seller/Waiting');
    })->name('waiting');

    Route::patch('/orders/{order}/status', function (\Illuminate\Http\Request $request, \App\Models\Order $order) {
        if ($order->seller_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return back()->with('success', 'Na-update na ang status ng order!');
    })->name('orders.update');
});

Route::post('/products', [ProductController::class, 'store'])->middleware(['auth'])->name('products.store');

require __DIR__.'/auth.php';