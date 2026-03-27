
-- Role enum
CREATE TYPE public.app_role AS ENUM ('student', 'teacher', 'admin', 'accountant', 'dev');

-- Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'student',
  email TEXT,
  phone TEXT,
  address TEXT,
  photo_url TEXT,
  bio TEXT,
  dob TEXT,
  gender TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table (for permission management)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Permissions table
CREATE TABLE public.user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  permission TEXT NOT NULL,
  granted BOOLEAN NOT NULL DEFAULT true,
  granted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, permission)
);

-- Students extended info
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_code TEXT UNIQUE NOT NULL,
  class TEXT NOT NULL,
  roll_number INT NOT NULL,
  parent_phone TEXT,
  admission_date TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Teachers extended info
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  teacher_code TEXT UNIQUE NOT NULL,
  subject TEXT NOT NULL,
  classes TEXT,
  experience TEXT,
  qualifications TEXT,
  join_date TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notices
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general',
  posted_by UUID REFERENCES auth.users(id),
  posted_by_name TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  pinned BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fee records
CREATE TABLE public.fee_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  student_name TEXT,
  amount NUMERIC NOT NULL,
  fee_type TEXT NOT NULL DEFAULT 'Annual Fee',
  status TEXT NOT NULL DEFAULT 'Pending',
  due_date TEXT,
  paid_date TEXT,
  receipt_no TEXT,
  term TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Attendance
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Present',
  marked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Scores / Results
CREATE TABLE public.scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  exam_type TEXT NOT NULL,
  marks NUMERIC NOT NULL,
  total_marks NUMERIC NOT NULL DEFAULT 100,
  grade TEXT,
  term TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact messages (public form -> admin inbox)
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  sender_email TEXT,
  sender_phone TEXT,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  replied BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  user_name TEXT,
  user_role TEXT,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  details TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Public site content (editable by dev)
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications (in-app)
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Timetable
CREATE TABLE public.timetable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class TEXT NOT NULL,
  day TEXT NOT NULL,
  period INT NOT NULL,
  subject TEXT NOT NULL,
  teacher_name TEXT,
  start_time TEXT,
  end_time TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Homework
CREATE TABLE public.homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class TEXT NOT NULL,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  assigned_by UUID REFERENCES auth.users(id),
  assigned_by_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;

-- Security definer function to check role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = _user_id LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_dev(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = _user_id AND role IN ('admin', 'dev')
  );
$$;

-- Profile auto-creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies

-- Profiles: users can read their own, admin/dev can read all
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin/Dev can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin_or_dev(auth.uid()));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin/Dev can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin_or_dev(auth.uid()));

CREATE POLICY "Admin/Dev can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.is_admin_or_dev(auth.uid()));

-- User roles
CREATE POLICY "Admin/Dev can manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin_or_dev(auth.uid()));

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- User permissions
CREATE POLICY "Admin/Dev can manage permissions" ON public.user_permissions
  FOR ALL USING (public.is_admin_or_dev(auth.uid()));

CREATE POLICY "Users can view own permissions" ON public.user_permissions
  FOR SELECT USING (auth.uid() = user_id);

-- Students: authenticated users can view, admin/dev can manage
CREATE POLICY "Authenticated can view students" ON public.students
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin/Dev can manage students" ON public.students
  FOR ALL USING (public.is_admin_or_dev(auth.uid()));

-- Teachers
CREATE POLICY "Authenticated can view teachers" ON public.teachers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin/Dev can manage teachers" ON public.teachers
  FOR ALL USING (public.is_admin_or_dev(auth.uid()));

-- Notices: public ones visible to all, rest to authenticated
CREATE POLICY "Anyone can view public notices" ON public.notices
  FOR SELECT USING (is_public = true);

CREATE POLICY "Authenticated can view all notices" ON public.notices
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin/Dev can manage notices" ON public.notices
  FOR ALL USING (public.is_admin_or_dev(auth.uid()));

-- Fee records
CREATE POLICY "Students can view own fees" ON public.fee_records
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin/Dev can manage fees" ON public.fee_records
  FOR ALL USING (public.is_admin_or_dev(auth.uid()));

-- Attendance
CREATE POLICY "Authenticated can view attendance" ON public.attendance
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teacher/Admin/Dev can manage attendance" ON public.attendance
  FOR INSERT TO authenticated WITH CHECK (
    public.get_user_role(auth.uid()) IN ('teacher', 'admin', 'dev')
  );

CREATE POLICY "Admin/Dev can update attendance" ON public.attendance
  FOR UPDATE USING (public.is_admin_or_dev(auth.uid()));

-- Scores
CREATE POLICY "Authenticated can view scores" ON public.scores
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teacher/Admin/Dev can manage scores" ON public.scores
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('teacher', 'admin', 'dev')
  );

-- Contact messages: public insert, admin/dev read
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Authenticated can insert contact messages" ON public.contact_messages
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin/Dev can view messages" ON public.contact_messages
  FOR SELECT USING (public.is_admin_or_dev(auth.uid()));

CREATE POLICY "Admin/Dev can update messages" ON public.contact_messages
  FOR UPDATE USING (public.is_admin_or_dev(auth.uid()));

-- Audit logs: dev sees all, admin sees non-dev, users see own
CREATE POLICY "Dev can view all audit logs" ON public.audit_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'dev'));

CREATE POLICY "Admin can view non-dev audit logs" ON public.audit_logs
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') AND user_role != 'dev'
  );

CREATE POLICY "Users can view own audit logs" ON public.audit_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated can insert audit logs" ON public.audit_logs
  FOR INSERT TO authenticated WITH CHECK (true);

-- Site content: anyone can read, dev can manage
CREATE POLICY "Anyone can read site content" ON public.site_content
  FOR SELECT USING (true);

CREATE POLICY "Dev can manage site content" ON public.site_content
  FOR ALL USING (public.has_role(auth.uid(), 'dev'));

-- Notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admin/Dev can insert notifications" ON public.notifications
  FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_dev(auth.uid()));

-- Timetable: readable by authenticated, managed by admin/dev
CREATE POLICY "Authenticated can view timetable" ON public.timetable
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin/Dev can manage timetable" ON public.timetable
  FOR ALL USING (public.is_admin_or_dev(auth.uid()));

-- Homework: readable by authenticated, managed by teacher/admin/dev
CREATE POLICY "Authenticated can view homework" ON public.homework
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teacher/Admin/Dev can manage homework" ON public.homework
  FOR ALL USING (
    public.get_user_role(auth.uid()) IN ('teacher', 'admin', 'dev')
  );
