<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            'users.create',
            'users.view',
            'users.edit',
            'users.delete',

            'roles.create',
            'roles.view',
            'roles.edit',
            'roles.delete',

            'permissions.create',
            'permissions.view',
            'permissions.edit',
            'permissions.delete',

            'products.create',
            'products.view',
            'products.edit',
            'products.delete',

            'orders.create',
            'orders.view',
            'orders.edit',
            'orders.delete',

            'customers.create',
            'customers.view',
            'customers.edit',
            'customers.delete',

            'reports.view',
            'dashboard.view',
            'settings.edit',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }
    }
}
