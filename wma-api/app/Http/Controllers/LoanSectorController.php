<?php

namespace App\Http\Controllers;
use App\Models\LoanSector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoanSectorController extends Controller
{
    public function addLoanSector(Request $request)
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

                $loan_sector = LoanSector::create($request->all());
                if ($loan_sector) {
                    $res['status'] = true;
                    $res['data'] = $loan_sector;
                    $res['message'] = "Add LoanSector Success!";
                } else {
                    $res['message'] = "Add LoanSector Faild!";
                }
            }
        }

        return $res;
    }

    public function showSingleLoanSector($id)
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

            $loan_sector = LoanSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$loan_sector) {
                $res['message'] = "LoanSector Not Found!";
            } else {
                $res['status'] = true;
                $res['message'] = 'LoanSector Load Success!';
            }
            $res['data'] = $loan_sector;
        }

        return $res;
    }

    public function showAllLoanSectors()
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

            $loan_sectors = LoanSector::where('user_id', $user->id)->get();

            if (count($loan_sectors) <= 0) {
                $res['message'] = "No LoanSector Available!";
            } else {
                $res['message'] = 'LoanSectors Load Success!';
            }
            $res['status'] = true;
            $res['data'] = $loan_sectors;
        }

        return $res;
    }

    public function updateLoanSector(Request $request,  $id)
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
                $loan_sector = LoanSector::where('user_id', $user->id)->where('id', $id)->first();

                if (!$loan_sector) {
                    $res['message'] = "LoanSector Not Found!";
                } else {
                    $loan_sector->name = $request->name;
                    $loan_sector->save();

                    $res['status'] = true;
                    $res['data'] = $loan_sector;
                    $res['message'] = 'LoanSector Update Success!';
                }
            }
        }

        return $res;
    }

    public function deleteLoanSector($id)
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

            $loan_sector = LoanSector::where('user_id', $user->id)->where('id', $id)->first();

            if (!$loan_sector) {
                $res['message'] = "LoanSector Not Found!";
            } else {
                $data = $loan_sector;
                $loan_sector->delete();

                $res['status'] = true;
                $res['data'] = $data;
                $res['message'] = 'LoanSector Delete Success!';
            }
            $res['data'] = $loan_sector;
        }

        return $res;
    }
}
