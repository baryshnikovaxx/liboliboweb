"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const COLORS = {
  bg: "#FFFFFF",
  fg: "#111111",
  accent: "#FF383C",
  soft: "#FFF6F7",
  border: "#E8DDE0",
};

const HEADER_OFFSET = 88;

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function HandUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute left-0 -bottom-2 z-0 w-full"
        height="12"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M3 8 C 25 2, 45 10, 70 6 S 120 10, 155 6 S 185 9, 197 5"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center px-5 py-3 text-sm font-bold tracking-wide uppercase transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white rounded-none";
  const styles =
    variant === "primary"
      ? "bg-[#FF383C] text-white hover:opacity-90 focus:ring-[#FF383C]"
      : "border border-[#FF383C]/45 text-[#B12024] hover:border-[#FF383C] hover:bg-[#FFF1F2] focus:ring-[#FF383C]/45";

  return (
    <button className={cn(base, styles, className)} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

function NavLinkButton({
  to,
  children,
  className = "",
  onNavigate,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToId(to);
        onNavigate?.();
      }}
      className={cn("text-xs font-bold uppercase tracking-[0.22em] text-black/70 hover:text-black", className)}
    >
      {children}
    </button>
  );
}

function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
}: {
  id: string;
  kicker?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  const hasHeading = Boolean(kicker || title || subtitle);

  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {kicker ? (
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-black/60">
            {kicker}
          </div>
        ) : null}
        {title ? (
          <h2 className="text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.03] text-black">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p className="mt-4 max-w-4xl text-[clamp(1.05rem,1.7vw,1.25rem)] leading-relaxed text-black/70">
            {subtitle}
          </p>
        ) : null}
        <div className={hasHeading ? "mt-10" : "mt-0"}>{children}</div>
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-auto overflow-hidden border border-[#E8DDE0] bg-white p-5 md:h-full md:p-7", className)}>
      <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#E8DDE0]" />;
}

function CoverPlaceholder({ label = "Cover", src }: { label?: string; src?: string }) {
  const [hasImageError, setHasImageError] = useState(false);

  if (src && !hasImageError) {
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-white/5">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 240px, 45vw"
          onError={() => setHasImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-white/5">
      <div className="absolute inset-0 opacity-40">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path
            d="M10 60 C 25 40, 40 80, 55 55 S 80 45, 92 62"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 18 L 88 18"
            fill="none"
            stroke="black"
            strokeOpacity="0.25"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M12 82 L 76 82"
            fill="none"
            stroke="black"
            strokeOpacity="0.15"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-3 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-black/60">
          {label}
        </span>
      </div>
    </div>
  );
}

function PodcastMosaic({ covers }: { covers: string[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tileOrder, setTileOrder] = useState<number[]>(() => Array.from({ length: 9 }, (_, index) => index));
  const tiles = Array.from({ length: 9 }, (_, index) => covers[index % covers.length]);

  useEffect(() => {
    if (!isHovered) return;

    const timer = window.setInterval(() => {
      setTileOrder((prev) => {
        const next = [...prev];
        const first = Math.floor(Math.random() * next.length);
        let second = Math.floor(Math.random() * next.length);
        while (second === first) {
          second = Math.floor(Math.random() * next.length);
        }

        [next[first], next[second]] = [next[second], next[first]];
        return next;
      });
    }, 1400);

    return () => window.clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      className="relative aspect-square w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {tiles.map((src, tileIndex) => {
        const slot = tileOrder[tileIndex];
        const row = Math.floor(slot / 3);
        const col = slot % 3;

        return (
          <div
            key={`tile-${tileIndex}`}
            className="absolute overflow-hidden border border-[#E8DDE0] bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: "calc((100% - 1.5rem) / 3)",
              height: "calc((100% - 1.5rem) / 3)",
              left: `calc(${col} * ((100% - 1.5rem) / 3 + 0.75rem))`,
              top: `calc(${row} * ((100% - 1.5rem) / 3 + 0.75rem))`,
            }}
          >
            <Image
              src={src}
              alt="Libo/Libo podcast cover"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 460px, 44vw"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function EnPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [knownEmail, setKnownEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!isMenuOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedEmail = window.localStorage.getItem("business_contact_email");
    if (savedEmail) {
      setKnownEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (!isThankYouOpen) return;
    const timer = window.setTimeout(() => setIsThankYouOpen(false), 4500);
    return () => window.clearTimeout(timer);
  }, [isThankYouOpen]);

  const menuItems = [
    { to: "production", label: "Production" },
    { to: "advertising", label: "Advertising" },
    { to: "shows", label: "Shows" },
    { to: "reviews", label: "Reviews" },
    { to: "contacts", label: "Contacts" },
  ];

  const formats = [
    {
      title: "Jingle",
      duration: "up to two minutes",
      desc:
        "A concise integration without complex mechanics. We'll add a text block to the episode description with partner information, a link, and a promo code. Minimum of two episodes.",
      benefits: ["A perfect option for a first introduction to podcast advertising."],
    },
    {
      title: "Partner segment",
      duration: "up to three minutes",
      desc:
        "A native format that listeners genuinely enjoy. The brand message blends organically into the podcast's tone of voice. Stories from hosts and listeners, experiments, tips, or playful bits - we develop the idea together with the partner. We'll add a text block to the episode description with partner information, a link, and a promo code. Minimum of three episodes.",
      benefits: ["A chance to tell a deeper story about your product."],
    },
    {
      title: "Exclusive season sponsorship",
      duration:
        "Length: 10 episodes in one season, with integration in every episode. A partner mention at the beginning and a two-three-minute segment in the middle.",
      desc:
        "A serialized format with maximum audience reach. You will be the only partner of the season - and that is a big deal. We add a text block with a link and promo code to each episode description.",
      benefits: ["The strongest boost for brand awareness and trust."],
      featured: true,
    },
  ];

  const audiences = [
    {
      title: "Brands and companies",
      text: "To build long-term trust with your audience and highlight your expertise.",
    },
    {
      title: "Services and IT",
      text: "To connect with your audience and explain complex ideas in simple terms.",
    },
    {
      title: "HR and internal communications teams",
      text: "To strengthen your employer brand and build corporate culture.",
    },
    {
      title: "Experts and founders",
      text: "To build and grow your personal brand.",
    },
  ];

  const steps = [
    {
      n: "1",
      title: "Define the format and develop the concept",
      text: "We clarify goals, target audience, and tone of voice.",
    },
    {
      n: "2",
      title: "Develop the content plan",
      text: "Create an episode plan, gather materials, and shape the narrative arc.",
    },
    {
      n: "3",
      title: "Select a host and organize recordings",
      text: "We direct the process, even if hosts and guests are in different parts of the world.",
    },
    {
      n: "4",
      title: "Edit and produce the episodes",
      text: "We create the sound design, clean up background noise, and polish every detail.",
    },
    {
      n: "5",
      title: "Develop the visual and written identity",
      text: "We craft the podcast title and descriptions (for the show and each episode) and design the cover art.",
    },
    {
      n: "6",
      title: "Publish the podcast",
      text: "We set up hosting, distribute it to all major platforms, and manage the release.",
    },
  ];

  const shows = [
    {
      title: "The Idiot, five-part season of Serial podcast",
      company: "The New York Times",
      link: "https://www.nytimes.com/column/the-idiot",
      goal: "Co-produced by Libo/Libo and Serial Productions for The New York Times.",
      cover: "/en/shows/the-idiot.jpg",
    },
    {
      title: "Women In The Building",
      company: "The Aurora Tech Award",
      link: "https://pc.st/en/1855578706",
      goal: "Podcast for female entrepreneurs in emerging markets. Part business playbook, part community of female founders.",
      cover: "/en/shows/women-in-the-building.jpg",
    },
    {
      title: "Eight Fights",
      company: "This American Life",
      link: "https://www.thisamericanlife.org/807/eight-fights",
      goal: "An iconic weekly podcast with millions of listeners around the world.",
      cover: "/en/shows/eight-fights.jpg",
    },
    {
      title: "CTRL SHIFT!",
      company: "Humbleteam",
      link: "https://podcast.humbleteam.com",
      goal: "Podcast explores how changing perspective can turn challenges into opportunities.",
      cover: "/en/shows/ctrl-shift.jpg",
    },
    {
      title: "Next Year in Moscow",
      company: "The Economist",
      link: "https://www.economist.com/audio/podcasts/next-year-in-moscow",
      goal: "Arkady Ostrovsky travels across the world speaking to free-thinking Russians who left the country when the full-scale invasion of Ukraine began in 2022.",
      cover: "/en/shows/next-year-in-moscow.jpg",
    },
    {
      title: "TechStart",
      company: "TripleTen",
      link: "https://tripleten.com/special/podcast/",
      goal: "Podcast about changing careers into tech, with real stories from coding bootcamp students.",
      cover: "/en/shows/techstart.jpg",
    },
    {
      title: "Dmitry Sitkovetsky: Keeping the Flame",
      company: "Independent project",
      link: "https://pc.st/1854819032",
      goal: "A family memoir, a portrait of the Russian intelligentsia, and a journey through music and exile.",
      cover: "/en/shows/keeping-the-flame.jpg",
    },
    {
      title: "Harbin",
      company: "Memorial",
      link: "https://pc.st/1677312850/info",
      goal: "Stories of emigrants who fled the Russian Revolution to the Chinese city of Harbin (podcast in German).",
      cover: "/en/shows/harbin.jpg",
    },
  ];

  const testimonials = [
    {
      quote:
        'Working with Libo/Libo on "Keeping the Flame" was one of the most rewarding creative projects I took on last year. What began as a personal audio story for my daughter and grandson became a podcast series that resonated with a much wider audience. The team brought exceptional editorial care, creativity, and intelligence to every stage of the process. Libo/Libo is a first-class operation, and I recommend them wholeheartedly.',
      author: "Dmitry Sitkovetsky",
      role: "Violinist, Conductor, Arranger, Educator",
    },
    {
      quote:
        "The team at Libo/Libo studio go above and beyond wherever they can. Yulia has been a brilliant project manager in keeping everyone on the same page, keeping comms consistent between the teams and everyone on the same page. They do things when they say they do and more importantly are open to feedback and building the working relationship and finding a groove together. It's been a pleasure working with them.",
      author: "Bella Ghassemi-Smith",
      role: "Head of the Aurora Tech Award",
    },
    {
      quote:
        "We were so excited to work with Libo/Libo! We came to them as experts in design and AI - we knew absolutely nothing about podcasts and production. How to work with an audience, how to prepare speakers, how to structure a season - all of this was completely unknown territory for us. The Libo/Libo team took all of that fully on themselves - they walked us through the entire process, gave us guidance at every step, and brought our podcast to a successful release. In the end, the podcast made it to the top charts in the US and Canada. Without Libo/Libo, we definitely wouldn't have made such a great podcast.",
      author: "Sergey Krasotin",
      role: "Design Lead and Co-Founder at Humbleteam",
    },
  ];

  const mosaicCovers = [
    "/en/shows/the-idiot.jpg",
    "/en/shows/women-in-the-building.jpg",
    "/en/shows/eight-fights.jpg",
    "/en/shows/ctrl-shift.jpg",
    "/en/shows/next-year-in-moscow.jpg",
    "/en/shows/techstart.jpg",
    "/en/shows/keeping-the-flame.jpg",
    "/en/shows/harbin.jpg",
  ];

  return (
    <div
      className="min-h-screen text-[clamp(1rem,1.2vw,1.08rem)]"
      style={{
        backgroundColor: COLORS.bg,
        color: COLORS.fg,
        fontFamily:
          '"Futura PT Web","Futura PT","Futura",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif',
      }}
    >
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#E8DDE0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Image src="/logo-en.png" alt="Libo/Libo" width={64} height={64} priority />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center border border-black/20 text-black/85 transition hover:border-black/50 hover:text-black"
          >
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[2px] w-5 bg-current transition-all duration-300",
                  isMenuOpen ? "top-[7px] rotate-45" : "",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-all duration-300",
                  isMenuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[14px] h-[2px] w-5 bg-current transition-all duration-300",
                  isMenuOpen ? "top-[7px] -rotate-45" : "",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-white" />
        <div
          className={cn(
            "mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-5 transition-all duration-300",
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="flex items-center justify-between">
            <Image src="/logo-en.png" alt="Libo/Libo" width={64} height={64} priority />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center text-black/80 transition hover:text-black"
            >
              <span className="text-4xl leading-none">&times;</span>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {menuItems.map((item) => (
              <NavLinkButton
                key={item.to}
                to={item.to}
                onNavigate={() => setIsMenuOpen(false)}
                className="text-[clamp(2rem,7vw,5rem)] font-medium normal-case tracking-normal text-black"
              >
                {item.label}
              </NavLinkButton>
            ))}
          </nav>
        </div>
      </div>

      <main className="pt-24">
        <Section
          id="about"
          title={null}
          subtitle={null}
        >
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <h1 className="text-[clamp(2.2rem,6.2vw,4.8rem)] font-bold leading-[1.02] text-black">
                Libo/Libo podcast studio
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.7vw,1.24rem)] leading-relaxed text-black/75">
                We make podcasts about science, history, sex, technology, psychology, money, culture - basically
                everything people are curious about - in Russian, English and German. And we help brands speak to that
                curiosity.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "300+", label: "episodes a year" },
                  { value: "31M", label: "downloads in 2025" },
                  { value: "45+", label: "podcasts" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-[#E8DDE0] bg-[#FFF8F8] px-4 py-5">
                    <div className="text-3xl font-bold text-black">{stat.value}</div>
                    <p className="mt-1 text-sm text-black/65">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-6">
              <div className="mx-auto w-full max-w-[500px]">
                <PodcastMosaic covers={mosaicCovers} />
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        <Section
          id="production"
          title={<>Podcasts that work for your brand</>}
          subtitle="Advertising in Libo/Libo studio podcasts and podcast production - from idea to launch."
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => scrollToId("production")} className="px-8 py-4 text-base tracking-[0.11em]">
              CREATE A PODCAST
            </Button>
            <Button variant="secondary" onClick={() => scrollToId("advertising")} className="px-8 py-4 text-base tracking-[0.11em] border-[#FF383C]/50 text-[#B12024] hover:border-[#FF383C] hover:bg-[#FFF1F2]">
              PLACE AN AD
            </Button>
          </div>

          <div className="mb-10 overflow-hidden border border-[#E8DDE0] bg-[#FFF9FA] p-6 md:p-8">
            <div className="h-[2px] w-24" style={{ backgroundColor: COLORS.accent }} />
            <p className="mt-5 max-w-4xl text-[clamp(1.5rem,2.7vw,2.2rem)] font-bold leading-tight text-black">
              We handle every stage: from initial idea and concept to publishing on all platforms.
            </p>
          </div>

          <h3 className="mb-6 text-[clamp(1.6rem,2.8vw,2.3rem)] font-bold">Who it's for</h3>

          <div className="grid gap-5 md:auto-rows-fr md:items-stretch md:gap-6 md:grid-cols-2">
            {audiences.map((a) => (
              <Card key={a.title}>
                <div className="text-lg font-bold leading-tight">{a.title}</div>
                <p className="mt-3 text-base leading-relaxed text-black/70">{a.text}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold">
              How we <HandUnderline>work</HandUnderline>
            </h3>

            <div className="mt-8">
              <div className="grid gap-5 md:auto-rows-fr md:items-stretch md:gap-6 md:grid-cols-2">
                {steps.map((s) => (
                  <Card key={s.n} className="bg-[#FFF9FA]">
                    <div className="flex items-start gap-4">
                      <div
                        className="inline-flex h-12 w-12 shrink-0 items-center justify-center border text-xl font-bold"
                        style={{ borderColor: COLORS.accent, color: COLORS.accent }}
                      >
                        {s.n}
                      </div>
                      <div className="w-full">
                        <div className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: COLORS.accent }}>
                          Step {s.n}
                        </div>
                        <div className="mt-2 text-[clamp(1.05rem,2vw,1.5rem)] font-bold leading-tight text-black">
                          {s.title}
                        </div>
                        {s.text ? (
                          <p className="mt-2 text-sm leading-relaxed text-black/70 md:mt-3 md:text-base">{s.text}</p>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                ))}
                <Card className="bg-[#FFF9FA] md:col-span-2">
                  <div className="flex items-start gap-4">
                    <div
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center border text-lg font-bold"
                      style={{ borderColor: COLORS.accent, color: COLORS.accent }}
                    >
                      *7
                    </div>
                    <div className="w-full">
                      <div className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: COLORS.accent }}>
                        Optional
                      </div>
                      <div className="mt-2 text-[clamp(1.2rem,2vw,1.5rem)] font-bold leading-tight text-black">
                        Promotion support
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-black/70 md:mt-3 md:text-base">
                        We help you grow your audience and gain traction across platforms.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="advertising"
          title={<><span>Advertising in </span><HandUnderline>Libo/Libo podcasts</HandUnderline></>}
          subtitle="Bring your brand to a loyal, curious, and globally mobile Russian-speaking audience"
        >
          <div className="grid gap-5 md:auto-rows-fr md:items-stretch md:gap-6 md:grid-cols-3">
            {formats.map((f) => (
              <Card key={f.title} className="border-[#E8DDE0] bg-white text-black">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold leading-tight">{f.title}</div>
                      <div className="mt-2 text-base font-bold text-black/60">{f.duration}</div>
                    </div>
                    {f.featured ? (
                      <span
                        className="inline-flex items-center rounded-full border border-dashed px-3 py-1 text-xs font-bold tracking-[0.08em]"
                        style={{ borderColor: COLORS.accent, color: COLORS.accent }}
                      >
                        top format
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-black/75">{f.desc}</p>

                  <div className="mt-6">
                    <ul className="mt-3 space-y-2 text-base text-black/75">
                      {f.benefits.map((x) => (
                        <li key={x} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: COLORS.accent }} />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-8">
                    <Button onClick={() => scrollToId("contacts")} className="bg-[#111111] text-white hover:bg-[#262626] focus:ring-[#111111]">
                      Request media kit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="shows"
          title={<>Our latest shows</>}
        >
          <div className="grid gap-5 md:auto-rows-fr md:items-stretch md:gap-6 md:grid-cols-3">
            {shows.map((w) => (
              <Card key={w.title}>
                <div className="flex h-auto flex-col gap-3 md:h-full md:gap-4">
                  <a href={w.link} target="_blank" rel="noreferrer" className="block">
                    <CoverPlaceholder label={w.title} src={w.cover} />
                  </a>
                  <div>
                    <div className="text-lg font-bold leading-tight md:text-xl">{w.title}</div>
                    {w.title === "The Idiot, five-part season of Serial podcast" || w.title === "Dmitry Sitkovetsky: Keeping the Flame" ? null : (
                      <div className="mt-1 text-sm text-black/55">Created with {w.company}</div>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-black/70 md:mt-3 md:text-base">{w.goal}</p>
                  </div>
                  <div className="pt-0.5 md:mt-auto md:min-h-6 md:pt-1">
                    <a
                      href={w.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-base font-normal text-black/75 underline-offset-4 transition hover:text-[#FF383C] hover:underline"
                    >
                      Open link <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="reviews"
          title={<>What our partners say</>}
        >
          <div className="grid gap-5 md:auto-rows-fr md:items-stretch md:gap-6 md:grid-cols-3">
            {testimonials.map((x) => (
              <Card key={x.author} className="border-[#E8DDE0] bg-white text-black">
                <div className="flex h-full flex-col">
                  <p className="text-[1.03rem] leading-relaxed text-black/80">{x.quote}</p>
                  <div className="mt-7">
                    <div className="text-base font-semibold text-black">{x.author}</div>
                    <div className="mt-2 h-px w-[56%] bg-[#FF383C]/80" />
                    <p className="mt-1 text-sm text-black/70">{x.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Divider />

        <Section
          id="contacts"
          kicker="Contact"
          title={<><span>Tell us about your </span><HandUnderline>request</HandUnderline></>}
        >
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <Card>
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;
                    setSubmitError("");
                    setIsSubmitting(true);
                    try {
                      const response = await fetch("/api/leads", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          locale: "en",
                          page: "/",
                          name,
                          company,
                          email: knownEmail,
                          message,
                        }),
                      });

                      if (!response.ok) {
                        throw new Error("submit_failed");
                      }

                      if (typeof window !== "undefined") {
                        window.localStorage.setItem("business_contact_email", knownEmail.trim());
                      }
                      setName("");
                      setCompany("");
                      setMessage("");
                      setIsThankYouOpen(true);
                    } catch {
                      setSubmitError("Could not send the request right now. Please try again or email us directly.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-black/55">Name</label>
                      <input
                        name="name"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/30 focus:border-black/40 focus:outline-none"
                        placeholder="your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-black/55">Company</label>
                      <input
                        name="organization"
                        autoComplete="organization"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/30 focus:border-black/40 focus:outline-none"
                        placeholder="your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-black/55">
                      Contacts
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={knownEmail}
                      onChange={(e) => setKnownEmail(e.target.value)}
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/30 focus:border-black/40 focus:outline-none"
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-black/55">Your message</label>
                    <textarea
                      rows={5}
                      name="message"
                      autoComplete="off"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full border border-black/15 bg-white px-4 py-3 text-black placeholder:text-black/30 focus:border-black/40 focus:outline-none"
                      placeholder="type your request here"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit">{isSubmitting ? "Sending..." : "Send request"}</Button>
                  </div>
                  {submitError ? (
                    <p className="text-sm leading-relaxed text-[#FF7D80]">{submitError}</p>
                  ) : null}
                </form>
              </Card>
            </div>

            <div className="md:col-span-5">
              <div className="relative overflow-hidden border border-[#E8DDE0] bg-white p-7">
                <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
                <div className="relative z-10">
                  <p className="text-[clamp(1.15rem,1.9vw,1.45rem)] leading-relaxed text-black/80">
                    Or just email us at{" "}
                    <a href="mailto:podcast@libolibo.me" className="font-bold text-black transition hover:text-[#FF383C]">
                      podcast@libolibo.me
                    </a>
                    , and we'll get back to you shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-[#E8DDE0]">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-light text-black/50">
              © Libo/Libo Studio
            </div>
            <a
              href="/privacy"
              className="text-sm font-light text-black/50 transition hover:text-black/75"
            >
              Privacy Policy
            </a>
          </div>
        </footer>
      </main>

      <div
        className={cn(
          "fixed inset-0 z-[70] flex items-center justify-center px-6 transition-opacity duration-300",
          isThankYouOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" onClick={() => setIsThankYouOpen(false)} />
        <div className="relative z-10 w-full max-w-md border border-black/10 bg-white p-6 text-center shadow-xl">
          <button
            type="button"
            aria-label="Close popup"
            className="absolute right-3 top-2 text-xl text-black/45 transition hover:text-black/80"
            onClick={() => setIsThankYouOpen(false)}
          >
            &times;
          </button>
          <p className="text-lg font-medium leading-relaxed text-black/90">
            Thank you! We&apos;ll get back to you very soon.
          </p>
        </div>
      </div>
    </div>
  );
}
