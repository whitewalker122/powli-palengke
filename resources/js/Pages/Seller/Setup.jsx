import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Setup({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        market_type: '',
        categories: [],
    });

    const wetCategories = ['Gulay', 'Karne', 'Prutas', 'Isda at Seafoods', 'Manok'];
    const dryCategories = ['Bigas at Butil', 'Damit at Sapatos', 'Canned Goods', 'Mga Kagamitan sa Bahay', 'Pampalasa (Spices)'];

    // Handle check/uncheck ng categories
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setData('categories', [...data.categories, value]);
        } else {
            setData('categories', data.categories.filter(c => c !== value));
        }
    };

    const handleMarketTypeChange = (type) => {
        setData(data => ({
            ...data,
            market_type: type,
            categories: [] 
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('seller.setup.submit'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Store Setup - Market Selection" />
            <div className="py-12 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-3xl border border-slate-100 p-8 md:p-12">
                        
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-orange-600 mb-2">I-set up ang iyong Tindahan</h2>
                            <p className="text-slate-500">Ano ang pangunahing uri ng mga produktong ibebenta mo?</p>
                        </div>

                        <form onSubmit={submit} className="space-y-10">
                            
                            {/* STEP 1: WET OR DRY SELECTION */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4">1. Piliin ang Market Type</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Wet Market Option */}
                                    <label className={`relative flex flex-col p-6 cursor-pointer rounded-2xl border-2 transition-all duration-200 ${data.market_type === 'wet' ? 'border-orange-500 bg-orange-50/50 shadow-md' : 'border-slate-200 bg-white hover:border-orange-300'}`}>
                                        <input type="radio" name="market_type" value="wet" className="sr-only" onChange={() => handleMarketTypeChange('wet')} checked={data.market_type === 'wet'} />
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xl font-bold ${data.market_type === 'wet' ? 'text-orange-700' : 'text-slate-700'}`}>Wet Market</span>
                                            {data.market_type === 'wet' && <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
                                        </div>
                                        <span className="text-sm text-slate-500">Mga sariwang produkto tulad ng karne, isda, gulay, at prutas.</span>
                                    </label>

                                    {/* Dry Market Option */}
                                    <label className={`relative flex flex-col p-6 cursor-pointer rounded-2xl border-2 transition-all duration-200 ${data.market_type === 'dry' ? 'border-orange-500 bg-orange-50/50 shadow-md' : 'border-slate-200 bg-white hover:border-orange-300'}`}>
                                        <input type="radio" name="market_type" value="dry" className="sr-only" onChange={() => handleMarketTypeChange('dry')} checked={data.market_type === 'dry'} />
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xl font-bold ${data.market_type === 'dry' ? 'text-orange-700' : 'text-slate-700'}`}>Dry Market</span>
                                            {data.market_type === 'dry' && <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
                                        </div>
                                        <span className="text-sm text-slate-500">Bigas, damit, kagamitan sa bahay, at mga hindi mabilis masirang produkto.</span>
                                    </label>
                                </div>
                                {errors.market_type && <p className="mt-2 text-sm text-rose-600 font-semibold">{errors.market_type}</p>}
                            </div>

                            {/* STEP 2: CATEGORY SELECTION (Lilitaw lang kapag nakapili na ng market_type) */}
                            {data.market_type && (
                                <div className="animate-fade-in-up">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4">2. Piliin ang Kategorya ng Iyong Produkto</h3>
                                    <p className="text-sm text-slate-500 mb-4">Maaari kang pumili ng higit sa isa (Pwede ding lahat).</p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {(data.market_type === 'wet' ? wetCategories : dryCategories).map((category, index) => (
                                            <label key={index} className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                                                <input 
                                                    type="checkbox" 
                                                    value={category}
                                                    checked={data.categories.includes(category)}
                                                    onChange={handleCategoryChange}
                                                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 border-slate-300"
                                                />
                                                <span className="ml-3 text-sm font-semibold text-slate-700">{category}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.categories && <p className="mt-2 text-sm text-rose-600 font-semibold">{errors.categories}</p>}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-slate-100">
                                <button 
                                    type="submit" 
                                    disabled={processing || !data.market_type || data.categories.length === 0} 
                                    className="w-full md:w-auto md:px-12 md:float-right flex justify-center items-center py-4 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Sini-save...' : 'Kumpletuhin ang Setup'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}