import styles from "./Loader.module.scss";

type TLoaderProps = {
  radius?: number;
};

const Loader = ({ radius = 25 }: TLoaderProps) => {
  return (
    <div
      className={styles.loader}
      style={{
        width: `${radius}px`,
        height: `${radius}px`,
      }}
    ></div>
  );
};

export default Loader;
