/**
 * @fileoverview ConfigSchema
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { ObjectSchema } = require("@humanwhocodes/object-schema");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function assertIsArray(value, name) {
    if (!Array.isArray(value)) {
        throw new TypeError(`Expected key "${name}" to be an array.`);
    }
}

function assertIsNotArray(value, name) {
    if (Array.isArray(value)) {
        throw new TypeError(`Expected key "${name}" to not be an array.`);
    }
}

function assertIsObject(value, name) {
    if (value == null || typeof value !== "object") {
        throw new TypeError(`Expected key "${name}" to be an object.`);
    }

}

function assertIsArrayOfStrings(value, name) {
    assertIsArray(value, name);

    if (value.some(item => typeof item !== "string")) {
        throw new TypeError(`Expected "${name}" to only contain strings.`);
    }
}

//------------------------------------------------------------------------------
// Data
//------------------------------------------------------------------------------

const keys = [
    {
        name: "files",
        required: false,
        merge() {
            return undefined;
        },
        validate(value) {
            if (value !== undefined) {
                // assertIsArrayOfStrings(value, this.name);
            }
        }
    },
    {
        name: "ignores",
        required: false,
        merge() {
            return undefined;
        },
        validate(value) {
            if (value !== undefined) {
                // assertIsArrayOfStrings(value, this.name);
            }
        }
    },
    {
        name: "globals",
        required: false,
        merge(value1, value2) {
            return Object.assign({}, value1, value2);
        },
        validate(value) {
            assertIsObject(value, this.name);
        }
    },
    {
        name: "rules",
        required: false,
        merge(value1, value2) {
            return Object.assign({}, value1, value2);
        },
        validate(value) {
            assertIsObject(value, this.name);
        }
    }
];

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Represents schema for configs.
 */
class ConfigSchema extends ObjectSchema {

    /**
     * Creates a new instance of ConfigSchema.
     */
    constructor() {
        super();

        for (const key of keys) {
            this.defineStrategy(key);
        }
    }

}

module.exports = ConfigSchema;