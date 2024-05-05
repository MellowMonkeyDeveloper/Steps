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
import { SnackbarModelProps } from "@/types/Interfaces/Snackbar";
import { APIRouteGet } from "@/types/Enums/APIRoutes";
import { apiRoutesGetObject } from "@/types/Objects/APIRoutes";
export interface BreakdownProps {
  data: any;
  type: SnackbarModelProps["model"];
}
export default function Breakdown({ data, type }: BreakdownProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);
  const {
    colorMode,
    setDeleteModal,
    setSnackbar,
    setSnackbarDetails,
    setSnackbarStatus,
    setStridesData,
    setStepsData,
    stridesData,
    stepsData,
  } = useWrapper();

  useEffect(() => {}, []);

  return (
    <>
      <div className={colorMode ? styles.containerDark : styles.containerLight}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.headerDark : styles.headerLight}>
            {data.todo.title}
          </h2>
        </div>
        <div className={styles.keyboardContainer}>
          {dropdown ? (
            <KeyboardArrowUp
              className={colorMode ? styles.keyboardDark : styles.keyboardLight}
              onClick={() => setDropdown((prev) => !prev)}
            />
          ) : (
            <KeyboardArrowDown
              className={colorMode ? styles.keyboardDark : styles.keyboardLight}
              onClick={() =>
                handleDropdown(
                  false,
                  setDropdown,
                  type === "Dopamine"
                    ? setStridesData
                    : type === "Strides"
                    ? setStepsData
                    : null,
                  setSnackbar,
                  setSnackbarDetails,
                  setSnackbarStatus,
                  type === "Dopamine"
                    ? data.private_id
                    : type === "Strides"
                    ? data.private_id
                    : "",
                  type === "Dopamine"
                    ? apiRoutesGetObject.Strides.route
                    : type === "Strides"
                    ? apiRoutesGetObject.Steps.route
                    : undefined
                )
              }
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
          onClick={() => handleAdd(type, setAdd, setSnackbar, setSnackbarStatus, setSnackbarDetails)}
        />
        <Delete
          className={colorMode ? styles.deletedDark : styles.deletedLight}
          onClick={() =>
            handleDelete(
              type,
              apiRoute,
              deleteKey,
              setSnackbar,
              setSnackbarStatus,
              setSnackbarDetails,
              setDeleteModal
            )
          }
        />
      </div>
      {dropdown && type === "Dopamine" && (
        <BreakdownMoreInfo
          type="Dopamine"
          breakdownInfoData={data}
          breakdownData={stridesData}
        />
      )}
      {dropdown && type === "Strides" && (
        <BreakdownMoreInfo
          type="Strides"
          breakdownInfoData={data}
          breakdownData={stepsData}
        />
      )}
      {dropdown && type === "Steps" && (
        <BreakdownMoreInfo type="Steps" breakdownInfoData={data} />
      )}
      <div>
        {add && (
          <CreateForm
            parentID={data.private_id}
            apiRoute={
              type === "Dopamine"
                ? "/api/post/strides"
                : type === "Strides"
                ? "/api/post/steps"
                : undefined
            }
            type={
              type === "Dopamine"
                ? "Strides"
                : type === "Strides"
                ? "Steps"
                : undefined
            }
            apiMethod="POST"
          />
        )}
      </div>
    </>
  );
}
