import React from "react";
import classNames from "classnames";
import { FieldValues, UseFormSetFocus } from "react-hook-form";
import styles from "./Input.module.css";

interface InputProps {
  id?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  endIcon?: {
    initial: React.ReactNode;
    active?: React.ReactNode;
  };
  changeInput?: {
    initialValue: string;
    setChange: (val: boolean) => void;
  };
  onFocus?: UseFormSetFocus<FieldValues>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type,
      name,
      placeholder,
      value,
      disabled = false,
      endIcon,
      changeInput,
      onFocus,
      onChange,
    },
    ref,
  ) => {
    const [inputDisabled, setInputDisabled] = React.useState(disabled);
    const [inputActive, setInputActive] = React.useState(false);
    const [activeEndIcon, setActiveEndIcon] = React.useState(false);

    const onBlurInput = () => {
      setInputActive(false);
    };

    const onClickEndIcon = () => {
      if (endIcon) setActiveEndIcon(!activeEndIcon);
      if (disabled) setInputDisabled(!inputDisabled);
    };

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (changeInput) {
        if (changeInput.initialValue === event.target.value) {
          changeInput.setChange(false);
        } else {
          changeInput.setChange(true);
        }
      }

      if (onChange) {
        onChange(event);
      }
    };

    React.useEffect(() => {
      if (onFocus && name) onFocus(name);
    }, [activeEndIcon]);

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
            className={classNames(styles.input__field, {
              [styles["input__field--disabled"]]: inputDisabled,
            })}
            onFocus={() => setInputActive(true)}
            onChange={onChangeInput}
            onBlur={onBlurInput}
            {...(disabled ? { disabled: inputDisabled } : {})}
          />
          {endIcon && (
            <div className={styles["input__icon--end"]} onClick={onClickEndIcon}>
              {endIcon.active
                ? activeEndIcon
                  ? endIcon.active
                  : endIcon.initial
                : endIcon.initial}
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default Input;
