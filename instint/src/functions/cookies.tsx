

  function authCookie(request: Request){
    const cookies = request.headers.get("cookie");
    console.log(cookies)
    const token = cookies?.split(";")[0].slice(6);
    console.log(token)
    return token
  }


  export {authCookie}