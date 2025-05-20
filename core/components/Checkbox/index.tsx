"use client";
import { useCallback, useState } from "react";

import styles from "./Checkbox.module.scss";

export type TCheckboxProps = {
  label: string;
  isChecked?: boolean;
} & React.HTMLProps<HTMLInputElement>;

const Checkbox = ({
  label,
  isChecked = false,
  onChange,
  ...rest
}: TCheckboxProps) => {
  const [value, setValue] = useState(isChecked);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.checked);
      onChange?.(e);
    },
    [onChange]
  );

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={value}
        onChange={(e) => handleChange(e)}
        {...rest}
      />
      <span className={styles.customCheckbox}></span>
      {label}
    </label>
  );
};

export default Checkbox;
