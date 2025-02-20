import { useState } from 'react';

import { Option } from '@/app/shared/types/utility';

import './styles.scss';

type AppSelectProps = {
  onChange: (value: string) => void;
  options: Option[];
  value?: string;
};

function AppSelect({ onChange, options, value = '' }: AppSelectProps) {
  const [selected, setSelected] = useState(value);

  const selectInput = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="select">
      <select
        value={selected}
        onChange={(e) => {
          selectInput(e.target.value);
        }}
      >
        <option value="">Select here...</option>

        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default AppSelect;
