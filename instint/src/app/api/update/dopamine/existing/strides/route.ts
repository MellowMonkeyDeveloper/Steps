import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function PATCH(request: Request) {
    const collectData = await request.json()
    console.log(collectData)
    const dopamine = encodeURIComponent(collectData.dopamine)
    const stride = encodeURIComponent(collectData.strides)
    const {strides_title, strides_deadline, strides_completed, strides_description, strides_motivation} = collectData.data
    const patchData = {
        strides_title: strides_title,
        strides_deadline: strides_deadline,
        strides_completed: strides_completed,
        strides_description: strides_description,
        strides_motivation: strides_motivation
    }
    console.log(patchData)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/existing/dopamine/${dopamine}/strides/${stride}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patchData)
      });
    const hands = await response.json();
    return Response.json(patchData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
