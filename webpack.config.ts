import path from 'path'
import * as Webpack from 'webpack'
import 'webpack-dev-server'
import HtmlPlugin from 'html-webpack-plugin'

const config: Webpack.Configuration = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: path.resolve(__dirname, './src/index.tsx'),

  output: {
    path: path.resolve(__dirname, './dist'),
    clean: true
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png'
    })
  ]
}

export default config