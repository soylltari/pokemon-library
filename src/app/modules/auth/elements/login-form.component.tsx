'use client'

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { AuthCardComponent } from '@/app/shared/components/auth-card'
import { ControlledInputComponent } from '@/app/shared/components/controlled-input'
import { PasswordInputComponent } from '@/app/shared/components/password-input'
import { useAuthStore } from '@/app/shared/store'
import { useRouter } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'
import { FieldGroup } from '@/pkg/theme/ui/field'

const LoginFormComponent = () => {
  const router = useRouter()

  const login = useAuthStore((s) => s.login)

  const t = useTranslations('auth.login')

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email({ message: t('errors.invalidEmail') }),
        password: z.string().min(1, { message: t('errors.requiredPassword') }),
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
    defaultValues: { email: '', password: '' },
  })

  const handleOnSubmit = async (data: FormValues) => {
    const result = await login(data.email, data.password)

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
        </FieldGroup>

        <Button type='submit' size='lg' className='mt-1 w-full' disabled={isSubmitting}>
          {isSubmitting ? t('submittingButton') : t('submitButton')}
        </Button>
      </form>
    </AuthCardComponent>
  )
}

export default LoginFormComponent
