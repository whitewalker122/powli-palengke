import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion, activeStores = [], products = [] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.user?.store_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToCart = (productId) => {
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Matagumpay na naidagdag sa iyong cart!');
            },
            onError: (errors) => {
                alert('May error sa pag-add to cart. Siguraduhing naka-login bilang buyer.');
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
            <Head title="Powli Palengke - Online Palengke Marketplace" />

            <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                            P
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-slate-900">Powli Palengke</h1>
                            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Fresh & Local Marketplace</p>
                        </div>
                    </div>

                    <nav className="flex items-center gap-4">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-orange-600 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden shadow-inner">
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-widest backdrop-blur-md border border-white/30 inline-block shadow-sm">
                        Fresh Vegetables, Fish, and Meat Daily
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
                        Your digital wet market, straight to your doorstep.
                    </h2>
                    <p className="text-orange-100 text-sm md:text-base max-w-2xl mx-auto font-medium">
                        Support local vendors and shop for the freshest produce without leaving your home.
                    </p>

                    <div className="max-w-xl mx-auto pt-2">
                        <div className="relative flex items-center">
                            <svg className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for fish, meat, vegetables, or store name..."
                                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-800 placeholder-slate-400 font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-400/30 border-0 text-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 w-full">
                {/* Active Stores Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Stores ({activeStores.length})</h3>
                    </div>

                    {activeStores.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeStores.map(store => (
                                <div key={store.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                                                {store.store_name?.charAt(0) || 'S'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-base">{store.store_name}</h4>
                                                <p className="text-xs text-slate-500 font-medium">{store.name} (Vendor)</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2">📍 {store.store_address}</p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                                        <span className="text-orange-600">{(store.products_count ?? store.products?.length) || 0} Products</span>
                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg">Open</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                            No approved stores available at the moment.
                        </div>
                    )}
                </section>

                {/* Products Section */}
                <section id="products-section">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">🛒 All Products </h3>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md inline-block mb-2">
                                                {product.user?.store_name || 'Store'}
                                            </span>
                                            <h4 className="font-bold text-slate-900 text-base mb-1">{product.name}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 mb-4">{product.description || 'No description provided.'}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-baseline justify-between pt-4 border-t border-slate-100 mb-3">
                                                <span className="text-xl font-black text-orange-600">₱{Number(product.price).toFixed(2)}</span>
                                                <span className="text-xs font-bold text-slate-500">Stock: {product.stock}</span>
                                            </div>
                                            <button
                                                onClick={() => addToCart(product.id)}
                                                className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400">
                            <p className="font-medium text-slate-600">No products found matching your search.</p>
                        </div>
                    )}
                </section>
            </main>

            <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium">
                <p>Laravel v{laravelVersion} (PHP v{phpVersion}) &bull; &copy; {new Date().getFullYear()} Powli Palengke Marketplace. All rights reserved.</p>
            </footer>
        </div>
    );
}