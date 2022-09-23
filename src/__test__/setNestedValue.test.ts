import setNestedValue from '../lib/object-state/util/setNestedValue';

const original = 'original!';
const mutated = 'mutated!';

test('mutate', () => {
    // same object as getNestedValue test 'objects'
    const obj = {
        a: {
            b: original
        }
    };
    setNestedValue(obj, 'a.b', mutated);
    expect(obj.a.b).toStrictEqual(mutated);
});

test('array indicies', () => {
    const obj = {
        a: {
            b: [original, original]
        }
    };
    setNestedValue(obj, 'a.b.0', mutated);
    setNestedValue(obj, 'a.b.1', mutated);
    expect(obj.a.b).toStrictEqual([mutated, mutated]);
});