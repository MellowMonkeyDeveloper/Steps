"use client";
import Link from "next/link";
import styles from "../../styles/menu.module.css";
import { useWrapper } from "@/context/WrapperProvider";
import { SetStateAction, Dispatch } from "react";
export interface MenuProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}
export default function Menu({ setShowModal }: MenuProps) {
  const { colorMode } = useWrapper();
  interface LinkMenuProps {
    label:
      | "Create Dopamine"
      | "View Dopamine"
      | "Calendar"
      | "Today"
      | "Home"
      | "Deadlines";
    href: "/create" | "/dopamine" | "/calendar" | "/today" | "/deadlines" | "/";
  }
  const linkArray: LinkMenuProps[] = [
    { label: "Create Dopamine", href: "/create" },
    { label: "View Dopamine", href: "/dopamine" },
    { label: "Deadlines", href: "/deadlines" },
    { label: "Home", href: "/" },
  ];
  return (
    <section className={styles.section}>
      <div className={colorMode ? styles.containerDark : styles.containerLight}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.textDark : styles.textLight}>
            Dopamine Goals
          </h2>
        </div>
        <div className={styles.linksContainer}>
          {linkArray.map((value: any) => (
            <div className={styles.linkContainer}>
              <Link
                onClick={() => setShowModal(false)}
                className={colorMode ? styles.textDark : styles.textLight}
                href={value.href}
                prefetch={false}
              >
                {value.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
