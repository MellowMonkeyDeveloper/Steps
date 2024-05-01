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
import { handleAdd, handleDelete, handleDropdown } from "@/functions/breakdown";
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
    setSnackbar,
    setSnackbarDetails,
    setSnackbarStatus
  } = useWrapper();
  


  return (
    <>
      <div className={colorMode ? styles.containerDark : styles.containerLight}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.headerDark : styles.headerLight}>
            {type === "Dopamine"
              ? data.todo.title
              : type === "Strides"
              ? data.todo.title
              : type === "Steps"
              ? data.todo.title
              : null}
          </h2>
          
        </div>
        <div className={styles.keyboardContainer}>
          {dropdown ? (
            <KeyboardArrowUp
              className={colorMode ? styles.keyboardDark : styles.keyboardLight}
              onClick={() => handleDropdown(setDropdown, apiRoute, setDeleteModal, setSnackbar, setSnackbarDetails, setSnackbarStatus, getKey)}
            />
          ) : (
            <KeyboardArrowDown
              className={colorMode ? styles.keyboardDark : styles.keyboardLight}
              onClick={() => handleDropdown(setDropdown, apiRoute, setDeleteModal, setSnackbar, setSnackbarDetails, setSnackbarStatus, getKey)}
            />
          )}
        </div>
        {data.todo.completed ? (
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
          onClick={() => handleAdd(type, setAdd, setPostModel)}
        />
        <Delete
          className={colorMode ? styles.deletedDark : styles.deletedLight}
          onClick={() => handleDelete(type, apiRoute, deleteKey, setSnackbar, setSnackbarStatus, setSnackbarDetails, setDeleteModal)}
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
