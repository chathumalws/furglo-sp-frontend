import { useState } from "react"

import { FileText, Download, Mail, X, DollarSign, CreditCard, Banknote, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

interface Invoice {
  id: string
  date: string
  pet: string
  owner: string
  service: string
  payment: string
  amount: number
  tax: number
  total: number
  status: "paid" | "unpaid"
}

export function BillingPage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "settings">("invoices")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const navigate = useNavigate()
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      date: "2025-01-01",
      pet: "Max",
      owner: "John Smith",
      service: "General Checkup",
      payment: "Credit Card",
      amount: 75.0,
      tax: 5.0,
      total: 80.0,
      status: "paid",
    },
    {
      id: "INV-002",
      date: "2025-01-01",
      pet: "Max",
      owner: "John Smith",
      service: "General Checkup",
      payment: "Credit Card",
      amount: 75.0,
      tax: 5.0,
      total: 80.0,
      status: "unpaid",
    },
    {
      id: "INV-003",
      date: "2025-01-01",
      pet: "Max",
      owner: "John Smith",
      service: "General Checkup",
      payment: "Credit Card",
      amount: 75.0,
      tax: 5.0,
      total: 80.0,
      status: "paid",
    },
    {
      id: "INV-004",
      date: "2025-01-01",
      pet: "Max",
      owner: "John Smith",
      service: "General Checkup",
      payment: "Credit Card",
      amount: 75.0,
      tax: 5.0,
      total: 80.0,
      status: "paid",
    },
  ])

  // Billing settings state
  const [consultationFee, setConsultationFee] = useState("75")
  const [taxRate, setTaxRate] = useState("6")
  const [defaultDiscount, setDefaultDiscount] = useState("75")
  const [paymentMethods, setPaymentMethods] = useState({
    creditCard: true,
    cashPayment: true,
    bankTransfer: false,
    digitalWallets: false,
  })

  // Create invoice form state
  const [newInvoice, setNewInvoice] = useState({
    pet: "",
    owner: "",
    service: "",
    amount: "",
    payment: "Credit Card",
  })

  const handleCreateInvoice = () => {
    if (!newInvoice.pet || !newInvoice.owner || !newInvoice.service || !newInvoice.amount) return

    const amount = Number.parseFloat(newInvoice.amount)
    const tax = amount * 0.06 // 6% tax rate
    const total = amount + tax

    const invoice: Invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      pet: newInvoice.pet,
      owner: newInvoice.owner,
      service: newInvoice.service,
      payment: newInvoice.payment,
      amount,
      tax,
      total,
      status: "unpaid",
    }

    setInvoices([...invoices, invoice])
    setNewInvoice({ pet: "", owner: "", service: "", amount: "", payment: "Credit Card" })
    setShowCreateModal(false)
  }

  const markAsPaid = (invoiceId: string) => {
    setInvoices(invoices.map((inv) => (inv.id === invoiceId ? { ...inv, status: "paid" as const } : inv)))
  }

  const totalRevenue = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0)
  const paidInvoices = invoices.filter((inv) => inv.status === "paid").length
  const pendingAmount = invoices.filter((inv) => inv.status === "unpaid").reduce((sum, inv) => sum + inv.total, 0)

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col ssm:flex-row items-center ssm:justify-between justify-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Billing & Payments</h1>
            <p className="text-gray-600 mt-1">Manage invoices, payment and billing setting</p>
          </div>
          <Button onClick={() => navigate('/billing/invoice')} className="bg-orange-600 text-white hover:bg-orange-700 w-full md:w-auto">
            <FileText className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">${totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-gray-600">This month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Paid Invoices</p>
                <p className="text-3xl font-bold text-gray-800">{paidInvoices}</p>
                <p className="text-xs text-gray-600">Out of {invoices.length} total</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Pending Amount</p>
                <p className="text-3xl font-bold text-gray-800">${pendingAmount.toFixed(2)}</p>
                <p className="text-xs text-gray-600">Awaiting payment</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("invoices")}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === "invoices" ? "bg-orange-600 text-white" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Invoices & Payments
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
              activeTab === "settings" ? "bg-orange-600 text-white" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Billing Setting
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "invoices" ? (
          <div className="grid grid-cols-1 mdd:grid-cols-2 xl:grid-cols-3 gap-6">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{invoice.id}</h3>
                      <p className="text-sm text-gray-600">{invoice.date}</p>
                    </div>
                    <Badge
                      className={
                        invoice.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {invoice.status === "paid" ? "✓ Paid" : "Unpaid"}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pet:</span>
                      <span className="font-medium">{invoice.pet}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Owner:</span>
                      <span className="font-medium">{invoice.owner}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{invoice.service}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium">{invoice.payment}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount:</span>
                      <span>${invoice.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span>${invoice.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${invoice.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col ssm:flex-row gap-2 mt-4 justify-between">
                    <div>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Download className="w-4 h-4 mr-1" />
                            PDF
                       </Button>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button size="sm" className="flex-1 bg-teal-500 text-white hover:bg-teal-600">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    {invoice.status === "unpaid" && (
                      <Button
                        size="sm"
                        onClick={() => markAsPaid(invoice.id)}
                        className="bg-green-500 text-white hover:bg-green-600"
                      >
                        Mark Paid
                      </Button>
                    )}

                    </div>
                   
                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fee Setting */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <DollarSign className="w-5 h-5" />
                  Fee Setting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Consultation Fees ($)</label>
                  <Input
                    type="number"
                    value={consultationFee}
                    onChange={(e) => setConsultationFee(e.target.value)}
                    className="bg-orange-50 border-orange-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                  <Input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="bg-orange-50 border-orange-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Discount (%)</label>
                  <Input
                    type="number"
                    value={defaultDiscount}
                    onChange={(e) => setDefaultDiscount(e.target.value)}
                    className="bg-orange-50 border-orange-200"
                  />
                </div>

                <Button className="w-full bg-orange-600 text-white hover:bg-orange-700">Save Setting</Button>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <DollarSign className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Credit/Debit Cards</span>
                  </div>
                  <button
                    onClick={() => setPaymentMethods((prev) => ({ ...prev, creditCard: !prev.creditCard }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      paymentMethods.creditCard ? "bg-orange-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        paymentMethods.creditCard ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Cash Payment</span>
                  </div>
                  <button
                    onClick={() => setPaymentMethods((prev) => ({ ...prev, cashPayment: !prev.cashPayment }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      paymentMethods.cashPayment ? "bg-orange-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        paymentMethods.cashPayment ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Bank Transfer</span>
                  </div>
                  <button
                    onClick={() => setPaymentMethods((prev) => ({ ...prev, bankTransfer: !prev.bankTransfer }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      paymentMethods.bankTransfer ? "bg-orange-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        paymentMethods.bankTransfer ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Digital Wallets</span>
                  </div>
                  <button
                    onClick={() => setPaymentMethods((prev) => ({ ...prev, digitalWallets: !prev.digitalWallets }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      paymentMethods.digitalWallets ? "bg-orange-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        paymentMethods.digitalWallets ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <Button className="w-full bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100">
                  Update Payment Methods
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Create Invoice Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create New Invoice</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                  <Input
                    placeholder="Enter pet name"
                    value={newInvoice.pet}
                    onChange={(e) => setNewInvoice((prev) => ({ ...prev, pet: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                  <Input
                    placeholder="Enter owner name"
                    value={newInvoice.owner}
                    onChange={(e) => setNewInvoice((prev) => ({ ...prev, owner: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <Input
                    placeholder="Enter service type"
                    value={newInvoice.service}
                    onChange={(e) => setNewInvoice((prev) => ({ ...prev, service: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice((prev) => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={newInvoice.payment}
                      onChange={(e) => setNewInvoice((prev) => ({ ...prev, payment: e.target.value }))}
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateInvoice} className="flex-1 bg-orange-600 text-white hover:bg-orange-700">
                  Create Invoice
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
