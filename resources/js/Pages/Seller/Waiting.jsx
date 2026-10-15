import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Waiting({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Waiting for Approval" />
            <div className="py-12 bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8 w-full">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-3xl border border-slate-100 p-10 text-center">
                        
                        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-amber-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Application Submitted!</h2>
                        <h3 className="text-lg font-bold text-orange-600 mb-4">Waiting for Admin Approval</h3>
                        
                        <p className="text-slate-500 mb-8">
                            Maraming salamat sa pag-apply bilang vendor, <strong>{auth.user.name}</strong>! 
                            Ang iyong aplikasyon para sa tindahang <strong>{auth.user.store_name}</strong> ay kasalukuyang sinusuri ng aming Admin.
                            Maaaring tumagal ito ng ilang oras. Mangyaring bumalik muli mamaya.
                        </p>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}