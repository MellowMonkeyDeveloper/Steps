export const dynamic = "force-dynamic"; // defaults to auto
import { cookies } from "next/headers";
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const cookie = cookies();
  const token = cookie.get("token");
  console.log(key)
  try {
    const response = await fetch(
      `${api}/steps/api/delete/strides/${key}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token?.value}`,
        },
        credentials: "include",
      }
    );
 
    return Response.json({message: 'Deleted'});
  } catch (error) {
    console.log(error);
    throw error;
  }
}
