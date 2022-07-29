export function getRelatedKeys(key: string, others: string[]) {
    const keySplit = key.split('.');
    return others.filter((other: string) => {
        const otherSplit = other.split('.');
        return isRelatedKey(keySplit, otherSplit);
    });
}

export function getSuperKeys(key: string, others: string[]) {
    const keySplit = key.split('.');
    return others.filter((other: string) => {
        const otherSplit = other.split('.');
        return isSuperKey(keySplit, otherSplit);
    });
}

function isSuperKey(key: string[], other: string[]) {
    if (other.length >= key.length) {
        return false;
    }
    for (let i = 0; i < other.length; i++) {
        if (key[i] !== other[i]) {
            return false;
        }
    }
    return true;
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