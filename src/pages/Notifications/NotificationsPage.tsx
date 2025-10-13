import { useState } from "react"
import { Bell, Calendar, Star, Settings, X, Check, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


type NotificationType = "appointment" | "review" | "setting"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  timestamp: string
  isRead: boolean
  requiresAction?: boolean
  category?: string
}

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "appointments" | "reviews" | "settings">("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "appointment",
      title: "New Appointment Request",
      description: "Emily Davis requested an appointment for Luna on Jan 16, 2024 at 10:30 AM",
      timestamp: "5 min",
      isRead: false,
      requiresAction: true,
      category: "Action Required",
    },
    {
      id: "2",
      type: "appointment",
      title: "Upcoming Appointment",
      description: "Emily Davis requested an appointment for Luna on Jan 16, 2024 at 11:30 AM",
      timestamp: "30 min",
      isRead: true,
      category: "Appointment",
    },
    {
      id: "3",
      type: "review",
      title: "New Review Received",
      description: "Emily Davis requested an appointment for Luna on Jan 16, 2024 at 10:30 AM",
      timestamp: "50 min",
      isRead: false,
      category: "Review",
    },
  ])

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [reviewNotifications, setReviewNotifications] = useState(true)
  const [appointmentNotifications, setAppointmentNotifications] = useState(true)
  const [paymentNotifications, setPaymentNotifications] = useState(false)
  const [notificationFrequency, setNotificationFrequency] = useState("Select frequency")

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "appointments") return notification.type === "appointment"
    if (activeTab === "reviews") return notification.type === "review"
    if (activeTab === "settings") return notification.type === "setting"
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const actionRequiredCount = notifications.filter((n) => n.requiresAction).length
  const todayCount = notifications.filter((n) => n.timestamp.includes("min") || n.timestamp.includes("hours")).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const savePreferences = () => {
    console.log("Preferences saved")
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-6 h-6 text-orange-600" />
      case "review":
        return <Star className="w-6 h-6 text-teal-600" />
      case "setting":
        return <Settings className="w-6 h-6 text-gray-600" />
      default:
        return <Bell className="w-6 h-6 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-orange-50/30 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
              <Badge className="bg-orange-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                {unreadCount} Unread
              </Badge>
            </div>
            <p className="text-gray-600 text-sm md:text-base">Stay Update with your practice activities</p>
          </div>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-white w-full sm:w-auto whitespace-nowrap"
          >
            Mark all Read
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-1">
                <p className="text-xs md:text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{notifications.length}</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-1">
                <p className="text-xs md:text-sm font-medium text-gray-600">Unread</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{unreadCount}</p>
                <p className="text-xs text-gray-500">Require Action</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-1">
                <p className="text-xs md:text-sm font-medium text-gray-600">Action Required</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{actionRequiredCount}</p>
                <p className="text-xs text-gray-500">Pending action</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-1">
                <p className="text-xs md:text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{todayCount}</p>
                <p className="text-xs text-gray-500">New notification</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-teal-50/50 rounded-xl p-1 grid grid-cols-2 md:grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-3 px-4 rounded-lg text-sm md:text-base font-medium transition-all ${
              activeTab === "all"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`py-3 px-4 rounded-lg text-sm md:text-base font-medium transition-all ${
              activeTab === "appointments"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-3 px-4 rounded-lg text-sm md:text-base font-medium transition-all ${
              activeTab === "reviews"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-4 rounded-lg text-sm md:text-base font-medium transition-all ${
              activeTab === "settings"
                ? "bg-orange-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Settings
          </button>
        </div>

        {activeTab === "settings" ? (
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Notifications Preference</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Email Notifications",
                    desc: "Receive notifications via email",
                    state: emailNotifications,
                    setState: setEmailNotifications,
                  },
                  {
                    title: "Review Notifications",
                    desc: "New review and ratings",
                    state: reviewNotifications,
                    setState: setReviewNotifications,
                  },
                  {
                    title: "Appointment Notifications",
                    desc: "New booking and schedule changes",
                    state: appointmentNotifications,
                    setState: setAppointmentNotifications,
                  },
                  {
                    title: "Payment Notification",
                    desc: "Payment confirmation and overdue alerts",
                    state: paymentNotifications,
                    setState: setPaymentNotifications,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 py-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => item.setState(!item.state)}
                      className={`flex-shrink-0 relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        item.state ? "bg-orange-600" : "bg-gray-300"
                      }`}
                      aria-label={`Toggle ${item.title}`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                          item.state ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-4">Notification Frequency</h3>
                  <select
                    value={notificationFrequency}
                    onChange={(e) => setNotificationFrequency(e.target.value)}
                    className="w-full p-3 md:p-4 border border-gray-300 rounded-lg bg-orange-50 text-gray-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-600"
                  >
                    <option value="Select frequency">Select frequency</option>
                    <option value="Immediately">Immediately</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>

                <Button
                  onClick={savePreferences}
                  className="w-full bg-orange-600 text-white hover:bg-orange-700 py-6 text-base md:text-lg font-medium rounded-lg"
                >
                  Save Preference
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} className="bg-white border-0 shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-orange-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1">
                            {notification.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {notification.requiresAction && (
                              <Badge className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                                Action Required
                              </Badge>
                            )}
                            {notification.category && !notification.requiresAction && (
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-1 rounded-full border-gray-300 text-gray-700"
                              >
                                {notification.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{notification.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-4 border-t border-gray-100">
                    {!notification.isRead && notification.requiresAction && (
                      <Button
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-50 text-sm py-2 px-4 w-full sm:w-auto"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Mark Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteNotification(notification.id)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 text-sm py-2 px-4 w-full sm:w-auto"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
                <p className="text-gray-500 text-sm md:text-base">You're all caught up!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
