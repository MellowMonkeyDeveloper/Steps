import Register from "@/components/form/Register";

export default function RegisterPage() {
  return (
    <Register
      apiRoute="/api/auth/register"
      authHeader="Register"
      type="Register"
    />
  );
}
