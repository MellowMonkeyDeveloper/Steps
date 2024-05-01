import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const token = searchParams.get('token')
  try {
    const response = await fetch(
      "http://localhost:8000/steps/api/get/dopamine", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    const hands = await response.json();
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
