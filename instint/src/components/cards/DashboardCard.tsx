import Link from "next/link";
import { ReactElement } from "react";

export interface DashboardCardProps {
  title: "Dopamine Goals" | "Create" | "Today's Steps" | "Calendar";
  icon: ReactElement;
  href: string;
  link: "View" | "Create";
}
import styles from "../../../styles/main.module.scss";
import { useWrapper } from "@/context/WrapperProvider";
export default function DashboardCard({
  icon,
  title,
  link,
  href,
}: DashboardCardProps) {
  const { colorMode } = useWrapper();
  return (
    <article
      className={
        colorMode ? styles.dashboardCardDark : styles.dashboardCardLight
      }
    >
      <div>
        <h2>{title}</h2>
      </div>
      <div>{icon}</div>
      <div className={styles.buttonContainer}>
        <Link href={href}>
          <button className={colorMode ? styles.dashboardButtonDark : styles.dashboardButtonLight}>{link}</button>
        </Link>
      </div>
    </article>
  );
}
