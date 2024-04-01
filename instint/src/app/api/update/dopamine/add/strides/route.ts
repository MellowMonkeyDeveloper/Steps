import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function PATCH(request: Request) {
    const collectData = await request.json()
    const key = collectData.key
    const form = collectData.strides
    console.log(form)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/dopamine/${key}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
    const hands = await response.json();
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
