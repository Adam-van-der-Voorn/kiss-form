import flood from "../lib/private/util/flood";
import getKeysFromObject from "../lib/private/util/getKeysFromObject";

const flooded = "flooded!";

test('flood shallow values', () => {
    const obj = {
        a: "", b: 1, c: "hmm",
    };
    const expected = {
        a: flooded, b: flooded, c: flooded,
    };
    expect(flood(obj, flooded)).toStrictEqual(expected);
});

test('flood nested objects', () => {
    const obj = {
        a: "asd",
        b: {
            c: 1,
            d: "two"
        },
    };
    const expected = {
        a: flooded,
        b: {
            c: flooded,
            d: flooded
        },
    };
    expect(flood(obj, flooded)).toStrictEqual(expected);
});

test('flood deeply nested objects', () => {
    const obj = {
        a: "asd",
        b: {
            c: 123,
            d: {
                e: {
                    f: "nested deeply"
                }
            }
        },
    };
    const expected = {
        a: flooded,
        b: {
            c: flooded,
            d: {
                e: {
                    f: flooded
                }
            }
        },
    };
    expect(flood(obj, flooded)).toStrictEqual(expected);
});

test('original obj intact', () => {
    const obj = {
        a: "asd",
        b: {
            c: 123,
            d: {
                e: {
                    f: "nested deeply"
                }
            }
        },
    };
    flood(obj, flooded);
    expect(obj.a).toEqual("asd");
    expect(obj.b.c).toEqual(123);
    expect(obj.b.d.e.f).toEqual("nested deeply");
});

test('flood array', () => {
    const arr = [1, 2, 3, { a: "b"}];
    const expected = [flooded, flooded, flooded, { a: flooded}];
    expect(flood(arr, flooded)).toStrictEqual(expected);
});

test('flood arrays in obj', () => {
    const obj = {
        a: ["x"],
        b: {
            c: 123,
            d: [3, 2, { e: "q" }],
            f: []
        },
    };
    const expected = {
        a: [flooded],
        b: {
            c: flooded,
            d: [flooded, flooded, { e: flooded }],
            f: []
        },
    };
    expect(flood(obj, flooded)).toStrictEqual(expected);
});
