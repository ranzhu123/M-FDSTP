const ua = navigator.userAgent || '';
export const os = /iphone|ipad|ipod/.test(ua) ? 'iphone' : 'android';
