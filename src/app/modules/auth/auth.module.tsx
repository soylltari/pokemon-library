"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoginForm } from "./elements/login-form.component";
import { RegisterForm } from "./elements/register-form.component";

export const AuthTabs = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Sign In</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-0">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register" className="mt-0">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
