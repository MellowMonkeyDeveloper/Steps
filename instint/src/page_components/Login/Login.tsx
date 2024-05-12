"use client";

import { useWrapper } from "@/context/WrapperProvider";
import { setCookie } from "nookies";
import { useEffect, useState } from "react";

export default function Login() {
  const [useranme, setUsername] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {setUserID} = useWrapper()
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formObject = {
      username: useranme,
      email: email,
      password: password,
    };
    async function postRegister(){
        const response = await fetch(`/api/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        const data = await response.json()
        console.log(data)
        setCookie(null, 'auth_token', data.token, {
          maxAge: 80000,
          path: '/',
          secure: true,
          sameSite: 'strict'
        })
        setUserID(data.data.userID)
    }
    postRegister()
};
  const handleEmail = (e: ChangeEventHandler<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEventHandler<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUsername = (e: ChangeEventHandler<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  return (
    <section>
      <div>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} action="submit">
          <label htmlFor="username">
              Username
              <input
                onChange={handleUsername}
                type="text"
                id="username"
                name="username"
                required
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                onChange={handleEmail}
                type="email"
                id="email"
                name="email"
                required
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                onChange={handlePassword}
                type="text"
                id="password"
                name="password"
                required
              />
            </label>
            <input type="submit" />
          </form>
        </div>
        <div></div>
      </div>
    </section>
  );
}
