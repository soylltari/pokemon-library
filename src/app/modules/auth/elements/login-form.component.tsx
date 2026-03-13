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

const FormSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormValues = z.infer<typeof FormSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const login = useAuthStore((s) => s.login);

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    const result = await login(data.email, data.password);

    if (!result.success && result.error) {
      setError(result.error.field, { message: result.error.message });
    } else {
      router.push(`/${locale}/items`);
    }
  };

  return (
    <AuthCardComponent
      title="Welcome back, Trainer!"
      description="Please enter your details to sign in"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldGroup>
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
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Singing in..." : "Sign in"}
        </Button>
      </form>
    </AuthCardComponent>
  );
};
