
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Lang = "kk" | "ru";

type Job = {
  id: number;
  emoji: string;
  kk: string;
  ru: string;
  category: string;
  descKk: string;
  descRu: string;
  subjectsKk: string;
  subjectsRu: string;
  skillsKk: string;
  skillsRu: string;
};

const jobs: Job[] = [
  {
    id: 1,
    emoji: "🩺",
    kk: "Дәрігер",
    ru: "Врач",
    category: "medicine",
    descKk: "Адамдардың денсаулығын сақтайды, ауруларды анықтап, емдейді.",
    descRu: "Диагностирует и лечит заболевания, заботится о здоровье людей.",
    subjectsKk: "Биология + Химия",
    subjectsRu: "Биология + Химия",
    skillsKk: "Жауапкершілік, жанашырлық, дәлдік",
    skillsRu: "Ответственность, эмпатия, точность",
  },
  {
    id: 2,
    emoji: "💻",
    kk: "Бағдарламашы",
    ru: "Программист",
    category: "it",
    descKk: "Сайттар, қосымшалар және бағдарламалық жүйелер жасайды.",
    descRu: "Создаёт сайты, приложения и программные системы.",
    subjectsKk: "Математика + Информатика",
    subjectsRu: "Математика + Информатика",
    skillsKk: "Логика, шыдамдылық, мәселе шешу",
    skillsRu: "Логика, терпение, решение задач",
  },
  {
    id: 3,
    emoji: "👩‍🏫",
    kk: "Мұғалім",
    ru: "Учитель",
    category: "education",
    descKk: "Оқушыларға білім беріп, олардың қабілеттерін дамытады.",
    descRu: "Обучает детей и помогает развивать их способности.",
    subjectsKk: "Бағытына байланысты (мысалы, Математика + Физика)",
    subjectsRu: "Зависит от специальности (например, Математика + Физика)",
    skillsKk: "Түсіндіру, сабыр, қарым-қатынас",
    skillsRu: "Объяснение, терпение, общение",
  },
  {
    id: 4,
    emoji: "🏗️",
    kk: "Инженер",
    ru: "Инженер",
    category: "engineering",
    descKk: "Құрылғыларды, ғимараттарды немесе техникалық жүйелерді жобалайды.",
    descRu: "Проектирует устройства, здания или технические системы.",
    subjectsKk: "Көбіне Математика + Физика",
    subjectsRu: "Чаще Математика + Физика",
    skillsKk: "Есептеу, талдау, шығармашылық",
    skillsRu: "Расчёты, анализ, творчество",
  },
  {
    id: 5,
    emoji: "⚖️",
    kk: "Заңгер",
    ru: "Юрист",
    category: "law",
    descKk: "Құқықтық мәселелер бойынша кеңес беріп, заңды қолданады.",
    descRu: "Консультирует по правовым вопросам и применяет законы.",
    subjectsKk: "Дүниежүзі тарихы + Құқық негіздері",
    subjectsRu: "Всемирная история + Основы права",
    skillsKk: "Дәлелдеу, талдау, әділдік",
    skillsRu: "Аргументация, анализ, справедливость",
  },
  {
    id: 6,
    emoji: "🧠",
    kk: "Психолог",
    ru: "Психолог",
    category: "social",
    descKk: "Адамдарға эмоциялық және мінез-құлық қиындықтарын түсінуге көмектеседі.",
    descRu: "Помогает людям разобраться в эмоциях и поведении.",
    subjectsKk: "Биология + География (бағдарламаға қарай тексер)",
    subjectsRu: "Биология + География (уточняйте по программе)",
    skillsKk: "Тыңдау, эмпатия, құпия сақтау",
    skillsRu: "Умение слушать, эмпатия, конфиденциальность",
  },
  {
    id: 7,
    emoji: "🎨",
    kk: "Графикалық дизайнер",
    ru: "Графический дизайнер",
    category: "creative",
    descKk: "Логотип, жарнама, иллюстрация және визуалды өнімдер әзірлейді.",
    descRu: "Создаёт логотипы, рекламу, иллюстрации и визуальные материалы.",
    subjectsKk: "Кей бағдарламаларда шығармашылық емтихан",
    subjectsRu: "На некоторых программах творческий экзамен",
    skillsKk: "Қиял, композиция, цифрлық құралдар",
    skillsRu: "Воображение, композиция, цифровые инструменты",
  },
  {
    id: 8,
    emoji: "📊",
    kk: "Экономист",
    ru: "Экономист",
    category: "business",
    descKk: "Қаржы мен экономикалық көрсеткіштерді талдайды.",
    descRu: "Анализирует финансы и экономические показатели.",
    subjectsKk: "Математика + География",
    subjectsRu: "Математика + География",
    skillsKk: "Сандармен жұмыс, талдау, жоспарлау",
    skillsRu: "Работа с числами, анализ, планирование",
  },
  {
    id: 9,
    emoji: "🤖",
    kk: "Жасанды интеллект маманы",
    ru: "Специалист по ИИ",
    category: "it",
    descKk: "Деректермен және машиналық оқыту модельдерімен жұмыс істейді.",
    descRu: "Работает с данными и моделями машинного обучения.",
    subjectsKk: "Көбіне Математика + Информатика",
    subjectsRu: "Чаще Математика + Информатика",
    skillsKk: "Математика, код жазу, зерттеу",
    skillsRu: "Математика, программирование, исследование",
  },
  {
    id: 10,
    emoji: "🌱",
    kk: "Агроном",
    ru: "Агроном",
    category: "nature",
    descKk: "Егін өсіру технологиясын және өнім сапасын жақсартады.",
    descRu: "Улучшает технологии выращивания культур и качество урожая.",
    subjectsKk: "Биология + Химия (бағдарламаға қарай тексер)",
    subjectsRu: "Биология + Химия (уточняйте по программе)",
    skillsKk: "Бақылау, биология, жоспарлау",
    skillsRu: "Наблюдательность, биология, планирование",
  },
  {
    id: 11,
    emoji: "📱",
    kk: "Маркетолог",
    ru: "Маркетолог",
    category: "business",
    descKk: "Өнімдерді таныстырып, аудитория мен нарықты зерттейді.",
    descRu: "Продвигает продукты, изучает аудиторию и рынок.",
    subjectsKk: "Көбіне Математика + География",
    subjectsRu: "Чаще Математика + География",
    skillsKk: "Шығармашылық, зерттеу, коммуникация",
    skillsRu: "Креативность, исследование, коммуникация",
  },
  {
    id: 12,
    emoji: "📰",
    kk: "Журналист",
    ru: "Журналист",
    category: "creative",
    descKk: "Ақпарат жинап, сұхбат алып, материалдар дайындайды.",
    descRu: "Собирает информацию, берёт интервью и готовит материалы.",
    subjectsKk: "Шығармашылық емтихандар",
    subjectsRu: "Творческие экзамены",
    skillsKk: "Жазу, сұрақ қою, сыни ойлау",
    skillsRu: "Письмо, интервью, критическое мышление",
  },
];

const categories = [
  "all",
  "medicine",
  "it",
  "education",
  "engineering",
  "law",
  "social",
  "creative",
  "business",
  "nature",
];

const labels: Record<string, [string, string]> = {
  all: ["Барлығы", "Все"],
  medicine: ["Медицина", "Медицина"],
  it: ["IT", "IT"],
  education: ["Білім беру", "Образование"],
  engineering: ["Инженерия", "Инженерия"],
  law: ["Құқық", "Право"],
  social: ["Әлеуметтік сала", "Социальная сфера"],
  creative: ["Шығармашылық", "Творчество"],
  business: ["Бизнес", "Бизнес"],
  nature: ["Ауыл шаруашылығы", "Сельское хозяйство"],
};

export default function ProfessionsPage() {
  const [lang, setLang] = useState<Lang>("kk");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Job | null>(null);

  const t = (kk: string, ru: string) =>
    lang === "kk" ? kk : ru;

  const filtered = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (category === "all" || j.category === category) &&
          [j.kk, j.ru, j.descKk, j.descRu]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase())
      ),
    [category, query]
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-slate-900 pb-20">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-xl font-black text-blue-800">
            🚀 BOLASHAQ | {t("Бағдар", "Ориентир")}
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setLang("kk")}
              className={`rounded-full px-4 py-2 font-semibold ${
                lang === "kk"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100"
              }`}
            >
              ҚАЗ
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`rounded-full px-4 py-2 font-semibold ${
                lang === "ru"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100"
              }`}
            >
              РУС
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pt-12">
        <div className="rounded-[2rem] bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-8 top-4 text-7xl opacity-30 rotate-12">
            🎓
          </div>
          <p className="text-blue-100 font-semibold">
            ✨ BOLASHAQ
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-black max-w-3xl">
            {t(
              "Мамандықтар әлемін зертте!",
              "Исследуй мир профессий!"
            )}
          </h1>
          <p className="mt-5 text-lg max-w-2xl text-blue-50">
            {t(
              "Өзіңе ұнайтын бағытты тап, мамандықтың міндеттері мен қажетті дағдыларын біл.",
              "Найди своё направление, узнай о задачах профессий и нужных навыках."
            )}
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white bg-white/90 p-5 shadow-lg">
          <label
            htmlFor="job-search"
            className="block font-bold text-blue-950 mb-2"
          >
            🔎 {t("Мамандық іздеу", "Поиск профессии")}
          </label>
          <input
            id="job-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "Мысалы: дәрігер, IT, мұғалім...",
              "Например: врач, IT, учитель..."
            )}
            className="w-full rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === c
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-100"
                }`}
              >
                {labels[c][lang === "kk" ? 0 : 1]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <h2 className="text-2xl font-black text-blue-950">
            {t("Танымал мамандықтар", "Популярные профессии")}
          </h2>
          <span className="text-sm text-slate-600">
            {filtered.length} {t("мамандық", "профессий")}
          </span>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((job) => (
            <article
              key={job.id}
              className="group rounded-3xl border border-white bg-white/90 p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 via-indigo-100 to-sky-200 text-6xl group-hover:scale-[1.02] transition">
                {job.emoji}
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-wide text-blue-600">
                {labels[job.category][lang === "kk" ? 0 : 1]}
              </div>
              <h3 className="mt-1 text-xl font-extrabold text-blue-950">
                {lang === "kk" ? job.kk : job.ru}
              </h3>
              <p className="mt-2 min-h-16 text-sm text-slate-600">
                {lang === "kk" ? job.descKk : job.descRu}
              </p>
              <button
                onClick={() => setSelected(job)}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-bold text-white hover:brightness-110"
              >
                {t("Толығырақ →", "Подробнее →")}
              </button>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 rounded-2xl bg-white p-8 text-center text-slate-600">
            {t(
              "Мамандық табылмады. Басқа сөзбен іздеп көр.",
              "Профессия не найдена. Попробуй другой запрос."
            )}
          </p>
        )}

        <p className="mt-9 text-sm text-slate-600">
          ⚠️{" "}
          {t(
            "ҰБТ пән комбинациялары білім беру бағдарламасына және қабылдау жылына байланысты өзгеруі мүмкін. Өтініш берер алдында ресми тізімді тексер.",
            "Комбинации предметов ЕНТ могут зависеть от программы и года поступления. Перед подачей документов проверь официальный перечень."
          )}
        </p>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lang === "kk" ? selected.kk : selected.ru}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <div className="text-6xl">{selected.emoji}</div>
              <button
                aria-label={t("Жабу", "Закрыть")}
                onClick={() => setSelected(null)}
                className="rounded-full bg-slate-100 px-4 py-2 text-xl"
              >
                ✕
              </button>
            </div>

            <h2 className="mt-4 text-3xl font-black text-blue-900">
              {lang === "kk" ? selected.kk : selected.ru}
            </h2>
            <p className="mt-3 text-slate-700">
              {lang === "kk" ? selected.descKk : selected.descRu}
            </p>

            <h3 className="mt-6 font-bold text-blue-900">
              📚 {t("ҰБТ пәндері (бағдар)", "Предметы ЕНТ (ориентир)")}
            </h3>
            <p className="mt-1">
              {lang === "kk"
                ? selected.subjectsKk
                : selected.subjectsRu}
            </p>

            <h3 className="mt-5 font-bold text-blue-900">
              ⭐ {t("Қажетті дағдылар", "Важные навыки")}
            </h3>
            <p className="mt-1">
              {lang === "kk"
                ? selected.skillsKk
                : selected.skillsRu}
            </p>

            <button
              onClick={() => setSelected(null)}
              className="mt-7 w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
            >
              {t("Түсінікті", "Понятно")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
