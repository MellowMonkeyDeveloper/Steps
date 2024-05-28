import { authCookie } from "@/functions/cookies";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // defaults to auto
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const key = searchParams.get('key')
    const cookie = cookies()
    const token = cookie.get('token')
    console.log(key)
    try {
    const response = await fetch(
      `${api}/steps/api/get/steps/${key}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token?.value}`
        },
        credentials: 'include'
      });
    const hands = await response.json();
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
