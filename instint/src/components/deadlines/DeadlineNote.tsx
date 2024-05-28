'use client'
import { useWrapper } from "@/context/WrapperProvider";
import { ToDoProps } from "@/types/Interfaces/Models";
import styles from "../../styles/deadline.module.css";
import { handleCompleted } from "@/functions/deadline";
import { handleDelete } from "@/functions/breakdown";
import { useState } from "react";
export interface DeadlineNoteProps {
  data: ToDoProps;
}
export default function DeadlineNote({ data }: DeadlineNoteProps) {
  const { colorMode, setSnackbar, setSnackbarDetails, setDeleteModal } =
    useWrapper();
    const [itemDeleted, setItemDeleted] = useState<boolean>(false)
  return (
    <>
    {!itemDeleted ? (
      <article
      className={
        colorMode
          ? styles.deadlineNoteContainerDark
          : styles.deadlineNoteContainerLight
      }
    >
      <div className={styles.deadlineTypeContainer}>
        <h4 className={colorMode ? styles.typeHeaderDark : styles.typeHeaderLight}>{data.type}</h4>
      </div>
      <div className={styles.deadlineInfoContainer}>
        <div className={styles.deadlineHeaderContainer}>
          <h3
            className={
              colorMode ? styles.deadlineHeaderDark : styles.deadlineHeaderLight
            }
          >
            {data.title}
          </h3>
        </div>
        <div className={styles.deadlineCompletedContainer}>
          {data.completed ? (
            <div
              className={
                colorMode ? styles.checkCircleDark : styles.checkCircleLight
              }
            />
          ) : (
            <div
              onClick={() =>
                handleCompleted(
                  data,
                  "/api/update/todo",
                  setSnackbar,
                  setSnackbarDetails
                )
              }
              className={colorMode ? styles.warningDark : styles.warningLight}
            />
          )}
        </div>
        <div className={styles.deadlineDeletedContainer}>
          <div
            onClick={() =>
              handleDelete(
                "Deadlines",
                data.id,
                setSnackbar,
                setSnackbarDetails,
                setDeleteModal,
                setItemDeleted
              )
            }
            className={colorMode ? styles.deletedDark : styles.deletedLight}
          />
        </div>
      </div>
    </article>
    ): (
      <>
      </>
    )}
    </>
    
  );
}
