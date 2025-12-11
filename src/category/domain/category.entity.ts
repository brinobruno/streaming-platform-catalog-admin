import { Uuid } from "@/shared/domain/value-objects/uuid.vo.ts"
import { CategoryValidatorFactory } from '@/category/domain/category.validator.ts'
import { EntityValidationError } from "@/shared/domain/validators/validation.error.ts"
import { Entity } from "@/shared/domain/entity.ts"
import type { ValueObject } from "@/shared/domain/value-object.ts"

export type CategoryConstructorProps = {
  category_id?: Uuid
  name: string
  description?: string | null
  is_active?: boolean
  created_at?: Date
  updated_at?: Date | null
}

export type CategoryCreateCommand = {
  name: string
  description?: string | null
  is_active?: boolean
}

export class Category extends Entity {
  category_id: Uuid
  name: string
  description: string | null
  is_active: boolean
  created_at: Date
  updated_at: Date | null

  constructor(props: CategoryConstructorProps) {
    super()
    this.category_id = props.category_id ?? Uuid.create()
    this.name = props.name
    this.description = props.description ?? null
    this.is_active = props.is_active ?? true
    this.created_at = props.created_at ?? new Date()
    this.updated_at = props.updated_at ?? null
  }

  get entity_id(): ValueObject {
    return this.category_id
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props)
    Category.validate(category)
    return category
  }

  changeName(name: string): void {
    this.name = name
    Category.validate(this)
  }

  changeDescription(description: string | null): void {
    this.description = description
    Category.validate(this)
  }

  activate(): void {
    this.is_active = true
  }

  deactivate(): void {
    this.is_active = false
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create()
    const isValid = validator.validate(entity)
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }

  toJSON() {
    return {
      category_id: this.category_id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}