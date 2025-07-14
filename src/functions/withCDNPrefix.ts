export default function withCDNPrefix(url: string) {
    let _url = url;
    if(_url.includes('https://cdn2.495traffic.com')) {
        return _url;
    } else if(_url.includes('https://495traffic.com')) {
        _url = _url.replace('://', '://cdn2.');
        return _url;
    } else {
        return _url;
    }
}
