import { cookies } from "next/headers";
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  const json = await request.json();
  const cookie = cookies()
  const token = cookie.get('token')
  console.log(json)
  try {
    const response = await fetch(
      `${api}/steps/api/create/steps/${json.key}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token?.value}`
        },
        credentials: "include",
        body: JSON.stringify({ todo: json.todo}),
      }
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
