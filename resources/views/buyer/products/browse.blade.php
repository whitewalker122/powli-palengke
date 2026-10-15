<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop - Powli Palengke</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        header { background: #4CAF50; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        header h1 { font-size: 24px; }
        .logout-btn { background: #d32f2f; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }
        .container { max-width: 1200px; margin: 30px auto; padding: 0 20px; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .cart-link { background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .product-card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .product-card:hover { transform: translateY(-5px); }
        .product-image { width: 100%; height: 200px; background: #ddd; display: flex; align-items: center; justify-content: center; }
        .product-info { padding: 15px; }
        .product-name { font-weight: bold; margin-bottom: 5px; }
        .product-seller { color: #666; font-size: 12px; margin-bottom: 10px; }
        .product-price { color: #4CAF50; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .product-stock { color: #999; font-size: 12px; margin-bottom: 10px; }
        .btn { padding: 10px 15px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%; }
        .btn:hover { background: #45a049; }
    </style>
</head>
<body>
    <header>
        <h1>Powli Palengke - Shop</h1>
        <div>
            <span>Welcome, {{ Auth::user()->name }}!</span>
            <a href="{{ route('cart.index') }}" class="cart-link" style="display:inline-block; margin-left: 15px;">🛒 Cart</a>
            <form method="POST" action="/logout" style="display:inline; margin-left: 15px;">
                @csrf
                <button type="submit" class="logout-btn">Logout</button>
            </form>
        </div>
    </header>

    <div class="container">
        <h2>Browse Products</h2>
        <div class="products-grid" style="margin-top: 20px;">
            @forelse($products as $product)
            <div class="product-card">
                <div class="product-image">📦</div>
                <div class="product-info">
                    <div class="product-name">{{ $product->name }}</div>
                    <div class="product-seller">Seller: {{ $product->user->name ?? 'Unknown' }}</div>
                    <div class="product-price">₱{{ number_format($product->price, 2) }}</div>
                    <div class="product-stock">Stock: {{ $product->stock }}</div>
                    
                    @if($product->stock > 0)
                        <form method="POST" action="{{ route('cart.add', $product) }}" style="margin-top: 10px;">
                            @csrf
                            <input type="hidden" name="quantity" value="1">
                            <button type="submit" class="btn">Add to Cart</button>
                        </form>
                    @else
                        <button class="btn" disabled style="background: #ccc; cursor: not-allowed;">Out of Stock</button>
                    @endif
                </div>
            </div>
            @empty
            <p>No products available.</p>
            @endforelse
        </div>
    </div>
</body>
</html>
