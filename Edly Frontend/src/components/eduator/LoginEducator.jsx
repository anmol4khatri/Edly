import { LoginForm } from "../login-form";

const LoginEducator = () => {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-10 min-h-screen dark bg-background text-foreground">
      <a href="#" className="w-30">
        <img src="/edly.png" alt="logo" />
      </a>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginForm role={"educator"} />
        </div>
      </div>
    </div>
  )
}

export default LoginEducator;