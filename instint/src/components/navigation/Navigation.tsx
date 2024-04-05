'use client'
import { LightMode, Menu } from "@mui/icons-material";
import Image from "next/image";
import styles from "../../../styles/navigation.module.scss";
import { useWrapper } from "@/context/WrapperProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Navigation() {
  const {csrfToken} = useWrapper()
  const route = useRouter()
  const handleSignUp = () => {
    route.push('/register')
  }
  const { colorMode, setColorMode, setShowMenu } = useWrapper();
  const handleLogout = async () => {
    const response = await fetch(`/api/auth/logout?csrf=${csrfToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <div className={colorMode ? styles.containerDark : styles.containerLight}>
      <div className={styles.menuContainer}>
        <Menu onClick={() => setShowMenu((prev: boolean) => !prev)} className={colorMode ? styles.menuLight : styles.menuDark} />
      </div>
      <div className={styles.profileContainer}>
        <div>
          <h4 onClick={() => route.push('/login')}>Login</h4>
        </div>
        <div>
          <h4 onClick={handleSignUp}>Sign Up</h4>
        </div>
        <div>
          <h4 onClick={handleLogout}>Logout</h4>
        </div>
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
