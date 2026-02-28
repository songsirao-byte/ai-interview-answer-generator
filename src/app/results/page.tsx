"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Stage = "HR" | "Hiring Manager" | "Leadership";

type Payload = {
  jobTitle: string;
  companyWebsite: string;
  jdText: string;
  resumeText: string;
  stage: Stage;
  createdAt: number;
};

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, keywords }: { text: string; keywords: string[] }) {
  if (!text) return null;
  if (!keywords.length) return <>{text}</>;

  const pattern = new RegExp(`(${keywords.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, idx) => {
        const isHit = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
        if (!isHit) return <span key={idx}>{part}</span>;
        return (
          <mark
            key={idx}
            className="rounded-md bg-emerald-100 px-1 py-0.5 font-semibold text-emerald-700"
          >
            {part}
          </mark>
        );
      })}
    </>
  );
}

function buildMock(stage: Stage, jobTitle: string) {
  const role = jobTitle?.trim() || "this role";

  const questionsByStage: Record<Stage, string[]> = {
    HR: [
      `Walk me through your background and why you're interested in ${role}.`,
      "Why this company, and why now?",
      "Tell me about a time you handled ambiguity or change.",
      "What are your strengths, and what’s one area you’re actively improving?",
    ],
    "Hiring Manager": [
      "Describe a marketing campaign you owned end-to-end. What was the goal, approach, and outcome?",
      "How do you decide which channels to prioritize (paid, SEO, lifecycle, partnerships)?",
      "Tell me about a time performance dropped. How did you diagnose and fix it?",
      "How do you set success metrics and align stakeholders?",
    ],
    Leadership: [
      "How do you translate business goals into a marketing strategy and roadmap?",
      "Tell me about a time you influenced without authority.",
      "How do you balance brand vs performance tradeoffs?",
      "What would your 30/60/90-day plan look like in this role?",
    ],
  };

  const starFramework = [
    "Situation: Give context (goal, audience, constraints).",
    "Task: Define your ownership (scope, KPI, timeline).",
    "Action: Explain key decisions, experiments, and execution details.",
    "Result: Quantify impact (metrics) + what you learned + next step.",
  ];

  const tipsByStage: Record<Stage, string[]> = {
    HR: [
      "Emphasize motivation, communication, and role fit.",
      "Use clear, simple language—avoid deep channel jargon.",
      "Highlight collaboration style and adaptability.",
    ],
    "Hiring Manager": [
      "Lead with metrics (ROI, CAC, CVR, retention) and what you personally owned.",
      "Describe your testing loop (hypothesis → experiment → learnings → iteration).",
      "Show channel strategy + tactical execution.",
    ],
    Leadership: [
      "Frame answers around strategy, prioritization, and tradeoffs.",
      "Show stakeholder management and business impact.",
      "Explain how you build repeatable systems, not just one-off wins.",
    ],
  };

  const coverKeywordsByStage: Record<Stage, string[]> = {
    HR: ["motivation", "role fit", "communication", "collaboration", "adaptability", "ownership"],
    "Hiring Manager": [
      "metrics",
      "ROI",
      "CAC",
      "CVR",
      "retention",
      "A/B testing",
      "hypothesis",
      "experiment",
      "iteration",
      "channel strategy",
      "stakeholders",
    ],
    Leadership: [
      "strategy",
      "prioritization",
      "tradeoffs",
      "stakeholder management",
      "business impact",
      "roadmap",
      "systems",
      "influence",
      "30/60/90",
    ],
  };

  return {
    questions: questionsByStage[stage],
    starFramework,
    tips: tipsByStage[stage],
    coverKeywords: coverKeywordsByStage[stage],
  };
}

function TopNav() {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-emerald-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3l8 4v6c0 5-3.5 9-8 9s-8-4-8-9V7l8-4z" stroke="currentColor" strokeWidth="2" />
              <path d="M9.5 12l1.8 1.8L15.8 9.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight">AI Interview Answer Generator</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-gray-600">
          <a className="hover:text-gray-900" href="#">Dashboard</a>
          <a className="hover:text-gray-900" href="#">Templates</a>
          <a className="hover:text-gray-900" href="#">History</a>
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}

function FAQAccordion({ stage }: { stage: Stage }) {
  const [openIdx, setOpenIdx] = useState<number>(0);

  const faqs = useMemo(() => {
    const base = [
      {
        q: "How should I use these questions to practice?",
        a: "Pick 4–6 questions first. Draft STAR bullet points for each, then practice answering out loud (60–90 seconds). Record yourself once and tighten the story + metrics.",
      },
      {
        q: "What should I include in a strong STAR answer?",
        a: "Include: (1) clear goal, (2) what YOU owned, (3) your decision logic, (4) measurable results, (5) what you learned and what you’d do next.",
      },
      {
        q: "How do I choose the best example from my resume?",
        a: "Choose the example that matches the JD most closely: same channel, same KPI, same audience, or same stakeholder complexity. If you don’t have a perfect match, emphasize transferable logic and execution process.",
      },
      {
        q: "What if I don’t have exact metrics?",
        a: "Use proxies: growth rate, conversion lift, CTR, time saved, cost reduction, rankings improved, pipeline influenced. Be honest and state that it’s an estimate or directional impact.",
      },
      {
        q: "Does this tool send my data to an AI API?",
        a: "No. This mock version runs entirely in the browser and does not call external AI APIs. You control what you paste in.",
      },
    ];

    const stageSpecific: Record<Stage, { q: string; a: string }[]> = {
      HR: [
        {
          q: "What does HR evaluate in this stage?",
          a: "They focus on motivation, communication, role fit, and how clearly you explain your experience. Keep answers structured and avoid overly technical deep-dives.",
        },
        {
          q: "How do I answer 'Why this company' as a student or career switcher?",
          a: "Connect: company mission + product + your learning path. Mention 1–2 specific signals (campaigns, product features, growth stage) and show how you’ll contribute quickly.",
        },
      ],
      "Hiring Manager": [
        {
          q: "What does a hiring manager evaluate?",
          a: "They look for execution depth: how you plan, test, optimize, and measure. Show your process, tradeoffs, and what you personally owned.",
        },
        {
          q: "How detailed should I be about channels and tools?",
          a: "Enough to prove you can run the playbook: targeting, creative, landing page, measurement, iteration cadence. Mention tools only when they support a decision you made.",
        },
      ],
      Leadership: [
        {
          q: "What does leadership evaluate in this stage?",
          a: "They evaluate strategy, prioritization, cross-functional influence, and your ability to drive business outcomes. Tie every story back to company goals and constraints.",
        },
        {
          q: "How do I answer 30/60/90 days?",
          a: "30: learn + audit + quick wins. 60: ship 2–3 experiments with clear metrics. 90: scale winners + build process (reporting, creative testing system, stakeholder cadence).",
        },
      ],
    };

    return [...stageSpecific[stage], ...base];
  }, [stage]);

  return (
    <div className="mt-14">
      <h2 className="text-center text-xl font-extrabold">Frequently Asked Questions</h2>
      <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-emerald-500" />

      <div className="mt-8 space-y-4">
        {faqs.map((item, idx) => {
          const open = idx === openIdx;
          return (
            <div key={item.q} className="rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : idx)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                aria-expanded={open}
              >
                <span className="text-sm font-semibold text-gray-900">{item.q}</span>
                <span className="text-gray-600 text-xl">{open ? "−" : "+"}</span>
              </button>
              {open && (
                <div className="px-6 pb-6 text-sm leading-7 text-gray-600">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ai_answer_generator_payload");
      if (raw) setPayload(JSON.parse(raw));
    } catch {}
  }, []);

  const mock = useMemo(() => {
    if (!payload) return null;
    return buildMock(payload.stage, payload.jobTitle);
  }, [payload]);

  if (!payload || !mock) {
    return (
      <main className="min-h-screen bg-[#F6FBF7] text-gray-900">
        <TopNav />
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-3xl bg-white p-8 ring-1 ring-emerald-100 shadow-sm">
            <h1 className="text-xl font-extrabold">No input found</h1>
            <p className="mt-3 text-gray-600">
              Please go back and click “Generate Answers” again.
            </p>
            <button
              className="mt-6 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              onClick={() => router.push("/")}
            >
              Back to Generator
            </button>
          </div>
        </div>
      </main>
    );
  }

  const keywords = mock.coverKeywords;

  return (
    <main className="min-h-screen bg-[#F6FBF7] text-gray-900">
      <TopNav />

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-20">
        {/* Header row */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-6 ring-1 ring-emerald-100 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-1 text-[10px] font-semibold tracking-widest text-emerald-600">
              OUTPUT — {payload.stage.toUpperCase()}
            </div>
            <h1 className="mt-5 text-xl font-extrabold tracking-tight">
              Your Interview Prep Pack (Mock)
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Job Title:{" "}
              <span className="font-semibold text-gray-900">
                {payload.jobTitle || "(not provided)"}
              </span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50"
              onClick={() => router.push("/")}
            >
              Back to Edit
            </button>
            <button
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.20)] hover:bg-emerald-700"
              onClick={() =>
                navigator.clipboard.writeText(
                  [
                    "Questions:",
                    ...mock.questions.map((q, i) => `${i + 1}. ${q}`),
                    "",
                    "STAR Framework:",
                    ...mock.starFramework,
                    "",
                    "Tips:",
                    ...mock.tips,
                    "",
                    "Key Skills to Cover:",
                    ...keywords,
                  ].join("\n")
                )
              }
            >
              Copy All
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">✓ Generated successfully</span>
          <span>Stage: <span className="font-semibold text-gray-800">{payload.stage}</span></span>
          <span className="text-gray-300">•</span>
          <span>Key skills to cover: <span className="font-semibold text-gray-800">{keywords.length}</span></span>
        </div>
        </div>

        {/* 2-column layout */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Questions card */}
            <div className="rounded-3xl bg-white p-8 ring-1 ring-emerald-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-widest text-emerald-600">
                    QUESTIONS
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold">
                    Stage-Specific Questions
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Customized from common interview patterns (mock).
                  </p>
                </div>
                <button
                  className="mt-1 rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50"
                  onClick={() => navigator.clipboard.writeText(mock.questions.join("\n"))}
                >
                  Copy Questions
                </button>
              </div>

              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-gray-800">
                {mock.questions.map((q, i) => (
                  <li key={q} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <HighlightText text={q} keywords={keywords} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Answers card */}
            <div className="rounded-3xl bg-white p-8 ring-1 ring-emerald-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-widest text-emerald-600">
                    ANSWERS
                  </p>
                  <h2 className="mt-2 text-xl font-extrabold">
                    STAR Framework
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Use this structure and plug in your own metrics + examples.
                  </p>
                </div>
                <button
                  className="mt-1 rounded-2xl bg-white px-4 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50"
                  onClick={() => navigator.clipboard.writeText(mock.starFramework.join("\n"))}
                >
                  Copy Framework
                </button>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
                <ol className="list-decimal space-y-3 pl-5 text-sm text-gray-800">
                  {mock.starFramework.map((line) => (
                    <li key={line}>
                      <HighlightText text={line} keywords={keywords} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Right column (Tips) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 rounded-3xl bg-white p-8 ring-1 ring-emerald-100 shadow-sm">
              <p className="text-[11px] font-semibold tracking-widest text-emerald-600">
                TIPS
              </p>
              <h2 className="mt-2 text-xl font-extrabold">
                What Interviewers Look For
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Focus points for the{" "}
                <span className="font-semibold">{payload.stage}</span> stage.
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
                <ul className="space-y-4 text-sm leading-relaxed text-gray-800">
                  {mock.tips.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span>
                        <HighlightText text={t} keywords={keywords} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-900">
                  Key Skills to Cover
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="mt-7 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-50"
                onClick={() => navigator.clipboard.writeText(mock.tips.join("\n"))}
              >
                Copy Tips
              </button>
            </div>
          </aside>
        </div>

        {/* Enhanced FAQ (accordion) */}
        <FAQAccordion stage={payload.stage} />
      </section>
    </main>
  );
}
