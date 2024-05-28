'use client'
import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState<string>("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(email)
      });
      const data = await response.json()
      console.log(response, data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <label htmlFor="">
          Email:
          <input onChange={handleEmail} type="email" required value={email} />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Reset</button>
      </div>
    </div>
  );
}
