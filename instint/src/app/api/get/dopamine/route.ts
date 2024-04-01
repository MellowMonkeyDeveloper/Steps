import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
export async function GET(request: Request) {
  try {
    const response = await fetch(
      "http://localhost:8000/steps/api/hyper/dopamine");
    const hands = await response.json();
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
