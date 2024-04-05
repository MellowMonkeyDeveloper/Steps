"use client";

import { useWrapper } from "@/context/WrapperProvider";
import { useEffect, useState } from "react";

export default function Login() {
  const [submit, setSubmit] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {setCsrfToken} = useWrapper()
    const {csrfToken} = useWrapper()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(csrfToken)
    e.preventDefault();
    const formObject = {
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
        setCsrfToken(data.token)
    }
    postRegister()
};
  const handleEmail = (e: ChangeEventHandler<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEventHandler<HTMLInputElement>) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  return (
    <section>
      <div>
        <div>
          <h2>Registration</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} action="submit">
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
