"use client";
import { useWrapper } from "@/context/WrapperProvider";
import { handleSubmit } from "@/functions/form";
import { APIMethodsProps } from "@/types/Interfaces/APIMethods";
import { APIRoutePostPatchProps } from "@/types/Interfaces/APIRoutes";
import { ModelProps, ToDoProps } from "@/types/Interfaces/Models";
import { SnackbarModelProps } from "@/types/Interfaces/Snackbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../styles/form.module.css";
interface CreateFormProps {
  apiMethod: APIMethodsProps["method"];
  data: ModelProps["todo"] | "none";
  type: SnackbarModelProps["model"];
  apiRoute: APIRoutePostPatchProps["route"] | null;
  parentID: number;
  setShowForm?: Dispatch<SetStateAction<boolean>>,
}

export default function CreateForm({
  apiMethod,
  data,
  type,
  apiRoute,
  parentID,
  setShowForm,
}: CreateFormProps) {
  const formObject: ToDoProps = {
    title: "",
    description: "",
    motivation: "",
    deadline: new Date(),
    completed: false,
    type: type,
  };
  const { colorMode, userID , setSnackbar, setSnackbarDetails} = useWrapper();
  const [formData, setFormData] = useState<ToDoProps>(formObject);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user: userID,
      type: type
    });
  };

  useEffect(() => {
    if (data === "none") {
      setFormData(formObject);
    } else {
      setFormData(data.todo);
    }
  }, []);
  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      <div className={styles.closeContainer}>
        <div className={colorMode ? styles.closeDark : styles.closeLight} onClick={() => setShowForm(false)} />
      </div>
      <div>
        <h2 className={colorMode ? styles.textDark : styles.textLight}>
          {apiMethod === "PATCH" ? `Update ${type}` : `Add ${type}`}
        </h2>
      </div>
      <form className={colorMode ? styles.formDark : styles.formLight}>
        <div className={colorMode ? styles.inputContainerDark : styles.inputContainerLight}>
          <label>
            Title:
            <input
              className={colorMode ? styles.inputDark : styles.inputLight}
              onChange={handleChange}
              name="title"
              type="text"
              value={formData.title}
            />
          </label>
        </div>
        <div className={colorMode ? styles.inputContainerDark : styles.inputContainerLight}>
          <label>
            Description:
            <textarea
              className={colorMode ? styles.textareaDark : styles.textareaLight}
              onChange={handleChange}
              name="description"
              value={formData.description}
            />
          </label>
        </div>
        <div className={colorMode ? styles.inputContainerDark : styles.inputContainerLight}>
          {" "}
          <label>
            Motivation:
            <textarea
              className={colorMode ? styles.textareaDark : styles.textareaLight}
              onChange={handleChange}
              value={formData.motivation}
              name="motivation"
            />
          </label>
        </div>
        <div className={colorMode ? styles.inputContainerDark : styles.inputContainerLight}>
          <label>
            Completed:
            <input
              onChange={handleChange}
              type="radio"
              name="completed"
              value="true"
            />
            Complete
            <input
              onChange={handleChange}
              type="radio"
              name="completed"
              value="false"
            />
            Incomplete
          </label>
        </div>
        <div className={colorMode ? styles.inputContainerDark : styles.inputContainerLight}>
          <label>
            Deadline:
            <input
            className={colorMode ? styles.inputDark : styles.inputLight}
              onChange={handleChange}
              type="date"
              name="deadline"
              value={String(formData.deadline)}
            />
          </label>
        </div>
        <div className={styles.submitContainer}>
          <button
          className={colorMode ? styles.submitDark : styles.submitLight}
            onClick={(event) =>
              handleSubmit(
                event.preventDefault(),
                apiMethod,
                formData,
                apiRoute,
                userID,
                parentID,
                setShowForm,
                setSnackbar,
                setSnackbarDetails,
                type,
              )
            }
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
