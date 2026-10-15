<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $seller = User::where('email', 'seller@powlipalengke.com')->first();

        if ($seller) {
            $products = [
                ['name' => 'Fresh Tomatoes', 'description' => 'Locally grown red tomatoes', 'price' => 80, 'stock' => 50, 'category' => 'wet'],
                ['name' => 'Cabbage', 'description' => 'Fresh green cabbage', 'price' => 45, 'stock' => 30, 'category' => 'wet'],
                ['name' => 'Lettuce', 'description' => 'Crisp leafy lettuce', 'price' => 60, 'stock' => 25, 'category' => 'wet'],
                ['name' => 'Carrots', 'description' => 'Orange carrots - 1kg', 'price' => 70, 'stock' => 40, 'category' => 'wet'],
                ['name' => 'Onions', 'description' => 'White onions - 1kg', 'price' => 50, 'stock' => 60, 'category' => 'dry'],
                ['name' => 'Potato', 'description' => 'Yellow potato - 2kg', 'price' => 90, 'stock' => 35, 'category' => 'dry'],
                ['name' => 'Cucumber', 'description' => 'Fresh green cucumber', 'price' => 35, 'stock' => 45, 'category' => 'wet'],
                ['name' => 'Bell Pepper', 'description' => 'Red bell pepper', 'price' => 85, 'stock' => 20, 'category' => 'wet'],
                ['name' => 'Garlic', 'description' => 'White garlic bulbs - 500g', 'price' => 120, 'stock' => 15, 'category' => 'dry'],
                ['name' => 'Broccoli', 'description' => 'Fresh green broccoli', 'price' => 95, 'stock' => 18, 'category' => 'wet'],
            ];

            foreach ($products as $product) {
                Product::firstOrCreate(
                    ['name' => $product['name']],
                    [
                        'user_id' => $seller->id,
                        ...$product,
                    ]
                );
            }
        }
    }
}
