"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="mb-4 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
    >
      Print
    </button>
  );
}
