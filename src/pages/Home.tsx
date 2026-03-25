import { Link } from "react-router-dom";
import {
  BookOpen, Users, Trophy, Star, ArrowRight,
  Phone, Mail, MapPin, Calendar, Bell, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Students", value: "2,500+", icon: Users },
  { label: "Teachers", value: "120+", icon: BookOpen },
  { label: "Awards", value: "85+", icon: Trophy },
  { label: "Years of Excellence", value: "29+", icon: Star },
];

const notices = [
  { date: "20 Mar 2024", title: "Annual Sports Day – 25th March 2024" },
  { date: "18 Mar 2024", title: "Board Exam Admit Cards available on ERP Portal" },
  { date: "15 Mar 2024", title: "Parent-Teacher Meeting – Class X & XII" },
  { date: "10 Mar 2024", title: "Science Exhibition – Registration Open" },
];

const programs = [
  { title: "Science Stream", desc: "Physics, Chemistry, Biology / Maths with Computer Science", color: "bg-blue-50 border-blue-200" },
  { title: "Commerce Stream", desc: "Accountancy, Business Studies, Economics with Maths", color: "bg-green-50 border-green-200" },
  { title: "Arts / Humanities", desc: "History, Geography, Political Science, English Literature", color: "bg-purple-50 border-purple-200" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm mb-4">
              <Star className="w-4 h-4 text-gold" />
              <span>CBSE Affiliated School | Est. 1995</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Nurturing Minds,<br />
              <span className="text-gold">Building Futures</span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl">
              Welcome to Bright Future Senior Secondary School — where quality education meets holistic development. Join a community of learners, thinkers, and future leaders.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/admissions" className="px-6 py-3 bg-gold text-gold-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                Apply for Admission <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-5 text-center">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Board */}
      <section className="bg-primary py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0 bg-gold text-gold-foreground px-3 py-1 rounded font-semibold text-sm">
            <Bell className="w-4 h-4" />
            NOTICES
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-8 animate-marquee whitespace-nowrap text-primary-foreground text-sm">
              {notices.map((n) => (
                <span key={n.title} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 shrink-0" />
                  <span className="text-white/70">{n.date}:</span>
                  {n.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              About Our School
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Bright Future Senior Secondary School has been a beacon of educational excellence since 1995. Affiliated with CBSE, New Delhi, we offer holistic education from Class I to XII with state-of-the-art infrastructure and experienced faculty.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our philosophy is simple — every student deserves the best. We combine rigorous academics with co-curricular activities, sports, and value-based education.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Read More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Smart Classrooms", desc: "Digitally equipped learning spaces" },
              { title: "Science Labs", desc: "Modern Physics, Chemistry & Bio labs" },
              { title: "Sports Facilities", desc: "Cricket, Basketball, Football & more" },
              { title: "Library", desc: "10,000+ books & digital resources" },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academics */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Academic Programs</h2>
            <p className="text-muted-foreground">Choose your path to success with our diverse streams</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div key={prog.title} className={`bg-card border-2 rounded-xl p-6 hover:shadow-lg transition-shadow ${prog.color}`}>
                <BookOpen className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-bold text-lg text-foreground mb-2">{prog.title}</h3>
                <p className="text-muted-foreground text-sm">{prog.desc}</p>
                <Link to="/academics" className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                  View Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notices */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Latest Notices</h2>
            <Link to="/contact" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {notices.map((notice) => (
              <div key={notice.title} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{notice.date}</div>
                  <div className="font-medium text-foreground">{notice.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 gradient-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our School Family?</h2>
          <p className="text-white/80 mb-8">
            Admissions for 2024-25 are now open. Give your child the education they deserve.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/admissions" className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity">
              Apply Now
            </Link>
            <Link to="/contact" className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@brightfuture.edu.in</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New Delhi, India</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
