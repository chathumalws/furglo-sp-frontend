import { useState } from "react"
import { Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Service {
  id: string
  type: string
  price: string
  description: string
}

interface GenerateInvoicePageProps {
  onBack: () => void
}

export function GenerateInvoicePage({ onBack }: GenerateInvoicePageProps) {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "INV-001",
    invoiceDate: "",
    dueDate: "",
    clientName: "",
    petName: "",
  })

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      type: "",
      price: "",
      description: "",
    },
  ])

  const [summary, setSummary] = useState({
    discount: "75",
    taxRate: "6",
    sendViaEmail: true,
  })

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      type: "",
      price: "",
      description: "",
    }
    setServices([...services, newService])
  }

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map((service) => (service.id === id ? { ...service, [field]: value } : service)))
  }

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter((service) => service.id !== id))
    }
  }

  const calculateTotal = () => {
    const subtotal = services.reduce((sum, service) => sum + (Number.parseFloat(service.price) || 0), 0)
    const discountAmount = (subtotal * Number.parseFloat(summary.discount)) / 100
    const discountedAmount = subtotal - discountAmount
    const taxAmount = (discountedAmount * Number.parseFloat(summary.taxRate)) / 100
    return discountedAmount + taxAmount
  }

  const handleGenerateInvoice = () => {
    // Handle invoice generation logic here
    console.log("Generating invoice with data:", {
      invoiceData,
      services,
      summary,
      total: calculateTotal(),
    })
    
    onBack()
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Generate Invoice</h1>
            <p className="text-gray-600 mt-1">Create and send an invoice for your services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Invoice Details & Services */}
          <div className="lg:col-span-2 space-y-8">
            {/* Invoice Details */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Invoice Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                    <Input
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
                      className="bg-orange-50 border-orange-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                    <Input
                      type="date"
                      value={invoiceData.invoiceDate}
                      onChange={(e) => setInvoiceData((prev) => ({ ...prev, invoiceDate: e.target.value }))}
                      className="bg-orange-50 border-orange-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <Input
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData((prev) => ({ ...prev, dueDate: e.target.value }))}
                      className="bg-orange-50 border-orange-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <Input
                      placeholder="Client Name"
                      value={invoiceData.clientName}
                      onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientName: e.target.value }))}
                      className="bg-orange-50 border-orange-200"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                  <Input
                    placeholder="Enter pet name"
                    value={invoiceData.petName}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, petName: e.target.value }))}
                    className="bg-orange-50 border-orange-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Services</h2>
                  <Button onClick={addService} className="bg-teal-500 text-white hover:bg-teal-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </div>

                <div className="space-y-6">
                  {services.map((service, index) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-800">Service {index + 1}</h3>
                        {services.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeService(service.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                          <Input
                            placeholder="Service type"
                            value={service.type}
                            onChange={(e) => updateService(service.id, "type", e.target.value)}
                            className="bg-orange-50 border-orange-200"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={service.price}
                            onChange={(e) => updateService(service.id, "price", e.target.value)}
                            className="bg-orange-50 border-orange-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          placeholder="Enter service description"
                          value={service.description}
                          onChange={(e) => updateService(service.id, "description", e.target.value)}
                          className="w-full px-3 py-2 bg-orange-50 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Summary</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                    <Input
                      type="number"
                      value={summary.discount}
                      onChange={(e) => setSummary((prev) => ({ ...prev, discount: e.target.value }))}
                      className="bg-orange-50 border-orange-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                    <Input
                      type="number"
                      value={summary.taxRate}
                      onChange={(e) => setSummary((prev) => ({ ...prev, taxRate: e.target.value }))}
                      className="bg-orange-50 border-orange-200"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span>LKR {calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <span className="font-medium">Send via Email</span>
                    <button
                      onClick={() => setSummary((prev) => ({ ...prev, sendViaEmail: !prev.sendViaEmail }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        summary.sendViaEmail ? "bg-orange-600" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          summary.sendViaEmail ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <Button
                    onClick={handleGenerateInvoice}
                    className="w-full bg-orange-600 text-white hover:bg-orange-700"
                  >
                    Generate Invoice
                  </Button>

                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="w-full bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
