import { signIn } from "next-auth/client";
import React from "react";

function Login() {
  return (
    <div>
      <div>Login component</div>
      <button onClick={() => signIn()}>Sign in </button>
    </div>
  )
}

export default Login;
