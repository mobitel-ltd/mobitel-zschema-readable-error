/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const parser = require('../index.js');
const parser2 = require('../index.js');

const singleError = [
    {
        code: 'INVALID_FORMAT',
        params: ['hostname', 'http://some.site'],
        message: 'Object didn\'t pass validation for format hostname: http://some.site',
        path: '#/propStringFormat',
        schemaId: 'test',
    },
];

const mutipleErrors = [
    {
        code: 'INVALID_FORMAT',
        params: ['hostname', 'http://some.site'],
        message: 'Object didn\'t pass validation for format hostname: http://some.site',
        path: '#/propStringFormat',
        schemaId: 'test',
    },
    {
        code: 'INVALID_TYPE',
        params: ['array', 'boolean'],
        message: 'Expected type array but found type boolean',
        path: '#/propArray',
        schemaId: 'test',
    },
];

describe('parser', function() {
    it('should be a function', function() {
        assert.equal(typeof parser, 'function');
    });

    it('constructor should be a Function constructor', function() {
        assert.equal(parser.constructor, Function);
    });

    it('has equal instances', function() {
        assert.equal(parser, parser2);
    });

    it('instances constructors is equal', function() {
        assert.equal(parser.constructor, parser2.constructor);
    });

    describe('should return string with not parsed error when', function() {
        const test = (...args) => {
            let result;

            if (args.length > 0) {
                result = parser(...args);
            } else {
                result = parser();
            }

            assert.deepEqual(typeof result, 'string');
            assert.deepEqual(result.startsWith('Can not parsing z-schema error because get:'), true);
        };

        it('call without arguments', function() {
            test();
        });

        it('call with null', function() {
            test(null);
        });

        it('call with true', function() {
            test(true);
        });

        it('call with false', function() {
            test(false);
        });

        it('call with NaN', function() {
            test(NaN);
        });

        it('call with Function', function() {
            test(() => 10);
        });

        it('call with Number', function() {
            test(1);
        });

        it('call with Number as 0', function() {
            test(0);
        });

        it('call with float Number', function() {
            test(1.2);
        });

        it('call with empty Array', function() {
            test([]);
        });

        it('call with empty Array', function() {
            test([]);
        });

        it('call with Array with wrong element', function() {
            test([...singleError, false]);
        });

        it('call with empty Object', function() {
            test({});
        });

        it('call with Symbol', function() {
            test(Symbol('test'));
        });

        it('call with RegExp', function() {
            test(/^\d*$/);
        });

        it('call with multiple arguments where first is wrong', function() {
            test(null, singleError);
        });
    });

    describe('should return string with readable error text when', function() {
        const test = (...args) => {
            let result;
            if (args.length > 0) {
                result = parser(...args);
            } else {
                result = parser();
            }
            assert.deepEqual(typeof result, 'string');
            return result;
        };

        it('call with empty String (should return this string)', function() {
            const result = test('');
            assert.deepEqual(result, '');
        });

        it('call with String (should return this string)', function() {
            const result = test('Error as string');
            assert.deepEqual(result, 'Error as string');
        });

        it('call with error as Array with one error', function() {
            const result = test(singleError);
            assert.deepEqual(result, `Object didn't pass validation for format hostname: http://some.site in schema 'test' in property 'propStringFormat'`);
        });

        it('call with error as Array with multiple error', function() {
            const result = test(mutipleErrors);
            assert.deepEqual(result, `Object didn't pass validation for format hostname: http://some.site in schema 'test' in property 'propStringFormat'; Expected type array but found type boolean in schema 'test' in property 'propArray'`);
        });

        it('call with error as Object', function() {
            const result = test(singleError[0]);
            assert.deepEqual(result, `Object didn't pass validation for format hostname: http://some.site in schema 'test' in property 'propStringFormat'`);
        });

        it('call with multiple arguments where first is correct', function() {
            const result = test(singleError, null);
            assert.deepEqual(result, `Object didn't pass validation for format hostname: http://some.site in schema 'test' in property 'propStringFormat'`);
        });
    });
});
