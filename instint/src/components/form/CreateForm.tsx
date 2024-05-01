"use client";
import { useWrapper } from "@/context/WrapperProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/form.module.scss";
import { handleSubmit } from "@/functions/form";
interface CreateFormProps {
  apiMethod: "POST" | "PATCH";
  data?: any;
  update?: "Existing" | "Array";
  type?: "Dopamine" | "Strides" | "Delete";
}
interface formProps {
  title: string | undefined;
  description: string | undefined;
  motivation: string | undefined;
  deadline: string | undefined;
}

export default function CreateForm({
  apiMethod,
  data,
  update,
  type,
}: CreateFormProps) {
  const {
    colorMode,
    postModel,
    dopamineID,
    stridesID,

    userID,
  } = useWrapper();
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    motivation: "",
    deadline: "",
  });

  console.log(postModel);

  const handleChange = (e) => {
    if (postModel === "Strides") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        dopamine: dopamineID,
      });
    } else if (postModel === "Dopamine") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        user: userID,
      });
    } else if (postModel === "Steps") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        strides: stridesID,
      });
    }
  };
  useEffect(() => {
    if (postModel === "Dopamine") {
      if (data === undefined) {
      } else if (data !== undefined) {
        setFormData(data);
      }
    } else if (postModel === "Strides") {
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
          {update === "Existing" ? `Update ${postModel}` : `Add ${postModel}`}
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
              value={
                postModel === "Dopamine" && data?.title !== undefined
                  ? data?.title
                  : postModel === "Dopamine" && data?.title === undefined
                  ? formData?.title
                  : postModel === "Strides" && data?.strides_title !== undefined
                  ? data?.strides_title
                  : postModel === "Strides" && data?.strides_title === undefined
                  ? formStridesData.strides_title
                  : postModel === "Steps" && data?.steps_title !== undefined
                  ? data?.steps_title
                  : postModel === "Steps" && data?.steps_title === undefined
                  ? formStepsData.steps_title
                  : ""
              }
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
              value={
                postModel === "Dopamine"
                  ? formData?.description
                  : postModel === "Strides"
                  ? formStridesData?.strides_description
                  : postModel === "Steps"
                  ? formStepsData?.steps_description
                  : ""
              }
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
              value={
                postModel === "Dopamine"
                  ? formData?.motivation
                  : postModel === "Strides"
                  ? formStridesData?.strides_motivation
                  : postModel === "Steps"
                  ? formStepsData?.steps_motivation
                  : ""
              }
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
              value={
                postModel === "Dopamine"
                  ? formData?.deadline
                  : postModel === "Strides"
                  ? formStridesData?.strides_deadline
                  : postModel === "Steps"
                  ? formStepsData?.steps_deadline
                  : ""
              }
            />
          </label>
        </div>

        <button
          onClick={() => handleSubmit(event, apiMethod, formData, apiRoute)}
        >
          submit
        </button>
      </form>
    </section>
  );
}
