import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function PATCH(request: Request) {
    const collectData = await request.json()
    console.log(collectData)
    const dopamine = encodeURIComponent(collectData.dopamine)
    const stride = encodeURIComponent(collectData.strides)
    const step = encodeURIComponent(collectData.steps)
    const {steps_title, steps_deadline, steps_completed, steps_description, steps_motivation} = collectData.data
    const patchData = {
        steps_title: steps_title,
        steps_deadline: steps_deadline,
        steps_completed: steps_completed,
        steps_description: steps_description,
        steps_motivation: steps_motivation
    }
    console.log(patchData)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/existing/dopamine/${dopamine}/strides/${stride}/steps/${step}/`, {
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
