<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Powli Palengke</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        header { background: #4CAF50; color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        header h1 { font-size: 24px; }
        .logout-btn { background: #d32f2f; color: white; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; }
        .logout-btn:hover { background: #c62828; }
        .container { max-width: 1200px; margin: 40px auto; padding: 0 20px; }
        .welcome { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .welcome h2 { color: #333; margin-bottom: 15px; }
        .welcome p { color: #666; line-height: 1.6; }
        .menu { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .menu-item { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; text-decoration: none; color: #333; transition: transform 0.2s; }
        .menu-item:hover { transform: translateY(-5px); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .menu-item h3 { color: #4CAF50; margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <h1>Powli Palengke</h1>
        <div>
            <span>Welcome, {{ Auth::user()->name }}!</span>
            <form method="POST" action="/logout" style="display:inline;">
                @csrf
                <button type="submit" class="logout-btn">Logout</button>
            </form>
        </div>
    </header>

    <div class="container">
        <div class="welcome">
            <h2>Welcome to Powli Palengke Dashboard</h2>
            <p>You are logged in as <strong>{{ Auth::user()->email }}</strong></p>
        </div>

        <div class="menu">
            <div class="menu-item">
                <h3>📦 Products</h3>
                <p>Manage all products in your marketplace</p>
            </div>
            <div class="menu-item">
                <h3>🛒 Orders</h3>
                <p>View and manage customer orders</p>
            </div>
            <div class="menu-item">
                <h3>👥 Customers</h3>
                <p>Manage your customer base</p>
            </div>
            <div class="menu-item">
                <h3>📊 Reports</h3>
                <p>View sales and analytics reports</p>
            </div>
        </div>
    </div>
</body>
</html>
