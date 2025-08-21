<?php


use App\Http\Controllers\RawMaterialSupplyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BakeryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\ProductionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PastryCategoryController;
use App\Http\Controllers\PastryController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\RawMaterialController;
use App\Http\Controllers\MaterialTypeController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\NotificationControlleproductr;
use App\Http\Controllers\EmployeeExpenseController;
use App\Http\Controllers\EmployeeAllowanceController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');



    // Resource routes
    Route::resource('permissions', PermissionController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
    Route::resource('bakeries', BakeryController::class);
    Route::resource('employees', EmployeeController::class);
    Route::resource('contracts', ContractController::class);
    Route::resource('productions', ProductionController::class);
    Route::resource('products', ProductController::class);
    Route::resource('pastry-categories', PastryCategoryController::class);
    Route::resource('pastries', PastryController::class);
    Route::resource('inventory', InventoryController::class);
    Route::resource('rawMaterials', RawMaterialController::class);
    Route::resource('material-types', MaterialTypeController::class);
    Route::resource('suppliers', SupplierController::class);
    Route::resource('purchases', PurchaseController::class);
    Route::resource('orders', OrderController::class);
    Route::resource('carts', CartController::class);
    Route::resource('sales', SaleController::class);
    Route::resource('payroll', PayrollController::class);
    Route::resource('attendance', AttendanceController::class);
    Route::resource('notifications', NotificationController::class);

    Route::resource('daily-expenses', EmployeeExpenseController::class);

    Route::resource('employee-allowances', EmployeeAllowanceController::class);


});

Route::middleware('auth')->group(function () {
    // Show the supply form/page (GET)
    Route::get('/rawMaterialstransaction', [RawMaterialSupplyController::class, 'index'])->name('rawMaterials.index');

    Route::get('/rawMaterialsSup/supply', [RawMaterialSupplyController::class, 'showSupplyForm'])->name('rawMaterialsSup.supply.show');
    // Handle supply form submission (POST)
    Route::post('/rawMaterialsSup/supply', [RawMaterialSupplyController::class, 'Supply'])->name('rawMaterialsSup.supply');

    // Show the usage form/page (GET)
    Route::get('/rawMaterialsSup/usage', [RawMaterialSupplyController::class, 'showUsageForm'])->name('rawMaterialsSup.usage.show');
    // Handle usage form submission (POST)
    Route::post('/rawMaterialsSup/usage', [RawMaterialSupplyController::class, 'Usage'])->name('rawMaterialsSup.usage');
});
Route::middleware(['auth', 'role:Manager'])->group(function () {
    Route::post('/raw-material-transactions/{id}/approve', [RawMaterialSupplyController::class, 'approve'])->name('rawMaterials.approve');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
