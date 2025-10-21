export type CategoryConstructorProps = {
  category_id?: string
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

export class Category {
  category_id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: Date
  updated_at: Date | null

  constructor(props: CategoryConstructorProps) {
    this.category_id = props.category_id ?? Math.random().toString(36) // temp
    this.name = props.name
    this.description = props.description ?? null
    this.is_active = props.is_active ?? true
    this.created_at = props.created_at ?? new Date()
    this.updated_at = props.updated_at ?? null
  }

  static create(props: CategoryCreateCommand): Category {
    return new Category(props)
  }

  changeName(name: string): void {
    this.name = name
  }

  activate(): void {
    this.is_active = true
  }

  deactivate(): void {
    this.is_active = false
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