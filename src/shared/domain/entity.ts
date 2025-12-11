import type { ValueObject } from "./value-object.ts";

export abstract class Entity {
  abstract get entity_id(): ValueObject;
  abstract toJSON(): any;
}