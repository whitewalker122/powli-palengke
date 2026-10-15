import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Dashboard({ auth, products = [], orders = [], cartItems = [] }) {
    const user = auth.user;
    const isSeller = user.role === 'seller' && user.application_status === 'approved';

    const { data: productData, setData: setProductData, post: postProduct, processing: productProcessing, errors: productErrors, reset: resetProduct } = useForm({
        name: '',
        price: '',
        stock: '',
        description: '',
    });

    const { data: checkoutData, setData: setCheckoutData, post: postCheckout, processing: checkoutProcessing } = useForm({
        shipping_address: user.store_address || 'Standard Delivery Address',
    });

    const submitProduct = (e) => {
        e.preventDefault();
        postProduct(route('products.store'), {
            onSuccess: () => resetProduct(),
            preserveScroll: true,
        });
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        router.patch(route('seller.orders.update', orderId), {
            status: newStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                alert('the status order has been updated!');
            },
        });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        postCheckout(route('checkout.store'), {
            preserveScroll: true,
            onSuccess: () => alert('the order has been placed and the stock has been reduced!'),
        });
    };

    const totalCartAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-black text-2xl text-slate-800 leading-tight">
                    {isSeller ? 'Vendor Dashboard' : 'Buyer Palengke Dashboard'}
                </h2>
            }
        >
            <Head title={isSeller ? "Vendor Dashboard" : "Buyer Dashboard"} />

            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* KUNG SELLER SIYA */}
                    {isSeller ? (
                        <>
                            {/* Orange Welcome Banner */}
                            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="space-y-2">
                                    <span className="px-3 py-1 bg-white/20 text-xs font-black uppercase tracking-wider rounded-full backdrop-blur-md border border-white/20">
                                        Vendor Workspace
                                    </span>
                                    <h3 className="text-3xl font-black tracking-tight mt-2">
                                        Magandang araw, {user.name}! 👋
                                    </h3>
                                    <p className="text-orange-100 text-sm max-w-xl leading-relaxed">
                                        Store: {user.store_name}
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[130px] shadow-inner">
                                        <span className="block text-4xl font-black mb-1">{orders.length}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-orange-100">Orders / Notif</span>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center min-w-[130px] shadow-inner">
                                        <span className="block text-4xl font-black mb-1">{products.length}</span>
                                        <span className="text-xs font-bold uppercase tracking-widest text-orange-100">Products</span>
                                    </div>
                                </div>
                            </div>

                            {/* ORDERS / NOTIFICATIONS SECTION PARA SA SELLER */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                                <div className="mb-6 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">📦 Customer Orders & Notifications</h3>
                                        <p className="text-sm text-slate-500 mt-1">Successful orders from customers who have purchased from your store.</p>
                                    </div>
                                    {orders.length > 0 && (
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 font-black text-xs rounded-full">
                                            {orders.length} New
                                        </span>
                                    )}
                                </div>

                                {orders.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                                    <th className="p-4 font-bold rounded-l-xl">Order ID</th>
                                                    <th className="p-4 font-bold">Items Purchased</th>
                                                    <th className="p-4 font-bold">Total Amount</th>
                                                    <th className="p-4 font-bold">Status</th>
                                                    <th className="p-4 font-bold rounded-r-xl text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {orders.map(order => (
                                                    <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                                        <td className="p-4 font-bold text-slate-800">#{order.id}</td>
                                                        <td className="p-4 text-slate-600">
                                                            {order.items?.map((item, idx) => (
                                                                <div key={idx}>
                                                                    • {item.product_name} (x{item.quantity})
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td className="p-4 font-black text-emerald-600">₱{Number(order.total_amount).toFixed(2)}</td>
                                                        <td className="p-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                                order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                                order.status === 'processing' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-emerald-100 text-emerald-700'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right space-x-2">
                                                            {order.status === 'pending' && (
                                                                <button onClick={() => handleUpdateStatus(order.id, 'processing')} className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600">
                                                                    Prosesuhin
                                                                </button>
                                                            )}
                                                            {order.status === 'processing' && (
                                                                <button onClick={() => handleUpdateStatus(order.id, 'completed')} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700">
                                                                    I-Deliver
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                                        <p className="text-sm text-slate-400 font-medium">Wala pang pumasok na order o notification sa ngayon.</p>
                                    </div>
                                )}
                            </div>

                            {/* Add New Product Form */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight">Add New Product</h3>
                                    <p className="text-sm text-slate-500 mt-1">list all the details of the new product.</p>
                                </div>

                                <form onSubmit={submitProduct} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                                            <input
                                                type="text"
                                                value={productData.name}
                                                onChange={(e) => setProductData('name', e.target.value)}
                                                placeholder="e.g. Fresh Bangus"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                                                required
                                            />
                                            {productErrors.name && <p className="mt-1 text-xs text-rose-600 font-semibold">{productErrors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Price (₱)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={productData.price}
                                                onChange={(e) => setProductData('price', e.target.value)}
                                                placeholder="0.00"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                                                required
                                            />
                                            {productErrors.price && <p className="mt-1 text-xs text-rose-600 font-semibold">{productErrors.price}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Stock Quantity</label>
                                            <input
                                                type="number"
                                                value={productData.stock}
                                                onChange={(e) => setProductData('stock', e.target.value)}
                                                placeholder="100"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                                                required
                                            />
                                            {productErrors.stock && <p className="mt-1 text-xs text-rose-600 font-semibold">{productErrors.stock}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                            <input
                                                type="text"
                                                value={productData.description}
                                                onChange={(e) => setProductData('description', e.target.value)}
                                                placeholder="Brief description"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm"
                                            />
                                            {productErrors.description && <p className="mt-1 text-xs text-rose-600 font-semibold">{productErrors.description}</p>}
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={productProcessing}
                                            className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                                        >
                                            {productProcessing ? 'Sinasave...' : 'Save Product'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* My Store Products */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-6">
                                    My Store Products ({products.length})
                                </h3>

                                {products.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {products.map((product) => (
                                            <div key={product.id} className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-lg">{product.name}</h4>
                                                    <p className="text-sm text-slate-500 mt-1">{product.description || 'No description.'}</p>
                                                </div>
                                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <span className="text-lg font-black text-orange-500">₱{Number(product.price).toFixed(2)}</span>
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                                                        product.stock <= 5 ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                                                    }`}>
                                                        Stock: {product.stock}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                                        <p className="text-sm text-slate-500">You have no products listed yet.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        /* KUNG BUYER SIYA */
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="space-y-2">
                                    <span className="px-3 py-1 bg-white/20 text-xs font-black uppercase tracking-wider rounded-full backdrop-blur-md border border-white/20">
                                        Buyer Profile
                                    </span>
                                    <h3 className="text-3xl font-black tracking-tight mt-2">
                                        Magandang araw, {user.name}! 🛒
                                    </h3>
                                    <p className="text-orange-100 text-sm max-w-xl leading-relaxed">
                                        Review your shopping cart and checkout your newly purchased items.
                                    </p>
                                </div>
                                <div>
                                    <a href="/#products-section" className="px-6 py-3.5 bg-white text-orange-600 font-bold rounded-2xl text-sm shadow-lg hover:bg-orange-50 transition-all inline-block">
                                        Browse Products
                                    </a>
                                </div>
                            </div>

                            {/* Cart & Checkout Section */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-6">
                                    🛒 Your Shopping Cart ({cartItems.length} items)
                                </h3>

                                {cartItems.length > 0 ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 space-y-4">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                                                    <div>
                                                        <span className="text-[10px] font-bold text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded">
                                                            {item.product?.user?.store_name || 'Store'}
                                                        </span>
                                                        <h4 className="font-bold text-slate-800 mt-1">{item.product?.name}</h4>
                                                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-black text-orange-600 text-base">
                                                            ₱{(item.product?.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
                                            <div>
                                                <h4 className="font-black text-slate-800 text-lg mb-4">Order Summary</h4>
                                                <div className="space-y-2 text-sm text-slate-600">
                                                    <div className="flex justify-between">
                                                        <span>Subtotal</span>
                                                        <span className="font-bold">₱{totalCartAmount.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Shipping Fee</span>
                                                        <span className="font-bold">Free</span>
                                                    </div>
                                                    <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                                                        <span>Total Amount</span>
                                                        <span className="text-orange-600">₱{totalCartAmount.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <form onSubmit={handleCheckout} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-700 mb-1">Shipping Address</label>
                                                    <input 
                                                        type="text"
                                                        value={checkoutData.shipping_address}
                                                        onChange={(e) => setCheckoutData('shipping_address', e.target.value)}
                                                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:border-orange-500 outline-none"
                                                        required
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={checkoutProcessing}
                                                    className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all text-center disabled:opacity-50"
                                                >
                                                    {checkoutProcessing ? 'Pinoproseso ang Bayad...' : 'Proceed to Checkout & Pay'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                                        <div className="text-4xl">🛒</div>
                                        <h5 className="font-bold text-slate-700">your cart is empty.</h5>
                                        <p className="text-sm text-slate-500">Go to the marketplace to add some items to your cart.</p>
                                        <div>
                                            <a href="/#products-section" className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-xs inline-block hover:bg-orange-600 transition-all">
                                                Browse Products
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}