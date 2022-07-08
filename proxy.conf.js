const PROXY_CONFIG = [{
    context: [
        "/api",
    ],
    target: "https://pu.ijs.si:80",
    secure: true,
    logLevel: "debug",
    changeOrigin: true
}]

module.exports = PROXY_CONFIG;