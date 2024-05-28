import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function POST(request: Request) {
  const cookie = cookies();
  const token = cookie.get("token");
  try {
    const response = await fetch(`${api}/steps/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token.value}`,
      },
      credentials: "include",
    });
    const data = await response.json()
    console.log(data)
      return Response.json({ message: data }, { status: 200 });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
