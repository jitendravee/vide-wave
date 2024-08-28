import React from "react";

interface TextFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
}) => {
  return (
    <div className="">
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </label>
    </div>
  );
};

export default TextField;
