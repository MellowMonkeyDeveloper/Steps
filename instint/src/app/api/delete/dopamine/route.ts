export const dynamic = "force-dynamic"; // defaults to auto
import { cookies } from "next/headers";
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const cookie = cookies();
  const token = cookie.get("token");
  console.log(key)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/delete/dopamine/${key}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token?.value}`,
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
