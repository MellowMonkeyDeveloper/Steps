"use client";

import { useEffect, useState } from "react";

export default function Register() {
  const [submit, setSubmit] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formObject = {
      email: email,
      password: password,
    };
    async function postRegister(){
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        const data = await response.json()
        console.log(response, data)
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
