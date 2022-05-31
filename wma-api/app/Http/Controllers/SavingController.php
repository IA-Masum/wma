<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\Saving;
use App\Models\WalletStatus;
use App\Models\Withdraw;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SavingController extends Controller
{
    public function savingHistory()
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

            $savings = $user->savings;

            if (count($savings) > 0) {
                $res['data'] = $savings;
                $res['message'] = "Saving History Load Success";
            } else {
                $res['message'] = 'No Saving History!';
                $res['data'] = [];
            }
        }

        return $res;
    }

    public function addSaving(Request $request)
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
                'saving_sector_id' => 'required|integer',
                'amount' => 'required|numeric',
                'authority' => 'required|max:45|string',
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
                'numeric' => ':attribute Must Be Number!'
            ], [
                'person' => 'Person',
                'amount' => "Amount",
                'saving_sector_id' => "Saving Sector",
                'authority' => "Authority",
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $request->merge(['user_id' => $user->id]);

                $wallet = $user->currentWallet;

                if ($wallet->balance < $request->amount) {
                    $res['message'] = "Your Balance Is Less Then Saving Amount!";
                } else {

                    $saving = Saving::create($request->all());

                    if ($saving) {
                        $wallet_created_date = $wallet->created_at->format("d-m-Y");
                        $today = Carbon::now()->format('d-m-Y');

                        if ($wallet_created_date !== $today) {
                            $wallet = WalletStatus::create([
                                'user_id' => $user->id,
                                'balance' => $wallet->balance - $saving->amount,
                                'lend' => $wallet->lend,
                                'loan' => $wallet->loan,
                                'savings' => $wallet->saving + $saving->amount
                            ]);
                        } else {
                            $wallet->savings = $wallet->savings + $saving->amount;
                            $wallet->balance = $wallet->balance - $saving->amount;
                            $wallet->save();
                        }

                        $res['status'] = true;
                        $res['data'] = [
                            'saving' => $saving,
                            'wallet' => $wallet
                        ];
                        $res['message'] = "Add Saving Success!";
                    } else {
                        $res['message'] = "Add Saving Faild!";
                    }
                }
            }
        }

        return $res;
    }

    public function deleteSaving($id)
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
            $saving = Saving::where('user_id', $user->id)->where('id', $id)->first();

            if (!$saving) {
                $res['message'] = "Saving Not Found!";
            } else {
                $saving->delete();

                $wallet->savings = $wallet->savings - $saving->amount;
                $wallet->balance = $wallet->balance + $saving->amount;
                $wallet->save();

                $res['status'] = true;
                $res['data'] = [
                    'saving' => $saving,
                    'wallet' => $wallet
                ];
                $res['message'] = 'Saving Delete Success!';
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
                'saving_id' => 'required|integer',
                'amount' => 'required|numeric',
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
            ], [
                'saving_id' => 'Saving',
                'amount' => "Amount",
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {

                $saving = Saving::find($request->saving_id);

                if ($saving) {

                    $request->merge(['user_id' => $user->id, 'type' => "Saving"]);
                    $installment = Installment::create($request->all());
                    if ($installment) {
                        $amount = $saving->amount + $installment->amount;

                        $saving->amount = $amount;
                        $saving->save();

                        $wallet = $user->currentWallet;

                        $wallet_created_date = $wallet->created_at->format("d-m-Y");
                        $today = Carbon::now()->format('d-m-Y');

                        if ($wallet_created_date !== $today) {
                            $wallet = WalletStatus::create([
                                'user_id' => $user->id,
                                'balance' => $wallet->balance - $installment->amount,
                                'lend' => $wallet->lend,
                                'loan' => $wallet->loan,
                                'savings' => $wallet->savings + $installment->amount
                            ]);
                        } else {
                            $wallet->savings = $wallet->savings + $installment->amount;
                            $wallet->balance = $wallet->balance - $installment->amount;
                            $wallet->save();
                        }

                        $res['status'] = true;
                        $res['data'] = [
                            'saving' => $saving,
                            'installment' => $installment,
                            'wallet' => $wallet
                        ];
                        $res['message'] = "Installment Success!";
                    } else {
                        $installment->delete();
                        $res['message'] = "Installment Faild!";
                    }
                } else {
                    $res['message'] = "Installment Faild!";
                }
            }
        }

        return $res;
    }

    public function withDraw(Request $request)
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
                'saving_id' => 'required|integer',
                'amount' => 'required|numeric',
                'purpose' => 'required|string|max:100'
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
            ], [
                'saving_id' => 'Saving',
                'amount' => "Amount",
                'purpose' => 'Purpose'
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {

                $saving = Saving::find($request->saving_id);

                if ($saving) {

                    if ($saving->amount < $request->amount) {
                        $res['message'] = "Your Savings Amount is less than Withdraw Amount!";
                    } else {


                        $request->merge(['user_id' => $user->id]);

                        $withdraw = Withdraw::create($request->all());
                        if ($withdraw) {
                            $amount = $saving->amount - $withdraw->amount;

                            $saving->amount = $amount;
                            $saving->save();

                            $wallet = $user->currentWallet;

                            $wallet_created_date = $wallet->created_at->format("d-m-Y");
                            $today = Carbon::now()->format('d-m-Y');

                            if ($wallet_created_date !== $today) {
                                $wallet = WalletStatus::create([
                                    'user_id' => $user->id,
                                    'balance' => $wallet->balance + $withdraw->amount,
                                    'lend' => $wallet->lend,
                                    'loan' => $wallet->loan,
                                    'savings' => $wallet->savings - $withdraw->amount
                                ]);
                            } else {
                                $wallet->savings = $wallet->savings - $withdraw->amount;
                                $wallet->balance = $wallet->balance + $withdraw->amount;
                                $wallet->save();
                            }

                            $res['status'] = true;
                            $res['data'] = [
                                'saving' => $saving,
                                'withdraw' => $withdraw,
                                'wallet' => $wallet
                            ];
                            $res['message'] = "Withdraw Success!";
                        } else {
                            $withdraw->delete();
                            $res['message'] = "Withdraw Faild!";
                        }
                    }
                } else {
                    $res['message'] = "Withdraw Faild!";
                }
            }
        }

        return $res;
    }
}
