import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Orders({ auth, orders = [] }) {
    const updateStatus = (orderId, newStatus) => {
        router.patch(route('seller.orders.update', orderId), {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Order Management (Seller Dashboard)
                </h2>
            }
        >
            <Head title="Seller Orders" />

            py-12
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg border border-slate-200">
                        <h3 className="text-lg font-black text-slate-900 mb-4">Order receive</h3>

                        {orders.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6 shadow-sm">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-slate-900">Order #{order.id}</span>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                                    order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                                                    order.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            
                                            <p className="text-xs text-slate-600 font-medium">
                                               Choose: <strong className="text-slate-900">{order.buyer?.name}</strong> ({order.buyer?.email})
                                            </p>
                                            <p className="text-xs text-slate-600 font-medium">
                                                Delivery Address: <strong className="text-slate-900">{order.shipping_address}</strong>
                                            </p>

                                            <div className="mt-4 pt-3 border-t border-slate-100">
                                                <p className="text-xs font-bold text-slate-700 mb-2">The products sold</p>
                                                <ul className="space-y-1">
                                                    {order.items.map((item, index) => (
                                                        <li key={index} className="text-xs text-slate-600 flex justify-between">
                                                            <span>{item.product_name} (x{item.quantity})</span>
                                                            <span className="font-bold text-slate-900">₱{(item.price * item.quantity).toFixed(2)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                            <div className="text-right">
                                                <span className="text-xs text-slate-400 block font-medium">Kabuuang Halaga</span>
                                                <span className="text-2xl font-black text-orange-600">₱{Number(order.total_amount).toFixed(2)}</span>
                                            </div>

                                            <div className="mt-4 flex flex-col gap-2 w-full md:w-auto">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Palitan ang Status:</span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateStatus(order.id, 'processing')}
                                                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                                                    >
                                                        Process
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(order.id, 'completed')}
                                                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                                                    >
                                                        Complete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400 font-medium">
                                no incoming orders yet. 
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}