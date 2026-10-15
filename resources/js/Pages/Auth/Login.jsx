import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8">
            <Head title="Log in" />

            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row-reverse border border-slate-100">
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
                        <h3 className="text-2xl font-bold leading-tight mb-4">
                            Welcome back! 👋
                        </h3>
                        <p className="text-orange-100/90 text-sm leading-relaxed">
                            Sign in to your account to continue shopping for the freshest produce or to manage your digital market store.
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Sign In</h3>
                        <p className="text-slate-500 text-sm mt-1">Enter your email and password to access your account.</p>
                    </div>

                    {status && <div className="mb-4 font-medium text-sm text-emerald-600">{status}</div>}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-orange-500/30"
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
                                name="password"
                                value={data.password}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:ring-2 focus:ring-orange-500/30"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-300 text-orange-500 focus:ring-orange-500 shadow-sm w-4 h-4"
                                />
                                <span className="ms-2 text-sm text-slate-600 font-medium">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-bold text-orange-600 hover:text-orange-500 transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all"
                            >
                                {processing ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="text-center pt-8">
                        <p className="text-sm text-slate-500">
                            Don't have an account yet?{' '}
                            <Link href={route('register')} className="font-bold text-slate-800 hover:text-orange-600 transition-colors">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}