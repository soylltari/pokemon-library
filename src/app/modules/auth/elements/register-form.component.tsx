'use client'

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Button, FieldGroup } from '@/pkg/theme/ui'

import AuthCardComponent from './auth-card.component'
import ControlledInputComponent from './controlled-input.component'
import PasswordInputComponent from './password-input.component'

const RegisterFormComponent = () => {
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

  const handleOnSubmit = async (data: FormValues) => {
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
      <form onSubmit={handleSubmit(handleOnSubmit)} className='flex flex-col gap-4'>
        <FieldGroup>
          <ControlledInputComponent
            control={control}
            name='name'
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
          />

          <ControlledInputComponent
            control={control}
            name='email'
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            type='email'
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

export default RegisterFormComponent
