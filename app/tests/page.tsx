
"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "kk" | "ru";
type TestType = "career" | "interest" | "quiz";
type Answer = { kk: string; ru: string; category?: number; correct?: boolean };
type Question = { kk: string; ru: string; answers: Answer[] };

const directions = [
  { emoji: "🩺", kk: "Медицина және көмек", ru: "Медицина и помощь", jobsKk: "Дәрігер, психолог, мейіргер", jobsRu: "Врач, психолог, медсестра" },
  { emoji: "💻", kk: "IT және технология", ru: "IT и технологии", jobsKk: "Бағдарламашы, ЖИ маманы, инженер", jobsRu: "Программист, специалист по ИИ, инженер" },
  { emoji: "🎨", kk: "Шығармашылық", ru: "Творчество", jobsKk: "Дизайнер, журналист, сәулетші", jobsRu: "Дизайнер, журналист, архитектор" },
  { emoji: "📊", kk: "Бизнес және басқару", ru: "Бизнес и управление", jobsKk: "Экономист, маркетолог, менеджер", jobsRu: "Экономист, маркетолог, менеджер" },
  { emoji: "📚", kk: "Білім және қоғам", ru: "Образование и общество", jobsKk: "Мұғалім, заңгер, әлеуметтік қызметкер", jobsRu: "Учитель, юрист, социальный работник" },
];

const careerPrompts = [
  ["Қай тапсырма саған қызығырақ?", "Какое задание интереснее?"],
  ["Бос уақытыңда немен айналысар едің?", "Чем займёшься в свободное время?"],
  ["Мектептегі қандай жұмыс ұнайды?", "Какая школьная работа нравится?"],
  ["Қандай жоба жасағың келеді?", "Какой проект хочешь создать?"],
  ["Қандай мәселені шешкің келеді?", "Какую проблему хочешь решить?"],
  ["Қай ортада жұмыс істегің келеді?", "В какой среде хочешь работать?"],
  ["Қандай жетістік сені қуантады?", "Какое достижение тебя радует?"],
  ["Достарың сенен қандай көмек сұрайды?", "О чём друзья просят тебя?"],
  ["Қай үйірмеге қатысар едің?", "Какой кружок выберешь?"],
  ["Қай қабілетіңді дамытқың келеді?", "Какой навык хочешь развивать?"],
  ["Қандай жаңалық қызықтырады?", "Какие новости интересны?"],
  ["Қай тапсырманы тез үйренесің?", "Какую задачу быстро освоишь?"],
  ["Қай салаға экскурсия жасағың келеді?", "Куда хочешь на экскурсию?"],
  ["Қандай кітапты таңдайсың?", "Какую книгу выберешь?"],
  ["Топта қандай рөл ұнайды?", "Какая роль в команде нравится?"],
  ["Қандай құралмен жұмыс істегің келеді?", "С каким инструментом хочешь работать?"],
  ["Болашақта кімге көмектескің келеді?", "Кому хочешь помогать в будущем?"],
  ["Қандай байқауға қатысар едің?", "В каком конкурсе поучаствуешь?"],
  ["Сені қандай жұмыс шабыттандырады?", "Какая работа вдохновляет?"],
  ["Өзіңді қай салада елестетесің?", "В какой сфере видишь себя?"],
];

const answerSets: [string, string][][] = [
  [
    ["Адамдарға көмектесу", "Помогать людям"],
    ["Техникамен жұмыс істеу", "Работать с техникой"],
    ["Сурет немесе дизайн жасау", "Рисовать или создавать дизайн"],
    ["Жоспар құрып, ұйымдастыру", "Планировать и организовывать"],
    ["Білім беріп, түсіндіру", "Обучать и объяснять"],
  ],
  [
    ["Денсаулық тақырыбын зерттеу", "Изучать здоровье"],
    ["Бағдарлама жасау", "Создавать программы"],
    ["Шығармашылық жоба жасау", "Делать творческий проект"],
    ["Кәсіп идеясын ойлау", "Придумывать бизнес-идею"],
    ["Адамдармен пікір алмасу", "Обсуждать идеи с людьми"],
  ],
  [
    ["Біреудің мәселесін шешу", "Решать чью-то проблему"],
    ["Есеп пен логика", "Задачи и логика"],
    ["Өнер мен мәтін", "Искусство и тексты"],
    ["Ұйымдастыру және есеп", "Организация и расчёты"],
    ["Түсіндіру және талқылау", "Объяснение и обсуждение"],
  ],
];

const careerQuestions: Question[] = careerPrompts.map((prompt, i) => ({
  kk: prompt[0],
  ru: prompt[1],
  answers: answerSets[i % answerSets.length].map((a, category) => ({
    kk: a[0],
    ru: a[1],
    category,
  })),
}));

const interestQuestions: Question[] = [
  ["Адамдарға көмектескен ұнайды", "Мне нравится помогать людям", 0],
  ["Компьютерлік бағдарламаларды зерттеймін", "Изучаю компьютерные программы", 1],
  ["Сурет салғанды жақсы көремін", "Люблю рисовать", 2],
  ["Ақша мен бюджетті жоспарлау қызықты", "Интересно планировать бюджет", 3],
  ["Басқаларға сабақ түсіндірген ұнайды", "Нравится объяснять уроки", 4],
  ["Биология мен адам ағзасы қызықты", "Интересны биология и организм человека", 0],
  ["Техникалық мәселелерді шешемін", "Решаю технические проблемы", 1],
  ["Әңгіме немесе өлең жазамын", "Пишу рассказы или стихи", 2],
  ["Топты ұйымдастырған ұнайды", "Нравится организовывать команду", 3],
  ["Қоғамдық мәселелерге қызығамын", "Интересуюсь общественными вопросами", 4],
  ["Біреуді мұқият тыңдай аламын", "Умею внимательно слушать", 0],
  ["Жаңа технологияны тез үйренемін", "Быстро осваиваю технологии", 1],
  ["Жаңа идея ойлап табамын", "Придумываю новые идеи", 2],
  ["Сандармен жұмыс ұнайды", "Люблю работать с числами", 3],
  ["Балалармен жұмыс істеу қызықты", "Интересно работать с детьми", 4],
].map(([kk, ru, category]) => ({
  kk: String(kk),
  ru: String(ru),
  answers: [
    { kk: "Иә", ru: "Да", category: Number(category) },
    { kk: "Кейде", ru: "Иногда" },
    { kk: "Жоқ", ru: "Нет" },
  ],
}));

const quizQuestions: Question[] = [
  {
    kk: "Адамдардың денсаулығын кім емдейді?",
    ru: "Кто лечит людей?",
    answers: [
      { kk: "Дәрігер", ru: "Врач", correct: true },
      { kk: "Сәулетші", ru: "Архитектор" },
      { kk: "Экономист", ru: "Экономист" },
    ],
  },
  {
    kk: "Бағдарламашы немен айналысады?",
    ru: "Чем занимается программист?",
    answers: [
      { kk: "Код жазады", ru: "Пишет код", correct: true },
      { kk: "Тіс емдейді", ru: "Лечит зубы" },
      { kk: "Киім тігеді", ru: "Шьёт одежду" },
    ],
  },
  {
    kk: "Ғимаратты жобалайтын маман кім?",
    ru: "Кто проектирует здания?",
    answers: [
      { kk: "Сәулетші", ru: "Архитектор", correct: true },
      { kk: "Аспаз", ru: "Повар" },
      { kk: "Аудармашы", ru: "Переводчик" },
    ],
  },
  {
    kk: "Мұғалімнің негізгі міндеті қандай?",
    ru: "Какова основная задача учителя?",
    answers: [
      { kk: "Білім беру", ru: "Обучать", correct: true },
      { kk: "Үй салу", ru: "Строить дома" },
      { kk: "Ұшақ жүргізу", ru: "Управлять самолётом" },
    ],
  },
  {
    kk: "Заңгер қай саланы білуі тиіс?",
    ru: "В какой сфере разбирается юрист?",
    answers: [
      { kk: "Құқық", ru: "Право", correct: true },
      { kk: "Астрономия", ru: "Астрономия" },
      { kk: "Медицина", ru: "Медицина" },
    ],
  },
  {
    kk: "Дизайнер қандай жұмыс жасайды?",
    ru: "Чем занимается дизайнер?",
    answers: [
      { kk: "Визуалды жобалар", ru: "Визуальные проекты", correct: true },
      { kk: "Операция", ru: "Операции" },
      { kk: "Сот шешімі", ru: "Судебные решения" },
    ],
  },
  {
    kk: "Экономист нені зерттейді?",
    ru: "Что изучает экономист?",
    answers: [
      { kk: "Экономикалық көрсеткіштер", ru: "Экономические показатели", correct: true },
      { kk: "Жұлдыздарды", ru: "Звёзды" },
      { kk: "Жануарларды емдеуді", ru: "Лечение животных" },
    ],
  },
  {
    kk: "Агроном қай салада жұмыс істейді?",
    ru: "В какой сфере работает агроном?",
    answers: [
      { kk: "Ауыл шаруашылығы", ru: "Сельское хозяйство", correct: true },
      { kk: "Құқық", ru: "Право" },
      { kk: "Кино", ru: "Кино" },
    ],
  },
  {
    kk: "Психолог қандай көмек көрсетеді?",
    ru: "Как помогает психолог?",
    answers: [
      { kk: "Психологиялық қолдау", ru: "Психологическая поддержка", correct: true },
      { kk: "Көлік жөндеу", ru: "Ремонт транспорта" },
      { kk: "Құрылыс", ru: "Строительство" },
    ],
  },
  {
    kk: "Журналистің жұмысы қандай?",
    ru: "Чем занимается журналист?",
    answers: [
      { kk: "Ақпарат жинау және жеткізу", ru: "Сбор и передача информации", correct: true },
      { kk: "Көпір салу", ru: "Строительство мостов" },
      { kk: "Дәрі жасау", ru: "Производство лекарств" },
    ],
  },
];

const tests = [
  {
    id: "career" as TestType,
    emoji: "🧭",
    kk: "Маған қандай мамандық сәйкес келеді?",
    ru: "Какая профессия мне подходит?",
    descKk: "20 сұрақ арқылы өзіңе қызықты бағыттарды анықта.",
    descRu: "20 вопросов помогут определить интересные направления.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: "interest" as TestType,
    emoji: "❤️",
    kk: "Менің қызығушылығым мен қабілетім",
    ru: "Мои интересы и способности",
    descKk: "15 тұжырымға жауап беріп, бейімділігіңді зертте.",
    descRu: "Ответь на 15 утверждений и изучи свои склонности.",
    color: "from-purple-600 to-pink-500",
  },
  {
    id: "quiz" as TestType,
    emoji: "🏆",
    kk: "Мамандықтар туралы не білесің?",
    ru: "Что ты знаешь о профессиях?",
    descKk: "10 сұрақтық қызықты викторина.",
    descRu: "Интересная викторина из 10 вопросов.",
    color: "from-orange-500 to-yellow-400",
  },
];

export default function TestsPage() {
  const [lang, setLang] = useState<Lang>("kk");
  const [active, setActive] = useState<TestType | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const t = (kk: string, ru: string) => lang === "kk" ? kk : ru;

  const start = (type: TestType) => {
    setActive(type);
    setIndex(0);
    setAnswers([]);
    setFinished(false);
  };

  const questions =
    active === "career"
      ? careerQuestions
      : active === "interest"
        ? interestQuestions
        : quizQuestions;

  const choose = (answerIndex: number) => {
    const updated = [...answers, answerIndex];
    setAnswers(updated);

    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  };

  const scores = directions.map((_, category) =>
    answers.reduce((total, answerIndex, questionIndex) => {
      const option = questions[questionIndex]?.answers[answerIndex];

      if (active === "career") {
        return total + (option?.category === category ? 1 : 0);
      }

      if (active === "interest") {
        if (option?.category === category) return total + 2;
        if (
          answerIndex === 1 &&
          questions[questionIndex]?.answers[0].category === category
        ) return total + 1;
      }

      return total;
    }, 0)
  );

  const maxScore = Math.max(...scores);
  const topDirections = directions.filter(
    (_, i) => scores[i] === maxScore
  );

  const quizScore = answers.reduce((total, answerIndex, i) =>
    total + (questions[i]?.answers[answerIndex]?.correct ? 1 : 0), 0
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 text-slate-900">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-6xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="font-black text-xl text-blue-800">
            🚀 BOLASHAQ | Бағдар
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setLang("kk")}
              className={`rounded-full px-4 py-2 font-bold ${
                lang === "kk" ? "bg-blue-600 text-white" : "bg-slate-100"
              }`}
            >
              ҚАЗ
            </button>
            <button
              onClick={() => setLang("ru")}
              className={`rounded-full px-4 py-2 font-bold ${
                lang === "ru" ? "bg-blue-600 text-white" : "bg-slate-100"
              }`}
            >
              РУС
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-12">
        {!active && (
          <>
            <div className="rounded-[36px] bg-gradient-to-r from-blue-700 to-cyan-500 p-8 md:p-12 text-white shadow-2xl">
              <div className="text-6xl mb-5">🧠✨</div>
              <h1 className="text-4xl md:text-5xl font-black">
                {t("Өзіңді таны — болашағыңды таңда!", "Познай себя — выбери будущее!")}
              </h1>
              <p className="mt-4 text-lg text-blue-50">
                {t(
                  "Қызықты тесттерден өтіп, қабілеттерің мен қызығушылықтарыңды зертте.",
                  "Пройди тесты и изучи свои способности и интересы."
                )}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-2"
                >
                  <div className={`rounded-3xl bg-gradient-to-br ${test.color} p-8 text-center text-7xl shadow-lg`}>
                    {test.emoji}
                  </div>
                  <h2 className="mt-6 min-h-16 text-xl font-black text-blue-950">
                    {lang === "kk" ? test.kk : test.ru}
                  </h2>
                  <p className="mt-3 min-h-20 text-slate-600">
                    {lang === "kk" ? test.descKk : test.descRu}
                  </p>
                  <button
                    onClick={() => start(test.id)}
                    className="mt-5 w-full rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700"
                  >
                    {t("Тестті бастау →", "Начать тест →")}
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-slate-500">
              {t(
                "Бұл тесттер өзін-өзі тануға арналған. Нәтижелер кәсіби психологиялық диагностика болып саналмайды.",
                "Эти тесты предназначены для самопознания и не являются профессиональной психологической диагностикой."
              )}
            </p>
          </>
        )}

        {active && !finished && (
          <div className="mx-auto max-w-3xl rounded-[36px] bg-white p-6 md:p-10 shadow-2xl">
            <button
              onClick={() => setActive(null)}
              className="mb-7 text-sm font-bold text-blue-700"
            >
              ← {t("Барлық тесттер", "Все тесты")}
            </button>

            <div className="flex justify-between gap-3 text-sm font-bold text-blue-700">
              <span>{t("Сұрақ", "Вопрос")} {index + 1} / {questions.length}</span>
              <span>{Math.round((index / questions.length) * 100)}%</span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all"
                style={{ width: `${(index / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="my-9 text-2xl md:text-3xl font-black text-blue-950">
              {questions[index][lang]}
            </h2>

            <div className="grid gap-3">
              {questions[index].answers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-5 text-left font-semibold transition hover:border-blue-500 hover:bg-blue-100"
                >
                  <span className="mr-3 text-blue-600">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {answer[lang]}
                </button>
              ))}
            </div>
          </div>
        )}

        {active && finished && (
          <div className="mx-auto max-w-3xl rounded-[36px] bg-white p-7 md:p-12 text-center shadow-2xl">
            <div className="text-7xl">🎉🏆</div>
            <h2 className="mt-5 text-3xl md:text-4xl font-black text-blue-950">
              {t("Тест аяқталды!", "Тест завершён!")}
            </h2>

            {active === "quiz" ? (
              <>
                <p className="mt-6 text-lg">
                  {t("Сенің нәтижең:", "Твой результат:")}
                </p>
                <p className="mt-3 text-6xl font-black text-blue-600">
                  {quizScore} / {questions.length}
                </p>
                <p className="mt-5 text-slate-600">
                  {quizScore >= 8
                    ? t("Тамаша нәтиже! 🌟", "Отличный результат! 🌟")
                    : quizScore >= 5
                      ? t("Жақсы! Әлі де үйрене бер! 👍", "Хорошо! Продолжай учиться! 👍")
                      : t("Мамандықтар әлемін көбірек зертте! 📚", "Узнай больше о профессиях! 📚")}
                </p>
              </>
            ) : (
              <>
                <p className="mt-5 text-slate-600">
                  {t(
                    "Жауаптарыңа сүйенсек, саған мына бағыттар қызықты болуы мүмкін:",
                    "По твоим ответам тебе могут быть интересны направления:"
                  )}
                </p>

                <div className="mt-7 grid gap-4">
                  {topDirections.map((direction) => (
                    <div
                      key={direction.kk}
                      className="rounded-3xl border border-blue-100 bg-blue-50 p-6"
                    >
                      <div className="text-5xl">{direction.emoji}</div>
                      <h3 className="mt-3 text-2xl font-black text-blue-900">
                        {direction[lang]}
                      </h3>
                      <p className="mt-3 text-slate-700">
                        {lang === "kk" ? direction.jobsKk : direction.jobsRu}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-slate-500">
                  {t(
                    "Бұл нәтиже тек қызығушылықтарыңды зерттеуге көмектеседі, мамандықты түпкілікті анықтамайды.",
                    "Результат помогает изучить интересы, но не определяет профессию окончательно."
                  )}
                </p>
              </>
            )}

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => start(active)}
                className="rounded-full bg-blue-600 px-7 py-4 font-bold text-white"
              >
                🔄 {t("Қайта өту", "Пройти снова")}
              </button>
              <button
                onClick={() => setActive(null)}
                className="rounded-full bg-slate-100 px-7 py-4 font-bold text-blue-900"
              >
                {t("Барлық тесттер", "Все тесты")}
              </button>
              <Link
                href="/professions"
                className="rounded-full bg-amber-400 px-7 py-4 font-bold text-blue-950"
              >
                🎓 {t("Мамандықтарды көру", "Смотреть профессии")}
              </Link>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-blue-950 px-5 py-7 text-center text-white">
        <p className="font-black">BOLASHAQ | Бағдар</p>
        <p className="mt-2 text-sm opacity-75">Білім. Таңдау. Болашақ.</p>
      </footer>
    </main>
  );
}
