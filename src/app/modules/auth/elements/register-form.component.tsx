'use client'

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/app/shared/store/auth.store'
import { useRouter } from '@/pkg/locale'
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from '@/pkg/theme/ui'

import { AuthCardComponent } from './auth-card.component'
import { PasswordInputComponent } from './password-input.component'

export const RegisterForm = () => {
  const router = useRouter()
  const register = useAuthStore((s) => s.register)
  const t = useTranslations('auth.register')

  const formSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(1, { message: t('errors.requiredName') }),
          email: z.email({ message: t('errors.invalidEmail') }),
          password: z.string().min(1, { message: t('errors.requiredPassword') }),
          confirmPassword: z.string().min(1, { message: t('errors.requiredConfirmPassword') }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t('errors.passwordMismatch'),
          path: ['confirmPassword'],
        }),
    [t],
  )

  type FormValues = z.infer<typeof formSchema>

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: FormValues) => {
    const result = await register(data.name, data.email, data.password)

    if (!result.success && result.error) {
      setError(result.error.field, {
        message: t(`errors.api.${result.error.message}`),
      })
    } else {
      router.push('/items')
    }
  }

  return (
    <AuthCardComponent title={t('title')} description={t('description')}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FieldGroup>
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>{t('nameLabel')}</FieldLabel>
                <Input
                  {...field}
                  id='name'
                  type='text'
                  placeholder={t('namePlaceholder')}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name='email'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='email'>{t('emailLabel')}</FieldLabel>
                <Input
                  {...field}
                  id='email'
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <PasswordInputComponent
            control={control}
            name='password'
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
          />
          <PasswordInputComponent
            control={control}
            name='confirmPassword'
            label={t('confirmPasswordLabel')}
            placeholder={t('confirmPasswordPlaceholder')}
          />
        </FieldGroup>

        <Button type='submit' size='lg' className='mt-1 w-full' disabled={isSubmitting}>
          {isSubmitting ? t('submittingButton') : t('submitButton')}
        </Button>
      </form>
    </AuthCardComponent>
  )
}
