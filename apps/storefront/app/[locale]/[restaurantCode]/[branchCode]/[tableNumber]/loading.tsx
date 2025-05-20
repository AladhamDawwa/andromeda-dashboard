import Image from "next/image";

import Loader from "@andromeda/core/components/Loader";

import styles from "./loading.module.scss";

const loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src="/Dine-oon.png" alt="Logo" width={230} height={60} />
      </div>
      <Loader radius={50} />
    </div>
  );
};

export default loading;
