<?php

namespace App\Http\Controllers;

use App\Models\ExpenceSector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExpenceSectorController extends Controller
{
    public function addExpenceSector(Request $request)
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        if (!$user) {
            $res['message'] = "Unauthorized";
            return response($res, 401);
        } else {

            $validation = Validator::make($request->all(), [
                'name' => 'required|string|max:100|min:3'
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!'
            ], [
                'name' => 'Name'
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $request->merge(['user_id' => $user->id]);

                $expence_sector = ExpenceSector::create($request->all());
                if ($expence_sector) {
                    $res['status'] = true;
                    $res['data'] = $expence_sector;
                    $res['message'] = "Add ExpenceSector Success!";
                } else {
                    $res['message'] = "Add ExpenceSector Faild!";
                }
            }
        }

        return $res;
    }

    public function showSingleExpenceSector($id)
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        if (!$user) {
            $res['message'] = "Unauthorized";
            return response($res, 401);
        } else {

            $expence_sector = ExpenceSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$expence_sector) {
                $res['message'] = "ExpenceSector Not Found!";
            } else {
                $res['status'] = true;
                $res['message'] = 'ExpenceSector Load Success!';
            }
            $res['data'] = $expence_sector;
        }

        return $res;
    }

    public function showAllExpenceSectors()
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        if (!$user) {
            $res['message'] = "Unauthorized";
            return response($res, 401);
        } else {

            $expence_sectors = ExpenceSector::where('user_id', $user->id)->get();

            if (count($expence_sectors) <= 0) {
                $res['message'] = "No ExpenceSector Available!";
            } else {
                $res['message'] = 'ExpenceSectors Load Success!';
            }
            $res['status'] = true;
            $res['data'] = $expence_sectors;
        }

        return $res;
    }

    public function updateExpenceSector(Request $request,  $id)
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        if (!$user) {
            $res['message'] = "Unauthorized";
            return response($res, 401);
        } else {

            $validation = Validator::make($request->all(), [
                'name' => 'required|string|max:100|min:3'
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!'
            ], [
                'name' => 'Name'
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $expence_sector = ExpenceSector::where('user_id', $user->id)->where('id', $id)->first();

                if (!$expence_sector) {
                    $res['message'] = "ExpenceSector Not Found!";
                } else {
                    $expence_sector->name = $request->name;
                    $expence_sector->save();

                    $res['status'] = true;
                    $res['data'] = $expence_sector;
                    $res['message'] = 'ExpenceSector Update Success!';
                }
            }
        }

        return $res;
    }

    public function deleteExpenceSector($id)
    {
        $res = [
            'status' => false,
            'data' => null,
            'message' => ""
        ];

        $user = Auth::user();

        if (!$user) {
            $res['message'] = "Unauthorized";
            return response($res, 401);
        } else {

            $expence_sector = ExpenceSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$expence_sector) {
                $res['message'] = "ExpenceSector Not Found!";
            } else {
                $data = $expence_sector;
                $expence_sector->delete();

                $res['status'] = true;
                $res['data'] = $data;
                $res['message'] = 'ExpenceSector Delete Success!';
            }
            $res['data'] = $expence_sector;
        }

        return $res;
    }
}
