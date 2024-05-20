"use client";
import { useEffect, useMemo, useState } from "react";
import DeadlineTop from "./DeadlineTop";
import { ToDoProps } from "@/types/Interfaces/Models";
import Breakdown from "../dropdown/Breakdown";
import { retrieveDeadline } from "@/functions/fetchfunctions";
import DeadlineNote from "./DeadlineNote";
import styles from "../../../styles/deadline.module.scss";
import { useWrapper } from "@/context/WrapperProvider";
export interface DeadlineProps {}
export default function Deadline() {
  const [dateData, setDateData] = useState<ToDoProps[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const { colorMode } = useWrapper();
  useEffect(() => {
    const current = new Date();
    retrieveDeadline(setDateData, 0, current, setCurrentDate);
  }, []);

  useEffect(() => {
    console.log(currentDate)
  }, [currentDate])

  return (
    <section
      className={colorMode ? styles.deadlinePageDark : styles.deadlinePageLight}
    >
      {dateData.map((value, ind) => (
        <DeadlineNote key={ind} data={value} />
      ))}
    </section>
  );
}
