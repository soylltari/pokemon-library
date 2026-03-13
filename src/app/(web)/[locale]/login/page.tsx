import React from "react";
import { AuthTabs } from "@/app/modules/auth/auth.module";

const LoginPage = async () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthTabs />
    </div>
  );
};

export default LoginPage;
