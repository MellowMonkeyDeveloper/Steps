import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function PATCH(request: Request) {
  const {searchParams} = new URL(request.url)
  const token = searchParams.get('token')
    const collectData = await request.json()
    const key = collectData['key']
    const form = collectData['strides']
    console.log(token, collectData, key, form)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/dopamine/New Dope/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(form)
      });
    const hands = await response.json();
    console.log(response)
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
