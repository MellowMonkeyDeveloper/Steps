"use client";
import { useWrapper } from "@/context/WrapperProvider";
import styles from "../../../styles/createdopamine.module.scss";
import CreateForm from "@/components/form/CreateForm";
import { useEffect } from "react";

export default function CreateDopamine() {
  const { colorMode, setPostModel } = useWrapper();
  useEffect(() => {
    setPostModel('Dopamine')
  }, [])
  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      <CreateForm apiMethod="POST" />
    </section>
  );
}
