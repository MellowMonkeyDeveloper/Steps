'use client'
import { LightMode, Menu } from "@mui/icons-material";
import Image from "next/image";
import styles from "../../../styles/navigation.module.scss";
import { useWrapper } from "@/context/WrapperProvider";
import { useState } from "react";
export default function Navigation() {
  const { colorMode, setColorMode, setShowMenu } = useWrapper();
  return (
    <div className={colorMode ? styles.containerDark : styles.containerLight}>
      <div className={styles.menuContainer}>
        <Menu onClick={() => setShowMenu((prev: boolean) => !prev)} className={colorMode ? styles.menuLight : styles.menuDark} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.lightModeContainer}>
          <LightMode
            className={colorMode ? styles.modeLight : styles.modeDark}
            onClick={() => setColorMode((prev: boolean) => !prev)}
          />
        </div>
        <div className={styles.imageContainer}>
          <Image alt="Logo" src={"/0882.webp"} width={70} height={70} />
        </div>
      </div>
    </div>
  );
}
