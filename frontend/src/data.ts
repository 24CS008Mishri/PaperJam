// Mock data for PAPER JAM platform

export type AppStatus = 'Submitted' | 'Document Check' | 'Department Review' | 'Query' | 'Approved' | 'Rejected';
export type VerificationStatus = 'Verified' | 'Under Review' | 'Needs Correction' | 'Rejected' | 'Archived';
export type Priority = 'High' | 'Medium' | 'Low';
export type QueryStatus = 'Open' | 'Resolved' | 'Pending Reply';

export const applications = [
  { id: 'APP-2024-001', business: 'TechVentures Pvt Ltd', approval: 'Factory License', department: 'Industries Dept', sector: 'Manufacturing', location: 'Karnataka', status: 'Department Review' as AppStatus, documents: { submitted: 8, total: 10 }, sla: 3, lastUpdated: '2 hours ago', fee: '₹12,000' },
  { id: 'APP-2024-002', business: 'GreenFoods Co.', approval: 'FSSAI License', department: 'Food Safety', sector: 'Food & Beverage', location: 'Maharashtra', status: 'Document Check' as AppStatus, documents: { submitted: 5, total: 8 }, sla: 7, lastUpdated: '1 day ago', fee: '₹5,500' },
  { id: 'APP-2024-003', business: 'BuildRight Infra', approval: 'Construction Permit', department: 'Urban Development', sector: 'Construction', location: 'Delhi', status: 'Query' as AppStatus, documents: { submitted: 12, total: 12 }, sla: 1, lastUpdated: '3 hours ago', fee: '₹25,000' },
  { id: 'APP-2024-004', business: 'MediCare Labs', approval: 'Drug License', department: 'Health Dept', sector: 'Healthcare', location: 'Tamil Nadu', status: 'Approved' as AppStatus, documents: { submitted: 15, total: 15 }, sla: 0, lastUpdated: '5 days ago', fee: '₹8,000' },
  { id: 'APP-2024-005', business: 'AutoParts Hub', approval: 'Trade License', department: 'Municipal Corp', sector: 'Retail', location: 'Telangana', status: 'Submitted' as AppStatus, documents: { submitted: 3, total: 7 }, sla: 14, lastUpdated: '20 min ago', fee: '₹2,000' },
  { id: 'APP-2024-006', business: 'EduTech Academy', approval: 'Educational Institution', department: 'Education Dept', sector: 'Education', location: 'Gujarat', status: 'Approved' as AppStatus, documents: { submitted: 10, total: 10 }, sla: 0, lastUpdated: '1 week ago', fee: '₹15,000' },
  { id: 'APP-2024-007', business: 'SolarGen Energy', approval: 'Power Generation License', department: 'Energy Dept', sector: 'Energy', location: 'Rajasthan', status: 'Department Review' as AppStatus, documents: { submitted: 9, total: 11 }, sla: 2, lastUpdated: '6 hours ago', fee: '₹45,000' },
];

export const businesses = [
  { id: 'BIZ-001', name: 'TechVentures Pvt Ltd', type: 'Private Limited', sector: 'Manufacturing', location: 'Bengaluru, Karnataka', activeApps: 2, status: 'Active', gst: '29AABCT1234A1Z5', pan: 'AABCT1234A', founded: '2019', employees: '150–250' },
  { id: 'BIZ-002', name: 'GreenFoods Co.', type: 'Partnership', sector: 'Food & Beverage', location: 'Pune, Maharashtra', activeApps: 1, status: 'Active', gst: '27AAFCG5678B1Z1', pan: 'AAFCG5678B', founded: '2021', employees: '50–100' },
  { id: 'BIZ-003', name: 'BuildRight Infra', type: 'LLP', sector: 'Construction', location: 'New Delhi', activeApps: 3, status: 'Active', gst: '07AABCB9012C1Z3', pan: 'AABCB9012C', founded: '2017', employees: '500+' },
  { id: 'BIZ-004', name: 'MediCare Labs', type: 'Private Limited', sector: 'Healthcare', location: 'Chennai, Tamil Nadu', activeApps: 0, status: 'Compliant', gst: '33AABCM3456D1Z7', pan: 'AABCM3456D', founded: '2015', employees: '100–150' },
  { id: 'BIZ-005', name: 'AutoParts Hub', type: 'Proprietorship', sector: 'Retail', location: 'Hyderabad, Telangana', activeApps: 1, status: 'Active', gst: '36AABCA7890E1Z2', pan: 'AABCA7890E', founded: '2022', employees: '10–25' },
  { id: 'BIZ-006', name: 'SolarGen Energy', type: 'Public Limited', sector: 'Energy', location: 'Jaipur, Rajasthan', activeApps: 1, status: 'Active', gst: '08AABCS2345F1Z9', pan: 'AABCS2345F', founded: '2018', employees: '250–500' },
];

export const approvals = [
  { id: 'APR-001', name: 'Factory License', department: 'Industries Department', sector: 'Manufacturing', location: 'All States', sla: '30 days', fee: '₹5,000–₹50,000', renewal: 'Annual', docs: ['Incorporation Certificate', 'Land Records', 'NOC Fire Dept', 'Pollution Board NOC', 'Building Plan'], status: 'Active' },
  { id: 'APR-002', name: 'FSSAI Central License', department: 'Food Safety & Standards Authority', sector: 'Food & Beverage', location: 'All States', sla: '60 days', fee: '₹7,500', renewal: 'Annual', docs: ['PAN Card', 'GST Certificate', 'Food Safety Plan', 'Lab Report'], status: 'Active' },
  { id: 'APR-003', name: 'Drug Manufacturing License', department: 'Central Drugs Standard Control', sector: 'Healthcare/Pharma', location: 'All States', sla: '90 days', fee: '₹25,000', renewal: '5 Years', docs: ['Qualified Person Certificate', 'Manufacturing Site Plan', 'Equipment List', 'GMP Compliance'], status: 'Active' },
  { id: 'APR-004', name: 'Trade License', department: 'Municipal Corporation', sector: 'Retail/Commercial', location: 'City-specific', sla: '15 days', fee: '₹1,000–₹10,000', renewal: 'Annual', docs: ['Shop Establishment Proof', 'Owner ID', 'Address Proof', 'NOC'], status: 'Active' },
  { id: 'APR-005', name: 'Environmental Clearance', department: 'Ministry of Environment', sector: 'All', location: 'All States', sla: '105 days', fee: '₹10,000', renewal: '5–10 Years', docs: ['EIA Report', 'Site Layout', 'ToR Documents', 'Pollution Control Plan'], status: 'Active' },
  { id: 'APR-006', name: 'Power Generation License', department: 'Central Electricity Authority', sector: 'Energy', location: 'All States', sla: '180 days', fee: '₹1,00,000', renewal: '25 Years', docs: ['Technical Feasibility Report', 'Land Documents', 'Grid Connectivity Approval'], status: 'Active' },
];

export const departments = [
  { id: 'DEP-001', name: 'Industries Department', state: 'Karnataka', pending: 24, processed: 156, slaRisk: 3, officers: 8, color: 'purple' },
  { id: 'DEP-002', name: 'Food Safety Authority', state: 'Central', pending: 18, processed: 203, slaRisk: 1, officers: 5, color: 'amber' },
  { id: 'DEP-003', name: 'Urban Development', state: 'Delhi', pending: 31, processed: 89, slaRisk: 7, officers: 12, color: 'rose' },
  { id: 'DEP-004', name: 'Health Department', state: 'Tamil Nadu', pending: 12, processed: 178, slaRisk: 0, officers: 6, color: 'teal' },
  { id: 'DEP-005', name: 'Municipal Corporation', state: 'Telangana', pending: 42, processed: 312, slaRisk: 5, officers: 15, color: 'orange' },
  { id: 'DEP-006', name: 'Energy Department', state: 'Rajasthan', pending: 8, processed: 67, slaRisk: 2, officers: 4, color: 'blue' },
];

export const knowledgeFolders = [
  { id: 'KF-01', name: 'Acts & Rules', files: 124, lastUpdated: 'Sep 18, 2026', color: 'purple', accentColor: '#7C3AED', borderColor: '#DDD6FE', bgColor: '#F5F3FF', docColors: ['#EDE9FE','#DDD6FE','#C4B5FD'] },
  { id: 'KF-02', name: 'Department Notifications', files: 86, lastUpdated: 'Sep 20, 2026', color: 'amber', accentColor: '#D97706', borderColor: '#FDE68A', bgColor: '#FFFBEB', docColors: ['#FEF3C7','#FDE68A','#FCD34D'] },
  { id: 'KF-03', name: 'Government Circulars', files: 203, lastUpdated: 'Sep 22, 2026', color: 'rose', accentColor: '#E11D48', borderColor: '#FECDD3', bgColor: '#FFF1F2', docColors: ['#FFE4E6','#FECDD3','#FDA4AF'] },
  { id: 'KF-04', name: 'Approval Requirements', files: 73, lastUpdated: 'Sep 19, 2026', color: 'violet', accentColor: '#6D28D9', borderColor: '#C4B5FD', bgColor: '#EDE9FE', docColors: ['#EDE9FE','#C4B5FD','#A78BFA'] },
  { id: 'KF-05', name: 'SOPs & Guidelines', files: 42, lastUpdated: 'Sep 15, 2026', color: 'orange', accentColor: '#EA580C', borderColor: '#FED7AA', bgColor: '#FFF7ED', docColors: ['#FFEDD5','#FED7AA','#FDBA74'] },
  { id: 'KF-06', name: 'Schemes & Incentives', files: 38, lastUpdated: 'Sep 21, 2026', color: 'amber', accentColor: '#B45309', borderColor: '#FCD34D', bgColor: '#FFFBEB', docColors: ['#FEF3C7','#FCD34D','#F59E0B'] },
  { id: 'KF-07', name: 'Application Templates', files: 26, lastUpdated: 'Sep 10, 2026', color: 'teal', accentColor: '#0F766E', borderColor: '#99F6E4', bgColor: '#F0FDFA', docColors: ['#CCFBF1','#99F6E4','#5EEAD4'] },
  { id: 'KF-08', name: 'Archived Documents', files: 512, lastUpdated: 'Aug 30, 2026', color: 'gray', accentColor: '#6B7280', borderColor: '#E5E7EB', bgColor: '#F9FAFB', docColors: ['#F3F4F6','#E5E7EB','#D1D5DB'] },
];

export const documents = [
  { id: 'DOC-001', name: 'Factories Act 1948 - Consolidated', folder: 'Acts & Rules', authority: 'Ministry of Labour', type: 'Act', version: 'v4.2', effectiveDate: 'Jan 1, 2020', status: 'Verified' as VerificationStatus, size: '2.4 MB', indexed: true, usage: 127 },
  { id: 'DOC-002', name: 'FSSAI Licensing Regulations 2011', folder: 'Approval Requirements', authority: 'FSSAI', type: 'Regulation', version: 'v2.1', effectiveDate: 'Aug 5, 2018', status: 'Verified' as VerificationStatus, size: '1.8 MB', indexed: true, usage: 89 },
  { id: 'DOC-003', name: 'Drug & Cosmetics Act Rules', folder: 'Acts & Rules', authority: 'CDSCO', type: 'Act', version: 'v5.0', effectiveDate: 'Mar 12, 2022', status: 'Under Review' as VerificationStatus, size: '4.2 MB', indexed: false, usage: 0 },
  { id: 'DOC-004', name: 'Environmental Impact Assessment Notification', folder: 'Department Notifications', authority: 'MoEFCC', type: 'Notification', version: 'v1.3', effectiveDate: 'Sep 14, 2006', status: 'Needs Correction' as VerificationStatus, size: '890 KB', indexed: false, usage: 0 },
  { id: 'DOC-005', name: 'MSME Registration SOP', folder: 'SOPs & Guidelines', authority: 'MSME Ministry', type: 'SOP', version: 'v3.0', effectiveDate: 'Jul 1, 2023', status: 'Verified' as VerificationStatus, size: '560 KB', indexed: true, usage: 203 },
];

export const ragActivity = [
  { id: 'RAG-001', question: 'What documents are required for FSSAI Central License?', sources: ['FSSAI Licensing Regulations 2011', 'FSSAI Circular 2019'], chunks: 4, guidance: 'For FSSAI Central License, you need: PAN Card, GST Certificate, Food Safety Plan, Lab Analysis Report, and List of Directors/Partners.', timestamp: '10:24 AM, Sep 24', business: 'GreenFoods Co.' },
  { id: 'RAG-002', question: 'How long does environmental clearance take?', sources: ['EIA Notification 2006', 'MoEFCC Circular 2020'], chunks: 3, guidance: 'Environmental Clearance (EC) typically takes 105–210 days depending on project category. Category A projects require central clearance while Category B projects are cleared at state level.', timestamp: '9:55 AM, Sep 24', business: 'SolarGen Energy' },
  { id: 'RAG-003', question: 'Eligibility criteria for Startup India recognition', sources: ['Startup India Policy 2016', 'DPIIT Notification 2022'], chunks: 5, guidance: 'To be eligible for Startup India recognition: Business must be incorporated within last 10 years, annual turnover below ₹100 crore, working towards innovation/improvement.', timestamp: '9:12 AM, Sep 24', business: 'TechVentures Pvt Ltd' },
];

export const schemes = [
  { id: 'SCH-001', name: 'Production Linked Incentive (PLI)', sector: 'Manufacturing', location: 'All India', benefit: '4–6% incentive on incremental sales', deadline: 'Dec 31, 2026', eligibility: 'Companies with ₹100 Cr+ turnover', status: 'Active' },
  { id: 'SCH-002', name: 'Startup India Seed Fund', sector: 'Technology/Innovation', location: 'All India', benefit: 'Up to ₹20 Lakhs grant + ₹50 Lakhs equity', deadline: 'Rolling', eligibility: 'DPIIT recognized startups < 2 years old', status: 'Active' },
  { id: 'SCH-003', name: 'MSME Credit Guarantee Scheme', sector: 'All MSME', location: 'All India', benefit: 'Credit guarantee up to ₹5 Crore', deadline: 'Ongoing', eligibility: 'Registered MSMEs', status: 'Active' },
  { id: 'SCH-004', name: 'Udyam Assistance Program', sector: 'Small Enterprises', location: 'Karnataka', benefit: '25% subsidy on machinery', deadline: 'Mar 31, 2027', eligibility: 'Small enterprises with < 50 employees', status: 'Active' },
];

export const queries = [
  { id: 'QRY-001', business: 'BuildRight Infra', application: 'APP-2024-003', department: 'Urban Development', priority: 'High' as Priority, status: 'Open' as QueryStatus, assigned: 'Priya Menon', created: 'Sep 23, 2026', subject: 'Site plan clarification required for basement parking area' },
  { id: 'QRY-002', business: 'GreenFoods Co.', application: 'APP-2024-002', department: 'Food Safety', priority: 'Medium' as Priority, status: 'Pending Reply' as QueryStatus, assigned: 'Rahul Sharma', created: 'Sep 22, 2026', subject: 'Lab test reports need NABL accredited lab certification' },
  { id: 'QRY-003', business: 'TechVentures Pvt Ltd', application: 'APP-2024-001', department: 'Industries Dept', priority: 'Low' as Priority, status: 'Resolved' as QueryStatus, assigned: 'Anita Kumar', created: 'Sep 20, 2026', subject: 'Pollution board NOC validity period confirmation' },
  { id: 'QRY-004', business: 'SolarGen Energy', application: 'APP-2024-007', department: 'Energy Dept', priority: 'High' as Priority, status: 'Open' as QueryStatus, assigned: 'Vikram Singh', created: 'Sep 24, 2026', subject: 'Grid connectivity approval from DISCOM required before processing' },
];

export const users = [
  { id: 'USR-001', name: 'Arjun Mehta', email: 'arjun.mehta@paperjam.gov.in', role: 'Admin', department: 'Platform Admin', status: 'Active', lastActive: '2 min ago', avatar: 'AM' },
  { id: 'USR-002', name: 'Priya Menon', email: 'priya.menon@urban.delhi.gov.in', role: 'Department Officer', department: 'Urban Development', status: 'Active', lastActive: '1 hour ago', avatar: 'PM' },
  { id: 'USR-003', name: 'Rahul Sharma', email: 'rahul.sharma@fssai.gov.in', role: 'Department Officer', department: 'Food Safety', status: 'Active', lastActive: '3 hours ago', avatar: 'RS' },
  { id: 'USR-004', name: 'Kavitha Nair', email: 'kavitha.n@greenfoodsco.com', role: 'Entrepreneur', department: '—', status: 'Active', lastActive: '5 hours ago', avatar: 'KN' },
  { id: 'USR-005', name: 'Vikram Singh', email: 'vikram.singh@energy.raj.gov.in', role: 'Department Officer', department: 'Energy Dept', status: 'Active', lastActive: '30 min ago', avatar: 'VS' },
  { id: 'USR-006', name: 'Sunita Patel', email: 'sunita.p@techventures.in', role: 'Entrepreneur', department: '—', status: 'Inactive', lastActive: '3 days ago', avatar: 'SP' },
  { id: 'USR-007', name: 'Anita Kumar', email: 'anita.kumar@industries.kar.gov.in', role: 'Department Officer', department: 'Industries Dept', status: 'Active', lastActive: '45 min ago', avatar: 'AK' },
];

export const auditLogs = [
  { id: 'AUD-001', user: 'Arjun Mehta', action: 'Document Verified', entity: 'Factories Act 1948', timestamp: '10:45 AM, Sep 24, 2026', prev: 'Under Review', next: 'Verified', ip: '10.0.1.42' },
  { id: 'AUD-002', user: 'Priya Menon', action: 'Query Created', entity: 'APP-2024-003', timestamp: '10:12 AM, Sep 24, 2026', prev: 'Department Review', next: 'Query', ip: '10.0.2.18' },
  { id: 'AUD-003', user: 'System', action: 'SLA Alert Triggered', entity: 'APP-2024-003', timestamp: '9:00 AM, Sep 24, 2026', prev: '2 days remaining', next: '1 day remaining', ip: 'system' },
  { id: 'AUD-004', user: 'Rahul Sharma', action: 'Document Requested', entity: 'APP-2024-002', timestamp: '8:30 AM, Sep 24, 2026', prev: 'Document Check', next: 'Query', ip: '10.0.3.55' },
  { id: 'AUD-005', user: 'Arjun Mehta', action: 'User Created', entity: 'Vikram Singh', timestamp: '6:00 PM, Sep 23, 2026', prev: '—', next: 'Department Officer', ip: '10.0.1.42' },
  { id: 'AUD-006', user: 'Anita Kumar', action: 'Application Approved', entity: 'APP-2024-004', timestamp: '3:45 PM, Sep 23, 2026', prev: 'Department Review', next: 'Approved', ip: '10.0.4.91' },
];
