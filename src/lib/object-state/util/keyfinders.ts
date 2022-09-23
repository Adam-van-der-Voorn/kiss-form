export function getRelatedKeys(key: string, others: string[]) {
    const keySplit = key.split('.');
    return others.filter((other: string) => {
        const otherSplit = other.split('.');
        return isRelatedKey(keySplit, otherSplit);
    });
}

export function getSuperKeys(key: string): string[] {
    const keySplit = key.split('.');
    const superKeys = [];
    for (let i = 1; i < keySplit.length; i ++) {
        const superKey = keySplit.slice(0, i).join('.');
        superKeys.push(superKey);
    }
    return superKeys;
}

function isRelatedKey(key: string[], other: string[]) {
    const shortestLength = Math.min(key.length, other.length);
    for (let i = 0; i < shortestLength; i++) {
        if (key[i] !== other[i]) {
            return false;
        }
    }
    return true;
}