import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
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
    const cookiesString = await response.headers.get('Set-Cookie')
    console.log(await response.headers)
    // Split the cookies string into individual cookies
    const cookiesArray = cookiesString?.split(", ");

    // Find the cookie containing the session ID
    const sessionCookie = cookiesArray?.find((cookie) =>
      cookie.startsWith("sessionid=")
    );

    // Extract the session ID from the session cookie
    const sessionId = sessionCookie?.split("=")[1].split(";")[0];

    console.log(sessionId);

    const data = await response.json();
    console.log(data);
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
