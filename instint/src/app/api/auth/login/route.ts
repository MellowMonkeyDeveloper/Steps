import { cookies } from "next/headers";
export const dynamic = "force-dynamic"; // defaults to auto
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function POST(request: Request) {
  const json = await request.json();
  try {
    const response = await fetch(`${api}/steps/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(json),
    });
    console.log(json)
    const token = response.headers
      .get("Set-Cookie")
      ?.split("=")[1]
      ?.split(";")[0];
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: true,
      maxAge: 3600,
    });
    return Response.json({message: 'Login Successful'});
  } catch (error) {
    console.log(error);
    throw error;
  }
}
