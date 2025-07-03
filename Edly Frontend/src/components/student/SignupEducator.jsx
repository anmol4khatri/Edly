import { CreateAccountForm } from "@/components/create-account-form"

const SignupStudent = () => {
  return (
      <div className="flex flex-col gap-4 p-6 md:p-10">
          <a href="#" className="w-30">
              <img src="/edly.png" alt="logo" />
          </a>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <CreateAccountForm role={"student"} />
          </div>
        </div>
      </div>
  )
}

export default SignupStudent;
