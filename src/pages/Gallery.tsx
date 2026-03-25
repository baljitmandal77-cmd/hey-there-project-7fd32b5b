import { Image } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Annual Day", "Sports", "Science Fair", "Classroom", "Cultural", "Awards"];

const galleryItems = [
  { cat: "Annual Day", title: "Annual Day 2023", color: "from-blue-400 to-blue-600" },
  { cat: "Sports", title: "Cricket Tournament", color: "from-green-400 to-green-600" },
  { cat: "Science Fair", title: "Science Exhibition", color: "from-purple-400 to-purple-600" },
  { cat: "Cultural", title: "Independence Day", color: "from-orange-400 to-orange-600" },
  { cat: "Classroom", title: "Smart Classroom", color: "from-cyan-400 to-cyan-600" },
  { cat: "Awards", title: "Prize Distribution", color: "from-yellow-400 to-yellow-600" },
  { cat: "Sports", title: "Basketball Match", color: "from-red-400 to-red-600" },
  { cat: "Cultural", title: "Republic Day", color: "from-teal-400 to-teal-600" },
  { cat: "Annual Day", title: "Farewell 2023", color: "from-pink-400 to-pink-600" },
  { cat: "Science Fair", title: "Innovation Contest", color: "from-indigo-400 to-indigo-600" },
  { cat: "Classroom", title: "Lab Session", color: "from-emerald-400 to-emerald-600" },
  { cat: "Awards", title: "Board Results Celebration", color: "from-amber-400 to-amber-600" },
];

export default function Gallery() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">School Gallery</h1>
          <p className="text-white/70 text-lg">Capturing memories, celebrating achievements</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === "All"
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden aspect-square bg-gradient-to-br ${item.color} group cursor-pointer hover:scale-105 transition-transform duration-200`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Image className="w-10 h-10 mb-2 opacity-60" />
                  <div className="text-xs opacity-60 mb-1">{item.cat}</div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <div className="text-white font-semibold text-sm">{item.title}</div>
                    <div className="text-white/70 text-xs">{item.cat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-8">
            * Gallery images are placeholders. Upload real photos through the Admin ERP panel.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
