import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Cart({ auth, cartItems = [] }) {
    const { post, processing } = useForm({
        shipping_address: 'Standard Palengke Delivery Address',
    });

    const handleCheckout = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Shopping Cart" />

            <div className="py-8 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-2xl font-black text-slate-900">My Shopping Cart</h2>

                    {cartItems.length > 0 ? (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                            <div className="divide-y divide-slate-100">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="py-4 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-800">{item.product.name}</h4>
                                            <p className="text-xs text-orange-600 font-bold">Store: {item.product.user?.store_name}</p>
                                            <p className="text-xs text-slate-500 mt-1">Price: ₱{Number(item.product.price).toFixed(2)} x {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-black text-slate-900">₱{(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                                <span className="font-bold text-slate-600">Total Fee:</span>
                                <span className="text-2xl font-black text-orange-600">₱{totalCartPrice.toFixed(2)}</span>
                            </div>

                            <form onSubmit={handleCheckout}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-sm">
                                    Checkout & Place Order
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400">
                            <p className="font-medium text-slate-600">Your cart is empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}