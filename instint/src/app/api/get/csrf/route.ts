export const dynamic = "force-dynamic"; // defaults to auto'
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function GET(request: Request) {
  
  try {
    const response = await fetch(
      `${api}/steps/api/get/csrf/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const hands = await response.json();
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
