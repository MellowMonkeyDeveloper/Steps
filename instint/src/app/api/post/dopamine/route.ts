export const dynamic = "force-dynamic"; // defaults to auto
import { cookies } from "next/headers";
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function POST(request: Request) {
  const json = await request.json();
  const cookie = cookies()
  const token = cookie.get('token')
  try {
    const response = await fetch(
      `${api}/steps/api/create/dopamine/`,
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
