<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with = ['currentWallet'];

    public function currentWallet (){
        return $this->hasOne(WalletStatus::class)->latestOfMany();
    }

    public function walletHistory()
    {
        return $this->hasMany(WalletStatus::class);
    }

    public function incomes()
    {
        return $this->hasMany(Income::class);
    }

    public function expences()
    {
        return $this->hasMany(Expence::class);
    }

    public function lends()
    {
        return $this->hasMany(Lend::class);
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function savings()
    {
        return $this->hasMany(Saving::class);
    }


    public function installments(){
        return $this->hasMany(Installment::class);
    }

    public function withdraws()
    {
        return $this->hasMany(Withdraw::class);
    }

}
