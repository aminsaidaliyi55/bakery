<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    public function run()
    {
        // Get all permissions
        $allPermissions = Permission::all();

        // Create Super Admin role and assign all permissions
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $superAdmin->syncPermissions($allPermissions);

        // Create Admin role - has almost all permissions except maybe payroll.delete and some others
        $adminPermissions = $allPermissions->filter(function ($permission) {
            return !in_array($permission->name, [
                'payroll.delete', // example of excluding some sensitive permission
                'roles.delete',
            ]);
        });
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $admin->syncPermissions($adminPermissions);

        // Owner role - slightly fewer permissions than Admin
        $ownerPermissions = $adminPermissions->filter(function ($permission) {
            return !in_array($permission->name, [
                'users.delete',
                'roles.edit',
                'roles.create',
                'roles.view',
                'permissions.delete',
                'permissions.edit',
            ]);
        });
        $owner = Role::firstOrCreate(['name' => 'Owner']);
        $owner->syncPermissions($ownerPermissions);

        // Manager role - limited permissions, mostly managing products, orders, employees
        $managerPermissions = $allPermissions->filter(function ($permission) {
            return in_array($permission->name, [
                'products.create',
                'products.view',
                'products.edit',
                'products.delete',

                'orders.create',
                'orders.view',
                'orders.edit',
                'orders.delete',

                'employees.create',
                'employees.view',
                'employees.edit',
                'employees.delete',

                'contracts.view',
                'contracts.edit',

                'pastries.view',
                'pastries.edit',
                'pastries.create',

                'pastry_categories.view',
                'pastry_categories.edit',

                'stock.view',
                'stock.edit',

                'sales.view',
                'sales.create',
                'sales.edit',
                'sales.delete',

                'reports.view',
                'dashboard.view',
            ]);
        });
        $manager = Role::firstOrCreate(['name' => 'Manager']);
        $manager->syncPermissions($managerPermissions);

        // Storekeeper - manage stock only
        $storekeeperPermissions = $allPermissions->filter(function ($permission) {
            return str_starts_with($permission->name, 'stock.');
        });
        $storekeeper = Role::firstOrCreate(['name' => 'Storekeeper']);
        $storekeeper->syncPermissions($storekeeperPermissions);

        // Doughmixer - limited pastry-related view and edit (maybe only view)
        $doughmixerPermissions = $allPermissions->filter(function ($permission) {
            return in_array($permission->name, [
                'pastries.view',
                'pastries.edit',
                'pastry_categories.view',
            ]);
        });
        $doughmixer = Role::firstOrCreate(['name' => 'Doughmixer']);
        $doughmixer->syncPermissions($doughmixerPermissions);

        // Baker - pastry view and sales create/view maybe
        $bakerPermissions = $allPermissions->filter(function ($permission) {
            return in_array($permission->name, [
                'pastries.view',
                'sales.create',
                'sales.view',
            ]);
        });
        $baker = Role::firstOrCreate(['name' => 'Baker']);
        $baker->syncPermissions($bakerPermissions);

        // Helper - view limited (pastries, stock)
        $helperPermissions = $allPermissions->filter(function ($permission) {
            return in_array($permission->name, [
                'pastries.view',
                'stock.view',
            ]);
        });
        $helper = Role::firstOrCreate(['name' => 'Helper']);
        $helper->syncPermissions($helperPermissions);

        // Cleaner - no permissions or minimal (notifications maybe)
        $cleanerPermissions = $allPermissions->filter(function ($permission) {
            return in_array($permission->name, [
                'notifications.view',
            ]);
        });
        $cleaner = Role::firstOrCreate(['name' => 'Cleaner']);
        $cleaner->syncPermissions($cleanerPermissions);

        // Gatekeeper - minimal, maybe dashboard view and notifications
        $gatekeeperPermissions = $allPermissions->filter(function ($permission) {
            return in_array($permission->name, [
                'dashboard.view',
                'notifications.view',

        });
        $gatekeeper = Role::firstOrCreate(['name' => 'Gatekeeper']);
        $gatekeeper->syncPermissions($gatekeeperPermissions);
    }
}
