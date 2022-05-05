const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = ({ hash }) => [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['thread-loader', 'babel-loader']
  },
  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [require('autoprefixer')]
          }
        }
      },
      'resolve-url-loader',
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    ]
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [require('autoprefixer')]
          }
        }
      },
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  },
  {
    test: /\.(gif|png|jpe?g|svg)$/i,
    type: 'asset',
    generator: {
      filename: hash ? 'imgs/[name].[hash:5][ext]' : 'imgs/[name].[ext]'
    },
    parser: {
      dataUrlCondition: {
        maxSize: 200 * 1024
      }
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    type: 'asset',
    generator: {
      filename: hash ? 'fonts/[name].[hash:5][ext]' : 'fonts/[name].[ext]'
    },
    parser: {
      dataUrlCondition: {
        maxSize: 200 * 1024
      }
    }
  }
];
module.exports = rules;
