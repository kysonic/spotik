'use client';

import Chip from '../content/Chip';
import { StyledIconProps } from '../icons/StyledIcon';

export type ChipItem = {
  title: string;
  Icon?: React.ReactElement;
  // Icon?: (props: StyledIconProps) => React.ReactElement;
};

export type ChipsProps = {
  name: string;
  items: ChipItem[];
  value: string[];
  onChange: (value: string) => void;
};

export default function Chips({ name, items, value, onChange }: ChipsProps) {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {items.map(({ title, Icon }, idx) => (
        <Chip
          key={idx}
          Icon={Icon}
          onClick={() => onChange(title)}
          isActive={value.includes(title)}
        >
          {title}
        </Chip>
      ))}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
