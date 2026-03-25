import { CheckCircle, FileText, Calendar, Phone, Mail, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { step: "01", title: "Fill Online Form", desc: "Complete the admission form available on ERP portal or school office." },
  { step: "02", title: "Submit Documents", desc: "Submit required documents: TC, marksheet, birth certificate, Aadhaar card, photos." },
  { step: "03", title: "Entrance Test", desc: "Appear for the entrance / interaction test at the school campus." },
  { step: "04", title: "Confirmation", desc: "Receive confirmation and pay admission fee to confirm your seat." },
];

const docs = [
  "Transfer Certificate from previous school",
  "Mark Sheet of last examination",
  "Birth Certificate",
  "Aadhaar Card (Student & Parents)",
  "Caste Certificate (if applicable)",
  "4 Passport size photographs",
  "Medical Certificate",
  "Character Certificate",
];

export default function Admissions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Admissions 2024–25</h1>
          <p className="text-white/70 text-lg">Admissions are now open. Secure your seat today!</p>
          <div className="mt-6 inline-flex items-center gap-2 bg-gold text-gold-foreground px-5 py-2 rounded-full font-semibold text-sm">
            <AlertCircle className="w-4 h-4" />
            Limited Seats Available
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow relative">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Fee Structure (Annual)</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card border border-border rounded-2xl overflow-hidden">
              <thead className="gradient-primary text-primary-foreground">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Class</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Admission Fee (One-time)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Tuition Fee (Annual)</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Development Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cls: "Class I – V", admit: "₹5,000", tuition: "₹18,000", dev: "₹3,000" },
                  { cls: "Class VI – VIII", admit: "₹6,000", tuition: "₹22,000", dev: "₹3,500" },
                  { cls: "Class IX – X", admit: "₹7,000", tuition: "₹26,000", dev: "₹4,000" },
                  { cls: "Class XI – XII", admit: "₹8,000", tuition: "₹30,000", dev: "₹5,000" },
                ].map((row, i) => (
                  <tr key={row.cls} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                    <td className="px-6 py-3 text-sm font-medium text-foreground">{row.cls}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.admit}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.tuition}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.dev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" /> Required Documents
            </h2>
            <ul className="space-y-3">
              {docs.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" /> Important Dates
            </h2>
            <div className="space-y-4">
              {[
                { event: "Form Available", date: "1st January 2024" },
                { event: "Last Date to Apply", date: "31st March 2024" },
                { event: "Entrance Test", date: "15th April 2024" },
                { event: "Result Declaration", date: "20th April 2024" },
                { event: "Admission Confirmation", date: "30th April 2024" },
                { event: "Session Begins", date: "1st June 2024" },
              ].map((item) => (
                <div key={item.event} className="flex justify-between items-center bg-card border border-border rounded-lg px-4 py-3">
                  <span className="text-foreground font-medium text-sm">{item.event}</span>
                  <span className="text-primary text-sm font-semibold">{item.date}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-accent border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-3">For enquiries, contact us:</p>
              <div className="flex flex-col gap-2 text-sm">
                <span className="flex items-center gap-2 text-foreground"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</span>
                <span className="flex items-center gap-2 text-foreground"><Mail className="w-4 h-4 text-primary" /> admissions@brightfuture.edu.in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
