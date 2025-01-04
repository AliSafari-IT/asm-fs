const apiUrls = (host: string) => {
    switch (host) {
        case 'preview.asafarim.com':
            return 'https://preview.asafarim.com/api';
        case 'asafarim.com':
            return 'https://asafarim.com/api';
        default:
            return `https://localhost:${import.meta.env.VITE_API_HTTPS_PORT}/api`;
    }
};
console.debug(apiUrls(window.location.hostname));
export default apiUrls(window.location.hostname);
