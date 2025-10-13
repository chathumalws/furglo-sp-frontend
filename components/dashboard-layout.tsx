import { Bell, Calendar, Clock, FileText, Grid3X3, LogOut, Search, Settings, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">FurGlo</span>
          </div>

          <nav className="space-y-2">
            <SidebarItem icon={Grid3X3} label="Dashboard" active />
            <SidebarItem icon={Calendar} label="Appointments" />
            <SidebarItem icon={FileText} label="My Services" />
            <SidebarItem icon={Clock} label="Availability" />
            <SidebarItem icon={FileText} label="Documents" />
            <SidebarItem icon={FileText} label="Billing" />
            <SidebarItem icon={Star} label="Reviews" />
            <SidebarItem icon={Bell} label="Notifications" />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>
        </div>

        <div className="absolute bottom-6 left-6">
          <Button variant="ghost" className="text-sidebar-foreground hover:text-sidebar-primary">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Grid3X3 className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Quick Search..." className="pl-10 w-80 bg-input" />
              </div>

              <div className="relative">
                <Bell className="w-6 h-6 text-foreground" />
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  3
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/caring-doctor.png" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <span className="font-medium">Dr. Sarah</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back, Dr. Sarah! 👋</h2>
              <p className="text-muted-foreground text-lg">Here's what's happening with your practice today.</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard title="Today's Appointments" value="8" subtitle="+2 from yesterday" trend="up" />
              <MetricCard title="This Month's Earnings" value="$245" subtitle="+12% from last month" trend="up" />
              <MetricCard
                title="Average Rating"
                value="4.8"
                subtitle="Based on 127 reviews"
                trend="neutral"
                badge="●"
              />
              <MetricCard title="Services Completed" value="156" subtitle="+8% this month" trend="up" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <Card className="bg-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold">Today's Schedule</CardTitle>
                    <Button variant="secondary" size="sm" className="bg-secondary text-secondary-foreground">
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <AppointmentCard name="Max" subtitle="John Smith" service="General Checkup" time="09:00 AM" />
                    <AppointmentCard name="Luna" subtitle="Emily Davis" service="Vaccination" time="10:30 AM" />
                    <AppointmentCard name="Charlie" subtitle="Mike Johnson" service="Dental Cleaning" time="02:00 PM" />
                    <AppointmentCard name="Bella" subtitle="Sara Wilson" service="Surgery" time="03:30 PM" emergency />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Calendar className="w-4 h-4 mr-2" />
                      New Appointments
                    </Button>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Clock className="w-4 h-4 mr-2" />
                      Set Availability
                    </Button>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Star className="w-4 h-4 mr-2" />
                      View Review
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Reviews */}
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Recent Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ReviewCard
                      initials="JS"
                      rating={4}
                      text="Excellent care for Max. Very professional and caring."
                      author="John Smith"
                    />
                    <ReviewCard
                      initials="ED"
                      rating={4}
                      text="Luna is doing great after the vaccination. Thank you!"
                      author="Emily Davis"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: any
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </div>
  )
}

function MetricCard({
  title,
  value,
  subtitle,
  trend,
  badge,
}: {
  title: string
  value: string
  subtitle: string
  trend: "up" | "down" | "neutral"
  badge?: string
}) {
  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-card-foreground">{title}</p>
          {badge && <span className="text-red-500 text-lg">{badge}</span>}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function AppointmentCard({
  name,
  subtitle,
  service,
  time,
  emergency = false,
}: {
  name: string
  subtitle: string
  service: string
  time: string
  emergency?: boolean
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={`/abstract-geometric-shapes.png?height=48&width=48&query=${name.toLowerCase()}`} />
          <AvatarFallback className="bg-primary text-primary-foreground">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">{name}</h4>
            {emergency && <Badge className="bg-accent text-accent-foreground text-xs px-2 py-1">Emergency</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <p className="text-sm text-muted-foreground">{service}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="w-4 h-4" />
            {time}
          </div>
          <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Start Session
          </Button>
        </div>
      </div>
    </div>
  )
}

function ReviewCard({
  initials,
  rating,
  text,
  author,
}: {
  initials: string
  rating: number
  text: string
  author: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">{initials}</span>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-card-foreground leading-relaxed">"{text}"</p>
      <p className="text-xs text-muted-foreground">{author}</p>
    </div>
  )
}
