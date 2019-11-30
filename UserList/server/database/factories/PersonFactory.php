<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Person;
use Faker\Generator as Faker;

$factory->define(Person::class, function (Faker $faker) {
    return [
        'name' => $faker->firstName,
        'surname' => $faker->lastName,
        'patronymic' => $faker->domainName,
        'phone' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'created_at' => now(),
    ];
});
