import trimObject from '../lib/private/util/trimObject';

const notEmpty = 'NOT EMPTY';

test('trim shallow', () => {
    const initial = {
        a: '', b: '', c: notEmpty,
    };
    const expected = { c: notEmpty };
    const trimmed = trimObject(initial);
    expect(trimmed).toStrictEqual(expected);
});

test('trim nested', () => {
    const initial = {
        a: '',
        b: {
            c: notEmpty,
            d: ''
        },
        e: notEmpty,
    };
    const expected = {
        b: {
            c: notEmpty
        },
        e: notEmpty
    };
    const trimmed = trimObject(initial);
    expect(trimmed).toStrictEqual(expected);
});

test('trim nested object', () => {
    const initial = {
        a: '',
        b: {
            c: '',
            d: ''
        },
        e: notEmpty,
    };
    const expected = { e: notEmpty };
    const trimmed = trimObject(initial);
    expect(trimmed).toStrictEqual(expected);
});