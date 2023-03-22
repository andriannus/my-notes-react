import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC } from "react";

import "./search-field.component.scss";

interface SearchFieldProps {
  autoCapitalize: string;
  autoComplete: string;
  disabled: boolean;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  readOnly: boolean;
  type: string;
  value: string;
}

const SearchField: FC<Partial<SearchFieldProps>> = ({
  autoCapitalize = "",
  autoComplete = "",
  disabled = false,
  id = "Txt",
  name = "",
  onChange = undefined,
  placeholder = "",
  readOnly = false,
  type = "text",
  value = "",
}) => {
  return (
    <div className="Search">
      <FontAwesomeIcon className="Search-icon" icon="search" />

      <div className="Search-field">
        <input
          id={id}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          className="Search-input"
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          title={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

SearchField.propTypes = {
  autoCapitalize: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default SearchField;
