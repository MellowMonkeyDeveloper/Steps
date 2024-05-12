"use client";
import { useWrapper } from "@/context/WrapperProvider";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/form.module.scss";
import { handleSubmit } from "@/functions/form";
import { APIRoutePostPatchProps } from "@/types/Interfaces/APIRoutes";
import { SnackbarModelProps } from "@/types/Interfaces/Snackbar";
import { ModelProps, ToDoProps } from "@/types/Interfaces/Models";
import { APIMethods } from "@/types/Enums/APIMethods";
import { APIMethodsProps } from "@/types/Interfaces/APIMethods";
interface CreateFormProps {
  apiMethod: APIMethodsProps["method"];
  data: ModelProps["todo"] | 'none';
  type: SnackbarModelProps["model"];
  apiRoute: APIRoutePostPatchProps["route"];
  parentID: number;
}

export default function CreateForm({
  apiMethod,
  data,
  type,
  apiRoute,
  parentID
}: CreateFormProps) {
  const formObject: ToDoProps = {
    title: '',
    description: "",
    motivation: "",
    deadline: new Date(),
    completed: false,
  }
  const { colorMode, dopamineID, stridesID, stepsID, userID } =
    useWrapper();
  const [formData, setFormData] = useState<ToDoProps>(formObject);

  const handleChange = (e) => {
    
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        user: userID,
      });
    
  };

  useEffect(() => {
    if(data === 'none'){
      setFormData(formObject)

    }else{
      setFormData(data)

    }
  }, []);
  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      <div>
        <h2 className={colorMode ? styles.textDark : styles.textLight}>
          {apiMethod === "PATCH" ? `Update ${type}` : `Add ${type}`}
        </h2>
      </div>
      <form className={colorMode ? styles.formDark : styles.formLight}>
        <div className={styles.inputContainer}>
          <label>
            Title:
            <input
              onChange={handleChange}
              name="title"
              type="text"
              value={formData.title}
            />
          </label>
        </div>
        <div className={styles.textareaContainer}>
          <label>
            Description:
            <textarea
              className={styles.textarea}
              onChange={handleChange}
              name="description"
              value={formData.description}
            />
          </label>
        </div>
        <div className={styles.textareaContainer}>
          {" "}
          <label>
            Motivation:
            <textarea
              className={styles.textarea}
              onChange={handleChange}
              value={formData.motivation}
              name="motivation"
            />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label>
            Completed:
            <input
              onChange={handleChange}
              type="checkbox"
              name="completed"
              value="true"
            />{" "}
            Complete
            <input
              onChange={handleChange}
              type="checkbox"
              name="completed"
              value="false"
            />
            Incomplete
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label>
            Deadline:
            <input
              onChange={handleChange}
              type="date"
              name="deadline"
              value={String(formData.deadline)}
            />
          </label>
        </div>

        <button
          onClick={(event) =>
            handleSubmit(
              event.preventDefault(),
              apiMethod,
              formData,
              apiRoute,
              userID,
              type === "Dopamine" && apiMethod === "POST"
                ? parentID
                : type === "Dopamine" && apiMethod === "PATCH"
                ? parentID
                : type === "Strides" && apiMethod === "POST"
                ? parentID
                : type === "Strides" && apiMethod === "PATCH"
                ? parentID
                : type === "Steps" && apiMethod === "POST"
                ? parentID
                : type === "Steps" && apiMethod === "PATCH"
                ? parentID
                : 0
            )
          }
        >
          submit
        </button>
      </form>
    </section>
  );
}
