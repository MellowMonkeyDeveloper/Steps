import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function PATCH(request: Request) {
    const collectData = await request.json()
    const {data} = collectData
    const {deadline, completed, description, motivation} = data
    const objectPatch = {
        deadline: deadline,
        completed: completed,
        description: description,
        motivation: motivation
    }
    console.log(objectPatch)
  try {
    const response = await fetch(
      `http://localhost:8000/steps/api/existing/dopamine/${collectData.key}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectPatch)
      });
    const hands = await response.json();
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
