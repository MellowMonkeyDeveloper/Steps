"use client";
import { useWrapper } from "@/context/WrapperProvider";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../../../styles/form.module.scss";
interface CreateFormProps {
  apiMethod: "POST" | "PATCH";
  data?: any;
  update?: "Existing" | "Array";
}
interface formProps {
  title: string | undefined;
  description: string | undefined;
  motivation: string | undefined;
  deadline: string | undefined;
}
interface formStridesProps {
  strides_title: string | undefined;
  strides_description: string | undefined;
  strides_motivation: string | undefined;
  strides_deadline: string | undefined;
}
interface formStepsProps {
  steps_title: string | undefined;
  steps_description: string | undefined;
  steps_motivation: string | undefined;
  steps_deadline: string | undefined;
}
export default function CreateForm({
  apiMethod,
  data,
  update,
}: CreateFormProps) {
  const {
    colorMode,
    postModel,
    dopamineTitle,
    stridesTitle,
    stepsTitle,
    setUpdateData,
  } = useWrapper();
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    motivation: "",
    deadline: "",
  });
  const [formStridesData, setFormStridesData] = useState<any>({
    strides_deadline: "",
    strides_description: "",
    strides_motivation: "",
    strides_title: "",
  });
  const [formStepsData, setFormStepsData] = useState<any>({
    steps_deadline: "",
    steps_description: "",
    steps_motivation: "",
    steps_title: "",
  });
  console.log(data, update, apiMethod);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, formStepsData, formStridesData);
    if (postModel === "Dopamine") {
      if (apiMethod === "POST") {
        try {
          const response = await fetch("/api/post/dopamine", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const fetchResponse = await response.json();
          console.log(fetchResponse);
          if (response.ok) {
            console.log("ok");
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log(error);
        }
      } else if (apiMethod === "PATCH" && update !== "Existing") {
        try {
          const response = await fetch("/api/update/dopamine/add/strides", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ dopamineTitle, formData }),
          });
          const fetchResponse = await response.json();
          console.log(fetchResponse);
        } catch (error) {
          console.log(error);
        }
      } else if (apiMethod === "PATCH" && update === "Existing") {
        try {
          const response = await fetch(
            "/api/update/dopamine/existing/dopamine",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: formData, key: data?.title }),
            }
          );
          const fetchResponse = await response.json();
          console.log(fetchResponse);
        } catch (error) {
          console.log(error);
        }
      }
    } else if (postModel === "Strides" && update === "Existing") {
      try {
        const response = await fetch("/api/update/dopamine/existing/strides", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formStridesData,
            strides: stridesTitle,
            dopamine: dopamineTitle,
          }),
        });
        const fetchResponse = await response.json();
        console.log(fetchResponse);
        setUpdateData(true);
      } catch (error) {
        console.log(error);
      }
    } else if (postModel === "Strides" && update !== "Existing") {
      try {
        const response = await fetch("/api/update/dopamine/add/strides", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formStepsData,
            steps: stepsTitle,
            strides: stridesTitle,
            dopamine: dopamineTitle,
          }),
        });
        const fetchResponse = await response.json();
        console.log(fetchResponse);
        setUpdateData(true);
      } catch (error) {
        console.log(error);
      }
    } else if (postModel === "Steps" && update === "Existing") {
      try {
        const response = await fetch("/api/update/dopamine/existing/steps", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formStepsData,
            dopamine: dopamineTitle,
            strides: stridesTitle,
            steps: stepsTitle,
          }),
        });
        const fetchResponse = await response.json();
        console.log(fetchResponse);
        setUpdateData(true);
      } catch (error) {
        console.log(error);
      }
    } else if (postModel === "Steps" && update !== "Existing") {
      try {
        const response = await fetch("/api/update/dopamine/add/steps", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formStepsData,
            dopamine: dopamineTitle,
            strides: stridesTitle,
          }),
        });
        const fetchResponse = await response.json();
        console.log(fetchResponse);
        setUpdateData(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleChange = (e) => {

    console.log(formStridesData, stridesTitle);
    if (postModel === "Strides") {
      setFormStridesData({
        ...formStridesData,
        [`strides_${e.target.name}`]: e.target.value,
      });
    } else if (postModel === "Dopamine") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else if (postModel === "Steps") {
      setFormStepsData({
        ...formStepsData,
        [`steps_${e.target.name}`]: e.target.value,
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
        setFormStridesData(data);
      }
    } else if (postModel === "Steps") {
      if (data === undefined) {
      } else if (data !== undefined) {
        setFormStepsData(data);
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

        <button onClick={handleSubmit}>submit</button>
      </form>
    </section>
  );
}
