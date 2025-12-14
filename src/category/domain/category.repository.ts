import type { IRepository } from "@/shared/domain/repository/repository-interface.ts";
import type { Category } from "./category.entity.ts";
import type { Uuid } from "@/shared/domain/value-objects/uuid.vo.ts";

export interface CategoryRepository extends IRepository<Category, Uuid> {}
