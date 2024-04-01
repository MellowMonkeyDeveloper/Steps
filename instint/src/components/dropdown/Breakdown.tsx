"use client";
import { useWrapper } from "@/context/WrapperProvider";
import {
  CheckCircle,
  CloseRounded,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
  NoteAdd,
} from "@mui/icons-material";
import styles from "../../../styles/breakdown.module.scss";
import { SetStateAction, useState, Dispatch, useEffect } from "react";
import { dividerClasses } from "@mui/material";
import BreakdownMoreInfo from "../cards/BreakdownMoreInfo";
import { Sedgwick_Ave } from "next/font/google";
import CreateForm from "../form/CreateForm";
export interface BreakdownProps {
  data: any;
  type: "Dopamine" | "Strides" | "Steps";
}
export default function Breakdown({ data, type }: BreakdownProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const {
    colorMode,
    setDeleteModal,
    setPostModel,
    setStepsTitle,
    setStridesTitle,
    setDopamineTitle,
  } = useWrapper();
  const handleDropdown = () => {
    setDropdown((prev) => !prev);
    if (type === "Dopamine") {
      setDopamineTitle(data.title);
    } else if (type === "Strides") {
      setStridesTitle(data.strides_title);
    } else if (type === "Steps") {
      setStepsTitle(data.steps_title);
    }
  };
  const handleDelete = () => {
    if (type === "Dopamine") {
      setDeleteModal(true);
      setDopamineTitle(data.title);
    } else if (type === "Strides") {
      setDeleteModal(true);
      setStridesTitle(data.strides_title);
    } else if (type === "Steps") {
      setDeleteModal(true);
      setStepsTitle(data.steps_title);
    }
  };
  const handleAdd = () => {
    if (type === "Dopamine") {
      setAdd(true);
      setPostModel("Strides");
      setDopamineTitle(data.title);
    } else if (type === "Strides") {
      setAdd(true);
      setPostModel("Steps");
      setStridesTitle(data.strides_title);
    }
  };
  return (
    <>
      <div className={colorMode ? styles.containerDark : styles.containerLight}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.headerDark : styles.headerLight}>
            {type === "Dopamine"
              ? data.title
              : type === "Strides"
              ? data.strides_title
              : type === "Steps"
              ? data.steps_title
              : null}
          </h2>
          
        </div>
        <div className={styles.keyboardContainer}>
          {dropdown ? (
            <KeyboardArrowUp
              className={colorMode ? styles.keyboardDark : styles.keyboardLight}
              onClick={handleDropdown}
            />
          ) : (
            <KeyboardArrowDown
              className={colorMode ? styles.keyboardDark : styles.keyboardLight}
              onClick={handleDropdown}
            />
          )}
        </div>
        {data.completed ? (
          <CheckCircle
            className={colorMode ? styles.completedDark : styles.completedLight}
          />
        ) : (
          <CloseRounded
            className={colorMode ? styles.completedDark : styles.completedLight}
          />
        )}
        <NoteAdd
          className={colorMode ? styles.deletedDark : styles.deletedLight}
          onClick={handleAdd}
        />
        <Delete
          className={colorMode ? styles.deletedDark : styles.deletedLight}
          onClick={handleDelete}
        />
      </div>
      {dropdown && type === "Dopamine" && (
        <BreakdownMoreInfo type="Dopamine" data={data} />
      )}
      {dropdown && type === "Strides" && (
        <BreakdownMoreInfo type="Strides" data={data} />
      )}
      {dropdown && type === "Steps" && (
        <BreakdownMoreInfo type="Steps" data={data} />
      )}
      <div>{add && <CreateForm apiMethod="PATCH" />}</div>
    </>
  );
}
