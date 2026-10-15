<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketController extends Controller
{
    public function selection()
    {
        return Inertia::render('MarketSelection'); 
    }

    public function browse($category)
    {
        if (!in_array($category, ['wet', 'dry'])) {
            abort(404);
        }

        $products = Product::where('category', $category)
            ->whereHas('seller', function($query) {
                $query->where('application_status', 'approved');
            })
            ->with('seller')
            ->get();

        return Inertia::render('Buyer/MarketView', [
            'category' => $category,
            'products' => $products
        ]);
    }
}