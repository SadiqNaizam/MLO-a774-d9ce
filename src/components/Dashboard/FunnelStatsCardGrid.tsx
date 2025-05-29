import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string; // Tailwind background color class e.g. 'bg-red-500'
  barColor: string; // Hex color for segmented bar
}

interface SourceData {
  id: string;
  name: string;
  value: number; // for pie chart segment size
  amount: number;
  percentage: number;
  color: string; // hex for recharts
}

const funnelStagesData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-[#F06548]', barColor: '#F06548' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-[#F5B225]', barColor: '#F5B225' },
  { id: 'in-conversation', name: 'In conversation', count: 50, value: 100, days: 5, color: 'bg-[#405189]', barColor: '#405189' }, // average time on this stage tooltip for 'Qualified' in image, applies generally
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-[#0AB39C]', barColor: '#0AB39C' },
  { id: 'closed-won', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-[#8B5CF6]', barColor: '#8B5CF6' },
];

const totalFunnelCount = funnelStagesData.reduce((sum, stage) => sum + stage.count, 0);

const sourcesData: SourceData[] = [
  { id: 'clutch', name: 'Clutch', value: 50, amount: 3000, percentage: 50, color: '#F06548' },
  { id: 'behance', name: 'Behance', value: 40, amount: 1000, percentage: 40, color: '#F5B225' },
  { id: 'instagram', name: 'Instagram', value: 10, amount: 1000, percentage: 10, color: '#0AB39C' },
  { id: 'dribbble', name: 'Dribbble', value: 10, amount: 1000, percentage: 10, color: '#299CDB' }, // Sum of percentages is > 100, used values from image
];

interface FunnelStatsCardGridProps {
  className?: string;
}

const FunnelStatsCardGrid: React.FC<FunnelStatsCardGridProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <div className={cn("grid grid-cols-1 lg:grid-cols-5 gap-6", className)}>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Funnel count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <span className="text-5xl font-bold">600</span>
              <span className="ml-2 text-muted-foreground">active leads</span>
            </div>
            <div className="w-full h-3 flex rounded-full overflow-hidden mb-6">
              {funnelStagesData.map((stage) => (
                <div
                  key={stage.id}
                  style={{ width: `${(stage.count / totalFunnelCount) * 100}%`, backgroundColor: stage.barColor }}
                  className="h-full"
                />
              ))}
            </div>
            <ul className="space-y-3">
              {funnelStagesData.map((stage) => (
                <li key={stage.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className={cn("w-3 h-3 rounded-sm mr-2", stage.color)}></span>
                    <span>{stage.name}</span>
                  </div>
                  <div className="flex items-center space-x-4 sm:space-x-8">
                    <span className="w-10 text-right text-foreground font-medium">{stage.count}</span>
                    <span className="w-16 text-right text-muted-foreground">$ {stage.value}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="w-12 text-right text-muted-foreground cursor-default">{stage.days} days</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average time on this stage</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sourcesData.map((entry) => (
                      <Cell key={`cell-${entry.id}`} fill={entry.color} stroke={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: number, name: string, props: { payload: SourceData }) => [`${props.payload.percentage}%`, props.payload.name]}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2.5">
              {sourcesData.map((source) => (
                <li key={source.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: source.color }}></span>
                    <span>{source.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-muted-foreground">$ {source.amount.toLocaleString()}</span>
                    <span className="text-foreground font-medium w-8 text-right">{source.percentage}%</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground text-right mt-4">from leads total</p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default FunnelStatsCardGrid;
