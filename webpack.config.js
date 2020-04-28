const
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		js		: './src/index.js'
	},
	output: {
		filename: '[name].[chunkhash].js'
	},
	devtool: 'source-map',
	module: {
		rules:[
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.pug$/,
				use: {
					loader: 'pug-loader',
					options: {pretty : true}
				}
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader?minimize&sourceMap',
					{
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browser: ['last 2 versions']
							},
							sourceMap: true,
							plugins: () => [autoprefixer]
						}
					},
					'resolve-url-loader',
					'sass-loader?outputStyle=compressed&sourceMap'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				use: [
					'file-loader?name=assets/[name].[ext]',
					'image-webpack-loader?bypassOnDebug'
				]
			},
			{
				test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
				use: 'file-loader?name=assets/[name].[ext]'
			}

		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist/**/*.*']),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			template: './src/pug/pages/index.pug',
			filename: 'index.html',
			chunks: ['js'],
			minify: {
				html5: true,
				collapseWhitespace: true,
				caseSensitive: true,
				removeComments: true
			}
		})
	]
};
