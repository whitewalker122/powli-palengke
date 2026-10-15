import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function PendingSellers({ auth, applications = [] }) {
    const { post, processing } = useForm();

    const handleApprove = (userId) => {
        post(route('admin.sellers.approve', userId), {
            preserveScroll: true,
        });
    };

    const handleDecline = (userId) => {
        if (confirm('Are you sure you want to decline this seller application? This action cannot be undone.')) {
            post(route('admin.sellers.decline', userId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-bold text-xl text-slate-800 leading-tight">
                    Vendor Management - Admin Workspace
                </h2>
            }
        >
            <Head title="Pending Seller Applications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Header Banner */}
                    <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-2">
                            <span className="px-3 py-1 bg-white/20 text-xs font-black uppercase tracking-wider rounded-full backdrop-blur-md">
                                Admin Workspace
                            </span>
                            <h3 className="text-3xl font-black tracking-tight">Seller Applications</h3>
                            <p className="text-orange-100 text-sm max-w-xl">
                                Review the new seller registrations, verify the account details, and make decisions about who can operate in your palengke.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center min-w-[160px]">
                            <span className="block text-4xl font-black">{applications.length}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-orange-100">Pending Review</span>
                        </div>
                    </div>

                    {/* Application Queue Section */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
                        <div className="border-b border-slate-100 pb-4">
                            <h4 className="text-xl font-black text-slate-900 tracking-tight">Application Queue</h4>
                            <p className="text-xs text-slate-500 font-medium">
                                {applications.length > 0 ? `${applications.length} application(s) waiting for approval` : '0 applications to review'}
                            </p>
                        </div>

                        {applications.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {applications.map((app) => (
                                    <div 
                                        key={app.id} 
                                        className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:shadow-md"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-wider rounded-md">
                                                    Pending Vendor
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">Applied: {new Date(app.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <h5 className="text-lg font-bold text-slate-900">{app.store_name}</h5>
                                            <p className="text-xs text-slate-600 font-medium">👤 Owner: {app.name} ({app.email})</p>
                                            <p className="text-xs text-slate-500">📍 Location: {app.store_address || 'Not specified'}</p>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-200">
                                            <button
                                                onClick={() => handleApprove(app.id)}
                                                disabled={processing}
                                                className="flex-1 md:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all text-center"
                                            >
                                                Approve Store ✅
                                            </button>
                                            <button
                                                onClick={() => handleDecline(app.id)}
                                                disabled={processing}
                                                className="flex-1 md:flex-none px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl border border-rose-200 transition-all text-center"
                                            >
                                                Decline ❌
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-2xl space-y-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 text-xl font-bold">
                                    ✓
                                </div>
                                <h5 className="font-bold text-slate-700 text-base">You're all caught up</h5>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                                    There are no pending seller applications at the moment. All new vendor registrations have been reviewed and processed.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}