import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// User model
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: string[]; // if using spatie/laravel-permission
    permissions?: string[];
    [key: string]: unknown;
}

// Auth wrapper
export interface Auth {
    user: User;
}

// Shared page props from Laravel (use Inertia::share)
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

// Generic page props interface used with Inertia
export interface PageProps extends SharedData {
    // You can add any additional common props here
}

// Navigation interfaces
export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

// Breadcrumb
export interface BreadcrumbItem {
    title: string;
    href: string;
}

// Permission model
export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at?: string;
    updated_at?: string;
}
