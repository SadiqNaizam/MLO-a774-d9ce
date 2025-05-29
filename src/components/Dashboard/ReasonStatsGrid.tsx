import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonStat {
  id: string;
  percentage: number;
  description: string;
}

interface OtherStat {
  id: string;
  value: string;
  label: string;
  unit?: string;
  tooltip?: string;
}

const reasonsData: ReasonStat[] = [
  { id: 'reason1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'reason2', percentage: 20, description: 'However venture pursuit' },
  { id: 'reason3', percentage: 10, description: 'Other project priorities' }, // Changed from "Other" to be more specific
  { id: 'reason4', percentage: 30, description: 'Budget constraints' }, // Changed from "The proposal is unclear" to be distinct
];

const otherStatsData: OtherStat[] = [
  { id: 'stat1', value: '900', label: 'total leads count' },
  { id: 'stat2', value: '12', label: 'days in average', unit: 'to convert lead' },
  { id: 'stat3', value: '30', label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days' },
];

interface ReasonStatsGridProps {
  className?: string;
}

const ReasonStatsGrid: React.FC<ReasonStatsGridProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
        <Card>
          <CardHeader>
            <CardTitle>Reasons of leads lost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {reasonsData.map((reason) => (
                <div key={reason.id}>
                  <p className="text-3xl font-bold text-primary">{reason.percentage}%</p>
                  <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherStatsData.map((stat) => (
                <div key={stat.id} className="flex flex-col items-start">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <span>{stat.label}</span>
                    {stat.tooltip && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{stat.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  {stat.unit && <p className="text-sm text-muted-foreground">{stat.unit}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default ReasonStatsGrid;
