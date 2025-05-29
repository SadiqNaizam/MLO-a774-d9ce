import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [dateRange, setDateRange] = React.useState<string>('last-6-months');

  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-center gap-4", className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto bg-muted/60">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="w-full sm:w-auto">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-24-hours">Last 24 hours</SelectItem>
            <SelectItem value="last-7-days">Last 7 days</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-6-months">Last 6 months</SelectItem>
            <SelectItem value="last-12-months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PageHeader;
