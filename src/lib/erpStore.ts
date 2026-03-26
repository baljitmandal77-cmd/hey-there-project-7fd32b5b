// ============================================================
// Central ERP Data Store — shared state via React Context
// Sensitive fields are base64-obfuscated in localStorage
// ============================================================

export type Role = "student" | "teacher" | "admin" | "accountant" | "dev";

export interface ERPUser {
  id: string;
  username: string;
  password: string; // stored obfuscated
  name: string;
  role: Role;
  email: string;
  phone: string;
  address: string;
  photo?: string;
  active: boolean;
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
  bio?: string; // for dev profile
}

export interface Student {
  id: string;
  name: string;
  class: string;
  roll: number;
  phone: string;
  parentPhone: string;
  address: string;
  dob: string;
  fees: "Paid" | "Due" | "Partial";
  feesAmount: number;
  att: string;
  email: string;
  gender: string;
  photo?: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string;
  exp: string;
  phone: string;
  email: string;
  address: string;
  dob: string;
  status: "Active" | "On Leave";
  photo?: string;
  qualifications: string;
  joinDate: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  type: "general" | "urgent" | "exam" | "holiday" | "event";
  postedBy: string;
  postedAt: string;
  public: boolean; // true = shows on public website
  pinned: boolean;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  details: string;
  ip?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  type: string;
  status: "Paid" | "Pending" | "Partial";
  dueDate: string;
  paidDate?: string;
  receiptNo?: string;
  term: string;
}

export interface Message {
  id: string;
  from: string;
  fromRole: string;
  to: string; // "admin" or specific user id
  subject: string;
  body: string;
  sentAt: string;
  read: boolean;
}

// ---- Obfuscation helpers (NOT real encryption — demo only) ----
export const obfuscate = (s: string) => btoa(unescape(encodeURIComponent(s)));
export const deobfuscate = (s: string) => { try { return decodeURIComponent(escape(atob(s))); } catch { return s; } };

// ---- Audit log helper ----
export function addAudit(action: string, module: string, details: string, user?: { id: string; name: string; role: string }) {
  const u = user || (() => { try { return JSON.parse(localStorage.getItem("erp_user") || "{}"); } catch { return {}; } })();
  const entry: AuditEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    userId: u.id || "unknown",
    userName: u.name || "Unknown",
    userRole: u.role || "unknown",
    action,
    module,
    details,
  };
  try {
    const raw = localStorage.getItem("erp_audit") || "[]";
    const list: AuditEntry[] = JSON.parse(raw);
    list.unshift(entry);
    localStorage.setItem("erp_audit", JSON.stringify(list.slice(0, 500)));
  } catch { /* silent */ }
  return entry;
}

export function getAuditLog(filter?: { role?: string; module?: string }): AuditEntry[] {
  try {
    const list: AuditEntry[] = JSON.parse(localStorage.getItem("erp_audit") || "[]");
    if (!filter) return list;
    return list.filter(e =>
      (!filter.role || e.userRole === filter.role) &&
      (!filter.module || e.module === filter.module)
    );
  } catch { return []; }
}

// ---- Seed demo data ----
export function getSeedStudents(): Student[] {
  return [
    { id: "S2401", name: "Rahul Kumar", class: "XII-A", roll: 1, phone: "9876500001", parentPhone: "9876500099", address: "45 MG Road, Delhi - 110001", dob: "2006-03-15", fees: "Paid", feesAmount: 12000, att: "92%", email: "rahul@student.in", gender: "Male" },
    { id: "S2402", name: "Priya Sharma", class: "XII-A", roll: 2, phone: "9876500002", parentPhone: "9876500098", address: "12 Lajpat Nagar, Delhi - 110024", dob: "2006-07-22", fees: "Paid", feesAmount: 12000, att: "95%", email: "priya@student.in", gender: "Female" },
    { id: "S2403", name: "Aarav Singh", class: "XI-B", roll: 5, phone: "9876500003", parentPhone: "9876500097", address: "88 Rohini Sector 3, Delhi - 110085", dob: "2007-01-10", fees: "Due", feesAmount: 12000, att: "78%", email: "aarav@student.in", gender: "Male" },
    { id: "S2404", name: "Nisha Gupta", class: "X-C", roll: 12, phone: "9876500004", parentPhone: "9876500096", address: "33 Dwarka Sector 7, Delhi - 110075", dob: "2008-05-30", fees: "Paid", feesAmount: 10000, att: "88%", email: "nisha@student.in", gender: "Female" },
    { id: "S2405", name: "Rohan Mehta", class: "IX-A", roll: 7, phone: "9876500005", parentPhone: "9876500095", address: "56 Janakpuri, Delhi - 110058", dob: "2009-09-14", fees: "Due", feesAmount: 9000, att: "91%", email: "rohan@student.in", gender: "Male" },
  ];
}

export function getSeedTeachers(): Teacher[] {
  return [
    { id: "T001", name: "Mr. Rajesh Sharma", subject: "Mathematics", classes: "X, XI, XII", exp: "12 yrs", phone: "9876510001", email: "sharma@school.in", address: "101 Model Town, Delhi - 110009", dob: "1975-04-20", status: "Active", qualifications: "M.Sc. Mathematics, B.Ed.", joinDate: "2012-06-01" },
    { id: "T002", name: "Mrs. Sunita Gupta", subject: "Physics", classes: "XI, XII", exp: "8 yrs", phone: "9876510002", email: "gupta@school.in", address: "23 Pitampura, Delhi - 110034", dob: "1980-11-05", status: "Active", qualifications: "M.Sc. Physics, B.Ed.", joinDate: "2016-07-15" },
    { id: "T003", name: "Mr. Anil Verma", subject: "Chemistry", classes: "XI, XII", exp: "15 yrs", phone: "9876510003", email: "verma@school.in", address: "67 Mayur Vihar, Delhi - 110091", dob: "1972-08-18", status: "Active", qualifications: "M.Sc. Chemistry, B.Ed.", joinDate: "2009-04-10" },
    { id: "T004", name: "Mrs. Neha Joshi", subject: "English", classes: "IX, X, XI", exp: "6 yrs", phone: "9876510004", email: "joshi@school.in", address: "9 Saket, Delhi - 110017", dob: "1985-02-28", status: "On Leave", qualifications: "M.A. English, B.Ed.", joinDate: "2018-08-01" },
    { id: "T005", name: "Mr. Suresh Rajan", subject: "Computer Sc.", classes: "IX, X, XI, XII", exp: "9 yrs", phone: "9876510005", email: "rajan@school.in", address: "55 Karol Bagh, Delhi - 110005", dob: "1982-06-15", status: "Active", qualifications: "MCA, B.Ed.", joinDate: "2015-03-20" },
  ];
}

export function getSeedNotices(): Notice[] {
  return [
    { id: "N001", title: "Annual Sports Day – 25th March 2024", content: "Annual Sports Day will be held on 25th March 2024. All students must report by 8:00 AM in sports uniform. Parents are cordially invited.", type: "event", postedBy: "Admin", postedAt: "2024-03-20T09:00:00.000Z", public: true, pinned: true },
    { id: "N002", title: "Board Exam Admit Cards Available", content: "Board Exam Admit Cards for Class X & XII students are now available on the ERP Portal under the Results section. Students must collect a physical copy from the school office.", type: "exam", postedBy: "Admin", postedAt: "2024-03-18T10:30:00.000Z", public: true, pinned: true },
    { id: "N003", title: "Parent-Teacher Meeting – 30th March", content: "Parent-Teacher Meeting for Class X and XII is scheduled for 30th March 2024 from 10:00 AM to 2:00 PM. All parents are requested to attend.", type: "event", postedBy: "Admin", postedAt: "2024-03-15T11:00:00.000Z", public: true, pinned: false },
    { id: "N004", title: "Holiday on 29th March – Ram Navami", content: "The school will remain closed on 29th March 2024 on account of Ram Navami. Regular classes will resume on 30th March.", type: "holiday", postedBy: "Admin", postedAt: "2024-03-12T09:00:00.000Z", public: true, pinned: false },
    { id: "N005", title: "Science Exhibition Registration Open", content: "Registrations for the Annual Science Exhibition are now open. Students interested in participating must submit their project proposals by 5th April 2024.", type: "general", postedBy: "Admin", postedAt: "2024-03-10T14:00:00.000Z", public: false, pinned: false },
  ];
}

export function getSeedFeeRecords(): FeeRecord[] {
  return [
    { id: "F001", studentId: "S2401", studentName: "Rahul Kumar", amount: 12000, type: "Annual Fee", status: "Paid", dueDate: "2024-04-01", paidDate: "2024-03-20", receiptNo: "RCT-2401", term: "2023-24" },
    { id: "F002", studentId: "S2402", studentName: "Priya Sharma", amount: 12000, type: "Annual Fee", status: "Paid", dueDate: "2024-04-01", paidDate: "2024-03-18", receiptNo: "RCT-2402", term: "2023-24" },
    { id: "F003", studentId: "S2403", studentName: "Aarav Singh", amount: 12000, type: "Annual Fee", status: "Pending", dueDate: "2024-04-01", term: "2023-24" },
    { id: "F004", studentId: "S2404", studentName: "Nisha Gupta", amount: 10000, type: "Annual Fee", status: "Paid", dueDate: "2024-04-01", paidDate: "2024-03-15", receiptNo: "RCT-2404", term: "2023-24" },
    { id: "F005", studentId: "S2405", studentName: "Rohan Mehta", amount: 9000, type: "Annual Fee", status: "Pending", dueDate: "2024-04-01", term: "2023-24" },
  ];
}

export function getSeedMessages(): Message[] {
  return [
    { id: "M001", from: "Rajesh Kumar (Parent)", fromRole: "public", to: "admin", subject: "Enquiry about admission", body: "Dear Admin, I want to enquire about admission for my daughter in Class VI for session 2024-25. Please guide us on the procedure and required documents. Thank you.", sentAt: "2024-03-24T10:30:00.000Z", read: false },
    { id: "M002", from: "Suresh Mehta", fromRole: "public", to: "admin", subject: "Fee receipt not received", body: "Hello, I paid the annual fee for my son Rohan Mehta (Roll 7, IX-A) last week but have not received the receipt yet. Please check and send it. Regards.", sentAt: "2024-03-23T15:00:00.000Z", read: false },
    { id: "M003", from: "Anita Singh", fromRole: "public", to: "admin", subject: "Request for TC", body: "My son Aarav Singh (XI-B, Roll 5) is relocating. We need Transfer Certificate. Please let us know the process.", sentAt: "2024-03-21T09:00:00.000Z", read: true },
  ];
}

// Public site content — editable by Dev
export interface PublicContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  schoolName: string;
  established: string;
  affiliation: string;
  admissionsOpen: boolean;
  notices: Notice[];
}

export const DEFAULT_PUBLIC_CONTENT: PublicContent = {
  heroTitle: "Nurturing Minds, Building Futures",
  heroSubtitle: "Welcome to Bright Future Senior Secondary School — where quality education meets holistic development. Join a community of learners, thinkers, and future leaders.",
  aboutText: "Bright Future Senior Secondary School has been a beacon of educational excellence since 1995. Affiliated with CBSE, New Delhi, we offer holistic education from Class I to XII with state-of-the-art infrastructure and experienced faculty.",
  footerPhone: "+91 98765 43210",
  footerEmail: "info@brightfuture.edu.in",
  footerAddress: "123 School Road, Education Nagar, New Delhi - 110001",
  facebookUrl: "https://facebook.com/brightfutureschool",
  twitterUrl: "https://twitter.com/brightfutureschl",
  youtubeUrl: "https://youtube.com/@brightfutureschool",
  instagramUrl: "https://instagram.com/brightfutureschool",
  schoolName: "Bright Future Senior Secondary School",
  established: "1995",
  affiliation: "CBSE, New Delhi",
  admissionsOpen: true,
  notices: getSeedNotices(),
};

export function getPublicContent(): PublicContent {
  try {
    const raw = localStorage.getItem("erp_public_content");
    if (raw) return { ...DEFAULT_PUBLIC_CONTENT, ...JSON.parse(raw) };
  } catch { /* silent */ }
  return DEFAULT_PUBLIC_CONTENT;
}

export function setPublicContent(content: Partial<PublicContent>) {
  const current = getPublicContent();
  const updated = { ...current, ...content };
  localStorage.setItem("erp_public_content", JSON.stringify(updated));
  addAudit("UPDATE", "Public Content", `Updated public website content`);
  return updated;
}
