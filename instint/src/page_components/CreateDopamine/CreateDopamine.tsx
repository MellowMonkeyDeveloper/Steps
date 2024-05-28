"use client";
import CreateForm from "@/components/form/CreateForm";
import { useWrapper } from "@/context/WrapperProvider";
import styles from "../../styles/createdopamine.module.css";

export default function CreateDopamine() {
  const { colorMode, userID } = useWrapper();

  return (
    <section
      className={colorMode ? styles.containerDark : styles.containerLight}
    >
      <CreateForm
        data={"none"}
        parentID={userID}
        apiRoute="/api/post/dopamine"
        type="Dopamine"
        apiMethod="POST"
      />
    </section>
  );
}
