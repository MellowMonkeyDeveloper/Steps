import axios from "axios";
export const dynamic = "force-dynamic"; // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next";
require('dotenv').config()
const local = process.env.NEXT_PUBLIC_LOCAL
const api = process.env.NEXT_PUBLIC_DOPROD
export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${api}/steps/csrf/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      });
    const hands = await response.json();
    console.log(hands)
    return Response.json(hands);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
