import { Navigate, RouteObject } from "react-router-dom"
import { MainLayout } from "../components/layout/MainLayout"
import DashboardPage from "../pages/Dashboard/DashboardPage"
import { ServicesPage } from "@/pages/Services/ServicesPage"
import { AvailabilityPage } from "@/pages/Availability/AvailabilityPage"
import { DocumentsPage } from "@/pages/Documents/DocumentsPage"
import { GenerateInvoicePage } from "@/pages/Biling/GenerateInvoicePage"
import { BillingPage } from "@/pages/Biling/BilingPage"
import { ReviewsPage } from "@/pages/Reviews/ReviewsPage"
import { NotificationsPage } from "@/pages/Notifications/NotificationsPage"
import { SettingsPage } from "@/pages/Settings/SettingsPage"
import AppointmentsPage from "@/pages/Appointments/AppointmentsPage"



export const appRoutes: RouteObject[] = [
  {
    element: <MainLayout />, 
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/appointments", element: <AppointmentsPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/availability", element: <AvailabilityPage /> },
      { path: "/documents", element: <DocumentsPage /> },
      { path: "/billing", element: <BillingPage/> },
      { path: "/billing/invoice", element: <GenerateInvoicePage onBack={() => window.history.back()}/> },
      { path: "/reviews", element: <ReviewsPage/> },
      { path: "/notifications", element: <NotificationsPage/> },
      { path: "/settings", element: <SettingsPage/> },
    ],
  },
]
