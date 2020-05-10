const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        entry: ['./src/index.js', './src/sass/style.scss'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js',
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.scss|css$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', {
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                              plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                  require('precss'),
                                  require('autoprefixer')
                                ];
                              }
                            }
                          }, {
                            loader: 'sass-loader' // compiles Sass to CSS
                        }
                    ]
                }, {
                    test: /\.(png|jpe?g|gif|mp3)$/i,
                    use: [
                    {
                        loader: 'file-loader',
                    },
                    ],
                },{
                    test: /\.html$/i,
                    loader: 'html-loader',
                },{
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        },
        optimization: {
            splitChunks: {
              cacheGroups: {
                styles: {
                  name: 'styles',
                  test: /\.css$/,
                  chunks: 'all',
                  enforce: true,
                },
              },
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyWebpackPlugin([
                { from: './node_modules/@fortawesome/fontawesome-free/webfonts', to: './webfonts'}
            ]),
            new FaviconsWebpackPlugin('./src/img/logo.svg'),
        ]
    }

    return config;
}