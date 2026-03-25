import { BookOpen, FlaskConical, Calculator, Globe, Music, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const streams = [
  {
    title: "Science Stream",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology / Computer Science", "English", "Physical Education"],
    desc: "Ideal for students aspiring to become doctors, engineers, scientists, or IT professionals.",
    icon: FlaskConical,
    color: "border-blue-400 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    title: "Commerce Stream",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics / Informatics Practices", "English"],
    desc: "Perfect for future CAs, MBAs, bankers, entrepreneurs, and business leaders.",
    icon: Calculator,
    color: "border-green-400 bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
  {
    title: "Arts / Humanities",
    subjects: ["History", "Geography", "Political Science", "Psychology", "English Literature", "Fine Arts"],
    desc: "Best for students interested in civil services, law, journalism, design, and social sciences.",
    icon: Globe,
    color: "border-purple-400 bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
  },
];

const activities = [
  { icon: Music, title: "Music & Arts", desc: "Vocal, instrumental, and fine arts programs" },
  { icon: Trophy, title: "Sports", desc: "Cricket, Basketball, Football, Badminton, Athletics" },
  { icon: BookOpen, title: "Debate & Quiz", desc: "Regular inter-school competitions" },
  { icon: FlaskConical, title: "Science Club", desc: "Experiments, projects and innovation fairs" },
];

export default function Academics() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Academics</h1>
          <p className="text-white/70 text-lg">CBSE-affiliated curriculum designed to inspire and challenge</p>
        </div>
      </section>

      {/* Streams */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Academic Streams (Class XI – XII)</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {streams.map((stream) => (
              <div key={stream.title} className={`border-2 rounded-2xl p-6 hover:shadow-lg transition-shadow ${stream.color}`}>
                <stream.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{stream.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{stream.desc}</p>
                <div className="space-y-2">
                  {stream.subjects.map((sub) => (
                    <span key={sub} className={`inline-block px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1 ${stream.badge}`}>
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primary & Secondary */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Classes I – X</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Primary (I – V)</h3>
              <p className="text-muted-foreground text-sm mb-4">Activity-based, play-way methodology focusing on foundational literacy, numeracy, and creativity. Subject-wise teachers from Class III onwards.</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {["English, Hindi, Mathematics", "Environmental Science", "Computer Basics", "Art & Craft, Music, PE"].map(s => (
                  <li key={s} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" />{s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-3">Secondary (VI – X)</h3>
              <p className="text-muted-foreground text-sm mb-4">Comprehensive CBSE curriculum with specialized subject teachers, periodic assessments, and board exam preparation.</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {["Mathematics, Science, Social Science", "English Language & Literature", "Hindi / Sanskrit / French", "Computer Applications, Value Education"].map(s => (
                  <li key={s} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" />{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Co-curricular */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Co-Curricular Activities</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {activities.map((act) => (
              <div key={act.title} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <act.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{act.title}</h3>
                <p className="text-xs text-muted-foreground">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
