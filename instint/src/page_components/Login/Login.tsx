"use client";

import { useWrapper } from "@/context/WrapperProvider";
import { setCookie } from "nookies";
import { useEffect, useState } from "react";
import Register from "../../components/form/Register";

export default function Login() {
  return (
    <Register apiRoute="/api/auth/login" authHeader="Login" type="Login" />
  );
}
