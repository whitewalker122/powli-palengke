import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
            <Head title="Register" />

            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row border border-slate-100">
                <div className="w-full md:w-5/12 bg-gradient-to-br from-orange-500 to-amber-500 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <Link
                            href="/"
                            className="inline-flex items-center text-xs font-bold text-orange-100 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/20 w-fit"
                        >
                            &larr; Back to Powli Palengke Home
                        </Link>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight mb-2 mt-2">POWLI PALENGKE</h2>
                            <p className="text-orange-100 text-sm font-medium tracking-wide uppercase">The Modern Market</p>
                        </div>
                    </div>
                    <div className="relative z-10 mt-12 md:mt-0 hidden md:block">
                        <h3 className="text-2xl font-bold leading-tight mb-4">Join our community!</h3>
                        <p className="text-orange-100/90 text-sm leading-relaxed">
                            Create an account to start shopping for fresh local produce or open your own digital store.
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Create Account</h3>
                        <p className="text-slate-500 text-sm mt-1">Fill in your details to register a new account.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">I want to register as a:</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setData('role', 'buyer')}
                                    className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                                        data.role === 'buyer'
                                            ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-sm'
                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    🛍️ Buyer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('role', 'seller')}
                                    className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                                        data.role === 'seller'
                                            ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-sm'
                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    🏪 Seller (Vendor)
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Juan Dela Cruz"
                                required
                            />
                            {errors.name && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="example@email.com"
                                required
                            />
                            {errors.email && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="password_confirmation">Confirm Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            {errors.password_confirmation && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.password_confirmation}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all"
                            >
                                {processing ? 'Creating account...' : 'Register'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center pt-6">
                        <p className="text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link href={route('login')} className="font-bold text-slate-800 hover:text-orange-600 transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}