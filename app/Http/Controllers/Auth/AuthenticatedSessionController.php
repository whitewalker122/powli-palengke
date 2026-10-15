<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // Safe check para sa role, nag-fa-fallback sa blank string kung null
        $userRole = strtolower($user->role ?? '');

        // DIREKTA NA SA ADMIN DASHBOARD
        if ($userRole === 'admin') {
            return redirect()->route('admin.sellers.pending');
        }

        // SELLER LOGIC
        if ($userRole === 'seller') {
            if (empty($user->store_name)) {
                return redirect()->route('seller.apply');
            }
            if ($user->application_status === 'pending') {
                return redirect()->route('seller.waiting');
            }
            // Kung kailangan pa ng setup (opsyonal)
            if ($user->application_status === 'approved' && !$user->is_profile_complete) {
                return redirect()->route('seller.setup'); 
            }
        }

        // Default redirect kung buyer o tapos na ang lahat ng seller process
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}