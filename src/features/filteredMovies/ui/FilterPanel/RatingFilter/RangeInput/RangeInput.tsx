import type { ChangeEvent } from 'react'

type RangeInputProps = {
  value: number
  className: string
  ariaLabel: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RangeInput = ({ value, className, ariaLabel, onChange }: RangeInputProps) => (
  <input
    className={className}
    type="range"
    min={0}
    max={10}
    step={0.1}
    value={value}
    aria-label={ariaLabel}
    onChange={onChange}
  />
)
