"use client";
import styles from "./styles.module.scss";

import { useState, useRef, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export interface CustomSelectProps<T> {
  label?: string;
  options: T[];
  labelKey?: string;
  valueKey?: string;
  value: T | null;
  onChange: (option: T) => void;
  placeholder?: string;
  error?: string;
}

const Select = ({
  label,
  options,
  labelKey = "label",
  valueKey = "value",
  value,
  onChange,
  placeholder = "Select...",
  error,
}: CustomSelectProps<any>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: any) => {
    onChange(option[valueKey]);
    setIsOpen(false);
  };

  const getLabel = () => {
    const selectedOption = options.find((option) => option[valueKey] === value);
    return selectedOption ? selectedOption[labelKey] : "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectContainer} ref={ref}>
        <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
          <div>{value ? getLabel() : placeholder}</div>
          <span className={styles.arrow}>
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>
        {isOpen && (
          <ul className={styles.selectList}>
            {options.map((option) => (
              <li
                key={option[valueKey]}
                className={`${styles.selectItem} ${
                  value === option[valueKey] ? styles.selected : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option[labelKey]}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Select;
