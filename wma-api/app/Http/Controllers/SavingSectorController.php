<?php

namespace App\Http\Controllers;

use App\Models\SavingSector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SavingSectorController extends Controller
{
    public function addSavingSector(Request $request)
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

                $saving_sector = SavingSector::create($request->all());
                if ($saving_sector) {
                    $res['status'] = true;
                    $res['data'] = $saving_sector;
                    $res['message'] = "Add SavingSector Success!";
                } else {
                    $res['message'] = "Add SavingSector Faild!";
                }
            }
        }

        return $res;
    }

    public function showSingleSavingSector($id)
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

            $saving_sector = SavingSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$saving_sector) {
                $res['message'] = "SavingSector Not Found!";
            } else {
                $res['status'] = true;
                $res['message'] = 'SavingSector Load Success!';
            }
            $res['data'] = $saving_sector;
        }

        return $res;
    }

    public function showAllSavingSectors()
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

            $saving_sectors = SavingSector::where('user_id', $user->id)->get();

            if (count($saving_sectors) <= 0) {
                $res['message'] = "No SavingSector Available!";
            } else {
                $res['message'] = 'SavingSectors Load Success!';
            }
            $res['status'] = true;
            $res['data'] = $saving_sectors;
        }

        return $res;
    }

    public function updateSavingSector(Request $request,  $id)
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
                $saving_sector = SavingSector::where('user_id', $user->id)->where('id', $id)->first();

                if (!$saving_sector) {
                    $res['message'] = "SavingSector Not Found!";
                } else {
                    $saving_sector->name = $request->name;
                    $saving_sector->save();

                    $res['status'] = true;
                    $res['data'] = $saving_sector;
                    $res['message'] = 'SavingSector Update Success!';
                }
            }
        }

        return $res;
    }

    public function deleteSavingSector($id)
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

            $saving_sector = SavingSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$saving_sector) {
                $res['message'] = "SavingSector Not Found!";
            } else {
                $data = $saving_sector;
                $saving_sector->delete();

                $res['status'] = true;
                $res['data'] = $data;
                $res['message'] = 'SavingSector Delete Success!';
            }
            $res['data'] = $saving_sector;
        }

        return $res;
    }
}
