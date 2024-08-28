// /**
//  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
//  * for Docker builds.
//  */
// await import("./src/env.mjs");

// /** @type {import("next").NextConfig} */
// const config = {
//     reactStrictMode: true,

//     /**
//      * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
//      * out.
//      *
//      * @see https://github.com/vercel/next.js/issues/41980
//      */

//     webpack: (config, { isServer }) => {
//         // Add a new rule to handle .glb files
//         config.module.rules.push({
//             test: /\.(glb|gltf)$/,
//             use: {
//                 loader: "file-loader",
//                 options: {
//                     publicPath: "/_next",
//                     name: "static/media/[name].[hash].[ext]",
//                 },
//             },
//         });

//         return config;
//     },
//     i18n: {
//         locales: ["en"],
//         defaultLocale: "en",
//     },
//     images: {
//         domains: [
//             // "genevieveclairehair.s3.us-west-2.amazonaws.com",
//             "s3.us-west-2.amazonaws.com",
//             "lh3.googleusercontent.com",
//             "www.paypalobjects.com",
//         ],
//     },
// };

// export default config;

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// next.config.js
// experimental: {
//     appDir: true,
// },

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: [
            "s3.us-west-2.amazonaws.com",
            "lh3.googleusercontent.com",
            "www.paypalobjects.com",
        ],
    },
};

export default config;
