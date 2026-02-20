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

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLinkButton to={to}>{children}</NavLinkButton>
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
          <p className="mt-4 max-w-3xl text-[clamp(1.05rem,1.7vw,1.3rem)] leading-relaxed text-white/80">
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
    <div className={cn("relative h-full overflow-hidden border border-white/15 bg-white/[0.02] p-6 md:p-7", className)}>
      <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-white/10" />;
}

function CoverPlaceholder({ label = "Обложка", src }: { label?: string; src?: string }) {
  if (src) {
    return (
      <div className="relative aspect-square w-full overflow-hidden bg-white/5">
        <Image src={src} alt={label} fill className="object-cover" sizes="(min-width: 768px) 240px, 45vw" />
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const menuItems = [
    { to: "advertising", label: "Реклама" },
    { to: "production", label: "Продакшен" },
    { to: "works", label: "Работы" },
    { to: "contacts", label: "Контакты" },
  ];

  const formats = [
    {
      title: "Джингл",
      duration: "до 2 минут",
      desc:
        "Лаконичная и нативная интеграция без сложной механики. В описание эпизода добавим блок о партнере, ссылку и промокод.",
      includes: ["Текстовый блок в описании", "Ссылка", "Промокод"],
      benefits: ["Идеальный формат для первого знакомства с подкастами"],
    },
    {
      title: "Партнерская рубрика",
      duration: "до 3 минут",
      desc:
        "Нативный формат, который любят слушатели. Сообщение органично встраивается в ToV подкаста: истории, эксперименты, советы или хохмы — идею придумываем вместе.",
      includes: ["Текстовый блок в описании", "Ссылка", "Промокод"],
      benefits: [
        "Возможность рассказать подробную историю о продукте",
        "Долгосрочная связь через серию креативных модулей",
      ],
    },
    {
      title: "Эксклюзивное спонсорство сезона",
      duration: "10 эпизодов сезона, 2–3 минуты в каждом",
      desc:
        "Серийный формат с максимальным охватом аудитории. Придумаем органичную рубрику, чтобы познакомить слушателей с ценностями и преимуществами бренда. Вы — единственный партнер сезона.",
      includes: ["Текстовый блок в описании", "Ссылка", "Промокод"],
      benefits: [
        "Формирование имиджа устойчивого партнера и рост доверия",
        "Комплексная стратегия продвижения и вовлечение",
        "Закрепление бренда в сознании аудитории надолго",
        "Ассоциация бренда с качественным контентом",
      ],
      featured: true,
    },
  ];

  const audiences = [
    {
      title: "Любые бренды и компании",
      text: "Поможет построить доверительные отношения с клиентами и подсветить вашу экспертизу.",
    },
    {
      title: "Сервисы и IT",
      text: "Чтобы наладить контакт с аудиторией и объяснять сложное простым языком.",
    },
    {
      title: "HR и внутренние коммуникации",
      text: "Усилить бренд работодателя и укрепить корпоративную культуру.",
    },
    {
      title: "Эксперты и фаундеры",
      text: "Развить и укрепить личный бренд.",
    },
  ];

  const steps = [
    {
      n: "1",
      title: "Определим формат и разработаем концепцию подкаста",
      text: "Определим цели, аудиторию и tone of voice подкаста.",
    },
    {
      n: "2",
      title: "Поработаем над содержанием подкаста",
      text: "Составим поэпизодный план, соберем материал и продумаем драматургию.",
    },
    {
      n: "3",
      title: "Подберем ведущего и организуем все записи",
      text: "Срежиссируем весь процесс, даже если ведущий должен быть от вашей компании и удаленно.",
    },
    {
      n: "4",
      title: "Смонтируем эпизоды",
      text: "Напишем джингл, очистим звук и отредактируем недочеты.",
    },
    {
      n: "5",
      title: "Разработаем визуальное и текстовое оформление",
      text: "Придумаем название и описание подкаста (и каждого эпизода), задизайним обложку.",
    },
    {
      n: "6",
      title: "Опубликуем подкаст",
      text: "Создадим личный кабинет на хостинге, сделаем релиз на всех платформах.",
    },
  ];

  const works = [
    { title: "Торг уместен", company: "Авито", link: "https://music.yandex.ru/album/10857054", goal: "Привлечение новой аудитории", cover: "/case1.jpg" },
    { title: "Не все включено", company: "Veselovka Experience", link: "https://pc.st/1850920893", goal: "Повышение узнаваемости бренда", cover: "/case2.jpg" },
    { title: "Уже в пути", company: "Яндекс Еда", link: "https://music.yandex.ru/album/13896573", goal: "Повышение лояльности аудитории", cover: "/case3.jpg" },
    { title: "Хроники еды", company: "Кухня на районе", link: "https://pc.st/1520728618", goal: "Вовлечение и удержание аудитории", cover: "/case4.jpg" },
    { title: "Взрослые — это мы", company: "Яндекс Плюс Детям + Ясно", link: "", goal: "Привлечение аудитории и повышение узнаваемости", cover: "/case5.jpg" },
    {
      title: "Как посмотреть",
      company: "Российская Национальная театральная Премия и Фестиваль «Золотая маска»",
      link: "https://pc.st/1523674546",
      goal: "Привлечение аудитории",
      cover: "/case6.jpg",
    },
    { title: "Город, в котором", company: "Авито", link: "https://music.yandex.ru/album/10857054", goal: "Повышение лояльности аудитории", cover: "/case7.jpg" },
  ];
  const caseCovers = ["/case1.jpg", "/case2.jpg", "/case3.jpg", "/case4.jpg"];

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
          <Image src="/logo.svg" alt="Либо/Либо" width={160} height={36} priority />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white/90 transition hover:border-white/40 hover:text-white"
          >
            <span className="sr-only">{isMenuOpen ? "Закрыть меню" : "Открыть меню"}</span>
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
              <Image src="/logo.svg" alt="Либо/Либо" width={160} height={36} priority />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Закрыть меню"
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
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-white/70">
                Для бизнеса
              </div>

              <h1 className="mt-5 text-[clamp(2.5rem,7.2vw,5.25rem)] font-bold leading-[1.01]">
                Подкасты, которые <HandUnderline>работают</HandUnderline> на ваш{" "}
                <HandUnderline>бренд</HandUnderline>
              </h1>

              <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.7vw,1.28rem)] leading-relaxed text-white/80">
                Реклама в подкастах студии и продакшен под ключ — от задумки и концепции до публикации на платформах.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => scrollToId("contacts")}>Разместить рекламу</Button>
                <Button variant="secondary" onClick={() => scrollToId("production")}>Сделать подкаст</Button>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative overflow-hidden border border-white/15 bg-white/[0.02] p-6 md:p-7">
                <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
                <div className="relative z-10">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                    Место под обложки кейсов
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <CoverPlaceholder label="Обложка #1" src={caseCovers[0]} />
                    <CoverPlaceholder label="Обложка #2" src={caseCovers[1]} />
                    <CoverPlaceholder label="Обложка #3" src={caseCovers[2]} />
                    <CoverPlaceholder label="Обложка #4" src={caseCovers[3]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <Section
          id="advertising"
          kicker="Для брендов"
          title={<><span>Реклама в </span><HandUnderline>подкастах</HandUnderline><span> студии</span></>}
          subtitle="Нативные форматы, которые не раздражают слушателей — и при этом дают бренду заметный эффект."
        >
          <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-3">
            {formats.map((f) => (
              <Card key={f.title}>
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold leading-tight">{f.title}</div>
                      <div className="mt-2 text-base font-bold text-white/70">{f.duration}</div>
                    </div>
                    {f.featured ? (
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]">
                        <span className="inline-block h-2 w-2" style={{ backgroundColor: COLORS.accent }} />
                        топ-формат
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-white/80">{f.desc}</p>

                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">что входит</div>
                    <ul className="mt-3 space-y-2 text-base text-white/80">
                      {f.includes.map((x) => (
                        <li key={x} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0" style={{ backgroundColor: COLORS.accent }} />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">преимущества</div>
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
                    <Button onClick={() => scrollToId("contacts")}>Запросить медиакит</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="production"
          kicker="Подкаст под ключ"
          title={<><span>Продакшен для вашего </span><HandUnderline>подкаста</HandUnderline></>}
          subtitle="Полный цикл продакшена: от идеи до релиза."
        >
          <div className="mb-10 overflow-hidden border border-white/20 bg-white/[0.04] p-6 md:p-8">
            <div className="h-[2px] w-24" style={{ backgroundColor: COLORS.accent }} />
            <p className="mt-5 max-w-4xl text-[clamp(1.5rem,2.7vw,2.2rem)] font-bold leading-tight text-white">
              Возьмем на себя все этапы работы — от задумки и концепции до публикации на платформах.
            </p>
          </div>

          <h3 className="mb-6 text-[clamp(1.6rem,2.8vw,2.3rem)] font-bold">
            Кому подойдет
          </h3>

          <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2">
            {audiences.map((a) => (
              <Card key={a.title}>
                <div className="text-lg font-bold leading-tight">{a.title}</div>
                <p className="mt-3 text-base leading-relaxed text-white/80">{a.text}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold">
              Как устроена <HandUnderline>работа</HandUnderline>
            </h3>

            <div className="mt-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[2px] w-20" style={{ backgroundColor: COLORS.accent }} />
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">
                  6 последовательных этапов
                </div>
              </div>

              <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-2">
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
                          Шаг {s.n}
                        </div>
                        <div className="mt-2 text-[clamp(1.2rem,2vw,1.5rem)] font-bold leading-tight text-white">
                          {s.title}
                        </div>
                        <p className="mt-3 text-base leading-relaxed text-white/82">{s.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-8 overflow-hidden border border-white/15 bg-white/[0.03] p-5">
              <div className="text-base font-bold" style={{ color: COLORS.accent }}>
                *7 — займемся продвижением подкаста
              </div>
              <p className="mt-2 text-base leading-relaxed text-white/80">
                Поможем раскрутиться на площадках и собрать больше аудитории.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/60">
                * Отдельная опция, которую обсуждаем индивидуально под каждый запрос; не входит в первичный бюджет.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="works"
          kicker="Портфолио"
          title={<><span>Наши </span><HandUnderline>работы</HandUnderline></>}
        >
          <div className="grid auto-rows-fr items-stretch gap-6 md:grid-cols-3">
            {works.map((w) => (
              <Card key={w.title}>
                <div className="flex h-full flex-col gap-4">
                  <CoverPlaceholder label={w.title} src={w.cover} />
                  <div>
                    <div className="text-xl font-bold leading-tight">{w.title} — {w.company}</div>
                    <p className="mt-3 text-base leading-relaxed text-white/80">Задача: {w.goal}</p>
                  </div>
                  <div className="mt-auto min-h-6 pt-2">
                    {w.link ? (
                      <a
                        href={w.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-base font-normal text-white/80 transition hover:text-white"
                      >
                        Послушать
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Divider />

        <Section
          id="contacts"
          kicker="Контакты"
          title={<><span>Расскажите про ваш </span><HandUnderline>запрос</HandUnderline></>}
        >
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <Card>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Заглушка формы: подключим отправку позже.");
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Имя</label>
                      <input
                        className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Компания</label>
                      <input
                        className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        placeholder="Название компании"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                      Контакты (почта / tg)
                    </label>
                    <input
                      className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                      placeholder="email или @telegram"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Ваш запрос</label>
                    <textarea
                      rows={5}
                      className="mt-2 w-full border border-white/15 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                      placeholder="Реклама / продакшен / сроки / ожидания"
                    />
                  </div>

                  <div className="pt-2">
                    <Button>Отправить запрос</Button>
                  </div>
                  <label className="mt-2 flex items-start gap-3 text-sm leading-relaxed text-white/70">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded-none border border-white/30 bg-transparent accent-[#FF383C]"
                    />
                    <span>Соглашаюсь на обработку персональных данных</span>
                  </label>
                </form>
              </Card>
            </div>

            <div className="md:col-span-5">
              <div className="relative overflow-hidden border border-white/15 bg-white/[0.02] p-7">
                <div className="absolute left-0 top-0 h-[2px] w-16" style={{ backgroundColor: COLORS.accent }} />
                <div className="relative z-10">
                  <p className="text-[clamp(1.15rem,1.9vw,1.45rem)] leading-relaxed text-white/85">
                    Или просто напишите нам на почту{" "}
                    <a href="mailto:podcast@libolibo.ru" className="font-bold text-white hover:opacity-90">
                      podcast@libolibo.ru
                    </a>
                    , а мы свяжемся в ближайшее время.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-light text-white/50">
              © Студия Либо/Либо
            </div>
            <a
              href="/privacy"
              className="text-sm font-light text-white/50 transition hover:text-white/75"
            >
              Политика конфиденциальности
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
