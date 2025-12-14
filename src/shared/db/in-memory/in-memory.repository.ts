import type { Entity } from "@/shared/domain/entity.ts";
import { NotFoundError } from "@/shared/domain/errors/not-found.error.ts";
import type { IRepository } from "@/shared/domain/repository/repository-interface.ts";
import type { ValueObject } from "@/shared/domain/value-object.ts";

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject>
 implements IRepository<E, EntityId> {
  items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities)
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex(item =>
      item.entity_id.equals(entity.entity_id)
    )
    if (indexFound === -1) {
      throw new NotFoundError(entity.entity_id, this.getEntity())
    }
    this.items[indexFound] = entity
  }

  async delete(entity_id: EntityId): Promise<void> {
    const indexFound = this.items.findIndex(item => 
      item.entity_id.equals(entity_id)
    )
    if (indexFound === -1) {
      throw new NotFoundError(entity_id, this.getEntity())
    }
    this.items.splice(indexFound, 1)
  }

  async findById(entity_id: EntityId): Promise<E | null> {
    const item = this.items.find(item => item.entity_id.equals(entity_id))
    return item === undefined ? null : item
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  async count(): Promise<number> {
    return this.items.length
  }

  abstract getEntity(): new(...args: any[]) => E
}