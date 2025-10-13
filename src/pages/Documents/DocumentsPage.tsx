import type React from "react"
import { useState } from "react"
import { Search, Upload, FileText, ImageIcon, Download, Eye, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"


interface Document {
  id: string
  name: string
  type: "image" | "pdf"
  category: string
  owner: string
  size: string
  date: string
  icon: "image" | "pdf"
}

export function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("PDF Files")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadForm, setUploadForm] = useState({
    petName: "",
    ownerName: "",
    category: "Medical Records",
    file: null as File | null,
  })

  const documents: Document[] = [
    {
      id: "1",
      name: "Mac_Vaccination.jpg",
      type: "image",
      category: "Medical Records",
      owner: "Max - John smith",
      size: "2.4 MB",
      date: "2024-01-01",
      icon: "image",
    },
    {
      id: "2",
      name: "Mac_Vaccination.pdf",
      type: "pdf",
      category: "Medical Records",
      owner: "Max - John smith",
      size: "2.4 MB",
      date: "2024-01-01",
      icon: "pdf",
    },
    {
      id: "3",
      name: "Mac_Vaccination.jpg",
      type: "image",
      category: "Medical Records",
      owner: "Max - John smith",
      size: "2.4 MB",
      date: "2024-01-01",
      icon: "image",
    },
    {
      id: "4",
      name: "Mac_Vaccination.pdf",
      type: "pdf",
      category: "Medical Records",
      owner: "Max - John smith",
      size: "2.4 MB",
      date: "2024-01-01",
      icon: "pdf",
    },
    {
      id: "5",
      name: "Mac_Vaccination.pdf",
      type: "pdf",
      category: "Medical Records",
      owner: "Max - John smith",
      size: "2.4 MB",
      date: "2024-01-01",
      icon: "pdf",
    },
    {
      id: "6",
      name: "Mac_Vaccination.pdf",
      type: "pdf",
      category: "Medical Records",
      owner: "Max - John smith",
      size: "2.4 MB",
      date: "2024-01-01",
      icon: "pdf",
    },
  ]

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Upload form:", uploadForm)
    setIsUploadModalOpen(false)
    setUploadForm({
      petName: "",
      ownerName: "",
      category: "Medical Records",
      file: null,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadForm({ ...uploadForm, file })
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">Documents</h2>
            <p className="text-gray-600 text-base md:text-lg">Manage pet documents</p>
          </div>
          <Button
            className="bg-orange-600 text-white hover:bg-orange-700 w-full md:w-auto"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-white">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-1 md:space-y-2">
                <p className="text-xs md:text-sm font-medium text-gray-700">Total Documents</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">6</p>
                <p className="text-xs text-gray-600">File Stored</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-1 md:space-y-2">
                <p className="text-xs md:text-sm font-medium text-gray-700">Images</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">2</p>
                <p className="text-xs text-gray-600">Pet Images</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 md:p-6 col-span-2 md:col-span-1">
              <div className="space-y-1 md:space-y-2">
                <p className="text-xs md:text-sm font-medium text-gray-700">This month</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">3</p>
                <p className="text-xs text-gray-600">New Uploads</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search Documents....."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          <div className="relative w-full md:w-auto">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-auto">
              <option>PDF Files</option>
              <option>Image Files</option>
              <option>All Files</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {doc.icon === "image" ? (
                      <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
                    ) : (
                      <FileText className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 truncate mb-1 md:mb-2">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2 flex-wrap">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                        {doc.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs uppercase">
                        {doc.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3 md:mb-4 text-xs md:text-sm text-gray-600">
                  <p className="truncate">{doc.owner}</p>
                  <div className="flex items-center justify-between">
                    <span>{doc.size}</span>
                    <span>{doc.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent text-xs md:text-sm h-8 md:h-9"
                    onClick={() => setIsUploadModalOpen(false)}
                  >
                    <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-teal-600 text-white hover:bg-teal-700 text-xs md:text-sm h-8 md:h-9"
                  >
                    <Download className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Upload Document</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Pet Name</label>
                <Input
                  placeholder="Enter pet name"
                  value={uploadForm.petName}
                  onChange={(e) => setUploadForm({ ...uploadForm, petName: e.target.value })}
                  required
                  className="text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Owner Name</label>
                <Input
                  placeholder="Enter owner name"
                  value={uploadForm.ownerName}
                  onChange={(e) => setUploadForm({ ...uploadForm, ownerName: e.target.value })}
                  required
                  className="text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Category</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                >
                  <option value="Medical Records">Medical Records</option>
                  <option value="Vaccination Records">Vaccination Records</option>
                  <option value="Lab Results">Lab Results</option>
                  <option value="X-Ray Images">X-Ray Images</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Select File</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, JPG, PNG</p>
              </div>

              <div className="flex items-center gap-2 md:gap-3 pt-2 md:pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent text-sm md:text-base h-9 md:h-10"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white hover:bg-orange-700 text-sm md:text-base h-9 md:h-10"
                >
                  Upload Document
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
