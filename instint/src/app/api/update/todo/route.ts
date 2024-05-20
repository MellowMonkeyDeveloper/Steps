import { cookies } from "next/headers";
import { serialize } from "v8";

export const dynamic = "force-dynamic"; // defaults to auto
export async function PATCH(request: Request) {
    const {searchParams} = new URL(request.url)
    const key = searchParams.get('key')
  const cookie = cookies();
  const token = cookie.get("token");
  const json = await request.json();
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/update/todo/${key}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token?.value}`,
        },
        credentials: "include",
        body: JSON.stringify(json.todo),
      }
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
