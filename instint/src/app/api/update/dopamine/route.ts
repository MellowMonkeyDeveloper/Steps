export const dynamic = 'force-dynamic' // defaults to auto
export async function PATCH(request: Request) {
    const {searchParams} = new URL(request.url)
    const key = searchParams.get('key')
  
    const json = await request.json()
    try{
          const response = await fetch(`http://localhost:8000/steps/api/update/dopamine/${key}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(json)
          })
          const data = await response.json()
          return Response.json(data)
    }catch(error){
        console.log(error)
        throw error
    }
 
}
