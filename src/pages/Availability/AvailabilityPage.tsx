import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TimeSlot {
  id: string
  time: string
  status: "available" | "booked" | "unavailable"
}

interface DaySchedule {
  day: string
  date: string
  status: "available" | "partially-booked" | "unavailable"
  slots: TimeSlot[]
}

export function AvailabilityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAvailable, setIsAvailable] = useState(true)
  const [autoBlock, setAutoBlock] = useState(true)
  const [allowUrgent, setAllowUrgent] = useState(true)
  const [selectedDay, setSelectedDay] = useState("")
  const [startTime, setStartTime] = useState("11:00 AM")
  const [endTime, setEndTime] = useState("11:30 AM")
  const [markAsAvailable, setMarkAsAvailable] = useState(true)

  const weekSchedule: DaySchedule[] = [
    { day: "Monday", date: "June 16", status: "available", slots: [] },
    { day: "Tuesday", date: "June 17", status: "partially-booked", slots: [] },
    { day: "Wednesday", date: "June 18", status: "available", slots: [] },
    { day: "Thursday", date: "June 19", status: "available", slots: [] },
    { day: "Friday", date: "June 20", status: "available", slots: [] },
    { day: "Saturday", date: "June 21", status: "available", slots: [] },
    { day: "Sunday", date: "June 22", status: "unavailable", slots: [] },
  ]

  const todaySlots: TimeSlot[] = [
    { id: "1", time: "9:30", status: "booked" },
    { id: "2", time: "10:30", status: "available" },
    { id: "3", time: "11:30", status: "available" },
    { id: "4", time: "12:30", status: "unavailable" },
    { id: "5", time: "1:30", status: "booked" },
    { id: "6", time: "2:30", status: "available" },
    { id: "7", time: "3:30", status: "available" },
    { id: "8", time: "4:30", status: "available" },
    { id: "9", time: "5:30", status: "unavailable" },
  ]

  const handleSaveSlot = () => {
    // Handle saving the new time slot
    console.log("Saving slot:", { selectedDay, startTime, endTime, markAsAvailable })
    setIsModalOpen(false)
    // Reset form
    setSelectedDay("")
    setStartTime("11:00 AM")
    setEndTime("11:30 AM")
    setMarkAsAvailable(true)
  }

  const getSlotColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-400 text-white"
      case "booked":
        return "bg-orange-400 text-white"
      case "unavailable":
        return "bg-gray-400 text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const getDayStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-400 text-white"
      case "partially-booked":
        return "bg-orange-400 text-white"
      case "unavailable":
        return "bg-gray-400 text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="p-4 md:p-6 ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
       <div className="flex flex-col ssm:flex-row items-center ssm:justify-between justify-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Availability</h2>
            <p className="text-gray-600 text-lg">Manage your schedule and time slots</p>
          </div>

          <div className="flex items-center gap-3 w-full ssm:w-auto mt-4 ssm:mt-0 ssm:justify-end justify-start">
            <span className="text-gray-700 font-medium">Available</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAvailable ? "bg-green-400" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAvailable ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
       </div>


        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Today's slots</p>
                <p className="text-3xl font-bold text-gray-800">9</p>
                <p className="text-xs text-gray-600">Available</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Booked</p>
                <p className="text-3xl font-bold text-gray-800">2</p>
                <p className="text-xs text-gray-600">Appointment</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Status</p>
                <Badge className="bg-green-400 text-white text-xs px-2 py-1 mb-2">Available</Badge>
                <p className="text-xs text-gray-600">Current status</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">Emergency</p>
                <Badge className="bg-teal-500 text-white text-xs px-2 py-1 mb-2">Available</Badge>
                <p className="text-xs text-gray-600">2/8 Emergency</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* This Week Schedule */}
          <div>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">📅 This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weekSchedule.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{day.day}</p>
                      <p className="text-sm text-gray-600">{day.date}</p>
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${getDayStatusColor(day.status)}`}>
                      {day.status === "partially-booked"
                        ? "Partially booked"
                        : day.status === "available"
                          ? "Available"
                          : "Unavailable"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <div>
            <Card className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">🕐 Today's Schedule</CardTitle>
                <Button onClick={() => setIsModalOpen(true)} className="bg-orange-600 text-white hover:bg-orange-700">
                  Add Slot
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {todaySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-3 rounded-lg text-center font-medium ${getSlotColor(slot.status)}`}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span>Unavailable</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Block/Unblock Date */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Block/Unblock date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Select dates to block from booking. Click selected dates to unblock them.
                </p>

                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Allow Urgent Booking</span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Block Dates</p>
                  <div className="flex gap-2">
                    <Badge className="bg-orange-400 text-white">Dec 15 ✕</Badge>
                    <Badge className="bg-orange-400 text-white">Dec 26 ✕</Badge>
                    <Badge className="bg-orange-400 text-white">Dec 28 ✕</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Settings */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Booking Setting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Auto Block When Booked</p>
                    <p className="text-sm text-gray-600">Automatically mark time slots as unavailable when booked</p>
                  </div>
                  <button
                    onClick={() => setAutoBlock(!autoBlock)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoBlock ? "bg-orange-400" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoBlock ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Allow Urgent Booking</p>
                    <p className="text-sm text-gray-600">Accept emergency bookings outside regular hours</p>
                  </div>
                  <button
                    onClick={() => setAllowUrgent(!allowUrgent)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      allowUrgent ? "bg-orange-400" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        allowUrgent ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-800 mb-2">Emergency Hours</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Start Time</p>
                      <p className="font-medium">06:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">End Time</p>
                      <p className="font-medium">10:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Time Slot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Add New Time Slot</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Day</label>
                <div className="relative">
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
                  >
                    <option value="">Choose a day</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start time</label>
                  <Input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <Input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Mark as Available</span>
                <button
                  onClick={() => setMarkAsAvailable(!markAsAvailable)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    markAsAvailable ? "bg-green-400" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      markAsAvailable ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSaveSlot} className="flex-1 bg-orange-600 text-white hover:bg-orange-700">
                Save Slot
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
