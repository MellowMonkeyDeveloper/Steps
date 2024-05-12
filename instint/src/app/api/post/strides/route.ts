import { authCookie } from "@/functions/cookies"

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
    const token = authCookie(request)
    const json = await request.json()
    console.log(json)
    try{
          const response = await fetch(`http://localhost:8000/steps/api/create/strides/${json.key}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({todo: json.todo})
          })
          const data = await response.json()
          return Response.json(data)
    }catch(error){
        console.log(error)
        throw error
    }
 
}
