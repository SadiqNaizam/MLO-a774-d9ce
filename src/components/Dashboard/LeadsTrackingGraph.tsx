import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'Jan', closedWon: 65, closedLost: 40 },
  { month: 'Feb', closedWon: 59, closedLost: 30 },
  { month: 'Mar', closedWon: 80, closedLost: 20 },
  { month: 'Apr', closedWon: 55, closedLost: 38 },
  { month: 'May', closedWon: 72, closedLost: 25 },
  { month: 'Jun', closedWon: 60, closedLost: 50 },
  { month: 'Jul', closedWon: 85, closedLost: 30 },
  { month: 'Aug', closedWon: 95, closedLost: 22 },
];

interface LeadsTrackingGraphProps {
  className?: string;
}

const LeadsTrackingGraph: React.FC<LeadsTrackingGraphProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = React.useState<'leadsCame' | 'leadsConverted' | 'totalDealsSize'>('leadsConverted');
  const [dateRange, setDateRange] = React.useState<string>('last-6-months');

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Leads tracking</CardTitle>
            <div className="mt-2 flex items-baseline space-x-4">
              <div>
                <span className="text-3xl font-bold">680</span>
                <span className="ml-1.5 text-sm text-muted-foreground">total closed</span>
              </div>
              <div>
                <span className="text-3xl font-bold">70</span>
                <span className="ml-1.5 text-sm text-muted-foreground">total lost</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="flex space-x-1 p-0.5 bg-muted rounded-md w-full sm:w-auto">
              <Button 
                variant={activeFilter === 'leadsCame' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setActiveFilter('leadsCame')}
                className={cn("flex-1 sm:flex-initial h-8", activeFilter === 'leadsCame' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground')}
              >
                Leads came
              </Button>
              <Button 
                variant={activeFilter === 'leadsConverted' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setActiveFilter('leadsConverted')}
                className={cn("flex-1 sm:flex-initial h-8", activeFilter === 'leadsConverted' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground')}
              >
                Leads Converted
              </Button>
              <Button 
                variant={activeFilter === 'totalDealsSize' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setActiveFilter('totalDealsSize')}
                className={cn("flex-1 sm:flex-initial h-8", activeFilter === 'totalDealsSize' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground')}
              >
                Total deals size
              </Button>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[180px] h-9 bg-card">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-6-months">Last 6 months</SelectItem>
                <SelectItem value="last-12-months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dx={-10} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} 
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
              />
              <Legend 
                verticalAlign="top" 
                align="right" 
                iconType="circle" 
                wrapperStyle={{ paddingBottom: '20px',  paddingTop: '0px', marginTop: '-10px' }}
                formatter={(value, entry) => (
                  <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>
                )}
              />
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0AB39C" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F06548" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F06548" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="closedWon" name="Closed won" stroke="#0AB39C" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedWon)" dot={{ r: 4, fill: '#0AB39C', strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Area type="monotone" dataKey="closedLost" name="Closed lost" stroke="#F06548" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedLost)" dot={{ r: 4, fill: '#F06548', strokeWidth:0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingGraph;
