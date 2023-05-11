const siteUrl = "https://korayaydemir.dev";

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/api/*", "/admin/*"],
            },
            { userAgent: "*", allow: "/" },
        ],
    },
    exclude: ["/api/*", "/admin/*"],
    generateIndexSitemap: false,
    transform: async (config, path) => {
        const listOfMinorPaths = ["/privacy-notice", "/terms-of-service"];
        if (listOfMinorPaths.includes(path)) {
            return {
                loc: path,
                priority: 0.3,
            };
        }
        if (path === "/") {
            return {
                loc: path,
                changefreq: "daily",
                priority: 1.0,
            };
        }
        if (path.indexOf("/blog/") > -1) {
            return {
                loc: path,
                changefreq: "weekly",
                priority: 0.8,
            };
        }
        return {
            loc: path,
            priority: 0.7,
            changefreq: "weekly",
        };
    },
};
