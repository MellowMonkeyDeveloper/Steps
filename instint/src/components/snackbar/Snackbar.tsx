import { useWrapper } from "@/context/WrapperProvider";
import { useEffect, useState } from "react";
import styles from "../../styles/snackbar.module.css";
export default function Snackbar() {
  const [show, setShow] = useState<boolean>(false);
  const { snackbarDetails, setSnackbar, colorMode, snackbar } = useWrapper();

  useEffect(() => {
    setTimeout(() => {
        setSnackbar(false)
    }, 2500);
  }, [snackbarDetails]);

  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      <div className={styles.messageContainer}>
        <h3 className={colorMode ? styles.messageDark : styles.messageLight}>
          {snackbarDetails.message}
        </h3>
      </div>
      <div className={styles.statusContainer}>
        {snackbarDetails.status === "Error" ? (
          <>
            <div className={styles.error} />
          </>
        ) : snackbarDetails.status === "Success" ? (
          <div className={styles.success} />
        ) : (
          <div className={styles.warning} />
        )}
      </div>
      {snackbar && (
        <div className={styles.closeContainer}>
          <div
            onClick={() => setSnackbar(false)}
            className={colorMode ? styles.closeDark : styles.closeLight}
          />
        </div>
      )}
    </section>
  );
}
