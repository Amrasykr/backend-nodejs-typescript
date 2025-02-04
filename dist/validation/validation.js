"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
    static Validate(schema, data) {
        return schema.parse(data);
    }
}
exports.Validation = Validation;
