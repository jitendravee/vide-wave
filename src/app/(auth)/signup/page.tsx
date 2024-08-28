"use client";
import React, { useState, ChangeEvent } from "react";
import TextField from "@/ui/components/textfield";

export default function LoginPage() {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="">
      <h1>Hello for Login</h1>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
  );
}
