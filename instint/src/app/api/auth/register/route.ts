import axios from "axios";
import { setCookie } from "nookies";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function POST(request: Request) {
  const json = await request.json();
  console.log(json);
  try {
    const response = await fetch(`${api}/steps/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if(!response.ok){
        throw new Error('Failed')
    }
   
    const data = await response.json();
    const token = response.headers.get("Set-Cookie")?.split('=')[1]?.split(';')[0];
    cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: true,
        maxAge: 3600
      });
    console.log(token)
    const resRegister = Response
    return resRegister.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
