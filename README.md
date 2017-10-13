# Mobitel Ltd. zSchema readable error
NodeJs module for transforn errors of zSchema module to user friendly and readable string

## Attention
This module writing and testing on **NodeJs v.8+** and **NPM v.5+**.
Using the module in previous versions of NodeJs does not guarantee correct works.

## <a name="navigation">Navigation</a>

* [Installation](#installation)
* [Usage](#usage)
* [Testing](#testing)
* [License](#license)

## <a name="installation">Installation</a>

```
npm i --save mobitel-zschema-readable-error
```
[<p align="right">up to navigation</p>](#navigation)

## <a name="usage">Usage</a>

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
[<p align="right">up to navigation</p>](#navigation)

## <a name="testing">Test</a>

    npm run test
[<p align="right">up to navigation</p>](#navigation)

## <a name="testing">License
MIT License.
Copyright (c) 2017 Mobitel Ltd
[<p align="right">up to navigation</p>](#navigation)
