<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BankTransactionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes (ĐĂNG KÝ)
|--------------------------------------------------------------------------
*/

// === 1. API ĐĂNG KÝ (KHÔNG CẦN AUTH) ===
// (Route API Register để test bằng Postman)
Route::post('/register', [RegisteredUserController::class, 'store']);

// === 2. API ĐĂNG NHẬP (KHÔNG CẦN AUTH) ===
// (Route API Login để lấy Token)
Route::post('/login', function (Request $request) {
    $creds = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($creds)) {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->tokens()->delete();
        $token = $user->createToken('postman-test')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    return response()->json(['message' => 'Sai thông tin.'], 401);
});


// =================================================================
// === 3. NHÓM API ĐÃ ĐĂNG NHẬP (CẤP 1 - Dành cho TẤT CẢ USER) ===
// =================================================================
Route::middleware('auth:sanctum')->group(function () {
    
    // 3.1. Route /user (Chỉ cần 1 lần)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // 3.2. Route Giao dịch Ngân hàng (Dành cho cả normal và merchant)
    Route::post('/bank/transfer', [BankTransactionController::class, 'createTransfer']);

});


// ===================================================================
// === 4. NHÓM API PHÂN QUYỀN (CẤP 2 - CHỈ DÀNH CHO MERCHANT) ===
// ===================================================================
Route::middleware(['auth:sanctum', 'can:is-merchant'])->group(function () {
    
    // 4.1. Route test /merchant
    Route::get('/merchant', function () {
        return response()->json(['message' => 'Merchant']);
    });

    // (Các API CHỈ Merchant khác có thể thêm vào đây)
});