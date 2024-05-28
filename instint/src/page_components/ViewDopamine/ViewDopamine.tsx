"use client";
import Breakdown from "@/components/dropdown/Breakdown";
import { useWrapper } from "@/context/WrapperProvider";
import { retrieveData } from "@/functions/fetchfunctions";
import { useEffect } from "react";
import styles from "../../styles/viewdopamine.module.css";
export default function ViewDopamine() {
  const {
    colorMode,
    setDopamineData,
    dopamineData,
    setSnackbar,
    setSnackbarDetails,
    userID
  } = useWrapper();

  useEffect(() => {
    retrieveData(
      "/api/get/dopamine",
      setDopamineData,
      setSnackbar,
      setSnackbarDetails,
      userID
    );
    console.log(userID)
  }, []);
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
