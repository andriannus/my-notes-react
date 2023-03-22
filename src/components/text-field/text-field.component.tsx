import PropTypes from "prop-types";
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  HTMLInputTypeAttribute,
  useCallback,
  useMemo,
} from "react";

import "./text-field.component.scss";

interface TextFieldProps {
  autoComplete: string;
  autoCapitalize: string;
  className: string;
  counter: number;
  disabled: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  readOnly: boolean;
  type: HTMLInputTypeAttribute;
  value: string;
}

const TextField: FC<Partial<TextFieldProps>> = ({
  autoCapitalize = "",
  autoComplete = "",
  className = "",
  counter = 0,
  disabled = false,
  id = "",
  name = "",
  onChange = () => {},
  placeholder = "",
  readOnly = false,
  type = "text",
  value = "",
}) => {
  const valueLength = useMemo(() => {
    return value.length;
  }, [value]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event);
    },
    [onChange]
  );

  return (
    <div className={className}>
      <input
        {...(!!counter && { maxLength: counter })}
        id={id}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        className="TextField-input"
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        title={placeholder}
        type={type}
        value={value}
        onChange={handleOnChange}
      />

      {!!counter && (
        <div className="TextField-counter">
          <span>
            {valueLength} / {counter}
          </span>
        </div>
      )}
    </div>
  );
};

TextField.propTypes = {
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  counter: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
