<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckApprovedSeller
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->hasRole('Seller')) {
            
            if (!$user->is_profile_complete) {
                return redirect()->route('seller.profile.setup')
                    ->with('error', 'Kailangan mong kumpletuhin ang profile mo (100%) bago makapagbenta.');
            }
            
            if ($user->application_status !== 'approved') {
                return redirect()->route('seller.pending')
                    ->with('error', 'Ang iyong account ay kasalukuyang ni-re-review pa ng Admin.');
            }
        }

        return $next($request);
    }
}