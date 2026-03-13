import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui";

interface IAuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthCardComponent = ({
  children,
  title,
  description,
}: IAuthCardProps) => {
  return (
    <div>
      <Card className="w-full max-w-sm ring-0 shadow-none bg-transparent">
        <CardHeader className="items-center text-center gap-2 pb-2">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
