import { SignIn, SignUp } from "@clerk/nextjs";

export default function SignedIn() {
  return (
    <div className="">
      <SignIn />
    </div>
  );
}
