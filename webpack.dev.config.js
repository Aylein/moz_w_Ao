var path = require("path");
var webpack = require("webpack");
var html = require("html-webpack-plugin");
var es3ifyPlugin = require("es3ify-webpack-plugin");
//var open = require("open-browser-webpack-plugin");

module.exports = {
    devtool: "cheap-module-eval-source-map",
    entry: [
        "es6-promise",
        "whatwg-fetch",
        "react",
        "react-dom",
        "react-router",
        path.resolve(__dirname, "src")
    ],
    output: {
        path: path.join(__dirname),
        filename: "[name].bundle.js"
    },
    devServer: {
        proxy: {
            "/api/*": {
                target: "http://localhost:801/",
                secure: false
            }
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/, 
                loader: "babel-loader", 
                exclude: /node_modules/, 
                query: {
                    presets: [["es2015", {"loose": true}], "stage-0", "react"], 
                    plugins: [
                        "transform-runtime",
                        "transform-object-assign"
                    ]
                }
            },
            {test: /\.css$/, loaders: ["style", "css"]},
            {test: /\.less$/, loaders: ["style", "css", "less"]},
            {test: /\.(png|jpg|gif)$/, loader: 'url'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file"}
        ]
        // ,
        // postLoaders: [
        //     {
        //         test: /\.js?$/,
        //         loaders: ["es3ify-loader"]
        //     }
        // ]
    },
    plugins: [
        new html({template: "default.html"}),
        new es3ifyPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        // ,
        // new open({
        //     url: "http://localhost:800/",
        //     browser: "chrome"
        // })
    ]
};