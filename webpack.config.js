const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        main: './index.js',
        player: './player.js',
        vender: ['react', 'react-dom']
    }, 

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
    },

    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, 'public', 'assets'),
    },

    mode: 'development',

    watch: true,

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react']
                    }
                }
            },
            {
                test: /\.scss$/,
                // use: [
                //     'style-loader',
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             modules: true
                //         }
                //     },
                //     'sass-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                }) 
            },
            {
                test: /\.(jpg?g|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: '[path][name].[ext]',
                        outputPath: 'img/'
                    }
                }
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ExtractTextPlugin('[name].css')
    ],

    resolve: {
        extensions: ['.js', 'json', '.jsx', '*']
    }
};
 