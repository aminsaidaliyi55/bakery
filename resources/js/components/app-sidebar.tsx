import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Bell } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  BookOpen,
  Folder,
  LayoutGrid,
  User,
  Shield,
  Key,
  Users,
  Package,
  Box,
  ShoppingCart,
  ClipboardList,
  Truck,
  DollarSign,
  Archive,
} from 'lucide-react';
import AppLogo from './app-logo';
const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Permissions',
    href: '/permissions',
    icon: Key,
  },
  {
    title: 'Roles',
    href: '/roles',
    icon: Shield,
  },
  {
    title: 'Users',
    href: '/users',
    icon: User,
  },

  // 🍞 Bakery Management
  {
    title: 'Bakery Info',
    href: '/bakeries',
    icon: Folder,
  },
  {
    title: 'Employees',
    href: '/employees',
    icon: Users,
  },
  {
    title: 'Contracts',
    href: '/contracts',
    icon: ClipboardList,
  },

  // 🏭 Production Logic
  {
    title: 'Production',
    href: '/production',
    icon: Box,
  },
  {
    title: 'Pastry Categories',
    href: '/pastry-categories',
    icon: LayoutGrid,
  },
  {
    title: 'Pastries',
    href: '/pastries',
    icon: Box,
  },

  // 📦 Stock & Inventory
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Archive,
  },
  {
    title: 'Raw Materials',
    href: '/rawMaterials',
    icon: Package,
  },
  {
    title: 'Material Types',
    href: '/material-types',
    icon: Folder,
  },
    {
        title: 'Supply',
        href: '/rawMaterialsSup/supply',
        icon: Truck, // or any icon you want, e.g., Box, Package, etc.
    },

    {
        title: 'Usage',
        href: '/rawMaterialsSup/usage',
        icon: Truck, // or any icon you want, e.g., Box, Package, etc.
    },
  // 🤝 Suppliers & Purchases
  {
    title: 'Suppliers',
    href: '/suppliers',
    icon: Truck,
  },
  {
    title: 'Purchases',
    href: '/purchases',
    icon: ShoppingCart,
  },

  // 🧾 Orders & Sales
  {
    title: 'Orders',
    href: '/orders',
    icon: ClipboardList,
  },
  {
    title: 'Carts',
    href: '/add-to-carts',
    icon: ShoppingCart,
  },
  {
    title: 'Sales',
    href: '/sales',
    icon: DollarSign,
  },

  // 📊 Payroll
  {
    title: 'Payroll',
    href: '/payroll',
    icon: DollarSign,
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: User,
  },

  // 🔔 Notifications
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },

  // 🎯 Settings
  {
    title: 'Settings',
    href: '/settings',
    icon: Shield,
  },

  // 📡 External Meeting
  {
    title: 'Meeting',
    href: 'https://meet.google.com/',
    icon: BookOpen,
  },
];



const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
