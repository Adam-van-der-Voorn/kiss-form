const urlParams = new URLSearchParams(window.location.search);

export default function getJSONParam(key: string) {
    const raw = urlParams.get(key);

    return raw != null
        ? JSON.parse(decodeURIComponent(raw))
        : undefined;
}
