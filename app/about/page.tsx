
"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "kk" | "ru";

const content = {
  kk: {
    home: "Басты бет",
    title: "Біз туралы",
    subtitle: "Болашаққа сенімді қадам жасауға көмектесетін цифрлық кеңістік",
    mission: "Біздің мақсатымыз",
    missionText:
      "BOLASHAQ | Бағдар — оқушыларға өз қызығушылықтарын, қабілеттерін және болашақ мамандықтарын зерттеуге көмектесетін кәсіби бағдар беру сайты. Біздің мақсатымыз — әр оқушыға саналы таңдау жасау үшін пайдалы ақпарат пен интерактивті құралдарды ұсыну.",
    audience: "Сайт кімдерге арналған?",
    students: "Оқушыларға",
    studentsText:
      "Мамандықтарды зерттеу, тесттерден өту және болашаққа жоспар құру үшін.",
    parents: "Ата-аналарға",
    parentsText:
      "Баласының мамандық таңдауына дұрыс қолдау көрсету үшін.",
    teachers: "Педагогтерге",
    teachersText:
      "Кәсіптік бағдар беру жұмыстарында қолдануға болатын қосымша құрал ретінде.",
    features: "Біздің мүмкіндіктеріміз",
    professions: "Мамандықтар",
    professionsText: "Мамандықтар туралы ақпаратпен танысу.",
    tests: "Кәсіби бағдар тесттері",
    testsText: "Қызығушылық пен қабілеттерді зерттеу.",
    games: "Танымдық ойындар",
    gamesText: "Ойын арқылы мамандықтар әлемін тану.",
    unt: "ҰБТ және пәндер",
    untText: "Пән комбинацияларына сәйкес бағыттарды зерттеу.",
    advice: "Пайдалы кеңестер",
    adviceText: "Оқушылар мен ата-аналарға ұсыныстар.",
    specialist: "Кәсіптік бағдар беру",
    specialistText:
      "Кәсіптік бағдар беру — оқушының қызығушылығы мен қабілетін ескеріп, білім алу және мамандық таңдау мүмкіндіктерін зерттеуге көмектесетін үдеріс.",
    motto: "Әр оқушының өз жолы, өз арманы және өз болашағы бар!",
    explore: "Мамандықтарды зерттеу",
    contact: "Байланыс",
    contactText:
      "Сұрақтарыңыз немесе ұсыныстарыңыз болса, мектептегі кәсіптік бағдар беруші маманға хабарласа аласыз.",
    feedback: "Ұсыныс мәтінін дайындау",
    copied: "Мәтін көшірілді!",
    copyText:
      "Сәлеметсіз бе! BOLASHAQ | Бағдар сайтына қатысты сұрағым немесе ұсынысым бар: ",
    footer: "Білім. Таңдау. Болашақ.",
  },
  ru: {
    home: "Главная",
    title: "О нас",
    subtitle: "Цифровое пространство для уверенного выбора будущего",
    mission: "Наша цель",
    missionText:
      "BOLASHAQ | Бағдар — сайт по профориентации, который помогает школьникам изучать свои интересы, способности и будущие профессии. Наша цель — предоставить полезную информацию и интерактивные инструменты для осознанного выбора.",
    audience: "Для кого создан сайт?",
    students: "Ученикам",
    studentsText:
      "Для изучения профессий, прохождения тестов и планирования будущего.",
    parents: "Родителям",
    parentsText:
      "Для поддержки ребёнка при выборе будущей профессии.",
    teachers: "Педагогам",
    teachersText:
      "Как дополнительный инструмент для профориентационной работы.",
    features: "Наши возможности",
    professions: "Профессии",
    professionsText: "Знакомство с различными профессиями.",
    tests: "Профориентационные тесты",
    testsText: "Изучение интересов и способностей.",
    games: "Познавательные игры",
    gamesText: "Знакомство с профессиями через игры.",
    unt: "ЕНТ и предметы",
    untText: "Изучение направлений по комбинациям предметов.",
    advice: "Полезные советы",
    adviceText: "Рекомендации для учеников и родителей.",
    specialist: "Профессиональная ориентация",
    specialistText:
      "Профориентация — это процесс, который помогает школьникам изучать возможности обучения и выбора профессии с учётом интересов и способностей.",
    motto: "У каждого ученика свой путь, своя мечта и своё будущее!",
    explore: "Изучить профессии",
    contact: "Обратная связь",
    contactText:
      "Если у вас есть вопросы или предложения, вы можете обратиться к школьному специалисту по профориентации.",
    feedback: "Подготовить сообщение",
    copied: "Текст скопирован!",
    copyText:
      "Здравствуйте! У меня есть вопрос или предложение по сайту BOLASHAQ | Бағдар: ",
    footer: "Знания. Выбор. Будущее.",
  },
};

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("kk");
  const [copied, setCopied] = useState(false);
  const t = content[lang];

  const features = [
    {
      icon: "🎓",
      title: t.professions,
      text: t.professionsText,
      href: "/professions",
      color: "from-blue-600 to-cyan-400",
    },
    {
      icon: "🧠",
      title: t.tests,
      text: t.testsText,
      href: "/tests",
      color: "from-violet-600 to-pink-400",
    },
    {
      icon: "🎮",
      title: t.games,
      text: t.gamesText,
      href: "/games",
      color: "from-orange-500 to-yellow-400",
    },
    {
      icon: "📚",
      title: t.unt,
      text: t.untText,
      href: "/unt",
      color: "from-emerald-600 to-teal-400",
    },
    {
      icon: "💡",
      title: t.advice,
      text: t.adviceText,
      href: "/advice",
      color: "from-indigo-600 to-blue-400",
    },
  ];

  async function copyFeedback() {
    try {
      await navigator.clipboard.writeText(t.copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      window.prompt(
        lang === "kk" ? "Мәтінді көшіріңіз:" : "Скопируйте текст:",
        t.copyText
      );
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="text-xl font-black text-blue-800">
            🚀 BOLASHAQ | Бағдар
          </Link>

          <div className="flex gap-2">
            <button
              onClick={() => setLang("kk")}
              className={`rounded-full px-4 py-2 font-bold ${
                lang === "kk"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              ҚАЗ
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`rounded-full px-4 py-2 font-bold ${
                lang === "ru"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              РУС
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-800 via-indigo-700 to-cyan-500 p-8 text-white shadow-2xl md:p-14">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-yellow-300/10" />

          <div className="relative">
            <div className="text-6xl">🌍🚀🎓</div>
            <h1 className="mt-6 text-4xl font-black md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50">
              {t.subtitle}
            </p>
          </div>
        </section>

        <section className="mt-9 rounded-3xl bg-white p-7 shadow-xl md:p-10">
          <div className="text-5xl">🎯</div>
          <h2 className="mt-4 text-3xl font-black text-blue-950">
            {t.mission}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t.missionText}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="mb-7 text-center text-3xl font-black text-blue-950">
            👥 {t.audience}
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: "🧑‍🎓", title: t.students, text: t.studentsText },
              { icon: "👨‍👩‍👧", title: t.parents, text: t.parentsText },
              { icon: "👩‍🏫", title: t.teachers, text: t.teachersText },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl bg-white p-7 text-center shadow-lg transition hover:-translate-y-1"
              >
                <div className="text-6xl">{item.icon}</div>
                <h3 className="mt-5 text-xl font-black text-blue-950">
                  {item.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-7 text-center text-3xl font-black text-blue-950">
            ✨ {t.features}
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-3xl bg-white p-5 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className={`flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-6xl`}
                >
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-xl font-black text-blue-950">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {feature.text}
                </p>
                <span className="mt-4 inline-block font-bold text-blue-600 group-hover:underline">
                  {lang === "kk" ? "Бөлімге өту" : "Открыть раздел"} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-600 p-8 text-white shadow-xl md:p-10">
          <div className="text-5xl">🧭</div>
          <h2 className="mt-5 text-3xl font-black">
            {t.specialist}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-50">
            {t.specialistText}
          </p>
        </section>

        <section className="mt-12 rounded-[36px] bg-gradient-to-r from-yellow-300 to-orange-300 p-8 text-center shadow-xl md:p-12">
          <div className="text-6xl">🌟</div>
          <h2 className="mt-5 text-3xl font-black leading-tight text-blue-950 md:text-4xl">
            {t.motto}
          </h2>
          <Link
            href="/professions"
            className="mt-7 inline-block rounded-full bg-blue-700 px-9 py-4 font-black text-white transition hover:bg-blue-800"
          >
            {t.explore} →
          </Link>
        </section>

        <section className="mt-12 rounded-3xl bg-white p-7 text-center shadow-xl md:p-10">
          <div className="text-5xl">✉️</div>
          <h2 className="mt-4 text-3xl font-black text-blue-950">
            {t.contact}
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            {t.contactText}
          </p>
          <button
            onClick={copyFeedback}
            className="mt-6 rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700"
          >
            {copied ? `✅ ${t.copied}` : `📋 ${t.feedback}`}
          </button>
        </section>

        <div className="mt-9 text-center">
          <Link
            href="/"
            className="inline-block rounded-full bg-slate-800 px-8 py-4 font-bold text-white"
          >
            ← {lang === "kk" ? t.home : t.home}
          </Link>
        </div>
      </div>

      <footer className="mt-12 bg-blue-950 px-5 py-8 text-center text-white">
        <p className="font-black">🚀 BOLASHAQ | Бағдар</p>
        <p className="mt-2 text-sm opacity-80">{t.footer}</p>
      </footer>
    </main>
  );
}
