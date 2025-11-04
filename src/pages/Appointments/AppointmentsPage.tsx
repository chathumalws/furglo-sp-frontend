import { useState } from "react"
import { Search, User, Calendar, Clock, MessageCircle, CheckCircle } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"

type AppointmentStatus = "request" | "upcoming" | "past" | "canceled"

interface Appointment {
  id: number
  petName: string
  breed: string
  ownerName: string
  date: string
  time: string
  emergency: boolean
  status: AppointmentStatus
  cancelReason?: string
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    petName: "Buddy",
    breed: "Golden Retriever",
    ownerName: "Sarah Johnson",
    date: "2025-09-07",
    time: "10:00AM - 10:30AM",
    emergency: false,
    status: "upcoming",
  },
  {
    id: 2,
    petName: "Milo",
    breed: "Beagle",
    ownerName: "John Smith",
    date: "2025-09-08",
    time: "11:00AM - 11:30AM",
    emergency: true,
    status: "request",
  },
  {
    id: 3,
    petName: "Bella",
    breed: "Poodle",
    ownerName: "Amy Williams",
    date: "2025-08-28",
    time: "9:30AM - 10:00AM",
    emergency: false,
    status: "past",
  },
  {
    id: 4,
    petName: "Rocky",
    breed: "Bulldog",
    ownerName: "James Brown",
    date: "2025-09-01",
    time: "2:00PM - 2:30PM",
    emergency: false,
    status: "canceled",
    cancelReason: "Owner canceled due to schedule change",
  },
]

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("request")

  const filteredAppointments = mockAppointments.filter((apt) => apt.status === activeTab)
  const getTabCount = (status: AppointmentStatus) => mockAppointments.filter((apt) => apt.status === status).length

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Appointments</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage your pet care appointments</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by pet name or owner"
            className="pl-10 bg-white border-gray-200 rounded-lg text-sm md:text-base w-full"
          />
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 rounded-lg p-1 grid grid-cols-2 md:grid-cols-4 gap-1">
          <TabButton
            label="Request"
            count={getTabCount("request")}
            active={activeTab === "request"}
            onClick={() => setActiveTab("request")}
          />
          <TabButton
            label="Upcoming"
            count={getTabCount("upcoming")}
            active={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
          />
          <TabButton
            label="Past"
            count={getTabCount("past")}
            active={activeTab === "past"}
            onClick={() => setActiveTab("past")}
          />
          <TabButton
            label="Canceled"
            count={getTabCount("canceled")}
            active={activeTab === "canceled"}
            onClick={() => setActiveTab("canceled")}
          />
        </div>

        {/* Appointment Cards */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}

          {filteredAppointments.length === 0 && (
            <p className="text-center text-gray-500 text-sm md:text-base mt-8">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function TabButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 md:px-4 md:py-3 rounded-md font-medium text-sm md:text-base transition-colors ${
        active ? "bg-orange-500 text-white" : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {label} <span className="text-xs md:text-sm opacity-80">({count})</span>
    </button>
  )
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const { petName, breed, ownerName, date, time, emergency, status, cancelReason } = appointment

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
          <Avatar className="w-12 h-12 sm:w-16 sm:h-16 shrink-0">
            <AvatarImage
              src={`/abstract-geometric-shapes.png?height=64&width=64&query=${petName.toLowerCase()}-${breed
                .toLowerCase()
                .replace(" ", "-")}`}
            />
            <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold text-base sm:text-lg">
              {petName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1 md:space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">{petName}</h3>
              {emergency && <Badge className="bg-teal-500 text-white text-xs px-2 py-1">Emergency</Badge>}
            </div>
            <p className="text-gray-600 text-sm">{breed}</p>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <User className="w-4 h-4" />
              <span>{ownerName}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>

            {status === "upcoming" && (
              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">View Pet Profile</button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 items-center md:justify-end w-full md:w-auto">
          {status === "request" && (
            <>
              <Button className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 w-full sm:w-auto text-sm">
                Accept
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 w-full sm:w-auto text-sm"
              >
                Decline
              </Button>
            </>
          )}

          {status === "upcoming" && (
            <>
              <Button
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 px-4 py-2 flex items-center gap-2 w-full sm:w-auto text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </Button>
              <Button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 flex items-center gap-2 w-full sm:w-auto text-sm">
                <CheckCircle className="w-4 h-4" />
                Complete
              </Button>
            </>
          )}

          {status === "past" && (
            <Badge className="bg-green-500 text-white px-3 py-2 flex items-center gap-2 w-full sm:w-auto justify-center text-sm">
              <CheckCircle className="w-4 h-4" />
              Completed
            </Badge>
          )}

          {status === "canceled" && (
            <div className="text-left md:text-right w-full md:w-auto text-sm text-gray-700">
              <div className="font-semibold mb-1 text-gray-800">Canceled</div>
              <div className="text-gray-600">Reason: {cancelReason}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
