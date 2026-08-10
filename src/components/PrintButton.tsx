"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-500"
    >
      Print / Save PDF
    </button>
  );
}
