"use client";

import { useWrapper } from "@/context/WrapperProvider";
import { APIMethods } from "@/types/Enums/APIMethods";
import { parseCookies } from "nookies";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/register.module.scss";
import { APIRouteAuthProps } from "@/types/Interfaces/APIRoutes";
import { AuthFormProps, handleAuth } from "@/functions/form";
import { SnackbarMessageProps } from "@/types/Interfaces/Snackbar";
export interface RegisterProps {
  apiRoute: APIRouteAuthProps["route"];
  authHeader: "Register" | "Login";
  type: "Register" | "Login";
  
}
export default function Register({
  apiRoute,
  authHeader,
  type
}: RegisterProps) {
  const { colorMode, setSnackbar, setSnackbarDetails, setLoggedIn } = useWrapper();
  const [username, setUsername] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formData, setFormData] = useState<AuthFormProps>({
    username: "",
    password: "",
    email: "",
  });

  const handleEmail = (e: ChangeEventHandler<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEventHandler<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const handleUsername = (e: ChangeEventHandler<HTMLInputElement>) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  useEffect(() => {
    setFormData({ username: username, email: email, password: password });
  }, [email, username, password]);
  return (
    <section className={colorMode ? styles.pageDark : styles.pageLight}>
      <div className={colorMode ? styles.containerDark : styles.containerLight}>
        <div>
          <h2 className={colorMode ? styles.h2Dark : styles.h2Light}>
            {authHeader}
          </h2>
        </div>
        <div>
          <form
            className={colorMode ? styles.formDark : styles.formLight}
            onSubmit={(e) =>
              handleAuth(
                e,
                formData,
                apiRoute,
                setSnackbar,
                setSnackbarDetails,
                type,
                setLoggedIn
              )
            }
            action="submit"
          >
            <div
              className={
                colorMode
                  ? styles.inputContainerDark
                  : styles.inputContainerLight
              }
            >
              <label htmlFor="username">
                Username
                <input
                  className={colorMode ? styles.inputDark : styles.inputLight}
                  onChange={handleUsername}
                  type="text"
                  id="username"
                  name="username"
                  required
                />
              </label>
            </div>
            <div
              className={
                colorMode
                  ? styles.inputContainerDark
                  : styles.inputContainerLight
              }
            >
              <label htmlFor="email">
                Email
                <input
                  className={colorMode ? styles.inputDark : styles.inputLight}
                  onChange={handleEmail}
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </label>
            </div>
            <div
              className={
                colorMode
                  ? styles.inputContainerDark
                  : styles.inputContainerLight
              }
            >
              <label htmlFor="password">
                Password
                <input
                  className={colorMode ? styles.inputDark : styles.inputLight}
                  onChange={handlePassword}
                  type="text"
                  id="password"
                  name="password"
                  required
                />
              </label>
            </div>
            <div className={styles.submitContainer}>
              <input
                className={colorMode ? styles.submitDark : styles.submitLight}
                type="submit"
              />
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </section>
  );
}
