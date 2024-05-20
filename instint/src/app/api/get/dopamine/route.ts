import { cookies } from "next/headers";
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const cookie = cookies()
  const token = cookie.get('token')
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/get/dopamine/`, {
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
