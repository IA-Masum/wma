<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\WalletStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class IncomeController extends Controller
{

    public function incomeHistory()
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

            $incomes = $user->incomes;

            if (count($incomes) > 0) {
                $res['data'] = $incomes;
                $res['message'] = "Income History Load Success";
            } else {
                $res['message'] = 'No Income History!';
                $res['data'] = [];
            }

            
            
        }

        return $res;
    }

    public function addIncome(Request $request)
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
                'income_sector_id' => 'required',
                'source' => 'required',
            ], [
                'required' => ':attribute is Required!',
                'string' => ':attribute Must Be Text!',
                'numeric' => ':attribute Must Be Number!'
            ], [
                'name' => 'Name',
                'income_sector_id' => "Income Sector",
                'source' => "Source",
            ]);

            if ($validation->fails()) {
                $res['message'] = $validation->errors()->first();
            } else {
                $request->merge(['user_id' => $user->id]);

                $income = Income::create($request->all());
                if ($income) {

                    $wallet = $user->currentWallet;

                    $wallet_created_date = $wallet->created_at->format("d-m-Y");
                    $today = Carbon::now()->format('d-m-Y');

                    if ($wallet_created_date !== $today) {
                        $wallet = WalletStatus::create([
                            'user_id' => $user->id,
                            'balance' => $income->amount + $wallet->balance,
                            'loan' => $wallet->loan,
                            'savings' => $wallet->savings,
                            'lend' => $wallet->lend
                        ]);
                    } else {
                        $wallet->balance = $wallet->balance + $income->amount;
                        $wallet->save();
                    }

                    $res['status'] = true;
                    $res['data'] = [
                        'income' => $income,
                        'wallet' => $wallet
                    ];
                    $res['message'] = "Add Income Success!";
                } else {
                    $res['message'] = "Add Income Faild!";
                }
            }
        }

        return $res;
    }

    public function deleteIncome($id)
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
            $income = Income::where('user_id', $user->id)->where('id', $id)->first();

            if (!$income) {
                $res['message'] = "Income Not Found!";
            } else {
                $income->delete();

                $wallet->balance = $wallet->balance - $income->amount;
                $wallet->save();

                $res['status'] = true;
                $res['data'] = [
                    'income' => $income,
                    'wallet' => $wallet
                ];
                $res['message'] = 'Income Delete Success!';
            }
        }

        return $res;
    }

    public function deleteIncomeHistory()
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

            $incomes = $user->incomes;

            if (count($incomes) > 0) {
                foreach ($incomes as $income) {
                    $income->delete();
                }

                $res['status'] = true;
                $res['data'] = [];
                $res['message'] = "Income History Delete Success";
            } else {
                $res['message'] = 'No Income History!';
            }
        }

        return $res;
    }
}
