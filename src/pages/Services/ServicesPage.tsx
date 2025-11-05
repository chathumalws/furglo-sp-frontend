import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Clock, DollarSign, X } from "lucide-react"

import { useState } from "react"

interface Service {
  id: string
  name: string
  category: string
  description: string
  price: number
  duration: number
  emergencyAvailable: boolean
  isEmergency?: boolean
}

const servicesData: Service[] = [
  {
    id: "1",
    name: "General Checkup",
    category: "Consultation",
    description: "Complete health examination for your pet including basic diagnostics",
    price: 75,
    duration: 30,
    emergencyAvailable: true,
    isEmergency: true,
  },
  {
    id: "2",
    name: "Vaccination",
    category: "Preventive Care",
    description: "Essential vaccination to keep your pet healthy and protected",
    price: 45,
    duration: 15,
    emergencyAvailable: false,
  },
  {
    id: "3",
    name: "Dental Cleaning",
    category: "Dental Care",
    description: "Professional dental cleaning and oral health assessment",
    price: 120,
    duration: 60,
    emergencyAvailable: false,
  },
  {
    id: "4",
    name: "Emergency Care",
    category: "Emergency",
    description: "Immediate medical attention for urgent pet health issues",
    price: 150,
    duration: 45,
    emergencyAvailable: true,
    isEmergency: true,
  },
  {
    id: "5",
    name: "Surgery Consultation",
    category: "Surgery",
    description: "Pre-surgical consultation and planning for complex procedures",
    price: 200,
    duration: 90,
    emergencyAvailable: true,
    isEmergency: true,
  },
  {
    id: "6",
    name: "Grooming",
    category: "Grooming",
    description: "Complete grooming service including bath, trim, and nail clipping",
    price: 60,
    duration: 120,
    emergencyAvailable: false,
  },
]

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>(servicesData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    emergencyAvailable: false,
    category: "Consultation",
  })

  const toggleEmergencyAvailable = (serviceId: string) => {
    setServices(
      services.map((service) =>
        service.id === serviceId ? { ...service, emergencyAvailable: !service.emergencyAvailable } : service,
      ),
    )
  }

  const handleAddService = () => {
    if (newService.name && newService.description && newService.price && newService.duration) {
      const service: Service = {
        id: (services.length + 1).toString(),
        name: newService.name,
        category: newService.category,
        description: newService.description,
        price: Number.parseInt(newService.price),
        duration: Number.parseInt(newService.duration),
        emergencyAvailable: newService.emergencyAvailable,
      }
      setServices([...services, service])
      setIsModalOpen(false)
      setNewService({
        name: "",
        description: "",
        price: "",
        duration: "",
        emergencyAvailable: false,
        category: "Consultation",
      })
    }
  }

  const totalServices = services.length
  const averagePrice = Math.round(services.reduce((sum, service) => sum + service.price, 0) / services.length)
  const emergencyServices = services.filter((service) => service.emergencyAvailable).length

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col ssm:flex-row items-center ssm:justify-between justify-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">My Service</h2>
            <p className="text-gray-600 text-lg">Manage your pet care services and pricing</p>
          </div>
          <Button className="bg-orange-600 text-white hover:bg-orange-700 w-full md:w-auto" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Service
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Total Service</p>
                <p className="text-3xl font-bold text-gray-800">{totalServices}</p>
                <p className="text-xs text-gray-600">Active services</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Average Price</p>
                <p className="text-3xl font-bold text-gray-800">${averagePrice}</p>
                <p className="text-xs text-gray-600">Per service</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Emergency Services</p>
                <p className="text-3xl font-bold text-gray-800">{emergencyServices}</p>
                <p className="text-xs text-gray-600">Available 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 mdd:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onToggleEmergency={() => toggleEmergencyAvailable(service.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal Overlay and Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Add New Service</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                <Input
                  placeholder="Enter Service Title"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe your service"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none h-20"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNewService({ ...newService, emergencyAvailable: !newService.emergencyAvailable })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    newService.emergencyAvailable ? "bg-teal-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      newService.emergencyAvailable ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">Available for emergencies</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-orange-600 text-white hover:bg-orange-700" onClick={handleAddService}>
                Add service
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ServiceCard({
  service,
  onToggleEmergency,
}: {
  service: Service
  onToggleEmergency: () => void
}) {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-800">{service.name}</h3>
                {service.isEmergency && <Badge className="bg-teal-500 text-white text-xs px-2 py-1">Emergency</Badge>}
              </div>
              <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700">
                {service.category}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>

          {/* Price and Duration */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-orange-600">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">${service.price}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{service.duration} min</span>
            </div>
          </div>

          {/* Emergency Toggle and Edit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex flex-col ssm:flex-row items-start ssm:items-center  gap-2">
              <div className="items-center justify-center"> <button
                onClick={onToggleEmergency}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  service.emergencyAvailable ? "bg-teal-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    service.emergencyAvailable ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button></div>

              <div> <span className="text-xs text-gray-600">Emergency Available</span></div>
             
             
            </div>
            <Button size="sm" className="bg-orange-600 text-white hover:bg-orange-700">
              Edit Service
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
