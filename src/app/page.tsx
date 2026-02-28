"use client";

import { useMemo, useState } from "react";
import TopNav from "@/components/TopNav";
import { useRouter } from "next/navigation";

type Stage = "HR" | "Hiring Manager" | "Leadership";

export default function Home() {
  const router = useRouter();

  const [jobTitle, setJobTitle] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");

  const [stage, setStage] = useState<Stage>("HR");
  const [openFaq, setOpenFaq] = useState<number>(0);

  const stageOptions: Stage[] = useMemo(
    () => ["HR", "Hiring Manager", "Leadership"],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "How does the generator personalize answers?",
        a: "It cross-references the requirements in the Job Description with your Resume highlights and the Company's market positioning. This creates a bridge between your past success and their future needs.",
      },
      {
        q: "Is my resume data secure?",
        a: "Yes. This mock version does not send your content to external AI services. You control what you paste in.",
      },
      {
        q: "What stage should I choose?",
        a: "HR for screening and communication fit, Hiring Manager for execution depth and metrics, and Leadership for strategy, prioritization, and cross-functional impact.",
      },
    ],
    []
  );

  function handleGenerate() {
    const payload = {
      jobTitle,
      companyWebsite,
      jdText,
      resumeText,
      stage,
      createdAt: Date.now(),
    };

    sessionStorage.setItem("ai_answer_generator_payload", JSON.stringify(payload));
    router.push("/results");
  }

  return (
    <main className="min-h-screen bg-[#F6FBF7] text-gray-900">
      
      <TopNav />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 text-center">
        <div className="mx-auto inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-1 text-[10px] font-semibold tracking-widest text-emerald-600">
          MARKETING INTERVIEW ANSWER GENERATOR
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
          Land Your Next{" "}
          <span className="text-emerald-500">Marketing Role</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
          Input the role details and your profile to generate data-driven,
          strategic interview answers.
        </p>
      </section>

      {/* Input Card */}
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-10">
        <div className="rounded-3xl bg-white px-6 py-8 shadow-[0_12px_40px_rgba(16,185,129,0.08)] ring-1 ring-emerald-100 md:px-10">
          {/* Job Title */}
          <div>
            <div className="mb-3 text-sm font-semibold text-gray-800">
              Job Title
            </div>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Growth Marketing Manager, Performance Marketing Lead..."
              className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none ring-emerald-500/20 focus:ring-4"
            />
          </div>

          {/* Company Website */}
          <div className="mt-6">
            <div className="mb-3 text-sm font-semibold text-gray-800">
              Company Website
            </div>
            <input
              type="text"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="https://example.com or brief company description..."
              className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none ring-emerald-500/20 focus:ring-4"
            />
          </div>

          {/* JD + Resume */}
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-3 text-sm font-semibold text-gray-800">
                JD (Job Description)
              </div>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the key responsibilities and campaign requirements here..."
                rows={10}
                className="w-full resize-none rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none ring-emerald-500/20 focus:ring-4"
              />
            </div>

            <div>
              <div className="mb-3 text-sm font-semibold text-gray-800">
                Resume
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your professional experience, key metrics (ROI, CAC, Conversion), and tools..."
                rows={10}
                className="w-full resize-none rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none ring-emerald-500/20 focus:ring-4"
              />
            </div>
          </div>

          {/* Interview Stage */}
          <div className="mt-8 text-center">
            <p className="text-xs font-semibold tracking-widest text-gray-800">
              INTERVIEW STAGE
            </p>

            <div className="mx-auto mt-5 flex w-full max-w-md items-center justify-between rounded-full bg-emerald-50 p-1 ring-1 ring-emerald-100">
              {stageOptions.map((opt) => {
                const active = opt === stage;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setStage(opt)}
                    className={[
                      "w-1/3 rounded-full py-2 text-xs font-semibold transition",
                      active
                        ? "bg-white text-emerald-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-14 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.25)] hover:bg-emerald-700"
            >
              Generate Answers <span aria-hidden="true">⚡</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-8">
        <h2 className="text-center text-2xl font-extrabold">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          {faqs.map((item, idx) => {
            const open = idx === openFaq;
            return (
              <div
                key={item.q}
                className="rounded-2xl bg-white shadow-sm ring-1 ring-emerald-100"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={open}
                >
                  <span className="text-sm font-semibold text-gray-900">
                    {item.q}
                  </span>
                  <span className="text-gray-600">{open ? "−" : "+"}</span>
                </button>

                {open && (
                  <div className="px-6 pb-6 text-sm text-gray-600">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
