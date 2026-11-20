
"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "kk" | "ru";
type Tab = "steps" | "students" | "parents" | "faq";

type Bilingual = {
  kk: string;
  ru: string;
};

type AdviceItem = {
  icon: string;
  title: Bilingual;
  text: Bilingual;
};

const steps: AdviceItem[] = [
  {
    icon: "🪞",
    title: { kk: "Өзіңді таны", ru: "Узнай себя" },
    text: {
      kk: "Қызығушылықтарыңды, қабілеттеріңді, құндылықтарыңды және ұнататын істеріңді жазып шық.",
      ru: "Запиши свои интересы, способности, ценности и любимые занятия.",
    },
  },
  {
    icon: "🔍",
    title: { kk: "Мамандықтарды зертте", ru: "Изучи профессии" },
    text: {
      kk: "Мамандықтың күнделікті жұмысы, қажетті дағдылары және еңбек жағдайлары туралы біл.",
      ru: "Узнай о повседневной работе, навыках и условиях труда.",
    },
  },
  {
    icon: "💬",
    title: { kk: "Мамандармен сөйлес", ru: "Поговори со специалистами" },
    text: {
      kk: "Өзің қызығатын салада жұмыс істейтін адамдардан тәжірибесі туралы сұра.",
      ru: "Расспроси людей, работающих в интересующей тебя сфере, об их опыте.",
    },
  },
  {
    icon: "🧪",
    title: { kk: "Өзіңді сынап көр", ru: "Попробуй на практике" },
    text: {
      kk: "Үйірмелерге қатыс, шағын жобалар жаса және кәсіби бағдар тесттерін орында.",
      ru: "Посещай кружки, создавай небольшие проекты и проходи профориентационные тесты.",
    },
  },
  {
    icon: "📚",
    title: { kk: "Пәндерді анықта", ru: "Определи предметы" },
    text: {
      kk: "Таңдаған білім беру бағдарламасына қандай ҰБТ бейіндік пәндері қажет екенін тексер.",
      ru: "Проверь, какие профильные предметы ЕНТ нужны для выбранной образовательной программы.",
    },
  },
  {
    icon: "🏫",
    title: { kk: "Оқу орындарын салыстыр", ru: "Сравни учебные заведения" },
    text: {
      kk: "Университеттер мен колледждердің бағдарламаларын, орналасуын, оқу ақысын және қабылдау талаптарын салыстыр.",
      ru: "Сравни программы вузов и колледжей, расположение, стоимость обучения и условия поступления.",
    },
  },
  {
    icon: "🎯",
    title: { kk: "Жеке жоспарыңды жаса", ru: "Составь личный план" },
    text: {
      kk: "Негізгі және қосымша нұсқаларыңды анықтап, дайындық жоспарын құр.",
      ru: "Выбери основной и запасные варианты, составь план подготовки.",
    },
  },
];

const studentAdvice: AdviceItem[] = [
  {
    icon: "🌱",
    title: { kk: "9-сынып", ru: "9 класс" },
    text: {
      kk: "Қызығушылықтарыңды зертте. 9-сыныптан кейін колледжге бару немесе мектепте оқуды жалғастыру мүмкіндіктерін салыстыр.",
      ru: "Изучай интересы. Сравни поступление в колледж после 9 класса и продолжение обучения в школе.",
    },
  },
  {
    icon: "🧭",
    title: { kk: "10-сынып", ru: "10 класс" },
    text: {
      kk: "Болашақ бағыттарыңды нақтыла. Бейіндік пәндерге көңіл бөліп, университеттер мен мамандықтарды зертте.",
      ru: "Уточни направления. Уделяй внимание профильным предметам, изучай вузы и профессии.",
    },
  },
  {
    icon: "🚀",
    title: { kk: "11-сынып", ru: "11 класс" },
    text: {
      kk: "ҰБТ-ға жүйелі дайындал. Қабылдау мерзімдерін бақыла, құжаттарыңды жоспарла және қосымша нұсқа дайында.",
      ru: "Системно готовься к ЕНТ. Следи за сроками приёма, планируй документы и запасной вариант.",
    },
  },
];

const parentAdvice: AdviceItem[] = [
  {
    icon: "👂",
    title: { kk: "Балаңызды тыңдаңыз", ru: "Слушайте ребёнка" },
    text: {
      kk: "Оның қызығушылығы мен пікірін сұраңыз. Өз таңдауыңызды міндеттемей, бірге талқылаңыз.",
      ru: "Интересуйтесь его мнением и увлечениями. Обсуждайте варианты без давления.",
    },
  },
  {
    icon: "🤝",
    title: { kk: "Қолдау көрсетіңіз", ru: "Оказывайте поддержку" },
    text: {
      kk: "Мамандық таңдауда қателесуден қорықпауға көмектесіңіз. Іздену мен тәжірибе жинауға мүмкіндік беріңіз.",
      ru: "Помогайте не бояться ошибок. Давайте возможность исследовать разные направления.",
    },
  },
  {
    icon: "📋",
    title: { kk: "Ақпаратты бірге тексеріңіз", ru: "Проверяйте информацию вместе" },
    text: {
      kk: "Оқу орындарының ресми сайттарынан бағдарламалар, гранттар және қабылдау шарттарын қараңыз.",
      ru: "Изучайте программы, гранты и правила поступления на официальных сайтах учебных заведений.",
    },
  },
  {
    icon: "💙",
    title: { kk: "Салыстырудан аулақ болыңыз", ru: "Избегайте сравнений" },
    text: {
      kk: "Әр баланың қабілеті мен даму жолы әртүрлі. Басқа балалармен салыстырудың орнына оның жетістігін байқаңыз.",
      ru: "У каждого ребёнка свой путь. Вместо сравнения с другими отмечайте его достижения.",
    },
  },
];

const faqs = [
  {
    question: {
      kk: "Қай мамандықты таңдайтынымды білмесем не істеймін?",
      ru: "Что делать, если я не знаю, какую профессию выбрать?",
    },
    answer: {
      kk: "Алдымен қызығушылықтарыңды анықта. Бірнеше бағытты зерттеп, кәсіби бағдар тесттерінен өт және мектептегі кәсіптік бағдар берушімен сөйлес.",
      ru: "Начни с изучения интересов. Исследуй несколько направлений, пройди тесты и поговори со школьным профориентатором.",
    },
  },
  {
    question: {
      kk: "Мамандықты тек жалақысына қарап таңдауға бола ма?",
      ru: "Можно ли выбирать профессию только по зарплате?",
    },
    answer: {
      kk: "Жалақы маңызды, бірақ қызығушылық, қабілет, жұмыс жағдайы және даму мүмкіндіктерін де ескеру қажет.",
      ru: "Зарплата важна, но стоит учитывать интересы, способности, условия работы и возможности развития.",
    },
  },
  {
    question: {
      kk: "ҰБТ-дан төмен балл алсам, болашағым не болады?",
      ru: "Что делать, если я получу низкий балл на ЕНТ?",
    },
    answer: {
      kk: "Мүмкіндіктер бір емтиханмен шектелмейді. Қолданыстағы ережелерге сәйкес қайта тапсыру мүмкіндігін, басқа бағдарламаларды және колледждерді қарастыруға болады.",
      ru: "Возможности не ограничиваются одним экзаменом. Можно изучить варианты пересдачи по действующим правилам, другие программы и колледжи.",
    },
  },
  {
    question: {
      kk: "Ата-анам басқа мамандықты таңдағанымды қаласа ше?",
      ru: "Что делать, если родители хотят другую профессию?",
    },
    answer: {
      kk: "Олармен сабырлы сөйлес. Таңдауыңның себептерін, қажетті пәндерді және болашақ жоспарыңды көрсет. Қажет болса, кәсіптік бағдар берушіні әңгімеге қатыстыр.",
      ru: "Спокойно обсуди свой выбор, покажи план обучения и причины интереса. При необходимости пригласи профориентатора к разговору.",
    },
  },
  {
    question: {
      kk: "Мамандық таңдау тесті нақты шешім шығара ма?",
      ru: "Может ли профориентационный тест принять решение за меня?",
    },
    answer: {
      kk: "Жоқ. Тест тек қызығушылықтарыңды түсінуге көмектеседі. Соңғы шешімді зерттеу, тәжірибе және жеке мақсаттарың негізінде қабылдаған дұрыс.",
      ru: "Нет. Тест помогает понять интересы, но окончательное решение лучше принимать на основе исследования, опыта и личных целей.",
    },
  },
];

export default function AdvicePage() {
  const [lang, setLang] = useState<Lang>("kk");
  const [tab, setTab] = useState<Tab>("steps");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checked, setChecked] = useState<number[]>([]);

  const tr = (kk: string, ru: string) =>
    lang === "kk" ? kk : ru;

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: "steps", icon: "🧭", label: tr("7 қадам", "7 шагов") },
    { id: "students", icon: "🎓", label: tr("Оқушыларға", "Ученикам") },
    { id: "parents", icon: "👨‍👩‍👧", label: tr("Ата-аналарға", "Родителям") },
    { id: "faq", icon: "❓", label: tr("Сұрақ-жауап", "Вопросы и ответы") },
  ];

  const toggleStep = (index: number) => {
    setChecked((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const renderCards = (items: AdviceItem[]) => (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <article
          key={index}
          className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-5xl">{item.icon}</div>
          <h3 className="mt-4 text-xl font-black text-blue-950">
            {item.title[lang]}
          </h3>
          <p className="mt-3 leading-7 text-slate-600">
            {item.text[lang]}
          </p>
        </article>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-100 text-slate-900">
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
        <section className="rounded-[36px] bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl md:p-12">
          <div className="text-6xl">💡🎓</div>
          <h1 className="mt-5 text-4xl font-black md:text-5xl">
            {tr("Мамандық таңдауға кеңестер", "Советы по выбору профессии")}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
            {tr(
              "Өзіңді таны, мүмкіндіктеріңді зертте және болашағыңа сенімді қадам жаса!",
              "Узнай себя, исследуй возможности и сделай уверенный шаг к будущему!"
            )}
          </p>
        </section>

        <nav className="mt-8 flex flex-wrap gap-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-2xl px-5 py-4 font-bold transition ${
                tab === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-900 shadow hover:bg-blue-50"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        {tab === "steps" && (
          <section className="mt-9">
            <h2 className="text-3xl font-black text-blue-950">
              🧭 {tr("Мамандық таңдаудың 7 қадамы", "7 шагов к выбору профессии")}
            </h2>

            <p className="mt-3 text-slate-600">
              {tr(
                "Әр қадамды орындаған сайын белгі қойып отыр.",
                "Отмечай каждый выполненный шаг."
              )}
            </p>

            <div className="mt-6 rounded-2xl bg-white p-5 shadow-md">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-blue-950">
                  {tr("Менің жетістігім", "Мой прогресс")}
                </span>
                <span className="font-black text-blue-700">
                  {checked.length} / 7
                </span>
              </div>

              <div className="mt-3 h-4 overflow-hidden rounded-full bg-blue-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all"
                  style={{ width: `${(checked.length / 7) * 100}%` }}
                />
              </div>

              {checked.length === 7 && (
                <p className="mt-4 font-bold text-green-700">
                  🎉 {tr(
                    "Жарайсың! Барлық қадамды орындадың!",
                    "Отлично! Ты выполнил все шаги!"
                  )}
                </p>
              )}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {steps.map((item, index) => {
                const done = checked.includes(index);

                return (
                  <article
                    key={index}
                    className={`rounded-3xl border-2 p-6 shadow-lg transition ${
                      done
                        ? "border-green-300 bg-green-50"
                        : "border-white bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-5xl">{item.icon}</div>
                      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-800">
                        {index + 1} / 7
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black text-blue-950">
                      {item.title[lang]}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {item.text[lang]}
                    </p>

                    <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl bg-white/80 p-3 font-bold text-blue-900">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleStep(index)}
                        className="h-5 w-5 accent-blue-600"
                      />
                      {tr("Орындадым", "Выполнено")}
                    </label>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {tab === "students" && (
          <section className="mt-9">
            <h2 className="mb-6 text-3xl font-black text-blue-950">
              🎓 {tr("9–11-сынып оқушыларына", "Советы ученикам 9–11 классов")}
            </h2>
            {renderCards(studentAdvice)}

            <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-600 p-7 text-white">
              <h3 className="text-2xl font-black">
                🧠 {tr("Өзіңді танып көр!", "Узнай себя!")}
              </h3>
              <p className="mt-3">
                {tr(
                  "Кәсіби бағдар тесттерін орындап, өз қызығушылықтарыңды зертте.",
                  "Пройди профориентационные тесты и изучи свои интересы."
                )}
              </p>
              <Link
                href="/tests"
                className="mt-5 inline-block rounded-full bg-yellow-400 px-7 py-3 font-black text-blue-950"
              >
                {tr("Тесттерге өту", "Перейти к тестам")} →
              </Link>
            </div>
          </section>
        )}

        {tab === "parents" && (
          <section className="mt-9">
            <h2 className="mb-6 text-3xl font-black text-blue-950">
              👨‍👩‍👧 {tr("Ата-аналарға кеңестер", "Советы родителям")}
            </h2>
            {renderCards(parentAdvice)}
          </section>
        )}

        {tab === "faq" && (
          <section className="mt-9">
            <h2 className="mb-6 text-3xl font-black text-blue-950">
              ❓ {tr("Жиі қойылатын сұрақтар", "Часто задаваемые вопросы")}
            </h2>

            <div className="space-y-4">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    aria-expanded={openFaq === index}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left font-black text-blue-950"
                  >
                    <span>{item.question[lang]}</span>
                    <span className="text-2xl text-blue-600">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <div className="border-t border-blue-100 px-6 pb-6 pt-4 leading-7 text-slate-600">
                      {item.answer[lang]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 rounded-3xl bg-white p-7 text-center shadow-xl">
          <div className="text-5xl">🚀</div>
          <h2 className="mt-4 text-2xl font-black text-blue-950">
            {tr("Болашағың өз қолыңда!", "Твоё будущее в твоих руках!")}
          </h2>
          <p className="mt-3 text-slate-600">
            {tr(
              "Мамандықтарды зерттеп, өзіңе лайық бағытты табуға алғашқы қадам жаса.",
              "Изучай профессии и сделай первый шаг к своему направлению."
            )}
          </p>
          <Link
            href="/professions"
            className="mt-6 inline-block rounded-full bg-blue-600 px-8 py-4 font-black text-white hover:bg-blue-700"
          >
            {tr("Мамандықтарды қарау", "Посмотреть профессии")} →
          </Link>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-full bg-slate-800 px-8 py-4 font-bold text-white"
          >
            ← {tr("Басты бетке оралу", "Вернуться на главную")}
          </Link>
        </div>
      </div>

      <footer className="mt-12 bg-blue-950 px-5 py-8 text-center text-white">
        <p className="font-black">🚀 BOLASHAQ | Бағдар</p>
        <p className="mt-2 text-sm opacity-80">
          {tr("Білім. Таңдау. Болашақ.", "Знания. Выбор. Будущее.")}
        </p>
      </footer>
    </main>
  );
}
