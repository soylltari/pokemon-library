"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "@/app/shared/store/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { AuthCardComponent } from "./auth-card.component";
import { PasswordInputComponent } from "./password-input.component";

const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof FormSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const register = useAuthStore((s) => s.register);

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: FormValues) => {
    const result = await register(data.name, data.email, data.password);

    if (!result.success && result.error) {
      setError(result.error.field, { message: result.error.message });
    } else {
      router.push(`/${locale}/items`);
    }
  };

  return (
    <AuthCardComponent
      title="Welcome to Pokemon Library!"
      description="Please enter your details to create an account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <PasswordInputComponent
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          <PasswordInputComponent
            control={control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
          />
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
    </AuthCardComponent>
  );
};
