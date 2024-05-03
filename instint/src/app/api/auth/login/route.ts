import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, setCookie } from "nookies";
export async function POST(request: Request) {
  const json = await request.json();
  console.log(json);
  try {
    const response = await fetch("http://localhost:8000/steps/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(json),
    });

    const data = await response.json();
    const token = response.headers.get("Set-Cookie");
    const authToken = token?.split(";")[0].slice(11);
    console.log(authToken);
    return Response.json({ data: data, token: authToken });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
