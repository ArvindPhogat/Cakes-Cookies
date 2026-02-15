'use client';

import { clsx } from 'clsx';

export interface WeightOption {
  value: string;
  label: string;
  price: number;
}

interface WeightSelectorProps {
  options: WeightOption[];
  selectedWeight: string;
  onWeightChange: (weight: string) => void;
  id?: string;
}

export function WeightSelector({
  options,
  selectedWeight,
  onWeightChange,
  id,
}: WeightSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onWeightChange(option.value)}
          className={clsx(
            'px-3 py-1.5 text-sm rounded-lg border transition-all duration-200',
            selectedWeight === option.value
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
