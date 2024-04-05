import axios from "axios"
export const dynamic = 'force-dynamic' // defaults to auto
import type { NextApiRequest, NextApiResponse } from "next"
export async function POST(request: Request) {
    const json = await request.json()
    console.log(json)
    try{
          const response = await fetch('http://localhost:8000/steps/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
          })
          const data = await response.json()
          console.log(data)
          return Response.json(data)
    }catch(error){
        console.log(error)
        throw error
    }
 
}
