import { ValueObject } from '@/shared/domain/value-object.ts';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

export class Uuid extends ValueObject {
  readonly id: string

  constructor(id?: string) {
    super()
    this.id = id ?? this.generate()
    this.validate()
  }

  private generate(): string {
    return uuidv4()
  }

  private validate() {
    const isValid = uuidValidate(this.id)
    if (!isValid) {
      throw new InvalidUuidError()
    }
  }

  static create(value?: string): Uuid {
    return new Uuid(value)
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message ?? 'ID must be a valid UUID')
    this.name = 'InvalidUuidError'
  }
}