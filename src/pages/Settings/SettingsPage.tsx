
import { useState } from "react"
import { Eye, EyeOff, Lock, Bell, Globe, Shield, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"password" | "notifications" | "language" | "privacy">("password")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [notificationFrequency, setNotificationFrequency] = useState("")

  // Language settings
  const [displayLanguage, setDisplayLanguage] = useState("")
  const [timezone, setTimezone] = useState("")
  const [dateFormat, setDateFormat] = useState("")
  const [timeFormat, setTimeFormat] = useState("")

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [showContactInfo, setShowContactInfo] = useState(true)
  const [onlineStatus, setOnlineStatus] = useState(true)
  const [dataAnalytics, setDataAnalytics] = useState(false)

  const tabs = [
    { id: "password", label: "Password", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "language", label: "Language", icon: Globe },
    { id: "privacy", label: "Privacy", icon: Shield },
  ] as const

  const handlePasswordUpdate = () => {
    // Handle password update logic
    console.log("Password update requested")
  }

  const handleNotificationSave = () => {
    // Handle notification preferences save
    console.log("Notification preferences saved")
  }

  const handleLanguageSave = () => {
    // Handle language settings save
    console.log("Language settings saved")
  }

  const handlePrivacyUpdate = () => {
    // Handle privacy settings update
    console.log("Privacy settings updated")
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage your account and application preferences</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-100 rounded-lg p-1 grid grid-cols-2 md:grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-md font-medium text-sm md:text-base transition-colors ${
                  activeTab === tab.id ? "bg-orange-500 text-white" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <Card className="bg-white">
          <CardContent className="p-4 md:p-6">
            {activeTab === "password" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl md:text-2xl font-semibold">Change Password</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">Password Requirements</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• At least 8 characters long</li>
                      <li>• Contains uppercase and lowercase letter</li>
                      <li>• Contains at least one number</li>
                      <li>• Contains at least one special character</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handlePasswordUpdate}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl md:text-2xl font-semibold">Notifications Preference</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailNotifications ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailNotifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notification via SMS</p>
                    </div>
                    <button
                      onClick={() => setSmsNotifications(!smsNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        smsNotifications ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          smsNotifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Push Notifications</h3>
                      <p className="text-sm text-gray-600">Receive browser notifications</p>
                    </div>
                    <button
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        pushNotifications ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pushNotifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Marketing Emails</h3>
                      <p className="text-sm text-gray-600">Receive updates about new features</p>
                    </div>
                    <button
                      onClick={() => setMarketingEmails(!marketingEmails)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        marketingEmails ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          marketingEmails ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
                    <div className="relative">
                      <select
                        value={notificationFrequency}
                        onChange={(e) => setNotificationFrequency(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10"
                      >
                        <option value="">Select frequency</option>
                        <option value="immediate">Immediate</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <Button
                    onClick={handleNotificationSave}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Save Preference
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "language" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl md:text-2xl font-semibold">Language & Region Setting</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Language</label>
                    <div className="relative">
                      <select
                        value={displayLanguage}
                        onChange={(e) => setDisplayLanguage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10"
                      >
                        <option value="">Select language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <div className="relative">
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10"
                      >
                        <option value="">Select timezone</option>
                        <option value="utc">UTC</option>
                        <option value="est">Eastern Time</option>
                        <option value="pst">Pacific Time</option>
                        <option value="cst">Central Time</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <div className="relative">
                        <select
                          value={dateFormat}
                          onChange={(e) => setDateFormat(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10"
                        >
                          <option value="">Select date format</option>
                          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                          <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                      <div className="relative">
                        <select
                          value={timeFormat}
                          onChange={(e) => setTimeFormat(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none pr-10"
                        >
                          <option value="">Select time format</option>
                          <option value="12h">12 Hour</option>
                          <option value="24h">24 Hour</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleLanguageSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Save Language Setting
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl md:text-2xl font-semibold">Privacy Settings</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Profile Visibility</h3>
                      <p className="text-sm text-gray-600">Allow clients to view profile</p>
                    </div>
                    <button
                      onClick={() => setProfileVisibility(!profileVisibility)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        profileVisibility ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          profileVisibility ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Show Contact Information</h3>
                      <p className="text-sm text-gray-600">Display your contact details to client</p>
                    </div>
                    <button
                      onClick={() => setShowContactInfo(!showContactInfo)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        showContactInfo ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          showContactInfo ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Online Status</h3>
                      <p className="text-sm text-gray-600">Show when you're online</p>
                    </div>
                    <button
                      onClick={() => setOnlineStatus(!onlineStatus)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        onlineStatus ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          onlineStatus ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Data Analytics</h3>
                      <p className="text-sm text-gray-600">Allow usage data collection for improvements</p>
                    </div>
                    <button
                      onClick={() => setDataAnalytics(!dataAnalytics)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        dataAnalytics ? "bg-orange-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          dataAnalytics ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <Button onClick={handlePrivacyUpdate} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Update Privacy Settings
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
