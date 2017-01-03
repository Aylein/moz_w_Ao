var path = require("path");
var webpack = require("webpack");
var html = require("html-webpack-plugin");
var es3ifyPlugin = require("es3ify-webpack-plugin");
var extractTextPlugin = require("extract-text-webpack-plugin");
var copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    devtool: "source-map",
    entry: {
        app: "./src/app.js",
        es6: ["es6-promise", "whatwg-fetch"], //fetch 和 promise 支持
        react: ["react", "react-dom", "react-dom"],
        main: path.resolve(__dirname, "src")
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
		filename: "./lib/[chunkhash:8].[name].min.js"
    },
    plugins: [
        new es3ifyPlugin(), //修复 default 在 ie8 的兼容问题 //插件有错需要修改
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: ["es6", "react"], minChunks: Infinity}),
        new webpack.DefinePlugin({"process.env": {"NODE_ENV": "production"}}),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new extractTextPlugin("./css/[contenthash:8].[name].css"),
        new html({template: "default.html"}),
        new copyWebpackPlugin([{from: "./favicon.ico", to: "./favicon.ico"}])
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/, 
                loader: "babel-loader", 
                exclude: /node_modules/, 
                query: {
                    presets: [["es2015", {"loose": true}], "stage-0", "react"], //jsx es5 loader //loose 用于解决继承类 state props 丢失的问题
                    plugins: [
                        "transform-runtime",
                        "transform-object-assign", //Object.assign 支持
                        "transform-es5-property-mutators",
                        "transform-es3-property-literals",
                        "transform-es3-member-expression-literals"
                    ]
                }
            },
            {test: /\.css$/, loader: extractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.less$/, loader: extractTextPlugin.extract("style-loader", "css-loader!less-loader")},
            {test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=10240&name=./img/[hash:8].[name].[ext]"},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10240&name=./font/[hash:8].[name].[ext]"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?limit=10240&name=./font/[hash:8].[name].[ext]"}
        ],
        postLoaders: [
            {
                test: /\.js?$/,
                loaders: ["es3ify-loader"] //es3 环境
            }
        ]
    }
};