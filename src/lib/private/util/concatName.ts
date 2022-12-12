export default function concatName(base: string, sub: string) {
    if (base.length == 0) {
        return sub;
    }
    if (sub.length == 0) {
        return base;
    }
    return `${base}.${sub}`;
}