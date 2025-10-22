import { InvalidUuidError, Uuid } from '@/shared/domain/value-objects/uuid.vo.ts'
import { jest } from '@jest/globals'

describe('Uuid unit tests', () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')

  describe('constructor', () => {
    it('should throw error if uuid is invalid', () => {
      expect(() => new Uuid('invalid-uuid')).toThrow(InvalidUuidError)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it("should create a valid uuid", () => {
      const uuid = new Uuid()
      expect(uuid.id).toBeDefined()
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it("should create a valid uuid when a valid uuid is provided", () => {
      const validUuid = '123e4567-e89b-12d3-a456-426614174000'
      const uuid = new Uuid(validUuid)
      expect(uuid.id).toBe(validUuid)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it("should throw error when an invalid uuid is provided", () => {
      expect(() => new Uuid('invalid-uuid')).toThrow(InvalidUuidError)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('create', () => {
    it('should create a valid uuid', () => {
      const uuid = Uuid.create()
      expect(uuid.id).toBeDefined()
      expect(validateSpy).toHaveBeenCalledTimes(1)
    })

    it('should create a valid uuid when a valid uuid is provided', () => {
      const validUuid = '123e4567-e89b-12d3-a456-426614174000'
      const uuid = Uuid.create(validUuid)
    })
  })
})