import React from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  errors: any;
  register: UseFormRegister<any>;
  name: string;
  fieldLabel: string;
};
const TextInput: React.FC<InputProps> = ({
  register,
  errors,
  name,
  fieldLabel,
}) => {
  return (
    <div className="field">
      <label className="label">{fieldLabel}</label>
      <div className="control">
        <input className="input" placeholder={fieldLabel} {...register(name)} />
      </div>
      <p className="help is-danger">{errors[name]?.message}</p>
    </div>
  );
};

export default TextInput;
