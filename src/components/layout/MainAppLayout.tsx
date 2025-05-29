import React, { useState } from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const sidebarWidthClass = isSidebarCollapsed ? 'w-20' : 'w-64';
  const mainContentMarginLeftClass = isSidebarCollapsed ? 'ml-20' : 'ml-64';
  const topHeaderLeftClass = isSidebarCollapsed ? 'left-20' : 'left-64';

  return (
    <div className="min-h-screen bg-background flex Antialiased">
      <SidebarNav
        isCollapsed={isSidebarCollapsed}
        className={cn(
          'fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out',
          sidebarWidthClass
        )}
      />
      <div className={cn("flex flex-col flex-1 transition-all duration-300 ease-in-out", mainContentMarginLeftClass)}>
        <TopHeader
          onToggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
          className={cn(
            'fixed top-0 right-0 h-[70px] z-20 bg-card border-b',
            // This 'left' class on TopHeader might be tricky as it's part of a flex item.
            // Instead, the parent div of TopHeader and main needs the margin.
            // Corrected: TopHeader should span full width of its container, which has dynamic margin.
            // So, topHeaderLeftClass applies to the container of header and main, or header spans and main has margin.
            // The current structure has TopHeader and Main as siblings within a div that has the dynamic margin.
            // Let's adjust: TopHeader's parent div gets margin, header itself gets `w-full`.
            // The provided fixed layout from reqs for header is `fixed top-0 left-64 right-0`.
            // This implies TopHeader itself should have dynamic `left` if sidebar collapses.
            'left-0', // This will be overridden by topHeaderLeftClass if it applies directly to header
            topHeaderLeftClass // This must make it `left-64` or `left-20`
          )}
        />
        <main
          className={cn(
            'flex-1 overflow-y-auto overflow-x-hidden pt-[70px]'
          )}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

/*
  Alternative structure for fixed header/sidebar based on initial analysis of requirements:

  const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const sidebarWidthClass = isSidebarCollapsed ? 'w-20' : 'w-64';
  const mainContentMarginLeftClass = isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'; // For content inside main
  const topHeaderLeftClass = isSidebarCollapsed ? 'left-20' : 'left-64';

  return (
    <div className="relative min-h-screen bg-background antialiased">
      <SidebarNav
        isCollapsed={isSidebarCollapsed}
        className={cn(
          'fixed inset-y-0 left-0 z-30 h-full transition-all duration-300 ease-in-out',
          sidebarWidthClass
        )}
      />
      <TopHeader
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
        className={cn(
          'fixed top-0 right-0 h-[70px] z-20 bg-card border-b transition-all duration-300 ease-in-out',
          topHeaderLeftClass
        )}
      />
      <main
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out pt-[70px]',
          mainContentMarginLeftClass // This should be ml- not pl-
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
  };

  The current implementation uses a flex layout for the main content area (header + main body) which adapts to the sidebar.
  The alternative above uses fully fixed sidebar and header, with main content having margin. Both are valid.
  The prompt's layout requirements: sidebar fixed, header fixed (left-64), main content (ml-64, mt-70).
  The alternative is closer to the explicit fixed layout requirements. Let's use that logic.
*/

// Revised MainAppLayout based on explicit fixed positioning from requirements
const RevisedMainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const sidebarWidthClass = isSidebarCollapsed ? 'w-20' : 'w-64';
  const mainContentMarginLeftClass = isSidebarCollapsed ? 'ml-20' : 'ml-64';
  const topHeaderLeftClass = isSidebarCollapsed ? 'left-20' : 'left-64';

  return (
    <div className="relative min-h-screen bg-background antialiased">
      {/* Sidebar: fixed, full height, z-30 */}
      <SidebarNav
        isCollapsed={isSidebarCollapsed}
        className={cn(
          'fixed inset-y-0 left-0 z-30 h-full transition-width duration-300 ease-in-out',
          sidebarWidthClass
        )}
      />
      
      {/* Container for Header and Main Content, to the right of the sidebar */}
      {/* This container will have the dynamic margin-left */}
      <div className={cn("relative min-h-screen transition-margin duration-300 ease-in-out", mainContentMarginLeftClass)}>
        {/* Header: fixed top, spans remaining width, z-20 */}
        <TopHeader
          onToggleSidebar={toggleSidebar} /* This toggle might be better placed in header itself for mobile if sidebar hides */
          isSidebarCollapsed={isSidebarCollapsed}
          className={cn(
            'fixed top-0 right-0 h-[70px] z-20 bg-card border-b transition-left duration-300 ease-in-out',
            topHeaderLeftClass // This ensures header starts after sidebar and covers to the right edge
          )}
        />
        {/* Main Content Area: below header, takes remaining height */}
        <main className="pt-[70px] min-h-[calc(100vh-70px)]">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RevisedMainAppLayout; // Use the revised version
