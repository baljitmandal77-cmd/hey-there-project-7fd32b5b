import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Check if dev user already exists
    const { data: existing } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("role", "dev")
      .limit(1);

    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ message: "Dev user already exists", skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create dev user
    const { data: devUser, error: devErr } = await supabaseAdmin.auth.admin.createUser({
      email: "dev@brightfuture.edu.in",
      password: "Dev@12345",
      email_confirm: true,
      user_metadata: { full_name: "System Developer", role: "dev", username: "developer" },
    });
    if (devErr) throw devErr;

    // Create admin user
    const { data: adminUser, error: adminErr } = await supabaseAdmin.auth.admin.createUser({
      email: "admin@brightfuture.edu.in",
      password: "Admin@12345",
      email_confirm: true,
      user_metadata: { full_name: "School Admin", role: "admin", username: "admin" },
    });
    if (adminErr) throw adminErr;

    // Create teacher user
    const { data: teacherUser, error: teacherErr } = await supabaseAdmin.auth.admin.createUser({
      email: "teacher@brightfuture.edu.in",
      password: "Teacher@12345",
      email_confirm: true,
      user_metadata: { full_name: "Mr. Rajesh Sharma", role: "teacher", username: "teacher" },
    });
    if (teacherErr) throw teacherErr;

    // Create student user
    const { data: studentUser, error: studentErr } = await supabaseAdmin.auth.admin.createUser({
      email: "student@brightfuture.edu.in",
      password: "Student@12345",
      email_confirm: true,
      user_metadata: { full_name: "Rahul Kumar", role: "student", username: "student" },
    });
    if (studentErr) throw studentErr;

    // Update dev profile with bio
    if (devUser?.user) {
      await supabaseAdmin.from("profiles").update({ 
        bio: "Full-stack developer managing school ERP system",
        phone: "+91 9876543210"
      }).eq("id", devUser.user.id);
    }

    // Seed default site content
    const defaultContent = [
      { key: "heroTitle", value: "Nurturing Minds, Building Futures" },
      { key: "heroSubtitle", value: "Welcome to Bright Future Senior Secondary School — where quality education meets holistic development." },
      { key: "aboutText", value: "Bright Future Senior Secondary School has been a beacon of educational excellence since 1995." },
      { key: "schoolName", value: "Bright Future Senior Secondary School" },
      { key: "footerPhone", value: "+91 98765 43210" },
      { key: "footerEmail", value: "info@brightfuture.edu.in" },
      { key: "footerAddress", value: "123 School Road, Education Nagar, New Delhi - 110001" },
      { key: "facebookUrl", value: "https://facebook.com/brightfutureschool" },
      { key: "twitterUrl", value: "https://twitter.com/brightfutureschl" },
      { key: "youtubeUrl", value: "https://youtube.com/@brightfutureschool" },
      { key: "instagramUrl", value: "https://instagram.com/brightfutureschool" },
    ];

    for (const item of defaultContent) {
      await supabaseAdmin.from("site_content").upsert(item, { onConflict: "key" });
    }

    // Seed notices
    const notices = [
      { title: "Annual Sports Day – 25th March 2024", content: "All students must report by 8:00 AM in sports uniform.", type: "event", posted_by: adminUser?.user?.id, posted_by_name: "School Admin", is_public: true, pinned: true },
      { title: "Board Exam Admit Cards Available", content: "Board Exam Admit Cards for Class X & XII are now available.", type: "exam", posted_by: adminUser?.user?.id, posted_by_name: "School Admin", is_public: true, pinned: true },
      { title: "Parent-Teacher Meeting – 30th March", content: "PTM for Class X and XII from 10:00 AM to 2:00 PM.", type: "event", posted_by: adminUser?.user?.id, posted_by_name: "School Admin", is_public: true, pinned: false },
    ];

    for (const notice of notices) {
      await supabaseAdmin.from("notices").insert(notice);
    }

    // Create student record
    if (studentUser?.user) {
      await supabaseAdmin.from("students").insert({
        user_id: studentUser.user.id,
        student_code: "S2401",
        class: "XII-A",
        roll_number: 1,
        parent_phone: "9876500099",
      });
    }

    // Create teacher record
    if (teacherUser?.user) {
      await supabaseAdmin.from("teachers").insert({
        user_id: teacherUser.user.id,
        teacher_code: "T001",
        subject: "Mathematics",
        classes: "X, XI, XII",
        experience: "12 yrs",
        qualifications: "M.Sc. Mathematics, B.Ed.",
        join_date: "2012-06-01",
      });
    }

    return new Response(JSON.stringify({ 
      message: "Seed data created successfully",
      users: {
        dev: "dev@brightfuture.edu.in / Dev@12345",
        admin: "admin@brightfuture.edu.in / Admin@12345",
        teacher: "teacher@brightfuture.edu.in / Teacher@12345",
        student: "student@brightfuture.edu.in / Student@12345",
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
