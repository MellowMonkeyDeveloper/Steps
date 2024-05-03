"use client";
import { useWrapper } from "@/context/WrapperProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/form.module.scss";
import { handleSubmit } from "@/functions/form";
import { APIRoutePostPatchProps } from "@/types/Interfaces/APIRoutes";
import { SnackbarModelProps } from "@/types/Interfaces/Snackbar";
import { ModelProps, ToDoProps } from "@/types/Interfaces/Models";
import { APIMethods } from "@/types/Enums/APIMethods";
import { APIMethodsProps } from "@/types/Interfaces/APIMethods";
interface CreateFormProps {
  apiMethod: APIMethodsProps["method"];
  data: ModelProps["todo"];
  type: SnackbarModelProps["model"];
  apiRoute: APIRoutePostPatchProps["route"];
}

export default function CreateForm({
  apiMethod,
  data,
  type,
  apiRoute,
}: CreateFormProps) {
  const { colorMode, postModel, dopamineID, stridesID, stepsID, userID } =
    useWrapper();
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    motivation: "",
    deadline: "",
    completed: "",
  });

  const handleChange = (e) => {
    if (type === "Strides") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        user: userID,
      });
    } else if (type === "Dopamine") {
      console.log(e.target.value);
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        user: userID,
      });
    } else if (type === "Steps") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        user: userID,
      });
    }
  };
  useEffect(() => {
    if (type === "Dopamine") {
      if (data === undefined) {
      } else if (data !== undefined) {
        setFormData(data);
      }
    } else if (type === "Strides") {
      if (data === undefined) {
      } else if (data !== undefined) {
        setFormData(data);
      }
    } else if (postModel === "Steps") {
      if (data === undefined) {
      } else if (data !== undefined) {
        setFormData(data);
      }
      console.log(data);
    }
  }, [data]);
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
              value={data?.title !== undefined ? data?.title : formData?.title}
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
              value={formData.deadline}
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
                ? userID
                : type === "Dopamine" && apiMethod === "PATCH"
                ? dopamineID
                : type === "Strides" && apiMethod === "POST"
                ? dopamineID
                : type === "Strides" && apiMethod === "PATCH"
                ? stridesID
                : type === "Steps" && apiMethod === "POST"
                ? stridesID
                : type === "Steps" && apiMethod === "PATCH"
                ? stepsID
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
