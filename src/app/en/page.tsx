"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const COLORS = {
  bg: "#111111",
  fg: "#FFFFFF",
  accent: "#FF383C",
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
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center px-5 py-3 text-sm font-bold tracking-wide uppercase transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111111] rounded-none";
  const styles =
    variant === "primary"
      ? "bg-[#FF383C] text-white hover:opacity-90 focus:ring-[#FF383C]"
      : "border border-white/30 text-white hover:border-white/60 hover:bg-white/5 focus:ring-white/60";

  return (
    <button className={cn(base, styles, className)} onClick={onClick} type="button">
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
      className={cn("text-xs font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white", className)}
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
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {kicker ? (
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/70">
            {kicker}
          </div>
        ) : null}
        {title ? (
          <h2 className="text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.03] text-white">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p className="mt-4 max-w-4xl text-[clamp(1.05rem,1.7vw,1.25rem)] leading-relaxed text-white/80">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-auto overflow-hidden border border-white/15 bg-white/[0.02] p-5 md:h-full md:p-7", className)}>
      <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
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
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M12 82 L 76 82"
            fill="none"
            stroke="white"
            strokeOpacity="0.25"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-3 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function EnPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [knownEmail, setKnownEmail] = useState("");
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

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

  const heroShows = [
    {
      title: "The Idiot",
      link: "https://www.nytimes.com/column/the-idiot",
      cover: "/en/shows/the-idiot.jpg",
    },
    {
      title: "Women and the Billion",
      link: "https://pc.st/en/1855578706",
      cover: "/en/shows/women-in-the-building.jpg",
    },
    {
      title: "Eight fights",
      link: "https://www.thisamericanlife.org/807/eight-fights",
      cover: "/en/shows/eight-fights.jpg",
    },
    {
      title: "Next year in Moscow",
      link: "https://www.economist.com/audio/podcasts/next-year-in-moscow",
      cover: "/en/shows/next-year-in-moscow.jpg",
    },
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
      <header className="relative z-40 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Image src="/logo.svg" alt="Libo/Libo" width={160} height={36} priority />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white/90 transition hover:border-white/40 hover:text-white"
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
        <div className="absolute inset-0 bg-[#0a0b0f]" />
        <div
          className={cn(
            "mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-5 transition-all duration-300",
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="flex items-center justify-between">
            <Image src="/logo.svg" alt="Libo/Libo" width={160} height={36} priority />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center text-white/90 transition hover:text-white"
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
                className="text-[clamp(2rem,7vw,5rem)] font-medium normal-case tracking-normal text-white/95"
              >
                {item.label}
              </NavLinkButton>
            ))}
          </nav>
        </div>
      </div>

      <main>
        <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <h1 className="mt-5 text-[clamp(2.5rem,7.2vw,5.25rem)] font-bold leading-[1.01]">
                Podcasts that <HandUnderline>work</HandUnderline> for your{" "}
                <HandUnderline>brand</HandUnderline>
              </h1>

              <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.7vw,1.28rem)] leading-relaxed text-white/80">
                Advertising in Libo/Libo studio podcasts and podcast production -{" "}
                <span className="block">from idea to launch.</span>
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="secondary" onClick={() => scrollToId("production")}>Create a podcast</Button>
                <Button onClick={() => scrollToId("advertising")}>Place an ad</Button>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative overflow-hidden border border-white/15 bg-white/[0.02] p-6 md:p-7">
                <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
                <div className="relative z-10">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-white/65">Our latest shows</div>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {heroShows.map((show) => (
                      <a key={show.title} href={show.link} target="_blank" rel="noreferrer" className="group block">
                        <div className="overflow-hidden">
                          <CoverPlaceholder label={show.title} src={show.cover} />
                        </div>
                        <span className="mt-2 block text-base text-white/85 transition group-hover:text-[#FF383C]">
                          {show.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <Section
          id="production"
          title={<><span>Production of your </span><HandUnderline>podcast</HandUnderline></>}
        >
          <div className="mb-10 overflow-hidden border border-white/20 bg-white/[0.04] p-6 md:p-8">
            <div className="h-[2px] w-24" style={{ backgroundColor: COLORS.accent }} />
            <p className="mt-5 max-w-4xl text-[clamp(1.5rem,2.7vw,2.2rem)] font-bold leading-tight text-white">
              We handle every stage: from initial idea and concept to publishing on all platforms.
            </p>
          </div>

          <h3 className="mb-6 text-[clamp(1.6rem,2.8vw,2.3rem)] font-bold">Who it's for</h3>

          <div className="grid gap-5 md:auto-rows-fr md:items-stretch md:gap-6 md:grid-cols-2">
            {audiences.map((a) => (
              <Card key={a.title}>
                <div className="text-lg font-bold leading-tight">{a.title}</div>
                <p className="mt-3 text-base leading-relaxed text-white/80">{a.text}</p>
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
                  <Card key={s.n} className="bg-white/[0.035]">
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
                        <div className="mt-2 text-[clamp(1.05rem,2vw,1.5rem)] font-bold leading-tight text-white">
                          {s.title}
                        </div>
                        {s.text ? (
                          <p className="mt-2 text-sm leading-relaxed text-white/82 md:mt-3 md:text-base">{s.text}</p>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                ))}
                <Card className="bg-white/[0.035] md:col-span-2">
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
                      <div className="mt-2 text-[clamp(1.2rem,2vw,1.5rem)] font-bold leading-tight text-white">
                        Promotion support
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/82 md:mt-3 md:text-base">
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
              <Card key={f.title}>
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold leading-tight">{f.title}</div>
                      <div className="mt-2 text-base font-bold text-white/70">{f.duration}</div>
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

                  <p className="mt-4 text-base leading-relaxed text-white/80">{f.desc}</p>

                  <div className="mt-6">
                    <ul className="mt-3 space-y-2 text-base text-white/80">
                      {f.benefits.map((x) => (
                        <li key={x} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: COLORS.accent }} />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-8">
                    <Button onClick={() => scrollToId("contacts")}>Request media kit</Button>
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
                    <div className="mt-1 text-sm text-white/65">Created with {w.company}</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/80 md:mt-3 md:text-base">{w.goal}</p>
                  </div>
                  <div className="pt-0.5 md:mt-auto md:min-h-6 md:pt-1">
                    <a
                      href={w.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-base font-normal text-white/80 underline-offset-4 transition hover:text-[#FF383C] hover:underline"
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
              <Card key={x.author}>
                <div className="flex h-full flex-col">
                  <p className="text-[1.03rem] leading-relaxed text-white/90">{x.quote}</p>
                  <div className="mt-7">
                    <div className="text-base font-semibold text-white">{x.author}</div>
                    <div className="mt-2 h-px w-[56%] bg-[#FF383C]/80" />
                    <p className="mt-1 text-sm text-white/70">{x.role}</p>
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (typeof window !== "undefined") {
                      window.localStorage.setItem("business_contact_email", knownEmail.trim());
                    }
                    setIsThankYouOpen(true);
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Name</label>
                      <input
                        name="name"
                        autoComplete="name"
                        className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        placeholder="your name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Company</label>
                      <input
                        name="organization"
                        autoComplete="organization"
                        className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        placeholder="your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                      Contacts
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={knownEmail}
                      onChange={(e) => setKnownEmail(e.target.value)}
                      className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Your message</label>
                    <textarea
                      rows={5}
                      name="message"
                      autoComplete="off"
                      className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                      placeholder="type your request here"
                    />
                  </div>

                  <div className="pt-2">
                    <Button>Send request</Button>
                  </div>
                </form>
              </Card>
            </div>

            <div className="md:col-span-5">
              <div className="relative overflow-hidden border border-white/15 bg-white/[0.02] p-7">
                <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
                <div className="relative z-10">
                  <p className="text-[clamp(1.15rem,1.9vw,1.45rem)] leading-relaxed text-white/85">
                    Or just email us at{" "}
                    <a href="mailto:podcast@libolibo.me" className="font-bold text-white transition hover:text-[#FF383C]">
                      podcast@libolibo.me
                    </a>
                    , and we'll get back to you shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-light text-white/50">
              © Libo/Libo Studio
            </div>
            <a
              href="/privacy"
              className="text-sm font-light text-white/50 transition hover:text-white/75"
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
        <div className="absolute inset-0 bg-black/70" onClick={() => setIsThankYouOpen(false)} />
        <div className="relative z-10 w-full max-w-md border border-white/20 bg-[#141414] p-6 text-center">
          <button
            type="button"
            aria-label="Close popup"
            className="absolute right-3 top-2 text-xl text-white/70 transition hover:text-white"
            onClick={() => setIsThankYouOpen(false)}
          >
            &times;
          </button>
          <p className="text-lg font-medium leading-relaxed text-white">
            Thank you! We&apos;ll get back to you very soon.
          </p>
        </div>
      </div>
    </div>
  );
}
