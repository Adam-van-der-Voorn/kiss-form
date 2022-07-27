import setNestedValue from "../lib/setNestedValue";

const original = "original!";
const mutated = "mutated!";

test('mutate', () => {
    // same object as getNestedValue test 'objects'
    const obj = {
        a: {
            b: original
        }
    };
    setNestedValue(obj, 'a.b', mutated)
    expect(obj.a.b).toBe(mutated);
});