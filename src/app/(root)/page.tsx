"use client";

import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }
  return (
    <div className=" bg-gradient-to-b from-homePageTop via-homePageMid to-homePageEnd">
      <h1>home page</h1>
      <p>{user.fullName}</p>
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
}
