/**
 * @fileoverview ConfigArray
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const ConfigOps = require("../config/config-ops"),
    ConfigSchema = require("./config-schema");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Represents an array of config objects and provides method for working with
 * those config objects.
 */
class ConfigArray extends Array {

    /**
     * Creates a new instance of ConfigArray.
     * @param {Iterable|Function|Object} configs An iterable yielding config
     *      objects, or a config function, or a config object. 
     * @param {string} [options.basePath=""] The path of the config file
     *      containing the configs. 
     */
    constructor(configs, { basePath = "" }) {
        super();

        // load the configs into this array
        if (!Array.isArray(configs)) {
            this.push(configs);
        } else {
            this.push(...configs);
        }

        /**
         * The path of the config file that this array was loaded from.
         * This is used to calculate filename matches.
         * @property basePath
         * @type string
         */
        this.basePath = basePath;

        /**
         * Schema for config objects.
         * @property schema
         * @type ConfigSchema
         */
        this.schema = new ConfigSchema();
    }

    /**
     * Normalizes a config array by flattening embedded arrays and executing
     * config functions.
     * @param {ConfigContext} context The context object for configs. 
     * @returns {ConfigArray} A new ConfigArray instance that is normalized.
     */
    normalize(context) {

    }

    /**
     * Returns the config object for a given file path.
     * @param {string} filePath The complete path of a file to get a config for. 
     * @returns {Object} The config object for this file.
     */
    getConfig(filePath) {
        const matchingConfigs = [];

        for (const config of this) {
            if (!config.files || ConfigOps.pathMatchesGlobs(filePath, config.files, config.ignores || null)) {
                matchingConfigs.push(config);
            }
        }

        return matchingConfigs.reduce((result, config) => {
            return this.schema.merge(result, config);
        }, {});
    }

}

module.exports = ConfigArray;