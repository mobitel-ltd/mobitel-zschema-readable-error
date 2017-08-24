/**
 * Modify z-schema error to readable and user friendly text
 * @param {Object[]} args z-schema validation error
 * @returns {String} Readable and user friendly text
 */
module.exports = (...args) => {
    let zSchemaError = args[0];
    if (typeof zSchemaError === 'string') {
        return zSchemaError;
    }

    const parsingError = 'Can not parsing z-schema error because get:';
    if (
        zSchemaError &&
        !Array.isArray(zSchemaError) &&
        zSchemaError.constructor === Object &&
        Object.keys(zSchemaError).length > 0
    ) {
        zSchemaError = [zSchemaError];
    } else if (!Array.isArray(zSchemaError) || !zSchemaError.length) {
        return `${parsingError} ${JSON.stringify(zSchemaError)}`;
    }

    const readableMsg = [];
    for (const error of zSchemaError) {
        if (!error || error.constructor !== Object || Object.keys(error).length === 0) {
            return `${parsingError} ${JSON.stringify(error)} on ${JSON.stringify(zSchemaError)}`;
        }

        let {message, path} = error;
        const {schemaId} = error;

        path = path.replace('#/', '').replace('/', ':');
        if (schemaId) {
            message += ` in schema '${schemaId}'`;
        }
        if (path && path !== '/') {
            message += ` in property '${path}'`;
        }
        readableMsg.push(message);
    }

    return readableMsg.join('; ').trim();
};

