<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Seller;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $sellerRole = Role::firstOrCreate(['name' => 'seller']);
        $customerRole = Role::firstOrCreate(['name' => 'customer']);

        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@powlipalengke.com'],
            [
                'name' => 'Admin Powli',
                'password' => Hash::make('password123'),
            ]
        );
        $admin->roles()->syncWithoutDetaching([$adminRole->id]);

        // Create seller user
        $seller = User::firstOrCreate(
            ['email' => 'seller@powlipalengke.com'],
            [
                'name' => 'Seller Powli',
                'password' => Hash::make('password123'),
            ]
        );
        $seller->roles()->syncWithoutDetaching([$sellerRole->id]);
        
        // Create seller record
        Seller::firstOrCreate(
            ['user_id' => $seller->id],
            [
                'shop_name' => 'Seller Powli Shop',
                'status' => 'pending',
            ]
        );

        // Create customer user
        $customer = User::firstOrCreate(
            ['email' => 'buyer@powlipalengke.com'],
            [
                'name' => 'Buyer Powli',
                'password' => Hash::make('password123'),
            ]
        );
        $customer->roles()->syncWithoutDetaching([$customerRole->id]);

        // Call ProductSeeder
        $this->call(ProductSeeder::class);
    }
}
