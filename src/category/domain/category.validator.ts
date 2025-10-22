import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, validateSync} from 'class-validator'
import { Category } from '@/category/domain/category.entity.ts'
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields.ts'

export class CategoryRules {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string | null

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean

  constructor({ name, description, is_active }: CategoryRules) {
    Object.assign(this, { name, description, is_active })
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(entity: Category) {
    return super.validate(new CategoryRules(entity))
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator()
  }
}