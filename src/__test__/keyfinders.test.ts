import { getRelatedKeys, getSuperKeys } from "../lib/private/util/keyfinders";

const others = [
    'a.b.c',
    'a.b.d',
    'a.b',
    'a',
    'b',
    'a.e.1',
    'a.e.2.f',
    'a.e.3.f.g',
];

test.each([
    ['a',
        [
            'a.b.c',
            'a.b.d',
            'a.b',
            'a',
            'a.e.1',
            'a.e.2.f',
            'a.e.3.f.g',
        ]
    ],
    ['a.b',
        [
            'a.b.c',
            'a.b.d',
            'a.b',
            'a',
        ]
    ],
    ['a.b.c',
        [
            'a.b.c',
            'a.b',
            'a',
        ]
    ],
    ['b',
        ['b']
    ],
    ['a.e',
        [
            'a',
            'a.e.1',
            'a.e.2.f',
            'a.e.3.f.g',
        ]
    ],
    ['a.e.2',
        [
            'a',
            'a.e.2.f',
        ]
    ],
    ['a.e.3.f.g',
        [
            'a',
            'a.e.3.f.g',
        ]
    ]
])('test getRelatedKeys: %p', (key, expected) => {
    const keys = getRelatedKeys(key, others);
    expected.sort();
    keys.sort();
    expect(keys).toStrictEqual(expected);
});

test.each([
    ['a',
        []
    ],
    ['a.b',
        ['a']
    ],
    ['a.b.c',
        ['a.b', 'a']
    ],
    ['b',
        []
    ],
    ['a.e',
        ['a']
    ],
    ['a.e.2',
        ['a.e', 'a']
    ],
    ['a.e.3.f.g',
        ['a.e.3.f', 'a.e.3', 'a.e', 'a']
    ]
])('test getSuperKeys: %p', (key, expected) => {
    const keys = getSuperKeys(key);
    expected.sort();
    keys.sort();
    expect(keys).toStrictEqual(expected);
});