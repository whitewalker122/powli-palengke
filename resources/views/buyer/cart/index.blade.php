<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart - Powli Palengke</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        header { background: #4CAF50; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .container { max-width: 1000px; margin: 30px auto; padding: 0 20px; }
        h1 { margin-bottom: 20px; }
        .logout-btn { background: #d32f2f; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }
        .cart-table { background: white; border-collapse: collapse; width: 100%; margin-bottom: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .cart-table th, .cart-table td { padding: 15px; text-align: left; border-bottom: 1px solid #ddd; }
        .cart-table th { background: #f5f5f5; font-weight: bold; }
        .cart-table input { width: 80px; padding: 5px; border: 1px solid #ddd; border-radius: 4px; }
        .cart-table button { padding: 5px 10px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .cart-table button:hover { background: #c62828; }
        .empty-cart { text-align: center; padding: 40px; }
        .summary { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .summary-total { font-size: 20px; font-weight: bold; color: #4CAF50; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px; }
        .btn-checkout { background: #4CAF50; color: white; padding: 12px 30px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 16px; }
        .btn-checkout:hover { background: #45a049; }
        .btn-shop { background: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; }
        .success { background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <header>
        <h1>Shopping Cart</h1>
        <div>
            <form method="POST" action="/logout" style="display:inline;">
                @csrf
                <button type="submit" class="logout-btn">Logout</button>
            </form>
        </div>
    </header>

    <div class="container">
        @if(session('success'))
            <div class="success">{{ session('success') }}</div>
        @endif

        @if($cartItems->isEmpty())
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart.</p>
                <a href="{{ route('shop') }}" class="btn-shop">Continue Shopping</a>
            </div>
        @else
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Seller</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($cartItems as $item)
                    <tr>
                        <td>{{ $item->product->name }}</td>
                        <td>{{ $item->product->user->name }}</td>
                        <td>₱{{ number_format($item->product->price, 2) }}</td>
                        <td>
                            <form method="POST" action="{{ route('cart.update', $item) }}" style="display:inline;">
                                @csrf
                                @method('PUT')
                                <input type="number" name="quantity" value="{{ $item->quantity }}" min="1" max="{{ $item->product->stock }}">
                                <button type="submit" style="background: #4CAF50; padding: 5px 10px; margin-left: 5px;">Update</button>
                            </form>
                        </td>
                        <td>₱{{ number_format($item->product->price * $item->quantity, 2) }}</td>
                        <td>
                            <form method="POST" action="{{ route('cart.remove', $item) }}" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit">Remove</button>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>₱{{ number_format($total, 2) }}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                </div>
                <div class="summary-total">
                    <div>Total: ₱{{ number_format($total, 2) }}</div>
                </div>
            </div>

            <div style="display: flex; gap: 10px;">
                <a href="{{ route('shop') }}" class="btn-shop">Continue Shopping</a>
                <button class="btn-checkout">Proceed to Checkout</button>
                <form method="POST" action="{{ route('cart.clear') }}" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" style="background: #d32f2f; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Clear Cart</button>
                </form>
            </div>
        @endif
    </div>
</body>
</html>
