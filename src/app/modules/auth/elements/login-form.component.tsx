"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "@/app/shared/store/auth.store";
import {
  Button,
  Input,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/app/shared/ui";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { AuthCardComponent } from "./auth-card.component";
import { PasswordInputComponent } from "./password-input.component";
import { useMemo } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const login = useAuthStore((s) => s.login);
  const t = useTranslations("auth.login");

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email({ message: t("errors.invalidEmail") }),
        password: z.string().min(1, { message: t("errors.requiredPassword") }),
      }),
    [t],
  );

  type FormValues = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    const result = await login(data.email, data.password);

    if (!result.success && result.error) {
      setError(result.error.field, {
        message: t(`errors.api.${result.error.message}`),
      });
    } else {
      router.push(`/${locale}/items`);
    }
  };

  return (
    <AuthCardComponent title={t("title")} description={t("description")}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">{t("emailLabel")}</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
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
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
          />
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          className="w-full mt-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("submittingButton") : t("submitButton")}
        </Button>
      </form>
    </AuthCardComponent>
  );
};
