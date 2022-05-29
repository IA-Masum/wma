<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'loan_sector_id' => rand(1, 10),
            'source' => $this->faker->name(),
            'purpose' => $this->faker->words(5, true),
            'amount' => rand(2000, 4000),
            'target_paid_date' => Carbon::now()->addDays(180),
            'next_installment_date' => Carbon::now()->addDays(rand(25, 100))
        ];
    }
}
