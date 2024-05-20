export const dynamic = "force-dynamic"; // defaults to auto
import { parseCookies } from "nookies";
import Document from "next/document";
import { authCookie } from "@/functions/cookies";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const json = await request.json();
  const cookie = cookies()
  const token = cookie.get('token')
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/create/dopamine/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token?.value}`,
        },
        credentials: "include",
        body: JSON.stringify({ todo: json.todo, user: json.todo.user}),
      }
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
