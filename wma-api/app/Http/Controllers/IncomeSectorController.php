<?php

namespace App\Http\Controllers;

use App\Models\IncomeSector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class IncomeSectorController extends Controller
{
    public function addIncomeSector(Request $request)
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

                $income_sector = IncomeSector::create($request->all());
                if ($income_sector) {
                    $res['status'] = true;
                    $res['data'] = $income_sector;
                    $res['message'] = "Add IncomeSector Success!";
                } else {
                    $res['message'] = "Add IncomeSector Faild!";
                }
            }
        }

        return $res;
    }

    public function showSingleIncomeSector($id)
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

            $income_sector = IncomeSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$income_sector) {
                $res['message'] = "IncomeSector Not Found!";
            } else {
                $res['status'] = true;
                $res['message'] = 'IncomeSector Load Success!';
            }
            $res['data'] = $income_sector;
        }

        return $res;
    }

    public function showAllIncomeSectors()
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

            $income_sectors = IncomeSector::where('user_id', $user->id)->get();

            if (count($income_sectors) <= 0) {
                $res['message'] = "No IncomeSector Available!";
            } else {
                $res['message'] = 'IncomeSectors Load Success!';
            }
            $res['status'] = true;
            $res['data'] = $income_sectors;
        }

        return $res;
    }

    public function updateIncomeSector(Request $request,  $id)
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
                $income_sector = IncomeSector::where('user_id', $user->id)->where('id', $id)->first();

                if (!$income_sector) {
                    $res['message'] = "IncomeSector Not Found!";
                } else {
                    $income_sector->name = $request->name;
                    $income_sector->save();

                    $res['status'] = true;
                    $res['data'] = $income_sector;
                    $res['message'] = 'IncomeSector Update Success!';
                }
            }
        }

        return $res;
    }

    public function deleteIncomeSector($id)
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

            $income_sector = IncomeSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$income_sector) {
                $res['message'] = "IncomeSector Not Found!";
            } else {
                $data = $income_sector;
                $income_sector->delete();

                $res['status'] = true;
                $res['data'] = $data;
                $res['message'] = 'IncomeSector Delete Success!';
            }
            $res['data'] = $income_sector;
        }

        return $res;
    }
}
