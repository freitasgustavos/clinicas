<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithCookie($token);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out'])
            ->cookie('token', null, -1);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithCookie($token)
    {
        $user = auth('api')->user();

        $ttl = config('jwt.ttl');

        return response()->json($user)
            ->cookie(
                'token',      // Nome do cookie
                $token,       // O valor (o JWT)
                $ttl,         // Tempo de vida em minutos
                '/',          // Path
                null,         // Domain
                false,        // Secure (só enviar em HTTPS - true em produção)
                true,         // HttpOnly (não acessível por JS)
                false,        // Raw
                'Lax'         // SameSite
            );
    }
}