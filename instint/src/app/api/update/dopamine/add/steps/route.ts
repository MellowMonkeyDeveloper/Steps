import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function PATCH(request: Request) {
    const collectData = await request.json()
    console.log(collectData)
    const dopamine = encodeURIComponent(collectData.dopamine)
    const stride = encodeURIComponent(collectData.strides)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/create/steps/dopamine/${dopamine}/strides/${stride}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectData.data)
      });
    const hands = await response.json();
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
