"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface IngredientsChecklistProps {
  items: string[];
}

export function IngredientsChecklist({ items }: IngredientsChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <button
            type="button"
            aria-label={`Mark ${item} as complete`}
            onClick={() => setChecked((prev) => ({ ...prev, [item]: !prev[item] }))}
            className="mt-0.5 rounded-full border border-slate-200 bg-white p-1.5 text-brand-700 transition hover:border-brand-200"
          >
            <CheckCircle2 className={`h-5 w-5 ${checked[item] ? "fill-brand-600 text-brand-50" : "text-slate-400"}`} />
          </button>
          <span className={`text-slate-800 ${checked[item] ? "line-through text-slate-500" : ""}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
