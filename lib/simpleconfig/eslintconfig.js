/**
 * @fileoverview The @eslint/config utility
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

function *flatTraverseESLintRC(eslintRC) {
    if (eslintRC.extends) {
        if (Array.isArray(eslintRC.extends)) {
            for (const item of eslintRC.extends) {
                if (Array.isArray(item)) {
                    yield* flatTraverseESLintRC(item);
                } else {
                    yield item;
                }
            }
        } else {
            yield* eslintRC.extends;
        }
    }

    const strippedESLintRC = Object.assign({}, eslintRC);
    delete strippedESLintRC.extends;
    delete strippedESLintRC.overrides;
    delete strippedESLintRC.root;

    yield strippedESLintRC;

    if (eslintRC.overrides) {
        for (const item of eslintRC.overrides) {
            yield item;
        }
    }
}

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
// Public Interface
//------------------------------------------------------------------------------

exports.importESLintRC = function(eslintRC, resolvers = {}) {

    return [...flatTraverseESLintRC(eslintRC)]

};
