import { cookies } from "next/headers";
export const dynamic = "force-dynamic"; // defaults to auto
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function POST(request: Request) {
  const json = await request.json();
  try {
    const response = await fetch(`${api}/steps/forgot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({email: json}),
    });
    const data = await response.json()
    console.log(data)
    return Response.json({message: 'Reset Successful'});
  } catch (error) {
    console.log(error);
    throw error;
  }
}
