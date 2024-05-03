export const dynamic = "force-dynamic"; // defaults to auto'

export async function GET(request: Request) {
  
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/get/csrf/`, {
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
