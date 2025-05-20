import { LuCircleCheck, LuClock, LuUtensils } from "react-icons/lu";

import styles from "./OrderTracking.module.scss";

const steps = [
  { label: "Order Placed", icon: <LuClock /> },
  { label: "Preparing", icon: <LuUtensils /> },
  { label: "Served", icon: <LuCircleCheck /> },
];

type TOrderTrackingProps = {
  currentStep: number; // 0 = Order Placed, 1 = Preparing, etc.
};

const StatusGif = ({ currentStep }: TOrderTrackingProps) => {
  if (currentStep === 0) {
    return (
      <iframe
        src="https://lottie.host/embed/cfd9ea0f-09d1-4c9a-806c-b66c31ec27cc/VW8xBCwj7d.lottie"
        style={{
          all: "unset",
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    );
  }
  if (currentStep === 1) {
    return (
      <iframe
        src="https://lottie.host/embed/e939b101-b853-4ead-b8b2-a36f1d636e38/wsdomItvXN.lottie"
        style={{
          all: "unset",
          width: "100%",
          height: "80%",
        }}
      ></iframe>
    );
  }
  if (currentStep === 2) {
    return (
      <LuCircleCheck
        strokeWidth={1.15}
        size={170}
        style={{
          color: "#228B22",
          margin: "0 auto",
          display: "block",
          borderRadius: "50%",
        }}
      />
    );
  }
  return null;
};

const StatusTracking = ({ currentStep }: TOrderTrackingProps) => {
  return (
    <div
      style={{
        paddingBlock: "var(--spacing-large)",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "300px",
          position: "relative",
          marginBlock: "-50px",
        }}
      >
        <StatusGif currentStep={currentStep} />
      </div>
      <div className={styles.trackingContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div
              className={`${styles.icon} ${index <= currentStep ? styles.active : ""}`}
            >
              {step.icon}
            </div>
            <p
              className={`${styles.label} ${index <= currentStep ? styles.activeText : ""}`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTracking;
