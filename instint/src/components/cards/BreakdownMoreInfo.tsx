"use client";
import { useWrapper } from "@/context/WrapperProvider";
import { ModelProps, ToDoProps } from "@/types/Interfaces/Models";
import { SnackbarModelProps } from "@/types/Interfaces/Snackbar";
import { useEffect, useState } from "react";
import styles from "../../styles/breakdownmoreinfo.module.css";
import Breakdown from "../dropdown/Breakdown";
import CreateForm from "../form/CreateForm";
export interface BreakdownMoreInfoProps {
  breakdownData?: ModelProps[];
  breakdownInfoData?: ModelProps;
  type: SnackbarModelProps["model"];
}
export default function BreakdownMoreInfo({
  breakdownData,
  breakdownInfoData,
  type,
}: BreakdownMoreInfoProps) {
  const { colorMode } = useWrapper();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [form, setForm] = useState<ToDoProps>();

  useEffect(() => {
    console.log(breakdownData)
  }, [])
  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      <article className={styles.infoContainer}>
        {!showForm && (
          <>
            <div className={styles.headerContainer}>
              <h5
                className={
                  colorMode ? styles.subheaderDark : styles.subheaderLight
                }
              >
                {type}
              </h5>
            </div>
            <div className={styles.descriptionMotivationContainer}>
              <div className={styles.descriptionContainer}>
                <div className={styles.subheaderContainer}>
                  <h4
                    className={
                      colorMode ? styles.subheaderDark : styles.subheaderLight
                    }
                  >
                    Description:
                  </h4>
                </div>
                <div className={styles.pContainer}>
                  <p className={colorMode ? styles.pDark : styles.pLight}>
                    {form !== undefined
                      ? form.description
                      : breakdownInfoData?.todo.description}
                  </p>
                </div>
              </div>
              <div className={styles.motivationContainer}>
                <div className={styles.subheaderContainer}>
                  <h4
                    className={
                      colorMode ? styles.subheaderDark : styles.subheaderLight
                    }
                  >
                    Motivation:
                  </h4>
                </div>
                <div className={styles.pContainer}>
                  <p className={colorMode ? styles.pDark : styles.pLight}>
                    {form !== undefined
                      ? form.motivation
                      : breakdownInfoData.todo.motivation}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.bottomContainer}>
              <div className={styles.completedHeaderContainer}>
                <h4
                  className={
                    colorMode ? styles.subheaderDark : styles.subheaderLight
                  }
                >
                  Completed:
                </h4>
              </div>
              <div className={styles.bottomSubheaderContainer}>
                <h5
                  className={
                    colorMode ? styles.subheaderDark : styles.subheaderLight
                  }
                >
                  {form !== undefined
                    ? form.completed
                    : breakdownInfoData.todo.completed === false
                    ? "Incomplete"
                    : "Complete"}
                </h5>
              </div>
            </div>
            <div className={styles.bottomContainer}>
              <div className={styles.deadlineHeaderContainer}>
                <h4
                  className={
                    colorMode ? styles.subheaderDark : styles.subheaderLight
                  }
                >
                  Deadline:
                </h4>
              </div>
              <div className={styles.bottomSubheaderContainer}>
                <h5
                  className={
                    colorMode ? styles.subheaderDark : styles.subheaderLight
                  }
                >
                  {form !== undefined
                    ? String(form.deadline)
                    : String(breakdownInfoData?.todo.deadline)}
                </h5>
              </div>
            </div>
            <div>
              <button
                className={colorMode ? styles.updateDark : styles.updateLight}
                onClick={() => setShowForm((prev: boolean) => !prev)}
              >
                Update
              </button>
            </div>
          </>
        )}
        {showForm && (
          <CreateForm
            setShowForm={setShowForm}
            setForm={setForm}
            type={type}
            parentID={
              type === "Dopamine"
                ? breakdownInfoData.private_id
                : breakdownInfoData.key
            }
            data={breakdownInfoData}
            apiRoute={
              type === "Dopamine"
                ? "/api/update/dopamine"
                : type === "Strides"
                ? "/api/update/strides"
                : type === "Steps"
                ? "/api/update/steps"
                : null
            }
            apiMethod="PATCH"
            update="Existing"
          />
        )}
      </article>
      <article className={styles.breakdownContainer}>
        {type === "Dopamine" && breakdownData?.length > 0 &&
          breakdownData.map((value: any, ind) => (
            <Breakdown key={ind} data={value} type="Strides" />
          ))}
        {type === "Strides" && breakdownData?.length > 0 &&
          breakdownData.map((value: any, ind) => (
            <Breakdown key={ind} data={value} type="Steps" />
          ))}
      </article>
    </section>
  );
}
