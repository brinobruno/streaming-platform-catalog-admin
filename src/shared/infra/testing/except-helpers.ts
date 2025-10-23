import type { ClassValidatorFields } from "@/shared/domain/validators/class-validator-fields.ts";
import type { EntityValidationError } from "@/shared/domain/validators/validation.error.ts";
import type { FieldsErrors } from "@/shared/domain/validators/validator-fields-interface.ts";

type Expected = | 
{
  validator: ClassValidatorFields<any>
  data: any
} | {
  (): void
} 

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected()
        return isValid()
      } catch (e) {
        const error = e as EntityValidationError
        return assertcontainsErrorMessages(error.error, received)
      }
    } else {
      const { validator, data } = expected
      const validated = validator.validate(data)
      if (validated) {
        return isValid()
      }
      return assertcontainsErrorMessages(validator.errors, received)
    }
  }
})

function assertcontainsErrorMessages(expected: FieldsErrors, received: FieldsErrors) {
  const hasAllErrors = Object.keys(received).every((field) => {
    const expectedMessages = expected[field] || []
    const receivedMessages = received[field] || []

    return receivedMessages.every((msg) => expectedMessages.includes(msg))
  })

  return hasAllErrors 
  ? isValid() 
  : isNotValid(`The validation errors not contains: ${JSON.stringify(
    received
  )}. Current: ${JSON.stringify(expected)}`)
}

function isValid() {
  return { pass: true, message: () => "" }
}

function isNotValid(message: string) {
  return { pass: false, message: () => message }
}