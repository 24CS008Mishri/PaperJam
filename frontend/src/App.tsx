import { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Applications from './pages/admin/Applications';
import Businesses from './pages/admin/Businesses';
import Approvals from './pages/admin/Approvals';
import Departments from './pages/admin/Departments';
import KnowledgeLibrary from './pages/admin/KnowledgeLibrary';
import UploadDocument from './pages/admin/UploadDocument';
import DocumentDetail from './pages/admin/DocumentDetail';
import DocumentVerification from './pages/admin/DocumentVerification';
import RAGIntelligence from './pages/admin/RAGIntelligence';
import Schemes from './pages/admin/Schemes';
import Analytics from './pages/admin/Analytics';
import Queries from './pages/admin/Queries';
import Users from './pages/admin/Users';
import AuditLogs from './pages/admin/AuditLogs';
import Settings from './pages/admin/Settings';

type Page =
  | 'landing'
  | 'login'
  | 'signup'
  | 'admin-dashboard'
  | 'admin-applications'
  | 'admin-businesses'
  | 'admin-approvals'
  | 'admin-departments'
  | 'admin-knowledge'
  | 'admin-upload'
  | 'admin-document-detail'
  | 'admin-verification'
  | 'admin-rag'
  | 'admin-schemes'
  | 'admin-analytics'
  | 'admin-queries'
  | 'admin-users'
  | 'admin-audit'
  | 'admin-settings';

const adminPages = new Set<Page>([
  'admin-dashboard', 'admin-applications', 'admin-businesses', 'admin-approvals',
  'admin-departments', 'admin-knowledge', 'admin-upload', 'admin-document-detail',
  'admin-verification', 'admin-rag', 'admin-schemes', 'admin-analytics',
  'admin-queries', 'admin-users', 'admin-audit', 'admin-settings',
]);

export default function App() {
  const [page, setPage] = useState<Page>('landing');

  const navigate = (p: string) => setPage(p as Page);

  const isAdmin = adminPages.has(page);

  if (page === 'landing') return <Landing onNavigate={navigate} />;
  if (page === 'login') return <Login onNavigate={navigate} />;
  if (page === 'signup') return <Signup onNavigate={navigate} />;

  if (isAdmin) {
    return (
      <AdminLayout currentPage={page} onNavigate={navigate}>
        {page === 'admin-dashboard' && <Dashboard onNavigate={navigate} />}
        {page === 'admin-applications' && <Applications onNavigate={navigate} />}
        {page === 'admin-businesses' && <Businesses />}
        {page === 'admin-approvals' && <Approvals />}
        {page === 'admin-departments' && <Departments />}
        {page === 'admin-knowledge' && <KnowledgeLibrary onNavigate={navigate} />}
        {page === 'admin-upload' && <UploadDocument onNavigate={navigate} />}
        {page === 'admin-document-detail' && <DocumentDetail onNavigate={navigate} />}
        {page === 'admin-verification' && <DocumentVerification />}
        {page === 'admin-rag' && <RAGIntelligence />}
        {page === 'admin-schemes' && <Schemes />}
        {page === 'admin-analytics' && <Analytics />}
        {page === 'admin-queries' && <Queries />}
        {page === 'admin-users' && <Users />}
        {page === 'admin-audit' && <AuditLogs />}
        {page === 'admin-settings' && <Settings />}
      </AdminLayout>
    );
  }

  return null;
}
