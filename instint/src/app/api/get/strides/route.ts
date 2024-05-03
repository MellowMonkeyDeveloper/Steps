export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const key = searchParams.get('key')
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/get/strides/${key}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
