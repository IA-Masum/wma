<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\Lend;
use App\Models\WalletStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LendController extends Controller
{
    public function lendHistory()
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

            $lends = $user->lends;

            if (count($lends) > 0) {
                $res['data'] = $lends;
                $res['message'] = "Lend History Load Success";
            } else {
                $res['message'] = 'No Lend History!';
                $res['data'] = [];
            }
        }

        return $res;
    }

    public function addLend(Request $request)
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
                'person' => 'required|string|max:45',
                'amount' => 'required|numeric',
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
                'numeric' => ':attribute Must Be Number!'
            ], [
                'person' => 'Person',
                'amount' => "Amount",
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $request->merge(['user_id' => $user->id]);

                $wallet = $user->currentWallet;

                if ($wallet->balance < $request->amount) {
                    $res['message'] = "Your Balance Is Less Then Lend Amount!";
                } else {
                    $lend = Lend::create($request->all());
                    if ($lend) {
                        $wallet_created_date = $wallet->created_at->format("d-m-Y");
                        $today = Carbon::now()->format('d-m-Y');

                        if ($wallet_created_date !== $today) {
                            $wallet = WalletStatus::create([
                                'user_id' => $user->id,
                                'balance' => $wallet->balance - $lend->amount,
                                'loan' => $wallet->loan,
                                'savings' => $wallet->savings,
                                'lend' => $wallet->lend + $lend->amount
                            ]);
                        } else {
                            $wallet->lend = $wallet->lend + $lend->amount;
                            $wallet->balance = $wallet->balance - $lend->amount;
                            $wallet->save();
                        }

                        $res['status'] = true;
                        $res['data'] = [
                            'lend' => $lend,
                            'wallet' => $wallet
                        ];
                        $res['message'] = "Add Lend Success!";
                    } else {
                        $res['message'] = "Add Lend Faild!";
                    }
                }
            }
        }

        return $res;
    }

    public function deleteLend($id)
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
            $lend = Lend::where('user_id', $user->id)->where('id', $id)->first();

            if (!$lend) {
                $res['message'] = "Lend Not Found!";
            } else {
                $lend->delete();

                $wallet->lend = $wallet->lend - ($lend->amount - $lend->paid_amount);
                $wallet->balance = $wallet->balance + ($lend->amount - $lend->paid_amount);
                $wallet->save();

                $res['status'] = true;
                $res['data'] = [
                    'lend' => $lend,
                    'wallet' => $wallet
                ];
                $res['message'] = 'Lend Delete Success!';
            }
        }

        return $res;
    }

    public function deleteLendHistory()
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

            $lends = $user->lends;

            if (count($lends) > 0) {
                foreach ($lends as $lend) {
                    if ($lend->status === "Paid") {
                        $lend->delete();
                    }
                }

                $res['status'] = true;
                $res['data'] = [];
                $res['message'] = "Lend History Delete Success";
            } else {
                $res['message'] = 'No Lend History!';
            }
        }

        return $res;
    }


    public function giveInstallment(Request $request)
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
                'lend_id' => 'required|integer',
                'amount' => 'required|numeric',
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
                'numeric' => ':attribute Must Be Number!'
            ], [
                'lend_id' => 'Lend',
                'amount' => "Amount",
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {

                $lend = Lend::find($request->lend_id);

                if ($lend) {
                    if ($lend->status === 'Paid') {
                        $res['message'] = "Lend Already Paid!";
                    } else {
                        $request->merge(['user_id' => $user->id, 'type' => "Lend"]);
                        $installment = Installment::create($request->all());
                        if ($installment) {
                            $paid_amount = $lend->paid_amount + $installment->amount;
                            if ($lend->amount === $paid_amount) {
                                $lend->status = "Paid";
                            }

                            $lend->paid_amount = $paid_amount;
                            $lend->save();

                            $wallet = $user->currentWallet;

                            $wallet_created_date = $wallet->created_at->format("d-m-Y");
                            $today = Carbon::now()->format('d-m-Y');

                            if ($wallet_created_date !== $today) {
                                $wallet = WalletStatus::create([
                                    'user_id' => $user->id,
                                    'balance' => $wallet->balance + $installment->amount,
                                    'loan' => $wallet->loan,
                                    'savings' => $wallet->savings,
                                    'lend' => $wallet->lend + $lend->amount
                                ]);
                            } else {
                                $wallet->lend = $wallet->lend - $installment->amount;
                                $wallet->balance = $wallet->balance + $installment->amount;
                                $wallet->save();
                            }

                            $res['status'] = true;
                            $res['data'] = [
                                'lend' => $lend,
                                'installment' => $installment,
                                'wallet' => $wallet
                            ];
                            $res['message'] = "Installment Success!";
                        } else {
                            $installment->delete();
                            $res['message'] = "Installment Faild!";
                        }
                    }
                } else {
                    $res['message'] = "Installment Faild!";
                }
            }
        }

        return $res;
    }
}
