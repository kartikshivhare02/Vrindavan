import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Building2, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Vrindavan Group Indore",
  description: "The requested page could not be found. Explore residential real estate projects in Indore by Vrindavan Group.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] pt-36 pb-20 px-6 flex items-center justify-center bg-[#0a0f0c] text-white">
      <div className="max-w-xl text-center">
        <p className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-3">
          404 Error — Page Not Found
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
          Looking for Property in Indore?
        </h1>
        <p className="font-body text-white/70 text-sm sm:text-base leading-relaxed mb-8">
          The page or project you are looking for might have been moved or renamed. Explore our featured residential developments or get in touch with our team directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-base btn-gold w-full sm:w-auto px-6 py-3 text-xs flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/projects"
            className="btn-base bg-white/10 text-white hover:bg-white/20 border border-white/20 w-full sm:w-auto px-6 py-3 text-xs flex items-center justify-center gap-2"
          >
            <Building2 size={15} />
            <span>Explore All Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
