import { Category } from "@/category/domain/category.entity.ts"
import { Uuid } from "@/shared/domain/value-objects/uuid.vo.ts"

describe('Category Unit Tests', () => {
  describe('constructor', () => {
    it('should construct instance of Category passing name', () => {
      const category = new Category({
        name: 'Category 1',
      })

      expect(category.category_id).toBeDefined()
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Category 1')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(category.updated_at).toBeNull()
    })

    it('should construct instance of Category passing name and description', () => {
      const category = new Category({
        name: 'Category 1',
        description: 'Category 1 description',
      })

      expect(category.name).toBe('Category 1')
      expect(category.description).toBe('Category 1 description')
    })

    it('should construct instance of Category passing name and description and is_active', () => {
      const category = new Category({
        name: 'Category 1',
        description: 'Category 1 description',
        is_active: false,
      })

      expect(category.name).toBe('Category 1')
      expect(category.description).toBe('Category 1 description')
      expect(category.is_active).toBe(false)
    })

    it('should construct instance of Category passing name and description and is_active and created_at', () => {
      const category = new Category({
        name: 'Category 1',
        description: 'Category 1 description',
        is_active: false,
        created_at: new Date('2021-01-01'),
      })

      expect(category.name).toBe('Category 1')
      expect(category.description).toBe('Category 1 description')
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
    })
  })

  describe('create', () => {
    it('should create instance of Category', () => {
      const category = Category.create({
        name: 'Category 1',
      })

      expect(category.category_id).toBeDefined()
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Category 1')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(category.updated_at).toBeNull()
    })

    it('should create instance of Category with description', () => {
      const category = Category.create({
        name: 'Category 1',
        description: 'Category 1 description',
      })

      expect(category.description).toBe('Category 1 description')
    })

    it('should create instance of Category with is_active', () => {
      const category = Category.create({
        name: 'Category 1',
        is_active: false,
      })

      expect(category.is_active).toBe(false)
    })
  })

  describe('category_id field', () => {
    const arrange = [
      {
        category_id: null,
      },
      {
        category_id: undefined,
      },
      {
        category_id: Uuid.create()
      }
    ]
    test.each(arrange)('id = %j', ({category_id}) => {
      const category = new Category({
        category_id: category_id as any,
        name: 'Category 1',
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id)
      }
    })
  })

  describe('changeName', () => {
    it('should change name of Category', () => {
      const category = Category.create({
        name: 'Category 1',
      })

      category.changeName('Category 2')
      expect(category.name).toBe('Category 2')
    })
  })

  describe('activate', () => {
    it('should activate Category', () => {
      const category = Category.create({
        name: 'Category 1',
      })

      category.activate()
      expect(category.is_active).toBe(true)
    })

    it('should deactivate Category', () => {
      const category = Category.create({
        name: 'Category 1',
      })

      category.deactivate()
      expect(category.is_active).toBe(false)
    })
  })

  describe('toJSON', () => {
    it('should return JSON representation of Category', () => {
      const category = Category.create({
        name: 'Category 1',
      })
      const json = category.toJSON()
      
      expect(json).toEqual({
        category_id: category.category_id,
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: category.created_at,
        updated_at: category.updated_at,
      })
    })
  })
})