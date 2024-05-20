import { cookies } from "next/headers";
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const cookie = cookies();
  console.log(request)
  const token = cookie.get("token");
  try {
    const response = await fetch("http://localhost:8000/steps/api/verify/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token?.value}`,
      },
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error("Failed");
    }


    const data = await response.json();
   

    const resRegister = Response;
    return resRegister.json(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
