<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $res = [
            'status' => false,
            'message' => "",
            'data' => null
        ];

        $validation = Validator::make($request->all(), [
            'name' => ['required', 'max:45'],
            'email' => ['required', 'email', 'unique:users'],
            'phone' => ['required', 'unique:users'],
            'password' => ['min:6', 'max:16', 'confirmed'],
        ], [
            'required' => ':attribute is Required!',
            'email' => ':attribute Must be a Valid Email!',
            'unique' => ':attribute Already Exists!'
        ], [
            'name' => 'Name',
            'email' => 'Email',
            'password' => 'Password',
            'phone' => 'phone'
        ]);

        if ($validation->fails()) {
            $res['message'] = $validation->errors()->first();
        } else {

            $request->merge(['password' => Hash::make($request->password)]);

            $user = User::create($request->all());

            // $user->create

            if ($user) {
                $token = $user->createToken("AccessToken");

                $res['status'] = true;
                $res['data'] = [
                    'user' => $user,
                    'access_token' => $token->plainTextToken
                ];
                $res['message'] = "Registration Success!";
            } else {
                $res['message'] = "Registration Faild!";
            }
        }

        return $res;
    }

    public function login(Request $request)
    {
        $res = [
            'status' => false,
            'message' => "",
            'data' => null
        ];

        // dd($request->header('Authorization'));

        if ($request->header('Authorization')) {
            $res['message'] = "You Already Logged In!";
        } else {
            $validation = Validator::make($request->all(), [
                'email' => ['required', 'email'],
                'password' => ['required'],
            ], [
                'required' => ':attribute is Required!',
                'email' => ':attribute Must be a Valid Email!'
            ], [
                'email' => 'Email',
                'password' => 'Password'
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $user = User::where('email', $request->email)->first();
                if ($user) {
                    $check = Hash::check($request->password, $user->password);
                    if ($check) {

                        $token = $user->createToken("AccessToken");

                        $res['status'] = true;
                        $res['data'] = [
                            'user' => $user,
                            'access_token' => $token->plainTextToken
                        ];
                        $res['message'] = "Login Success!";
                    } else {
                        $res['message'] = "Credentials didn't match!";
                    }
                } else {
                    $res['message'] = "You Are New Here. Please Register!";
                }
            }
        }

        return $res;
    }

    public function logout()
    {
        $res = [
            'status' => false,
            'message' => "",
            'data' => null
        ];

        $user = Auth::user();

        if ($user) {
            $user->currentAccessToken()->delete();
            $res['status'] = true;
            $res['message'] = "Logout Success!";

            return $res;
        } else {
            $res['message'] = "Unauthorized!";
            return response($res, 409);
        }
    }
}
