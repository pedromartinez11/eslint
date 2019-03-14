

module.exports = [
    {
        globals: {
            foo: "bar"
        },
        rules: {}
    },
    {
        files: ["*.js"],
        ignores: ["*.config.js"],
        globals: {
            bar: "baz"
        }
    },
    
    {
        files: ["**/eslint.js"],
        globals: {
            baz: "boom",
            foo: "baz"
        }
    },
    {
        files: ["*.vue"],
        globals: {
            foo: "vue"
        }
    }

];