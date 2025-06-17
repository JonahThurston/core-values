import { CoreValue } from "./core-value";

export interface ValueBucket {
    id: number,
    name: string,
    color: string,
    values: CoreValue[]
}