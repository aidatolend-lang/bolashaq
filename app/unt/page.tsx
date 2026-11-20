
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Lang = "kk" | "ru";

type Program = {
  code: string;
  kk: string;
  ru: string;
  emoji: string;
};

type Combination = {
  id: string;
  kk: string;
  ru: string;
  programs: Program[];
};

const combinations: Combination[] = [
  {
    id: "math-physics",
    kk: "Математика + Физика",
    ru: "Математика + Физика",
    programs: [
      { code: "B009", kk: "Математика мұғалімдерін даярлау", ru: "Подготовка учителей математики", emoji: "📐" },
      { code: "B010", kk: "Физика мұғалімдерін даярлау", ru: "Подготовка учителей физики", emoji: "🔬" },
    ],
  },
  {
    id: "math-info",
    kk: "Математика + Информатика",
    ru: "Математика + Информатика",
    programs: [
      { code: "B011", kk: "Информатика мұғалімдерін даярлау", ru: "Подготовка учителей информатики", emoji: "👩‍🏫" },
    ],
  },
  {
    id: "math-geo",
    kk: "Математика + География",
    ru: "Математика + География",
    programs: [
      { code: "example-1", kk: "Экономика бағытындағы бағдарламалар", ru: "Программы в области экономики", emoji: "📊" },
      { code: "example-2", kk: "Қаржы бағытындағы бағдарламалар", ru: "Программы в области финансов", emoji: "💰" },
    ],
  },
  {
    id: "bio-chem",
    kk: "Биология + Химия",
    ru: "Биология + Химия",
    programs: [
      { code: "B013", kk: "Биология мұғалімдерін даярлау", ru: "Подготовка учителей биологии", emoji: "🧬" },
      { code: "example-3", kk: "Медицина бағытындағы бағдарламалар", ru: "Программы в области медицины", emoji: "🩺" },
    ],
  },
  {
    id: "bio-geo",
    kk: "Биология + География",
    ru: "Биология + География",
    programs: [
      { code: "B001", kk: "Педагогика және психология", ru: "Педагогика и психология", emoji: "🧠" },
      { code: "B002", kk: "Мектепке дейінгі оқыту және тәрбиелеу", ru: "Дошкольное обучение и воспитание", emoji: "🧸" },
      { code: "B003", kk: "Бастауышта оқыту педагогикасы мен әдістемесі", ru: "Педагогика и методика начального обучения", emoji: "📚" },
      { code: "B020", kk: "Арнайы педагогика", ru: "Специальная педагогика", emoji: "❤️" },
    ],
  },
  {
    id: "history-geo",
    kk: "Дүниежүзі тарихы + География",
    ru: "Всемирная история + География",
    programs: [
      { code: "B008", kk: "Құқық және экономика негіздері мұғалімдерін даярлау", ru: "Подготовка учителей основ права и экономики", emoji: "⚖️" },
      { code: "B014", kk: "География мұғалімдерін даярлау", ru: "Подготовка учителей географии", emoji: "🌍" },
      { code: "B015", kk: "Гуманитарлық пәндер мұғалімдерін даярлау", ru: "Подготовка учителей гуманитарных дисциплин", emoji: "🏛️" },
    ],
  },
  {
    id: "history-law",
    kk: "Дүниежүзі тарихы + Құқық негіздері",
    ru: "Всемирная история + Основы права",
    programs: [
      { code: "example-4", kk: "Құқық бағытындағы бағдарламалар", ru: "Программы в области права", emoji: "⚖️" },
    ],
  },
  {
    id: "foreign-history",
    kk: "Шетел тілі + Дүниежүзі тарихы",
    ru: "Иностранный язык + Всемирная история",
    programs: [
      { code: "B018", kk: "Шет тілі мұғалімдерін даярлау", ru: "Подготовка учителей иностранного языка", emoji: "🌐" },
    ],
  },
  {
    id: "creative",
    kk: "Шығармашылық емтихандар",
    ru: "Творческие экзамены",
    programs: [
      { code: "B005", kk: "Дене шынықтыру мұғалімдерін даярлау", ru: "Подготовка учителей физической культуры", emoji: "🏅" },
      { code: "B006", kk: "Музыка мұғалімдерін даярлау", ru: "Подготовка учителей музыки", emoji: "🎵" },
      { code: "B007", kk: "Көркем еңбек және сызу мұғалімдерін даярлау", ru: "Подготовка учителей художественного труда и черчения", emoji: "🎨" },
    ],
  },
];

export default function UntPage() {
  const [lang, setLang] = useState<Lang>("kk");
  const [selected, setSelected] = useState("bio-geo");
  const [search, setSearch] = useState("");

  const t = (kk: string, ru: string) => lang === "kk" ? kk : ru;

  const current = combinations.find((c) => c.id === selected)!;

  const filtered = useMemo(
    () =>
      current.programs.filter((p) =>
        `${p.kk} ${p.ru} ${p.code}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [current, search]
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-slate-900">
      <header className="sticky top-0 z-20 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="text-xl font-black text-blue-800">
            🚀 BOLASHAQ | Бағдар
          </Link>

          <div className="flex gap-2">
            {(["kk", "ru"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-4 py-2 font-bold ${
                  lang === l
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                }`}
              >
                {l === "kk" ? "ҚАЗ" : "РУС"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        <section className="rounded-[36px] bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 p-8 text-white shadow-2xl md:p-12">
          <div className="text-6xl">🎓📚</div>
          <h1 className="mt-5 text-4xl font-black md:text-5xl">
            {t("ҰБТ және пән комбинациялары", "ЕНТ и комбинации предметов")}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-blue-50">
            {t(
              "Бейіндік пәндеріңді таңдап, сәйкес білім беру бағдарламаларының мысалдарын зертте.",
              "Выбери профильные предметы и изучи примеры подходящих образовательных программ."
            )}
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-xl md:p-8">
          <h2 className="text-2xl font-black text-blue-950">
            🔎 {t("Пән комбинациясын таңда", "Выбери комбинацию предметов")}
          </h2>

          <label htmlFor="combination" className="mt-6 block font-semibold">
            {t("Бейіндік пәндер", "Профильные предметы")}
          </label>

          <select
            id="combination"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setSearch("");
            }}
            className="mt-3 w-full rounded-2xl border-2 border-blue-100 bg-blue-50 p-4 text-lg outline-none focus:border-blue-500"
          >
            {combinations.map((c) => (
              <option key={c.id} value={c.id}>
                {c[lang]}
              </option>
            ))}
          </select>

          <div className="mt-7 rounded-2xl bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-600">
              {t("Таңдалған комбинация", "Выбранная комбинация")}
            </p>
            <h3 className="mt-2 text-2xl font-black text-blue-950">
              {current[lang]}
            </h3>
          </div>
        </section>

        <section className="mt-9">
          <h2 className="text-3xl font-black text-blue-950">
            ✨ {t("Сәйкес бағыттар", "Подходящие направления")}
          </h2>

          <p className="mt-3 text-slate-600">
            {t(
              "Бұл толық тізім емес. Әзірге таңдаулы бағдарламалар мен бағыттар көрсетілген.",
              "Это не полный перечень. Пока показаны отдельные программы и направления."
            )}
          </p>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("Бағдарламаны іздеу...", "Поиск программы...")}
            className="mt-6 w-full rounded-2xl border border-blue-200 bg-white p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filtered.map((p) => (
              <article
                key={p.code}
                className="rounded-3xl border border-white bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-5xl">{p.emoji}</div>

                {!p.code.startsWith("example") && (
                  <span className="mt-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700">
                    {p.code}
                  </span>
                )}

                <h3 className="mt-4 text-xl font-black text-blue-950">
                  {p[lang]}
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  {t(
                    "Оқу орны мен нақты бағдарламаның талаптарын қосымша тексер.",
                    "Дополнительно проверь требования вуза и конкретной программы."
                  )}
                </p>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-6 rounded-2xl bg-white p-7 text-center">
              {t("Ештеңе табылмады.", "Ничего не найдено.")}
            </p>
          )}
        </section>

        <section className="mt-12 rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-600 p-7 text-white shadow-xl">
          <h2 className="text-2xl font-black">
            💡 {t("ҰБТ туралы маңызды ақпарат", "Важная информация об ЕНТ")}
          </h2>

          <p className="mt-4 leading-7">
            {t(
              "ҰБТ-ның негізгі форматында 3 міндетті және 2 бейіндік пән бар. Шығармашылық бағыттарға түсу тәртібі бөлек болуы мүмкін.",
              "В основном формате ЕНТ есть 3 обязательных и 2 профильных предмета. Для творческих направлений предусмотрен особый порядок."
            )}
          </p>

          <p className="mt-4 text-sm text-blue-100">
            {t(
              "Бағдарламалар тізімі, шекті балдар және қабылдау талаптары өзгеруі мүмкін. Соңғы ақпаратты ресми дереккөзден қара.",
              "Список программ, пороговые баллы и условия приёма могут изменяться. Проверяй актуальные сведения в официальных источниках."
            )}
          </p>

          <a
            href="https://testcenter.kz/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-yellow-400 px-7 py-3 font-black text-blue-950"
          >
            🌐 {t("Ұлттық тестілеу орталығы", "Национальный центр тестирования")} ↗
          </a>
        </section>

        <div className="mt-9 text-center">
          <Link
            href="/"
            className="inline-block rounded-full bg-blue-600 px-8 py-4 font-bold text-white shadow-lg hover:bg-blue-700"
          >
            ← {t("Басты бетке оралу", "Вернуться на главную")}
          </Link>
        </div>
      </div>

      <footer className="mt-12 bg-blue-950 px-5 py-8 text-center text-white">
        <p className="font-black">🚀 BOLASHAQ | Бағдар</p>
        <p className="mt-2 text-sm opacity-80">
          {t("Білім. Таңдау. Болашақ.", "Знания. Выбор. Будущее.")}
        </p>
      </footer>
    </main>
  );
}
