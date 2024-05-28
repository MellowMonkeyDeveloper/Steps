"use client";

import Register from "../../components/form/Register";

export default function Login() {
  return (
    <>
        <Register apiRoute="/api/auth/login" authHeader="Login" type="Login" />
      
    </>
  );
}
