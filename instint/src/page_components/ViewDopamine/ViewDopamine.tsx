"use client";
import BreakdownMoreInfo from "@/components/cards/BreakdownMoreInfo";
import Breakdown from "@/components/dropdown/Breakdown";
import { useWrapper } from "@/context/WrapperProvider";
import { fetchServerResponse } from "next/dist/client/components/router-reducer/fetch-server-response";
import { use, useEffect, useState } from "react";
import DopamineBreakdown from "@/components/cards/DopamineBreakdown";
import styles from "../../../styles/viewdopamine.module.scss";
export default function ViewDopamine() {
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [details, setDetails] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const { colorMode, updateData } = useWrapper();
  async function gatherDopamine() {
    try {
        const response = await fetch("/api/get/dopamine");

        // Check if response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse JSON data from response body
        const data = await response.json();
        setDataArray(data)
        // Log the parsed JSON data
        console.log(data);
    } catch (error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    }
}

  useEffect(() => {
    gatherDopamine();
    
  }, [updateData]);
  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      {dataArray.map((item: any) => (
        <>
          <DopamineBreakdown
            data={item}
          />

        </>
      ))}
    </section>
  );
}
