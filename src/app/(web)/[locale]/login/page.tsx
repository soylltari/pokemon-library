import React from "react";
import { AuthTabs } from "@/app/modules/auth/auth.module";

const LoginPage = async () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-67px)]">
      <AuthTabs />
    </div>
  );
};

export default LoginPage;
