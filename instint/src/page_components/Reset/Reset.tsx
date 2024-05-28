"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
function ResetPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const uidb64 = params.get("uidb64");

  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };
  const handleReset = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: confirm, token: token, uid: uidb64 }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(token, uidb64);
  }, []);
  return (
    <div>
      <div>
        <h4>Reset Password</h4>
      </div>
      <div>
        <label htmlFor="password">
          New Password
          <input
            onChange={handleReset}
            type="text"
            required
            name="password"
            id="password"
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Confirm Password
          <input
            onChange={handleConfirm}
            type="text"
            required
            name="password"
            id="password"
          />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default function ResetWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPage />
    </Suspense>
  );
}
