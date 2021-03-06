<?php

namespace Database\Seeders;

use App\Models\Income;
use App\Models\IncomeSector;
use App\Models\Loan;
use App\Models\LoanSector;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        IncomeSector::factory(10)->create();
        Income::factory(200)->create();
        LoanSector::factory(10)->create();
        Loan::factory(25)->create();
    }
}
