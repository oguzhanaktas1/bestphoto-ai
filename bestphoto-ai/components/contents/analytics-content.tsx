"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Camera,
  Star,
  Zap,
  Calendar,
  Target,
  Award,
  BarChart3,
  PieChart,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";

export function AnalyticsContent() {
  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "1y", label: "Last year" },
  ];

  const categoryStats: { name: string; uploaded: number; selected: number; percentage: number }[] = [
    // Data will be loaded here
  ];

  const monthlyData: { month: string; uploaded: number; selected: number; credits: number }[] = [
    // Data will be loaded here
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/desktop/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Detailed insights into your photo management and AI performance
            </p>
          </div>
          <Select defaultValue="30d">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Photos
              </CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <div className="flex items-center text-xs text-muted-foreground">
                -- % from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Selection Rate
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                -- % from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Credits Used
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0/0</div>
              <Progress value={0} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Quality Score
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--/10</div>
              <div className="flex items-center text-xs text-muted-foreground">
                -- from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Category Performance
              </CardTitle>
              <CardDescription>
                AI selection rates by photo category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.length === 0 ? (
                  <div className="text-center text-muted-foreground">No category data available.</div>
                ) : (
                  categoryStats.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-muted-foreground">
                          {category.selected}/{category.uploaded} (
                          {category.percentage}%)
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Trends
              </CardTitle>
              <CardDescription>
                Upload and selection trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.length === 0 ? (
                   <div className="text-center text-muted-foreground">No monthly trend data available.</div>
                 ) : (
                   monthlyData.map((month) => (
                     <div
                       key={month.month}
                       className="grid grid-cols-4 gap-4 text-sm"
                     >
                       <div className="font-medium">{month.month}</div>
                       <div className="text-center">
                         <div className="font-medium">{month.uploaded}</div>
                         <div className="text-xs text-muted-foreground">
                           Uploaded
                         </div>
                       </div>
                       <div className="text-center">
                         <div className="font-medium text-green-600">
                           {month.selected}
                         </div>
                         <div className="text-xs text-muted-foreground">
                           Selected
                         </div>
                       </div>
                       <div className="text-center">
                         <div className="font-medium text-blue-600">
                           {month.credits}
                         </div>
                         <div className="text-xs text-muted-foreground">
                           Credits
                         </div>
                       </div>
                     </div>
                   ))
                 )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quality Insights</CardTitle>
              <CardDescription>AI quality assessment breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Excellent (9-10)</span>
                <div className="flex items-center gap-2">
                  <Progress value={0} className="w-20 h-2" />
                  <span className="text-sm font-medium">0%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Good (7-8)</span>
                <div className="flex items-center gap-2">
                  <Progress value={0} className="w-20 h-2" />
                  <span className="text-sm font-medium">0%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average (5-6)</span>
                <div className="flex items-center gap-2">
                  <Progress value={0} className="w-20 h-2" />
                  <span className="text-sm font-medium">0%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Below Average (1-4)</span>
                <div className="flex items-center gap-2">
                  <Progress value={0} className="w-20 h-2" />
                  <span className="text-sm font-medium">0%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Patterns</CardTitle>
              <CardDescription>When you're most active</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Peak Hours</span>
                  <Badge variant="secondary">--</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Most Active Day</span>
                  <Badge variant="secondary">--</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Avg. Session</span>
                  <Badge variant="secondary">--</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Photos per Session</span>
                  <Badge variant="secondary">--</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Your photo management milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-muted-foreground">No achievements earned yet.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
