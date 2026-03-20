"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/pkg/theme/ui";

import { LoginForm, RegisterForm } from "./elements";

const tabs = [
  {
    value: "login",
    label: "Sign In",
  },
  {
    value: "register",
    label: "Register",
  },
];

export const AuthTabs = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-background gap-1 border p-1 mb-4">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent p-0"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
