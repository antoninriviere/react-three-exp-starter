const path = require("path")
const Webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const webpackConfig = require("./webpack.config.dev")
const port = 8080

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    inline: true,
    hot: true,
    //contentBase: path.resolve(__dirname, "./static"),
    publicPath: "/dist/",
	stats: {
		colors: true
	}
})

server.listen(port, "127.0.0.1", function() {
	console.log("Starting server on http://localhost:" + port)
})