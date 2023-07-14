import React from "react";
import classNames from "classnames";
import { FieldValues, UseFormSetFocus } from "react-hook-form";
import styles from "./Input.module.css";

interface InputProps {
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  endIcon?: {
    initial: React.ReactNode;
    active?: React.ReactNode;
  };
  onFocus?: UseFormSetFocus<FieldValues>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, name, placeholder, value, endIcon, onFocus, onChange }, ref) => {
    const [inputActive, setInputActive] = React.useState(false);
    const [activeEndIcon, setActiveEndIcon] = React.useState(false);

    const onBlurInput = () => {
      setInputActive(false);
    };

    const onClickEndIcon = () => {
      setActiveEndIcon(!activeEndIcon);
      if (onFocus && name) onFocus(name);
    };

    return (
      <div>
        <div className={classNames(styles.input__container, { [styles.active]: inputActive })}>
          <label
            htmlFor={id}
            className={classNames(styles.input__label, { [styles.active]: inputActive || value })}
          >
            {placeholder}
          </label>
          <input
            ref={ref}
            id={id}
            type={activeEndIcon ? "text" : type}
            name={name}
            value={value}
            className={styles.input__field}
            onFocus={() => setInputActive(true)}
            onChange={onChange}
            onBlur={onBlurInput}
          />
          {endIcon &&
            (endIcon?.active ? (
              <div className={styles["input__icon--end"]} onClick={onClickEndIcon}>
                {!activeEndIcon ? endIcon.initial : endIcon.active}
              </div>
            ) : (
              <div>{endIcon.initial}</div>
            ))}
        </div>
      </div>
    );
  },
);

export default Input;
