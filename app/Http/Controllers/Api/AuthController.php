<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Registration
     */
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required|min:4',
            'email' => 'required|email|unique:users',
            'password' => 'confirmed|required|min:8',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('LaravelAuthApp')->accessToken;

        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    /**
     * Login
     */
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validation->fails()) {
            return response()->json($validation->errors(), 422);
        }

        $data = [
            'email' => $request->email,
            'password' => $request->password,
        ];

        if (auth()->attempt($data)) {
            $token = auth()
                ->user()
                ->createToken('test')->accessToken;
            return response()->json(['token' => $token, 'user' => auth()->user()], 200);
        } else {
            $validation->errors()->add('email', 'Wrong username or password');
            return response()->json($validation->errors(), 422);
            // return response()->json(['error' => 'Wrong username or password'], 401);
        }
    }
    public function getUser(Request $request)
    {
        return response()->json(['user' => auth()->user()]);
    }
    public function logout()
    {
        if (Auth::check()) {
            Auth::user()
                ->AauthAcessToken()
                ->delete();
            return response()->json(['message' => 'Logout Successfully'], 200);
        }
    }
}
