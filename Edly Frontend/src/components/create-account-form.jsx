import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"

export function CreateAccountForm({ className, ...props }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showValidation, setShowValidation] = useState(false)

  const validatePassword = (pwd) => {
    return {
      minLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasLowercase: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };
  }

  const validation = validatePassword(password)
  const passwordsMatch = password === confirmPassword && confirmPassword !== ""

  const ValidationItem = ({ isValid, text }) => (
    <div
      className={cn(
        "flex items-center gap-2 text-sm",
        isValid ? "text-green-600" : "text-red-500"
      )}>
      {isValid ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      <span>{text}</span>
    </div>
  )

  return (
    (<form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-balance text-sm text-muted-foreground">Enter your details below to create your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowValidation(true)}
            required />
          {showValidation && password && (
            <div className="mt-2 space-y-1 rounded-md border p-3 bg-muted/50">
              <p className="text-sm font-medium text-muted-foreground mb-2">Password must contain:</p>
              <ValidationItem isValid={validation.minLength} text="At least 8 characters" />
              <ValidationItem isValid={validation.hasUppercase} text="One uppercase letter" />
              <ValidationItem isValid={validation.hasLowercase} text="One lowercase letter" />
              <ValidationItem isValid={validation.hasNumber} text="One number" />
              <ValidationItem isValid={validation.hasSpecialChar} text="One special character" />
            </div>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required />
          {confirmPassword && (
            <div
              className={cn(
                "flex items-center gap-2 text-sm mt-1",
                passwordsMatch ? "text-green-600" : "text-red-500"
              )}>
              {passwordsMatch ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              <span>{passwordsMatch ? "Passwords match" : "Passwords don't match"}</span>
            </div>
          )}
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        <div
          className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4" />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853" />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05" />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335" />
          </svg>
          Sign up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Have an account?{" "}
        <a href={props.role === "educator" ? "/educator/login" : "/student/login" } className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>)
  );
}
