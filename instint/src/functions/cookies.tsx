

  function authCookie(request: Request){
    const cookies = request.headers.get("cookie");
    const token = cookies?.split(";")[0].slice(11);
    return token
  }


  export {authCookie}