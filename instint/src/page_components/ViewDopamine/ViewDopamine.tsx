"use client";
import Breakdown from "@/components/dropdown/Breakdown";
import { useWrapper } from "@/context/WrapperProvider";
import { retrieveData } from "@/functions/fetchfunctions";
import { useEffect } from "react";
import styles from "../../../styles/viewdopamine.module.scss";
export default function ViewDopamine() {
  const {
    colorMode,
    updateData,
    setDopamineData,
    dopamineData,
    setSnackbar,
    setSnackbarStatus,
    setSnackbarDetails,
  } = useWrapper();

  useEffect(() => {
    retrieveData(
      "/api/get/dopamine/",
      setDopamineData,
      setSnackbar,
      setSnackbarStatus,
      setSnackbarDetails
    );
    console.log(dopamineData);
  }, [updateData]);
  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      {dopamineData.map((item: any) => (
        <>
          <Breakdown type="Dopamine" data={item} />
        </>
      ))}
    </section>
  );
}
