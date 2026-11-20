
"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "kk" | "ru";

const translations = {
  kk: {
    home: "Басты бет",
    professions: "Мамандықтар",
    tests: "Тесттер",
    games: "Ойындар",
    unt: "ҰБТ және пәндер",
    advice: "Кеңестер",
    about: "Біз туралы",
    title: "Болашағыңды таңдауға дайынсың ба?",
    subtitle:
      "Әр мамандық – үлкен мүмкіндік! Өз жолыңды бірге табайық!",
    start: "Саяхатты бастау",
    explore: "Өзіңе қызықты бөлімді таңда",
    popular: "Болашаққа алғашқы қадам",
    professionDesc:
      "Мамандықтарды зертте, қажетті пәндерді және дағдыларды біл.",
    testDesc:
      "Қызығушылығыңды анықтап, өзіңе жақын бағыттарды зертте.",
    gameDesc:
      "Қызықты ойындар ойнап, мамандықтар туралы біліміңді тексер.",
    untDesc:
      "ҰБТ пән комбинациялары және мамандықтарға түсу жолдары.",
    adviceDesc:
      "Мамандық таңдау туралы пайдалы кеңестер.",
    open: "Бөлімге өту",
    soon: "Жақында қосылады",
    footer: "Білім. Таңдау. Болашақ.",
  },
  ru: {
    home: "Главная",
    professions: "Профессии",
    tests: "Тесты",
    games: "Игры",
    unt: "ЕНТ и предметы",
    advice: "Советы",
    about: "О нас",
    title: "Готов выбрать своё будущее?",
    subtitle:
      "Каждая профессия – большая возможность! Найдём твой путь вместе!",
    start: "Начать путешествие",
    explore: "Выбери интересный раздел",
    popular: "Первый шаг к будущему",
    professionDesc:
      "Изучай профессии, необходимые предметы и навыки.",
    testDesc:
      "Узнай свои интересы и исследуй подходящие направления.",
    gameDesc:
      "Играй и проверяй знания о профессиях.",
    untDesc:
      "Комбинации предметов ЕНТ и пути поступления.",
    adviceDesc:
      "Полезные советы по выбору профессии.",
    open: "Открыть раздел",
    soon: "Скоро появится",
    footer: "Знания. Выбор. Будущее.",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("kk");
  const [dark, setDark] = useState(false);

  const t = translations[lang];

  const sections = [
    {
      emoji: "🎓",
      title: t.professions,
      description: t.professionDesc,
      href: "/professions",
      color: "from-blue-600 to-cyan-400",
      ready: true,
    },
    {
      emoji: "🧠",
      title: t.tests,
      description: t.testDesc,
      href: "/tests",
      color: "from-violet-600 to-pink-500",
      ready: true,
    },
    {
      emoji: "🎮",
      title: t.games,
      description: t.gameDesc,
      href: "/games",
      color: "from-orange-500 to-yellow-400",
      ready: true,
    },
    {
      emoji: "📚",
      title: t.unt,
      description: t.untDesc,
      href: "/unt",
      color: "from-emerald-600 to-teal-400",
      ready: true,
    },
    {
      emoji: "💡",
      title: t.advice,
      description: t.adviceDesc,
      href: "/advice",
      color: "from-indigo-600 to-blue-400",
      ready: true,
    },
 {
  emoji: "🌍",
  title: t.about,
  description:
    lang === "kk"
      ? "Сайттың мақсаты және мүмкіндіктері туралы біл."
      : "Узнай о целях и возможностях сайта.",
  href: "/about",
  color: "from-sky-600 to-indigo-500",
  ready: true,
},
];

  return (
    <main
      className={`min-h-screen transition-colors ${
        dark
          ? "bg-slate-950 text-white"
          : "bg-gradient-to-b from-blue-50 to-white text-blue-950"
      }`}
    >
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#07398e] to-[#168de0] text-white shadow-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="font-black text-xl">
            🚀 BOLASHAQ | Бағдар
          </Link>

          <nav className="flex flex-wrap gap-2 text-sm font-bold">
            <Link href="/" className="rounded-full px-3 py-2 hover:bg-white/20">
              {t.home}
            </Link>
            <Link
              href="/professions"
              className="rounded-full px-3 py-2 hover:bg-white/20"
            >
              {t.professions}
            </Link>
            <Link
              href="/tests"
              className="rounded-full px-3 py-2 hover:bg-white/20"
            >
              {t.tests}
            </Link>
            <Link
              href="/games"
              className="rounded-full px-3 py-2 hover:bg-white/20"
            > <Link
  href="/about"
  className="rounded-full px-3 py-2 hover:bg-white/20"
>
  {t.about}
</Link>
              {t.games}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang("kk")}
              className={`rounded-full px-3 py-2 text-sm font-bold ${
                lang === "kk"
                  ? "bg-white text-blue-900"
                  : "bg-white/10"
              }`}
            >
              ҚАЗ
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`rounded-full px-3 py-2 text-sm font-bold ${
                lang === "ru"
                  ? "bg-white text-blue-900"
                  : "bg-white/10"
              }`}
            >
              РУС
            </button>
            <button
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Light mode" : "Dark mode"}
              className="rounded-full bg-white/20 px-3 py-2"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Басты беттегі 3D сурет */}
      <section className="relative overflow-hidden bg-blue-500">
        <img
          src="/bolashaq-design.jpg"
          alt="BOLASHAQ career guidance design"
          className="block h-auto w-full"
        />

        {/* Суреттің үстіндегі батырма */}
        <Link
          href="/professions"
          aria-label={t.start}
          className="absolute left-[40%] top-[39%] h-[10%] w-[20%] rounded-full"
        />
      </section>

      {/* Негізгі тақырып */}
      <section className="mx-auto max-w-6xl px-5 py-12 text-center">
        <h1 className="text-3xl font-black md:text-5xl">
          {t.title}
        </h1>
        <p
          className={`mx-auto mt-5 max-w-3xl text-lg ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {t.subtitle}
        </p>

        <Link
          href="/professions"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-10 py-4 font-black text-blue-950 shadow-xl transition hover:scale-105"
        >
          🚀 {t.start}
        </Link>
      </section>

      {/* Бөлімдер */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <h2 className="mb-9 text-center text-3xl font-black md:text-4xl">
          ✨ {t.explore}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.href}
              className={`rounded-[30px] p-5 shadow-xl transition hover:-translate-y-2 ${
                dark ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div
                className={`flex h-40 items-center justify-center rounded-3xl bg-gradient-to-br ${section.color} text-7xl`}
              >
                {section.emoji}
              </div>

              <h3 className="mt-5 text-2xl font-black">
                {section.title}
              </h3>

              <p
                className={`mt-3 min-h-16 ${
                  dark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {section.description}
              </p>

              {section.ready ? (
                <Link
                  href={section.href}
                  className="mt-5 block rounded-2xl bg-blue-600 px-5 py-4 text-center font-bold text-white transition hover:bg-blue-700"
                >
                  {t.open} →
                </Link>
              ) : (
                <div className="mt-5 rounded-2xl bg-slate-200 px-5 py-4 text-center font-bold text-slate-600">
                  ⏳ {t.soon}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Қосымша бөлім */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-[36px] bg-gradient-to-r from-blue-700 to-cyan-500 p-8 text-center text-white shadow-2xl md:p-12">
          <div className="text-6xl">🌍🎓🚀</div>
          <h2 className="mt-5 text-3xl font-black">
            {t.popular}
          </h2>
          <p className="mt-4 text-blue-50">
            {t.subtitle}
          </p>
          <Link
            href="/tests"
            className="mt-7 inline-block rounded-full bg-yellow-400 px-9 py-4 font-black text-blue-950"
          >
            🧠 {t.tests} →
          </Link>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-[#072c79] to-[#145fb6] px-5 py-9 text-center text-white">
        <p className="text-xl font-black">
          🚀 BOLASHAQ | Бағдар
        </p>
        <p className="mt-2 text-sm opacity-80">
          {t.footer}
        </p>
      </footer>
    </main>
  );
}
