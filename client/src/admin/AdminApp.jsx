import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ServicesManager from './pages/ServicesManager';
import ServiceForm from './pages/ServiceForm';
import BlogManager from './pages/BlogManager';
import BlogForm from './pages/BlogForm';
import CaseStudiesManager from './pages/CaseStudiesManager';
import CaseStudyForm from './pages/CaseStudyForm';
import CareersManager from './pages/CareersManager';
import CareerForm from './pages/CareerForm';
import TestimonialsManager from './pages/TestimonialsManager';
import TestimonialForm from './pages/TestimonialForm';
import FAQManager from './pages/FAQManager';
import FAQForm from './pages/FAQForm';
import TeamManager from './pages/TeamManager';
import PageContentManager from './pages/PageContentManager';
import LegalEditor from './pages/LegalEditor';
import NavigationManager from './pages/NavigationManager';
import ClientLogosManager from './pages/ClientLogosManager';
import ContactSubmissions from './pages/ContactSubmissions';
import SEOManager from './pages/SEOManager';
import Settings from './pages/Settings';
import './styles/admin.css';

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="services/:id" element={<ServiceForm />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="blog/:id" element={<BlogForm />} />
            <Route path="case-studies" element={<CaseStudiesManager />} />
            <Route path="case-studies/:id" element={<CaseStudyForm />} />
            <Route path="careers" element={<CareersManager />} />
            <Route path="careers/:id" element={<CareerForm />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="testimonials/:id" element={<TestimonialForm />} />
            <Route path="faq" element={<FAQManager />} />
            <Route path="faq/:id" element={<FAQForm />} />
            <Route path="team" element={<TeamManager />} />
            <Route path="team/:id" element={<TeamManager />} />
            <Route path="pages" element={<PageContentManager />} />
            <Route path="pages/:pageSlug" element={<PageContentManager />} />
            <Route path="legal" element={<LegalEditor />} />
            <Route path="legal/:slug" element={<LegalEditor />} />
            <Route path="navigation" element={<NavigationManager />} />
            <Route path="client-logos" element={<ClientLogosManager />} />
            <Route path="submissions" element={<ContactSubmissions />} />
            <Route path="seo" element={<SEOManager />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
