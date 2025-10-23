import type { FieldsErrors } from "./validator-fields-interface.ts"

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors, message = 'Entity Validation Error') {
    super(message)
  }

  count() {
    return Object.keys(this.error).length
  }
}