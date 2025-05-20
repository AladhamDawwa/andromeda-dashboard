import styles from "./styles.module.scss";

export type TextareaProps = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  name: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  name,
  error,
}: TextareaProps) => {
  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ""}`}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Textarea;
