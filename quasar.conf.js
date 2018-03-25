module.exports = function(ctx) {
    return {
        plugins: [],
        css: ["app.styl"],
        extras: [
            ctx.theme.mat ? "roboto-font" : null,
            "material-icons"
            // 'ionicons',
            // 'mdi',
            // 'fontawesome'
        ],
        supportIE: true,
        vendor: {
            add: [],
            remove: []
        },
        build: {
            // publicPath: "/build",
            scopeHoisting: true,
            vueRouterMode: "history",
            // gzip: true,
            // analyze: true,
            // extractCSS: false,
            // useNotifier: false,
            extendWebpack(cfg) {
                cfg.resolve.extensions = [
                    ".ts",
                    ...cfg.resolve.extensions
                ];
                cfg.module.rules.push({
                    test: /\.(vue|ts|js)$/,
                    loader: 'tslint-loader',
                    enforce: 'pre',
                    include: ctx.projectRoot,
                    exclude: /node_modules/,
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    include: ctx.projectRoot,
                    exclude: /node_modules|quasar|vue\/src/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                })
                // {
                //     test: /\.vue$/,
                //     loader: 'vue-loader',
                //     options: {
                //         esModule: true,
                //         //postcss: ctx.cssUtils.postcss,
                //         loaders: {
                //             js: 'ts-loader!tslint-loader',
                //             ts: 'ts-loader!tslint-loader'
                //         },
                //         /*loaders: merge({
                //             js: 'ts-loader!tslint-loader',
                //             ts: 'ts-loader!tslint-loader'
                //         }, ctx.cssUtils.styleLoaders({
                //             sourceMap: true,
                //             extract: env.prod
                //         })),*/
                //         transformToRequire: {
                //             video: 'src',
                //             source: 'src',
                //             img: 'src',
                //             image: 'xlink:href'
                //         }
                //     }
                // })
            }
        },
        devServer: {
            // https: true,
            // port: 8080,
            open: true // opens browser window automatically
        },
        // framework: 'all' --- includes everything; for dev only!
        framework: {
            components: [
                "QLayout",
                "QLayoutHeader",
                "QLayoutDrawer",
                "QPageContainer",
                "QPage",
                "QToolbar",
                "QToolbarTitle",
                "QBtn",
                "QIcon",
                "QList",
                "QListHeader",
                "QItem",
                "QItemMain",
                "QItemSide"
            ],
            directives: ["Ripple"],
            plugins: ["Notify"]
        },
        // animations: 'all' --- includes all animations
        animations: [],
        pwa: {
            cacheExt:
                "js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3",
            manifest: {
                // name: 'Quasar App',
                // short_name: 'Quasar-PWA',
                // description: 'Best PWA App in town!',
                display: "standalone",
                orientation: "portrait",
                background_color: "#ffffff",
                theme_color: "#027be3",
                icons: [
                    {
                        src: "statics/icons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-256x256.png",
                        sizes: "256x256",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png"
                    },
                    {
                        src: "statics/icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        },
        cordova: {
            // id: 'org.cordova.quasar.app'
        },
        electron: {
            extendWebpack(cfg) {
                // do something with cfg
            },
            packager: {
                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',
                // Window only
                // win32metadata: { ... }
            }
        },

        // leave this here for Quasar CLI
        starterKit: "1.0.0-beta.4"
    };
};
