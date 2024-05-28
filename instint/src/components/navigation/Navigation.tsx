"use client";
import { useWrapper } from "@/context/WrapperProvider";
import { handleLogout } from "@/functions/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import styles from "../../styles/navigation.module.css";
export default function Navigation() {
  const route = useRouter();

  const {
    colorMode,
    setColorMode,
    setShowMenu,
    setSnackbar,
    setSnackbarDetails,
    loggedIn,
    setLoggedIn,
    userID,
  } = useWrapper();


  const determineAuth = useMemo(() => {
    if (!loggedIn) {
      return (
        <>
          <div>
            <h4
              className={colorMode ? styles.modeDark : styles.modeLight}
              onClick={() => route.push("/login")}
            >
              Login
            </h4>
          </div>
          <div>
            <h4
              className={colorMode ? styles.modeDark : styles.modeLight}
              onClick={() => route.push("/register")}
            >
              Sign Up
            </h4>
          </div>
        </>
      );
    } else if (loggedIn) {
      return (
        <div>
          <h4
            className={colorMode ? styles.modeDark : styles.modeLight}
            onClick={() => handleLogout(setLoggedIn, setSnackbar, setSnackbarDetails)}
          >
            Logout
          </h4>
        </div>
      );
    }
  }, [loggedIn, colorMode]);

  return (
    <div className={colorMode ? styles.containerDark : styles.containerLight}>
      <div className={styles.bookendsContainer}>
        <div
          onClick={() => setShowMenu(true)}
          className={colorMode ? styles.modeDark : styles.modeLight}
        />
          <div
            className={colorMode ? styles.modeDark : styles.modeLight}
            onClick={() => setColorMode((prev: boolean) => !prev)}
          />
      </div>
      <div className={styles.bookendsContainer}>
        {determineAuth}
        <div className={styles.imageContainer}>
          <Image alt="Logo" src={"/0882.webp"} width={70} height={70} />
        </div>
      </div>
    </div>
  );
}
