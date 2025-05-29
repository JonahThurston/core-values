import { CoreValue } from "./core-value";

export interface ValueBucket {
    id: number,
    color: string,
    values: CoreValue[]
}