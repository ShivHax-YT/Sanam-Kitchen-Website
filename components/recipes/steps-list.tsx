interface StepsListProps {
  steps: string[];
}

export function StepsList({ steps }: StepsListProps) {
  return (
    <ol className="space-y-3 text-slate-800">
      {steps.map((step, idx) => (
        <li key={idx} className="flex gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            {idx + 1}
          </span>
          <p className="leading-relaxed">{step}</p>
        </li>
      ))}
    </ol>
  );
}
