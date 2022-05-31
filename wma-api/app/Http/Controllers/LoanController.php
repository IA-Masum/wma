<?php

namespace App\Http\Controllers;

use App\Models\Installment;
use App\Models\Loan;
use App\Models\WalletStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoanController extends Controller
{
    public function loanHistory()
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

            $loans = $user->loans;

            if (count($loans) > 0) {
                $res['data'] = $loans;
                $res['message'] = "Loan History Load Success";
            } else {
                $res['message'] = 'No Loan History!';
                $res['data'] = [];
            }
        }

        return $res;
    }

    public function addLoan(Request $request)
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
                'loan_sector_id' => 'required|integer',
                'amount' => 'required|numeric',
                'source' => 'required|max:45|string',
                'purpose' => 'required|string'
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
                'numeric' => ':attribute Must Be Number!'
            ], [
                'person' => 'Person',
                'amount' => "Amount",
                'loan_sector_id' => "Loan Sector",
                'source' => "Source",
                'purpose' => 'Purpose'
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $request->merge(['user_id' => $user->id]);

                $wallet = $user->currentWallet;
                $loan = Loan::create($request->all());

                if ($loan) {
                    $wallet_created_date = $wallet->created_at->format("d-m-Y");
                    $today = Carbon::now()->format('d-m-Y');

                    if ($wallet_created_date !== $today) {
                        $wallet = WalletStatus::create([
                            'user_id' => $user->id,
                            'balance' => $wallet->balance + $loan->amount,
                            'lend' => $wallet->lend,
                            'savings' => $wallet->savings,
                            'loan' => $wallet->loan + $loan->amount
                        ]);
                    } else {
                        $wallet->loan = $wallet->loan + $loan->amount;
                        $wallet->balance = $wallet->balance + $loan->amount;
                        $wallet->save();
                    }

                    $res['status'] = true;
                    $res['data'] = [
                        'loan' => $loan,
                        'wallet' => $wallet
                    ];
                    $res['message'] = "Add Loan Success!";
                } else {
                    $res['message'] = "Add Loan Faild!";
                }
            }
        }

        return $res;
    }

    public function deleteLoan($id)
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
            $loan = Loan::where('user_id', $user->id)->where('id', $id)->first();

            if (!$loan) {
                $res['message'] = "Loan Not Found!";
            } else {
                $loan->delete();

                $wallet->loan = $wallet->loan - ($loan->amount - $loan->paid_amount);
                $wallet->balance = $wallet->balance - ($loan->amount - $loan->paid_amount);
                $wallet->save();

                $res['status'] = true;
                $res['data'] = [
                    'loan' => $loan,
                    'wallet' => $wallet
                ];
                $res['message'] = 'Loan Delete Success!';
            }
        }

        return $res;
    }

    public function deleteLoanHistory()
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

            $loans = $user->loans;

            if (count($loans) > 0) {
                foreach ($loans as $loan) {
                    if ($loan->status === "Paid") {
                        $loan->delete();
                    }
                }

                $res['status'] = true;
                $res['data'] = [];
                $res['message'] = "Loan History Delete Success";
            } else {
                $res['message'] = 'No Loan History!';
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
                'loan_id' => 'required|integer',
                'amount' => 'required|numeric',
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
            ], [
                'loan_id' => 'Loan',
                'amount' => "Amount",
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {

                $loan = Loan::find($request->loan_id);

                if ($loan) {
                    if ($loan->status === 'Paid') {
                        $res['message'] = "Loan Already Paid!";
                    } else {
                        $request->merge(['user_id' => $user->id, 'type' => "Loan", 'loan_id' => $loan->id]);
                        $installment = Installment::create($request->all());
                        if ($installment) {
                            $paid_amount = $loan->paid_amount + $installment->amount;
                            if ($loan->amount === $paid_amount) {
                                $loan->status = "Paid";
                            }

                            $loan->paid_amount = $paid_amount;
                            $loan->save();

                            $wallet = $user->currentWallet;

                            $wallet_created_date = $wallet->created_at->format("d-m-Y");
                            $today = Carbon::now()->format('d-m-Y');

                            if ($wallet_created_date !== $today) {
                                $wallet = WalletStatus::create([
                                    'user_id' => $user->id,
                                    'balance' => $wallet->balance - $installment->amount,
                                    'lend' => $wallet->lend,
                                    'savings' => $wallet->savings,
                                    'loan' => $wallet->loan - $loan->amount
                                ]);
                            } else {
                                $wallet->loan = $wallet->loan - $installment->amount;
                                $wallet->balance = $wallet->balance - $installment->amount;
                                $wallet->save();
                            }

                            $res['status'] = true;
                            $res['data'] = [
                                'loan' => $loan,
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
