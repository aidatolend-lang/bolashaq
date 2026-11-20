
"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "kk" | "ru";
type Game = "guess" | "who" | "match" | "dream";

type Job = {
  emoji: string;
  kk: string;
  ru: string;
  clueKk: string;
  clueRu: string;
  hintsKk: string[];
  hintsRu: string[];
  dutyKk: string;
  dutyRu: string;
};

const jobs: Job[] = [
  {
    emoji: "🩺",
    kk: "Дәрігер",
    ru: "Врач",
    clueKk: "Адамдардың денсаулығын тексеріп, ауруларды емдейді.",
    clueRu: "Проверяет здоровье людей и лечит болезни.",
    hintsKk: ["Ақ халат киеді", "Ауруханада жұмыс істей алады", "Науқастарды емдейді"],
    hintsRu: ["Носит белый халат", "Может работать в больнице", "Лечит пациентов"],
    dutyKk: "Адамдарды емдеу",
    dutyRu: "Лечить людей",
  },
  {
    emoji: "💻",
    kk: "Бағдарламашы",
    ru: "Программист",
    clueKk: "Сайттар мен мобильді қосымшалар жасайды.",
    clueRu: "Создаёт сайты и мобильные приложения.",
    hintsKk: ["Компьютермен жұмыс істейді", "Логиканы қолданады", "Код жазады"],
    hintsRu: ["Работает за компьютером", "Использует логику", "Пишет код"],
    dutyKk: "Бағдарлама жазу",
    dutyRu: "Писать программы",
  },
  {
    emoji: "👩‍🏫",
    kk: "Мұғалім",
    ru: "Учитель",
    clueKk: "Оқушыларға білім беріп, сабақ түсіндіреді.",
    clueRu: "Обучает школьников и объясняет уроки.",
    hintsKk: ["Балалармен жұмыс істейді", "Сабақ жоспарын жасайды", "Мектепте білім береді"],
    hintsRu: ["Работает с детьми", "Планирует уроки", "Обучает в школе"],
    dutyKk: "Білім беру",
    dutyRu: "Обучать детей",
  },
  {
    emoji: "🏗️",
    kk: "Инженер",
    ru: "Инженер",
    clueKk: "Техникалық құрылғылар мен жүйелерді жобалайды.",
    clueRu: "Проектирует технические устройства и системы.",
    hintsKk: ["Есептеулер жүргізеді", "Техникамен жұмыс істейді", "Жобалар әзірлейді"],
    hintsRu: ["Делает расчёты", "Работает с техникой", "Создаёт проекты"],
    dutyKk: "Техникалық жүйелерді жобалау",
    dutyRu: "Проектировать технические системы",
  },
  {
    emoji: "🎨",
    kk: "Дизайнер",
    ru: "Дизайнер",
    clueKk: "Логотиптер, жарнамалар және әдемі визуалды жобалар жасайды.",
    clueRu: "Создаёт логотипы, рекламу и визуальные проекты.",
    hintsKk: ["Түстерді үйлестіреді", "Шығармашылықпен айналысады", "Визуалды дизайн жасайды"],
    hintsRu: ["Сочетает цвета", "Занимается творчеством", "Создаёт визуальный дизайн"],
    dutyKk: "Визуалды дизайн жасау",
    dutyRu: "Создавать визуальный дизайн",
  },
  {
    emoji: "⚖️",
    kk: "Заңгер",
    ru: "Юрист",
    clueKk: "Адамдарға заң және құқық мәселелері бойынша кеңес береді.",
    clueRu: "Консультирует людей по вопросам права.",
    hintsKk: ["Құжаттарды зерттейді", "Құқықты біледі", "Заң бойынша кеңес береді"],
    hintsRu: ["Изучает документы", "Знает право", "Консультирует по законам"],
    dutyKk: "Құқықтық кеңес беру",
    dutyRu: "Консультировать по праву",
  },
];

const cards = [
  { id: "guess" as Game, emoji: "🕵️", kk: "Мамандықты тап!", ru: "Угадай профессию!", color: "from-blue-600 to-cyan-400" },
  { id: "who" as Game, emoji: "🎭", kk: "Мен кіммін?", ru: "Кто я?", color: "from-violet-600 to-pink-500" },
  { id: "match" as Game, emoji: "🧩", kk: "Сәйкестендір!", ru: "Найди пару!", color: "from-orange-500 to-amber-400" },
  { id: "dream" as Game, emoji: "🌟", kk: "Арман мамандығым", ru: "Профессия мечты", color: "from-emerald-600 to-teal-400" },
];

const questionOrder = [2, 0, 4, 1, 5, 3];
const choices = [
  [2, 1, 0],
  [4, 0, 3],
  [1, 4, 2],
  [3, 1, 5],
  [0, 5, 4],
  [3, 2, 1],
];

export default function GamesPage() {
  const [lang, setLang] = useState<Lang>("kk");
  const [game, setGame] = useState<Game | null>(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hint, setHint] = useState(0);
  const [finished, setFinished] = useState(false);
  const [matched, setMatched] = useState<number[]>([]);
  const [chosenDuty, setChosenDuty] = useState<number | null>(null);
  const [dream, setDream] = useState<number | null>(null);
  const [studentName, setStudentName] = useState("");

  const t = (kk: string, ru: string) => lang === "kk" ? kk : ru;
  const jobName = (j: Job) => j[lang];
  const current = jobs[questionOrder[step]];

  function start(id: Game) {
    setGame(id);
    setStep(0);
    setScore(0);
    setSelected(null);
    setHint(0);
    setFinished(false);
    setMatched([]);
    setChosenDuty(null);
    setDream(null);
    setStudentName("");
  }

  function answer(choice: number) {
    if (selected !== null) return;
    setSelected(choice);
    if (choice === questionOrder[step]) {
      setScore((s) => s + (game === "who" ? Math.max(5, 15 - hint * 5) : 10));
    }
  }

  function next() {
    if (step + 1 === questionOrder.length) {
      setFinished(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setHint(0);
    }
  }

  function matchDuty(index: number) {
    if (chosenDuty === null || matched.includes(index)) return;
    if (chosenDuty === index) {
      const updated = [...matched, index];
      setMatched(updated);
      setScore((s) => s + 10);
      if (updated.length === jobs.length) setFinished(true);
    }
    setChosenDuty(null);
  }

  const btn = "rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700";
  const panel = "rounded-[32px] bg-white p-6 md:p-10 shadow-2xl";

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-slate-900">
      <header className="sticky top-0 z-20 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link href="/" className="text-xl font-black text-blue-800">
            🚀 BOLASHAQ | Бағдар
          </Link>
          <div className="flex gap-2">
            {(["kk", "ru"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-4 py-2 font-bold ${
                  lang === l ? "bg-blue-600 text-white" : "bg-slate-100"
                }`}
              >
                {l === "kk" ? "ҚАЗ" : "РУС"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        {!game ? (
          <>
            <section className="rounded-[36px] bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 p-9 text-white shadow-2xl md:p-14">
              <div className="text-6xl">🎮✨</div>
              <h1 className="mt-5 text-4xl font-black md:text-5xl">
                {t("Мамандықтар әлеміне саяхат!", "Путешествие в мир профессий!")}
              </h1>
              <p className="mt-4 text-lg text-blue-50">
                {t(
                  "Ойна, үйрен, ұпай жина және болашақ мамандығыңды зертте!",
                  "Играй, учись, набирай очки и исследуй будущую профессию!"
                )}
              </p>
            </section>

            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {cards.map((c) => (
                <article key={c.id} className="rounded-3xl bg-white p-6 shadow-xl">
                  <div className={`rounded-3xl bg-gradient-to-br ${c.color} p-9 text-center text-7xl`}>
                    {c.emoji}
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-blue-950">
                    {c[lang]}
                  </h2>
                  <button onClick={() => start(c.id)} className={`${btn} mt-5 w-full`}>
                    {t("Ойынды бастау →", "Начать игру →")}
                  </button>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-3xl">
            <button onClick={() => setGame(null)} className="mb-5 font-bold text-blue-700">
              ← {t("Барлық ойындар", "Все игры")}
            </button>

            <div className={panel}>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-black text-blue-950">
                  {cards.find((c) => c.id === game)?.[lang]}
                </h1>
                <span className="rounded-full bg-yellow-100 px-5 py-2 font-black text-amber-800">
                  ⭐ {score} {t("ұпай", "очков")}
                </span>
              </div>

              {finished && game !== "dream" ? (
                <div className="py-8 text-center">
                  <div className="text-8xl">🏆</div>
                  <h2 className="mt-5 text-3xl font-black text-blue-900">
                    {t("Жарайсың! Ойын аяқталды!", "Молодец! Игра завершена!")}
                  </h2>
                  <p className="my-6 text-5xl font-black text-amber-500">{score} ⭐</p>
                  <button onClick={() => start(game)} className={btn}>
                    🔄 {t("Қайта ойнау", "Играть снова")}
                  </button>
                </div>
              ) : null}

              {!finished && (game === "guess" || game === "who") && (
                <>
                  <p className="mb-3 text-sm font-bold text-blue-600">
                    {t("Сұрақ", "Вопрос")} {step + 1} / {questionOrder.length}
                  </p>
                  <div className="mb-7 h-3 overflow-hidden rounded-full bg-blue-100">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{ width: `${(step / questionOrder.length) * 100}%` }}
                    />
                  </div>

                  <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-7 text-center text-white">
                    <div className="text-6xl">{game === "who" ? "❓" : "🔎"}</div>
                    <h2 className="mt-5 text-xl font-black">
                      {game === "guess"
                        ? current[lang === "kk" ? "clueKk" : "clueRu"]
                        : current[lang === "kk" ? "hintsKk" : "hintsRu"][hint]}
                    </h2>
                    {game === "who" && hint < 2 && selected === null && (
                      <button
                        onClick={() => setHint((h) => h + 1)}
                        className="mt-5 rounded-full bg-white/20 px-5 py-2 font-bold"
                      >
                        💡 {t("Келесі белгі", "Следующая подсказка")}
                      </button>
                    )}
                  </div>

                  <div className="mt-6 grid gap-3">
                    {choices[step].map((id) => (
                      <button
                        key={id}
                        disabled={selected !== null}
                        onClick={() => answer(id)}
                        className={`rounded-2xl border-2 p-4 text-left font-bold transition ${
                          selected !== null && id === questionOrder[step]
                            ? "border-green-500 bg-green-100"
                            : selected === id
                              ? "border-red-500 bg-red-100"
                              : "border-blue-100 bg-blue-50 hover:border-blue-500"
                        }`}
                      >
                        {jobs[id].emoji} {jobName(jobs[id])}
                      </button>
                    ))}
                  </div>

                  {selected !== null && (
                    <div className="mt-6 text-center">
                      <p className="mb-4 text-xl font-black">
                        {selected === questionOrder[step]
                          ? t("Дұрыс! 🎉", "Правильно! 🎉")
                          : t("Дұрыс жауап:", "Правильный ответ:") + " " + jobName(current)}
                      </p>
                      <button onClick={next} className={btn}>
                        {step === questionOrder.length - 1
                          ? t("Нәтижені көру", "Посмотреть результат")
                          : t("Келесі сұрақ →", "Следующий вопрос →")}
                      </button>
                    </div>
                  )}
                </>
              )}

              {!finished && game === "match" && (
                <>
                  <p className="mb-5 text-slate-600">
                    {t(
                      "Алдымен мамандықты, содан кейін оның қызметін таңда.",
                      "Сначала выбери профессию, затем её задачу."
                    )}
                  </p>
                  <p className="mb-5 font-bold text-blue-800">
                    {matched.length} / {jobs.length} {t("сәйкестік", "совпадений")}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      {jobs.map((j, i) => (
                        <button
                          key={i}
                          disabled={matched.includes(i)}
                          onClick={() => setChosenDuty(i)}
                          className={`w-full rounded-xl border-2 p-3 text-sm font-bold ${
                            matched.includes(i)
                              ? "border-green-300 bg-green-100 opacity-60"
                              : chosenDuty === i
                                ? "border-blue-600 bg-blue-200"
                                : "border-blue-100 bg-blue-50"
                          }`}
                        >
                          {j.emoji} {jobName(j)}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {[3, 0, 5, 1, 4, 2].map((i) => (
                        <button
                          key={i}
                          disabled={matched.includes(i)}
                          onClick={() => matchDuty(i)}
                          className={`w-full rounded-xl border-2 p-3 text-sm font-semibold ${
                            matched.includes(i)
                              ? "border-green-300 bg-green-100 opacity-60"
                              : "border-indigo-100 bg-indigo-50 hover:border-indigo-500"
                          }`}
                        >
                          {jobs[i][lang === "kk" ? "dutyKk" : "dutyRu"]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="mt-5 text-center text-sm text-slate-500">
                    {t("Дұрыс жұп жасыл түске боялады.", "Правильная пара станет зелёной.")}
                  </p>
                </>
              )}

              {game === "dream" && (
                <>
                  <p className="mb-5 text-slate-600">
                    {t(
                      "Арманыңдағы мамандықты таңдап, өз карточкаңды жаса!",
                      "Выбери профессию мечты и создай свою карточку!"
                    )}
                  </p>

                  <input
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder={t("Есіміңді жаз (міндетті емес)", "Введи имя (необязательно)")}
                    className="mb-5 w-full rounded-2xl border border-blue-200 p-4 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {jobs.map((j, i) => (
                      <button
                        key={i}
                        onClick={() => setDream(i)}
                        className={`rounded-2xl border-2 p-4 text-center ${
                          dream === i
                            ? "border-blue-600 bg-blue-100"
                            : "border-blue-100 bg-slate-50"
                        }`}
                      >
                        <div className="text-4xl">{j.emoji}</div>
                        <p className="mt-2 text-sm font-bold">{jobName(j)}</p>
                      </button>
                    ))}
                  </div>

                  {dream !== null && (
                    <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-700 to-cyan-500 p-8 text-center text-white shadow-xl">
                      <div className="text-7xl">{jobs[dream].emoji}</div>
                      <p className="mt-4 text-lg">
                        {studentName.trim() || t("Мен", "Я")}
                      </p>
                      <h2 className="mt-2 text-3xl font-black">
                        {t("Менің арман мамандығым", "Моя профессия мечты")}
                      </h2>
                      <p className="mt-3 text-2xl font-bold">{jobName(jobs[dream])}</p>
                      <p className="mt-4 text-blue-100">
                        {jobs[dream][lang === "kk" ? "clueKk" : "clueRu"]}
                      </p>
                      <p className="mt-5 font-semibold">
                        ✨ {t("Арманыңа сен!", "Верь в свою мечту!")}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 bg-blue-950 px-5 py-8 text-center text-white">
        <p className="font-black">🚀 BOLASHAQ | Бағдар</p>
        <p className="mt-2 text-sm opacity-80">Білім. Таңдау. Болашақ.</p>
      </footer>
    </main>
  );
}
