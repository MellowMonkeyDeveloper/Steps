"use client";
import { LightMode, Menu } from "@mui/icons-material";
import Image from "next/image";
import styles from "../../../styles/navigation.module.scss";
import { useWrapper } from "@/context/WrapperProvider";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/functions/navigation";
export default function Navigation() {
  const route = useRouter();

  const {
    colorMode,
    setColorMode,
    setShowMenu,
    setSnackbar,
    setSnackbarDetails,
    userID,
  } = useWrapper();

  const determineAuth = useMemo(() => {
    if (userID === 0) {
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
    } else if (userID > 0) {
      return (
        <div>
          <h4
            className={colorMode ? styles.modeDark : styles.modeLight}
            onClick={() => handleLogout(setSnackbar, setSnackbarDetails)}
          >
            Logout
          </h4>
        </div>
      );
    }
  }, [userID, colorMode]);

  return (
    <div className={colorMode ? styles.containerDark : styles.containerLight}>
      <div className={styles.bookendsContainer}>
        <Menu
          onClick={() => setShowMenu((prev: boolean) => !prev)}
          className={colorMode ? styles.modeDark : styles.modeLight}
        />
          <LightMode
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
