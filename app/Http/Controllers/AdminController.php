<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function pendingSellers()
    {
        $sellers = User::role('Seller')
            ->where('application_status', 'pending')
            ->get();
            
        return Inertia::render('Admin/PendingSellers', [
            'sellers' => $sellers
        ]);
    }

    public function processSeller(Request $request, User $user)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $user->update([
            'application_status' => $request->status
        ]);

        return back()->with('message', 'Seller status updated successfully.');
    }

    public function buyerActivities()
    {
        $buyers = User::role('Buyer')
            ->withCount('orders') 
            ->with(['orders' => function($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->get();
            
        return Inertia::render('Admin/BuyerActivities', [
            'buyers' => $buyers
        ]);
    }
}