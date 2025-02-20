import { Option } from '@/app/shared/types/utility';

import './styles.scss';

type AppCheckboxGroupProps = {
  onChange: (value: string[]) => void;
  options: Option[];
  value?: string[];
};

function AppCheckboxGroup({ onChange, options, value }: AppCheckboxGroupProps) {
  const checkInput = (optionValue: string) => {
    const checkboxGroupValue = value ? [...value] : [];

    if (checkboxGroupValue.includes(optionValue)) {
      onChange(checkboxGroupValue.filter((v) => v !== optionValue));
    } else {
      onChange([...checkboxGroupValue, optionValue]);
    }
  };

  return (
    <>
      {options.map((option) => {
        return (
          <label
            key={option.value}
            className="checkbox"
          >
            <span className="cursor-pointer grow">{option.label}</span>

            <input
              id={option.value}
              value={option.value}
              checked={Array.isArray(value) && value.includes(option.value)}
              className="checkbox__input"
              type="checkbox"
              onChange={() => {
                checkInput(option.value);
              }}
            />

            <span className="checkbox__mark" />
          </label>
        );
      })}
    </>
  );
}

export default AppCheckboxGroup;
