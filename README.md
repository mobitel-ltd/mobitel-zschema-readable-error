# mobitel-zschema-readable-error
NodeJs module for transforn errors of zSchema module to userfriendly and readable string

## Installation
```
npm i --save mobitel-zschema-readable-error
```

## Usage

```javascript
const ZSchema = require('z-schema');
const zSchemaError = require('mobitel-zschema-readable-error');
const schema = require('./correct-json-schema.js');
const json = require('./json-for-validation.json');

// this initialization ZSchema only for example
const zSchema = new ZSchema({
    noEmptyArrays: true,
    noEmptyStrings: true,
    noTypeless: true
});

// async
zSchema.validate(json, schema, error => {
    if (error) {
        console.error(zSchemaError(error)); // => Object didn't pass validation for format hostname: http://some.site in schema 'test' in property 'propStringFormat'
        return false;
    }

    return true;
});

// sync
if (!zSchema.validate(json, schema)) {
    let errors = zSchema.getLastErrors();
    const readableErrors = zSchemaError(errors)
    console.error(readableErrors); // => Object didn't pass validation for format hostname: http://some.site in schema 'test' in property 'propStringFormat'; Expected type array but found type boolean in schema 'test' in property 'propArray'
    return false;
}
```

If module can not parsing z-schema error, then return string like:

    Can not parsing z-schema error because get: false

## Test

    npm run test

## License
MIT License
Copyright (c) 2017 Mobitel Ltd
