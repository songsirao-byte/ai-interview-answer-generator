"use client";

export default function TopNav() {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-emerald-100 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3l8 4v6c0 5-3.5 9-8 9s-8-4-8-9V7l8-4z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M9.5 12l1.8 1.8L15.8 9.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight">
            AI Interview Answer Generator · NAV_LIVE_001
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-gray-600">
          <a href="/" className="hover:text-gray-900">
            Home
          </a>
          <a href="/#faq" className="hover:text-gray-900">
            FAQ
          </a>
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
