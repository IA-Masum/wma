<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function profile()
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        if ($user) {
            $res['status'] = true;
            $res['data'] = $user;
            $res['message'] = "Profile Info Load Success!";

            return $res;
        } else {
            $res['message'] = "Unauthorized";
            return response($res, 409);
        }
    }

    public function changeName(Request $request)
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:45']
        ], [
            'required' => ':attribute is Required!',
            'string' => ':attribute Must be Text!'
        ], [
            'name' => 'Name',
        ]);

        if ($validation->fails()) {
            $res['message'] = $validation->errors()->first();
        } else {
            $user = Auth::user();

            if ($user) {
                $user->name = $request->name;
                $user->save();


                $res['status'] = true;
                $res['data'] = $user;
                $res['message'] = "Name Change Success!";
            } else {
                $res['message'] = "Unauthorized";
                return response($res, 409);
            }
        }

        return $res;
    }

    public function changeEmail(Request $request)
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        $validation = Validator::make($request->all(), [
            'emil' => ['required', 'email', 'unique:users,email,' . $user->id]
        ], [
            'required' => ':attribute is Required!',
            'string' => ':attribute Must be Text!'
        ], [
            'email' => 'Email',
        ]);

        if ($validation->fails()) {
            $res['message'] = $validation->errors()->first();
        } else {

            if ($user) {
                $user->email = $request->email;
                $user->save();


                $res['status'] = true;
                $res['data'] = $user;
                $res['message'] = "Email Change Success!";
            } else {
                $res['message'] = "Unauthorized";
                return response($res, 409);
            }
        }

        return $res;
    }


    public function changePassword(Request $request)
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        $validation = Validator::make($request->all(), [
            'old_password' => ['required'],
            'new_password' => ['min:6', 'max:16', 'required', 'confirmed']
        ], [
            'required' => ':attribute is Required!',
            'string' => ':attribute Must be Text!'
        ], [
            'old_password' => 'Old Password',
            'new_password' => 'New Password'
        ]);

        if ($validation->fails()) {
            $res['message'] = $validation->errors()->first();
        } else {

            if ($user) {

                $check = Hash::check($$request->old_password, $user->password);

                if ($check) {
                    $res['message'] = "Credentials Didn't Match!";
                } else {

                    $user->password = Hash::make($request->new_password);
                    $user->save();

                    $res['status'] = true;
                    $res['data'] = $user;
                    $res['message'] = "Password Change Success!";
                }
            } else {
                $res['message'] = "Unauthorized";
                return response($res, 409);
            }
        }

        return $res;
    }
}
