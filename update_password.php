<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$user = User::where('email', 'admin@powlipalengke.com')->first();
if ($user) {
    $user->password = Hash::make('password123');
    $user->save();
    echo "Password updated for admin@powlipalengke.com\n";
} else {
    echo "User not found\n";
}
