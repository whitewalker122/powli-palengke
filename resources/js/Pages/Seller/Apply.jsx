import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Apply({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        store_name: '',
        store_address: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('seller.apply.submit'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-slate-800 leading-tight">Apply as a Store Vendor</h2>}
        >
            <Head title="Seller Application" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Setup Your Palengke Store</h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Ibigay ang mga detalye ng iyong pwesto o tindahan upang masuri ito ng admin.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Store Name / Pangalan ng Tindahan</label>
                                <input
                                    type="text"
                                    value={data.store_name}
                                    onChange={(e) => setData('store_name', e.target.value)}
                                    placeholder="hal. Aling Nena's Fresh Fish & Meat"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                                    required
                                />
                                {errors.store_name && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.store_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Store Address / Lokasyon ng Pwesto</label>
                                <input
                                    type="text"
                                    value={data.store_address}
                                    onChange={(e) => setData('store_address', e.target.value)}
                                    placeholder="hal. Stall #14, Wet Section, Public Market"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm"
                                    required
                                />
                                {errors.store_address && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.store_address}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all"
                            >
                                {processing ? 'Isinusumite...' : 'Isumite ang Aplikasyon 🚀'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}