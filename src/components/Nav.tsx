"use client";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
  { href: "/cv", label: "CV" },
];

export default function Nav({ scroll }: { scroll: number }) {
  const opaque = scroll > 80;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        opaque ? "bg-[#050810]/85 backdrop-blur-md border-b border-cyan-900/30" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-mono text-cyan-400 text-sm tracking-wider">
          HZ<span className="text-white">.</span>
        </a>
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
