const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: process.env.NODE_ENV === "development"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    process.env.NODE_ENV === "development" ? "style-loader": MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: process.env.NODE_ENV === "development" ? "compressed" : "expanded",
                            }
                        }
                    }
                ]
            }
        ]
    }
};