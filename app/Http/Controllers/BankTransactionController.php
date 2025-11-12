<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;  
use Illuminate\Support\Facades\Log;  
use App\Models\BankAccount;        
use App\Models\Transaction;         
use Exception;                     

class BankTransactionController extends Controller
{
    /**
     
     */
    public function createTransfer(Request $request)
    {
       
        $validated = $request->validate([
            'source_account_number' => 'required|string|exists:bank_accounts,account_number',
            'target_account_number' => [
                'required',
                'string',
                'exists:bank_accounts,account_number',
                'different:source_account_number' 
            ],
            'amount' => 'required|numeric|min:0.01', 
        ]);

        $amount = $validated['amount'];
        $sourceAccountNumber = $validated['source_account_number'];
        $targetAccountNumber = $validated['target_account_number'];

        $userId = Auth::id();
        try {
            $result = DB::transaction(function () use ($sourceAccountNumber, $targetAccountNumber, $amount, $userId) {
                $accounts = BankAccount::whereIn('account_number', [
                        $sourceAccountNumber,
                        $targetAccountNumber
                    ])
                    ->orderBy('account_number', 'asc') 
                    ->lockForUpdate() 
                    ->get();
                $sourceAccount = $accounts->firstWhere('account_number', $sourceAccountNumber);
                $targetAccount = $accounts->firstWhere('account_number', $targetAccountNumber);
                if (!$sourceAccount || !$targetAccount) {
                    throw new Exception('Tài khoản nguồn hoặc đích không còn tồn tại.', 404);
                }
                if ($sourceAccount->user_id !== $userId) {
                    throw new Exception('Bạn không có quyền thực hiện giao dịch từ tài khoản này.', 403);
                }
                if ($sourceAccount->account_balance < $amount) {
                    throw new Exception('Số dư trong tài khoản nguồn không đủ.', 422);
                }

                $sourceAccount->decrement('account_balance', $amount);
                $targetAccount->increment('account_balance', $amount); 

                Transaction::create([
                    'source_account_number' => $sourceAccountNumber,
                    'target_account_number' => $targetAccountNumber,
                    'transaction_amount'    => $amount,
                    'timestamp'             => now(),
                ]);

                return true;

            }); 

            return response()->json(['message' => 'Chuyển tiền thành công!'], 200);

        } catch (Exception $e) {
            $statusCode = $e->getCode();
            
            if (!in_array($statusCode, [403, 404, 422])) {
                 Log::error('Lỗi chuyển tiền: ' . $e->getMessage()); 
                 
                 $statusCode = 500; 
                 $message = 'Đã có lỗi hệ thống xảy ra.';
            } else {
                 $message = $e->getMessage();
            }

            return response()->json(['message' => $message], $statusCode);
        }
    }
}