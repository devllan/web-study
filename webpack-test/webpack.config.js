const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const {
//     VueLoaderPlugin
// } = require('vue-loader')

const isDve = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    mode: "development",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    // plugins: [
    //     new VueLoaderPlugin()
    // ],
    module: {
        rules: [{
                test: /\.vue$/,
                use: [
                    'vue-loader',
                ]
            },
            {
                test: /\.jsx/,
                use: [
                    'babel-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',

                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpg|gif|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDve ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if (isDve) {
    config.devtool = '#cheap-moudle-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot:true
    }
    config.plugins.push(
        //即时加载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config