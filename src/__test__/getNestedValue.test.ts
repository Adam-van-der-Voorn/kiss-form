import getNestedValue from '../lib/object-state/util/getNestedValue';

const target = 'target!';

test('objects', () => {
    const obj = {
        a: {
            b: target
        }
    };
    expect(getNestedValue(obj, 'a.b')).toBe(target);
});

test('arrays', () => {
    const arr =  [null, null, target, null];
    expect(getNestedValue(arr, '2')).toBe(target);
});

test('arrays & objects', () => {
    const obj = {
        a: [
            null, null, { b: target }, null
        ]
    };
    expect(getNestedValue(obj, 'a.2.b')).toBe(target);
});

test('empty key', () => {
    const obj = {
        a: {
            b: ''
        }
    };
    expect(getNestedValue(obj, '')).toBe(obj);
});

test('incorrect key', () => {
    const obj = {
        a: {
            b: ''
        }
    };
    expect(getNestedValue(obj, 'a.not-a-key')).toBe(undefined);
});