"use client";
import {
  CheckCircle,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useState } from "react";
import Breakdown from "../dropdown/Breakdown";
import styles from "../../../styles/breakdownmoreinfo.module.scss";
import { useWrapper } from "@/context/WrapperProvider";
import CreateForm from "../form/CreateForm";
export interface BreakdownMoreInfoProps {
  data: any;
  type: "Dopamine" | "Strides" | "Steps";
}
export default function BreakdownMoreInfo({
  data,
  type,
}: BreakdownMoreInfoProps) {
  const { colorMode, setPostModel } = useWrapper();
  const [showForm, setShowForm] = useState<boolean>(false);
  const handleUpdate = () => {
    setShowForm(true);
    console.log(data)
    setPostModel(type)
  };
  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      <article className={styles.infoContainer}>
        {!showForm ? (
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
                    {type === "Dopamine"
                      ? data.description
                      : type === "Strides"
                      ? data.strides_description
                      : type === "Steps"
                      ? data.steps_description
                      : null}
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
                    {type === "Dopamine"
                      ? data.motivation
                      : type === "Strides"
                      ? data.strides_motivation
                      : type === "Steps"
                      ? data.steps_motivation
                      : null}
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
                  {type === "Dopamine" && data.completed
                    ? "Complete"
                    : type === "Dopamine" && data.completed === false
                    ? "Incomplete"
                    : type === "Strides" && data.strides_completed
                    ? "Complete"
                    : type === "Strides" && data.strides_completed === false
                    ? "Incomplete"
                    : type === "Steps" && data.steps_completed
                    ? "Complete"
                    : type === "Steps" && data.steps_completed === false
                    ? "Incomplete"
                    : null}
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
                  {type === "Dopamine"
                    ? data.deadline
                    : type === "Strides"
                    ? data.strides_deadline
                    : type === "Steps"
                    ? data.steps_deadline
                    : null}
                </h5>
              </div>
            </div>
            <div>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </>
        ) : (
          <CreateForm data={data} apiMethod="PATCH" update='Existing' />
        )}
      </article>
      <article className={styles.breakdownContainer}>
        {type === "Dopamine" &&
          data.strides.map((value: any) => (
            <Breakdown data={value} type="Strides" />
          ))}
        {type === "Strides" &&
          data.steps.map((value: any) => (
            <Breakdown data={value} type="Steps" />
          ))}
      </article>
    </section>
  );
}
