import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("csrf");
  console.log(token);
  try {
    const response = await fetch("http://localhost:8000/steps/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token,
      },
      credentials: 'include'
    });
    const data = await response;
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
