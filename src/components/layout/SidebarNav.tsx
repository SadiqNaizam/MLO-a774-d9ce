import React from 'react';
import Link from 'next/link'; // Assuming Next.js for Link, adjust if using react-router-dom
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserSquare,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Layers // Icon for logo
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

interface SidebarNavProps {
  isCollapsed: boolean;
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ isCollapsed, className }) => {
  // In a real app, active state would come from router
  const primaryNavItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid, active: true },
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/customers', label: 'Customers', icon: UserSquare },
    { href: '/proposals', label: 'Proposals', icon: FileText },
    { href: '/invoices', label: 'Invoices', icon: Receipt },
    { href: '/items', label: 'Items', icon: ShoppingCart },
    { href: '/mail', label: 'Mail', icon: Mail },
    { href: '/shoebox', label: 'Shoebox', icon: Archive },
    { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  ];

  const secondaryNavItems: NavItem[] = [
    { href: '/help', label: 'Help', icon: HelpCircle },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={cn(
      'bg-sidebar text-sidebar-foreground flex flex-col',
      isCollapsed ? 'w-20 items-center' : 'w-64',
      className
    )}>
      <div className={cn(
        'h-[70px] flex items-center border-b border-sidebar-foreground/10',
        isCollapsed ? 'justify-center px-2' : 'px-6'
      )}>
        <Link href="/" className="flex items-center gap-2 text-sidebar-foreground">
          <Layers className="h-7 w-7 text-primary-foreground" />
          {!isCollapsed && <span className="text-xl font-bold">LeadGen</span>}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 py-4 px-2">
        {primaryNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center rounded-md text-sm font-medium transition-colors duration-150',
              'hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground',
              item.active ? 'bg-primary-foreground text-primary' : 'text-sidebar-foreground/80',
              isCollapsed ? 'justify-center h-10 w-10' : 'py-2 px-3 gap-3'
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={cn('h-5 w-5', isCollapsed && item.active ? 'text-primary' : isCollapsed ? 'text-sidebar-foreground/80' : '')} />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-sidebar-foreground/10 py-4 px-2 space-y-1">
        {secondaryNavItems.map((item) => (
           <Link
           key={item.label}
           href={item.href}
           className={cn(
             'flex items-center rounded-md text-sm font-medium transition-colors duration-150',
             'hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground',
             item.active ? 'bg-primary-foreground text-primary' : 'text-sidebar-foreground/80',
             isCollapsed ? 'justify-center h-10 w-10' : 'py-2 px-3 gap-3'
           )}
           title={isCollapsed ? item.label : undefined}
         >
           <item.icon className={cn('h-5 w-5', isCollapsed && item.active ? 'text-primary' : isCollapsed ? 'text-sidebar-foreground/80' : '')} />
           {!isCollapsed && <span>{item.label}</span>}
         </Link>
        ))}
      </div>
    </aside>
  );
};

export default SidebarNav;
