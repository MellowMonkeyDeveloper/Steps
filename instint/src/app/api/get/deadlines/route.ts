import { cookies } from "next/headers";
import { URL } from "url";
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const cookie = cookies()
  const token = cookie.get('token')
  const {searchParams} = new URL(request.url)
  const date = searchParams.get('date')
    console.log(date)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/get/deadlines?deadline=${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token?.value}`
        },
        credentials: 'include'
      });
      const data = await response.json()
    console.log(response)
    return Response.json(data)
  } catch (error) {
    console.log(error);
    throw error;
  }
}
