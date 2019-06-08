const webpack = require('webpack');

module.exports = {
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"],
		alias: {
			mobx: __dirname + "/node_modules/mobx/lib/mobx.es6.js"
		}
	},
	node: {
		__dirname: false,
		__filename: false
	},
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "awesome-typescript-loader",
				options: {
					useCache: true
				}
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "source-map-loader"
			},

			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				exclude: /node_modules/,
			},

			{
				// Do not transform vendor's CSS with CSS-modules
				// The point is that they remain in global scope.
				// Since we require these CSS files in our JS or CSS files,
				// they will be a part of our compilation either way.
				// So, no need for ExtractTextPlugin here.
				test: /\.css$/,
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'html-loader',
			}, {
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json-loader',
			}, {
				test: /\.(mp4|webm|mp3)$/,
				loader: 'url-loader',
				exclude: /node_modules/,
				query: {
					limit: 10000,
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: /node_modules/,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
							},
							gifsicle: {
								interlaced: false,
							},
							optipng: {
								enabled: false,
								optimizationLevel: 3,
							},
							pngquant: {
								quality: '65-90',
								speed: 3,
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	],
}
