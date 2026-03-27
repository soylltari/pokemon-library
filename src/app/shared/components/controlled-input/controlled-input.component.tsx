import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/pkg/theme/ui/field'
import { Input } from '@/pkg/theme/ui/input'

interface IControlledInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  placeholder: string
  type?: 'text' | 'email'
  id?: string
}

const ControlledInputComponent = <TFieldValues extends FieldValues>(props: IControlledInputProps<TFieldValues>) => {
  const { control, name, label, placeholder, type = 'text', id } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id ?? name}>{label}</FieldLabel>

          <Input {...field} id={id ?? name} type={type} placeholder={placeholder} aria-invalid={fieldState.invalid} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default ControlledInputComponent
