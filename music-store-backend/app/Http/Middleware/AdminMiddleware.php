<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = User::find(User::getLoggedInId());

        if ($user->u_status == 'admin') {
            return $next($request);
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
