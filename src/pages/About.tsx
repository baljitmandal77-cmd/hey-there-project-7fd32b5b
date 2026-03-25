import { Users, BookOpen, Award, Heart, Target, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const team = [
  { name: "Dr. Rajesh Kumar", role: "Principal", exp: "25 years experience" },
  { name: "Mrs. Sunita Sharma", role: "Vice Principal", exp: "20 years experience" },
  { name: "Mr. Anil Verma", role: "Head of Science Dept.", exp: "18 years experience" },
  { name: "Mrs. Priya Singh", role: "Head of Commerce Dept.", exp: "15 years experience" },
  { name: "Mr. Vikas Yadav", role: "Sports Teacher", exp: "12 years experience" },
  { name: "Mrs. Neha Joshi", role: "Head of Arts Dept.", exp: "14 years experience" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">About Our School</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Building character, nurturing talent, and inspiring excellence since 1995.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Bright Future Senior Secondary School was established in 1995 with a vision to provide world-class education to students from all walks of life. Starting with just 5 classrooms and 150 students, we have grown into a premier institution with over 2,500 students and 120+ dedicated faculty members.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Affiliated with the Central Board of Secondary Education (CBSE), New Delhi, our school offers classes from I to XII with three streams — Science, Commerce, and Arts/Humanities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Over the years, our alumni have gone on to become doctors, engineers, IAS officers, entrepreneurs, and artists — making us proud every single day.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: "2,500+ Students" },
              { icon: BookOpen, label: "120+ Teachers" },
              { icon: Award, label: "85+ Awards" },
              { icon: Heart, label: "29 Years of Trust" },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="font-semibold text-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To be a globally recognized institution that nurtures intellectual curiosity, moral integrity, and social responsibility in every student. We envision graduates who are not just academically excellent but also compassionate human beings ready to lead in the 21st century.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To deliver quality education through innovative teaching methods, modern infrastructure, and a supportive learning environment. We are committed to the all-round development of every child — academic, physical, creative, and emotional — while instilling values of respect, integrity, and perseverance.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Leadership Team</h2>
            <p className="text-muted-foreground">Meet the dedicated professionals who guide our school</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <div className="text-primary text-sm font-medium">{member.role}</div>
                <div className="text-muted-foreground text-xs mt-1">{member.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
