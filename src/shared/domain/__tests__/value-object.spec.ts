import { ValueObject } from "@/shared/domain/value-object.ts"

class StubStringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

class StubComplexValueObject extends ValueObject {
  constructor(readonly value: { prop1: string, prop2: number }) {
    super()
  }
}

describe('ValueObject unit tests', () => {
  describe('equals', () => {
    it('should be equals', () => {
      const vo1 = new StubStringValueObject('value')
      const vo2 = new StubStringValueObject('value')
      expect(vo1.equals(vo2)).toBe(true)

      const vo3 = new StubComplexValueObject({ prop1: 'value', prop2: 1 })
      const vo4 = new StubComplexValueObject({ prop1: 'value', prop2: 1 })
      expect(vo3.equals(vo4)).toBe(true)
    })

    it('should not be equals', () => {
      const vo1 = new StubStringValueObject('value')
      const vo2 = new StubStringValueObject('value2')
      expect(vo1.equals(vo2)).toBe(false)
      expect(vo1.equals(null as any)).toBe(false)
      expect(vo1.equals(undefined as any)).toBe(false)
      expect(vo1.equals(new Date() as any)).toBe(false)

      const vo3 = new StubComplexValueObject({ prop1: 'value', prop2: 1 })
      const vo4 = new StubComplexValueObject({ prop1: 'value2', prop2: 1 })
      expect(vo3.equals(vo4)).toBe(false)
    })
  })
})