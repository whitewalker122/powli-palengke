import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Dashboard({ auth, products = [] }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        price: '',
        stock: '',
        description: '',
    });

    const submitProduct = (e) => {
        e.preventDefault();
        post(route('seller.products.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tindahan Dashboard: <span className="text-orange-600">{auth.user.store_name}</span>
                    </h2>
                    <Link
                        href={route('seller.orders.index')}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                        📦 show orders
                    </Link>
                </div>
            }
        >
            <Head title="Seller Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Add Product Form Section */}
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border border-slate-200">
                        <h3 className="text-lg font-black text-slate-900 mb-4">Add New Product</h3>

                        <form onSubmit={submitProduct} className="space-y-4 max-w-xl">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., Fresh Bangus / Tomatoes"
                                    className="w-full rounded-xl border-slate-200 text-sm focus:border-orange-500 focus:ring-orange-500"
                                />
                                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Price (₱)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="0.00"
                                        className="w-full rounded-xl border-slate-200 text-sm focus:border-orange-500 focus:ring-orange-500"
                                    />
                                    {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Stock</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        placeholder="0"
                                        className="w-full rounded-xl border-slate-200 text-sm focus:border-orange-500 focus:ring-orange-500"
                                    />
                                    {errors.stock && <p className="text-xs text-rose-500 mt-1">{errors.stock}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Description (Optional)</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe the product..."
                                    rows="3"
                                    className="w-full rounded-xl border-slate-200 text-sm focus:border-orange-500 focus:ring-orange-500"
                                ></textarea>
                                {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                            >
                                Save the Product
                            </button>
                        </form>
                    </div>

                    {/* Products List Section */}
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border border-slate-200">
                        <h3 className="text-lg font-black text-slate-900 mb-4">My Products ({products.length})</h3>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((product) => (
                                    <div key={product.id} className="border border-slate-200 p-4 rounded-2xl flex flex-col justify-between shadow-sm">
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-base">{product.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description || 'No description available.'}</p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-lg font-black text-orange-600">₱{Number(product.price).toFixed(2)}</span>
                                            <span className="text-xs font-bold text-slate-600">Stock: {product.stock}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400 font-medium">
                                no products listed yet. Add your first product using the form above.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}