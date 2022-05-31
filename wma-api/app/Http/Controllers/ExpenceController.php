<?php

namespace App\Http\Controllers;

use App\Models\Expence;
use App\Models\WalletStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExpenceController extends Controller
{
    public function expenceHistory()
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
            $res['status'] = true;

            $expences = $user->expences;

            if (count($expences) > 0) {
                $res['data'] = $expences;
                $res['message'] = "Expence History Load Success";
            } else {
                $res['message'] = 'No Expence History!';
                $res['data'] = [];
            }

            
            
        }

        return $res;
    }

    public function addExpence(Request $request)
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
                'amount' => 'required|numeric',
                'expence_sector_id' => 'required',
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
                'numeric' => ':attribute Must Be Number!'
            ], [
                'name' => 'Name',
                'expence_sector_id' => "Expence Sector",
                'amount' => 'Amount'
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $request->merge(['user_id' => $user->id]);

                $expence = Expence::create($request->all());
                if ($expence) {

                    $wallet = $user->currentWallet;

                    $wallet_created_date = $wallet->created_at->format("d-m-Y");
                    $today = Carbon::now()->format('d-m-Y');

                    if ($wallet_created_date !== $today) {
                        $wallet = WalletStatus::create([
                            'user_id' => $user->id,
                            'balance' =>$wallet->balance -  $expence->amount,
                            'loan' => $wallet->loan,
                            'savings' => $wallet->savings,
                            'lend' => $wallet->lend
                        ]);
                    } else {
                        $wallet->balance = $wallet->balance - $expence->amount;
                        $wallet->save();
                    }

                    $res['status'] = true;
                    $res['data'] = [
                        'expence' => $expence,
                        'wallet' => $wallet
                    ];
                    $res['message'] = "Add Expence Success!";
                } else {
                    $res['message'] = "Add Expence Faild!";
                }
            }
        }

        return $res;
    }

    public function deleteExpence($id)
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

            $wallet = $user->currentWallet;
            $expence = Expence::where('user_id', $user->id)->where('id', $id)->first();

            if (!$expence) {
                $res['message'] = "Expence Not Found!";
            } else {
                $expence->delete();

                $wallet->balance = $wallet->balance + $expence->amount;
                $wallet->save();

                $res['status'] = true;
                $res['data'] = [
                    'expence' => $expence,
                    'wallet' => $wallet
                ];
                $res['message'] = 'Expence Delete Success!';
            }
        }

        return $res;
    }

    public function deleteExpenceHistory()
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

            $expences = $user->expences;

            if (count($expences) > 0) {
                foreach ($expences as $expence) {
                    $expence->delete();
                }

                $res['status'] = true;
                $res['data'] = [];
                $res['message'] = "Expence History Delete Success";
            } else {
                $res['message'] = 'No Expence History!';
            }
        }

        return $res;
    }
}
