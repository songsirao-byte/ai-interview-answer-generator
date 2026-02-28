export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Nav */}
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-green-600" />
            <span className="text-base font-semibold">
              AI Interview Answer Generator
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="#">
              Dashboard
            </a>
            <a className="hover:text-gray-900" href="#">
              History
            </a>
            <button className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">
              Upgrade Plan
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-20 text-center">
        <p className="text-sm font-medium tracking-wide text-green-600">
          MARKETING INTERVIEW ANSWER GENERATOR
        </p>

        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
          Generate Tailored Interview Answers
          <br />
          for Your Next Marketing Role
        </h1>

        <p className="mt-6 text-gray-600">
          Paste the job description and your resume to instantly generate
          structured, strategic answers designed for each interview stage.
        </p>
      </section>

      {/* Input Card */}
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-10">
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          {/* Company Website */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Company Website
            </label>
            <input
              type="text"
              placeholder="https://company.com"
              className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none ring-green-600/20 focus:ring-4"
            />
          </div>

          {/* JD + Resume */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Job Description (JD)
              </label>
              <textarea
                placeholder="Paste the job description here..."
                rows={7}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 outline-none ring-green-600/20 focus:ring-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Resume</label>
              <textarea
                placeholder="Paste your resume here..."
                rows={7}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 outline-none ring-green-600/20 focus:ring-4"
              />
            </div>
          </div>

          {/* Interview Stage */}
          <div className="mt-8 text-center">
            <p className="mb-3 text-xs font-medium tracking-widest text-gray-500">
              INTERVIEW STAGE
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="rounded-full border border-gray-200 px-6 py-2 text-sm hover:border-green-600 hover:text-green-700">
                HR
              </button>
              <button className="rounded-full border border-gray-200 px-6 py-2 text-sm hover:border-green-600 hover:text-green-700">
                Hiring Manager
              </button>
              <button className="rounded-full border border-gray-200 px-6 py-2 text-sm hover:border-green-600 hover:text-green-700">
                Leadership
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-10 flex justify-center">
            <button className="rounded-xl bg-green-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-700">
              Generate Answers
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-6">
        <h2 className="text-center text-2xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-gray-600">
          Quick answers for how this mock generator works.
        </p>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold">
              How does the generator personalize answers?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              It matches keywords and responsibilities from the job description
              with your resume, then outputs stage-specific questions and a
              STAR-style answer framework.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold">
              Do you call an external AI API?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              No. This first version is a mock generator using templates and
              simple rules. Nothing is sent to any external AI service.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold">
              What interview stages are supported?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              HR, Hiring Manager, and Leadership—each stage highlights different
              evaluation signals and question styles.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
