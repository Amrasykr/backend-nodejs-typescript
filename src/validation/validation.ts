import {ZodType} from "zod";

export class Validation {

    static Validate<T>(schema: ZodType, data: T): T {
        return schema.parse(data)
    }


}