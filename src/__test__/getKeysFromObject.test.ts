import getKeysFromObject from "../lib/getKeysFromObject";

const val = ":)";

test('get shallow keys', () => {
    const obj = {
        a: val, b: val, c: val,
    };
    const expected = ['a', 'b', 'c'].sort();
    const keys = getKeysFromObject(obj).sort();
    expect(keys).toStrictEqual(expected);
});

test('get nested keys', () => {
    const obj = {
        a: val,
        b: {
            c: val,
            d: val
        },
        e: val,
    };
    const expected = ['a', 'b', 'b.c', 'b.d', 'e'].sort();
    const keys = getKeysFromObject(obj).sort();
    expect(keys).toStrictEqual(expected);
});

test('get deeply nested keys', () => {
    const obj = {
        a: val,
        b: {
            c: val,
            d: {
                e: {
                    f: val
                }
            }
        },
        e: val,
    };
    const expected = ['a', 'b', 'b.c', 'b.d', 'b.d.e', 'b.d.e.f', 'e'].sort();
    const keys = getKeysFromObject(obj).sort();
    expect(keys).toStrictEqual(expected);
});