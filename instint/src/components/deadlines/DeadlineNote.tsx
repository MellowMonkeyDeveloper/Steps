import { useWrapper } from "@/context/WrapperProvider";
import { ToDoProps } from "@/types/Interfaces/Models";
import { CheckCircle, Delete, Warning } from "@mui/icons-material";
import styles from "../../../styles/deadline.module.scss";
import { handleCompleted } from "@/functions/deadline";
import { handleDelete } from "@/functions/breakdown";
export interface DeadlineNoteProps {
  data: ToDoProps;
}
export default function DeadlineNote({ data }: DeadlineNoteProps) {
  const { colorMode, setSnackbar, setSnackbarDetails, setDeleteModal } =
    useWrapper();
  return (
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
            <CheckCircle
              className={
                colorMode ? styles.checkCircleDark : styles.checkCircleLight
              }
            />
          ) : (
            <Warning
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
          <Delete
            onClick={() =>
              handleDelete(
                "Deadlines",
                data.id,
                setSnackbar,
                setSnackbarDetails,
                setDeleteModal
              )
            }
            className={colorMode ? styles.deletedDark : styles.deletedLight}
          />
        </div>
      </div>
    </article>
  );
}
