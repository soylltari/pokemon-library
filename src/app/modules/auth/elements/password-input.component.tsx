// components/auth/password-field.tsx
"use client";

import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/app/shared/ui/input";
import { Button } from "@/app/shared/ui/button";
import { Field, FieldError, FieldLabel } from "@/app/shared/ui/field";

interface IPasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
}

export const PasswordInputComponent = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: IPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
            />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </Button>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
