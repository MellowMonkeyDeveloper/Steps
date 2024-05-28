"use client";
import { useWrapper } from "@/context/WrapperProvider";
import { retrieveDeadline } from "@/functions/fetchfunctions";
import { ToDoProps } from "@/types/Interfaces/Models";
import { useEffect, useState } from "react";
import styles from "../../styles/deadline.module.css";
import DeadlineNote from "./DeadlineNote";
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
