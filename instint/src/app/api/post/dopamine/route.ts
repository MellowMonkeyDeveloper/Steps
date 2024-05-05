export const dynamic = "force-dynamic"; // defaults to auto
import { parseCookies } from "nookies";
import Document from "next/document";
import { authCookie } from "@/functions/cookies";
export async function POST(request: Request) {
  const token = authCookie(request)
  const json = await request.json();
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/create/dopamine/${json.user}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ todo: json.todo, user: json.user }),
      }
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
