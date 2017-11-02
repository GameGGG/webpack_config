let htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    getEntry: function (options) {
        const obj = {}
        for (let i in options) {
            obj[i] = options[i].js_into
        }
        return obj;
    },
    getHtmlDealPlugin: function (options) {
        const arr = []
        for (let i in options) {
            arr.push(new htmlWebpackPlugin({
                filename: '../'+ i +'.html',
                template: options[i].html_into
            }))
        }
        return arr;
    }
}

