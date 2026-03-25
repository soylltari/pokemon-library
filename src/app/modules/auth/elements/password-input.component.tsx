'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { Button, Field, FieldError, FieldLabel, Input } from '@/pkg/theme/ui'

interface IPasswordInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder: string
}

const PasswordInputComponent = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: IPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <div className='relative'>
            <Input
              {...field}
              id={name}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
            />
            <Button
              variant='ghost'
              size='icon'
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute top-1/2 right-2.5 -translate-y-1/2 hover:bg-transparent'
            >
              {showPassword ? <EyeOffIcon className='size-4' /> : <EyeIcon className='size-4' />}
            </Button>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default PasswordInputComponent
