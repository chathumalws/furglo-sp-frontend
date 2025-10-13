import {  Calendar, Clock,Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"


export default function DashboardPage() {
  return (
    <div>
      <main className="flex-1 p-6 overflow-auto bg-[#FFEADB80]">
          <div className="max-w-7xl mx-auto space-y-6 ">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back, Dr. Sarah! 👋</h2>
              <p className="text-gray-600 text-lg">Here's what's happening with your practice today.</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
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
                <Card className="">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold">Today's Schedule</CardTitle>
                    <Button variant="secondary" size="sm" className="bg-amber-400 text-gray-800 hover:bg-amber-500">
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
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-[#FFA45B]  text-white hover:bg-orange-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      New Appointme
                    </Button>
                    <Button className="w-full bg-[#FFA45B] text-white hover:bg-orange-700">
                      <Clock className="w-4 h-4 mr-2" />
                      Set Availability
                    </Button>
                    <Button className="w-full bg-[#FFA45B] text-white hover:bg-orange-700">
                      <Star className="w-4 h-4 mr-2" />
                      View Review
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Reviews */}
                <Card className="">
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
  )
}

function MetricCard({
  title,
  value,
  subtitle,
  badge,
}: {
  title: string
  value: string
  subtitle: string
  trend: "up" | "down" | "neutral"
  badge?: string
}) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          {badge && <span className="text-red-500 text-lg">{badge}</span>}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-600">{subtitle}</p>
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
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={`/abstract-geometric-shapes.png?height=48&width=48&query=${name.toLowerCase()}`} />
          <AvatarFallback className="bg-orange-600 text-white">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-800">{name}</h4>
            {emergency && <Badge className="bg-teal-500 text-white text-xs px-2 py-1">Emergency</Badge>}
          </div>
          <p className="text-sm text-gray-600">{subtitle}</p>
          <p className="text-sm text-gray-600">{service}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Clock className="w-4 h-4" />
            {time}
          </div>
          <Button size="sm" className="bg-amber-400 text-gray-800 hover:bg-amber-500">
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
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">{initials}</span>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">"{text}"</p>
      <p className="text-xs text-gray-600">{author}</p>
    </div>
  )
}
