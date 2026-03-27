
-- Fix permissive INSERT policies

-- Contact messages: validate that required fields are non-empty
DROP POLICY "Anyone can insert contact messages" ON public.contact_messages;
DROP POLICY "Authenticated can insert contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  FOR INSERT TO anon WITH CHECK (
    sender_name IS NOT NULL AND length(sender_name) > 0 AND
    subject IS NOT NULL AND length(subject) > 0 AND
    body IS NOT NULL AND length(body) > 0
  );

CREATE POLICY "Authenticated can insert contact messages" ON public.contact_messages
  FOR INSERT TO authenticated WITH CHECK (
    sender_name IS NOT NULL AND length(sender_name) > 0 AND
    subject IS NOT NULL AND length(subject) > 0 AND
    body IS NOT NULL AND length(body) > 0
  );

-- Audit logs: only the acting user can insert their own log
DROP POLICY "Authenticated can insert audit logs" ON public.audit_logs;

CREATE POLICY "Authenticated can insert own audit logs" ON public.audit_logs
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
