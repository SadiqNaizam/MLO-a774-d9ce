import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import FunnelStatsCardGrid from '@/components/Dashboard/FunnelStatsCardGrid';
import LeadsTrackingGraph from '@/components/Dashboard/LeadsTrackingGraph';
import ReasonStatsGrid from '@/components/Dashboard/ReasonStatsGrid';

/**
 * DashboardPage serves as the main overview for lead management.
 * It utilizes MainAppLayout for the overall page structure (sidebar, top header)
 * and composes various dashboard-specific organism components to display key metrics and data.
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        The MainAppLayout already provides padding (p-6) for its children.
        This inner div arranges the dashboard components vertically with consistent spacing,
        as per the mainContent.container layout requirement ("flex flex-col gap-6").
      */}
      <div className="flex flex-col gap-6">
        <PageHeader />
        <FunnelStatsCardGrid />
        <LeadsTrackingGraph />
        <ReasonStatsGrid />
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
