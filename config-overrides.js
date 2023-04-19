


const path = require('path');
const fs = require('fs');
const {
  override,
  fixBabelImports,
  addWebpackPlugin,
} = require('customize-cra');
const CopyPlugin = require('copy-webpack-plugin');

const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const webpackObfuscator = require('webpack-obfuscator');

const version='v1.0'


paths.appBuild = path.join(
  path.dirname(paths.appBuild),
  `build/`
);

paths.publicUrlOrPath = '/';
const configResult = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true, //自动打包相关的样式 默认为 style:css
        }),


 
  (config) => {
    const isEnvDevelopment = config.mode === 'development';
    const isEnvProduction = config.mode === 'production';
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    config.output = {
      ...config.output,
      filename: isEnvProduction
        ? version + '/js/[name].[contenthash:8].js'
        : isEnvDevelopment && version + '/js/bundle.js',
      chunkFilename: isEnvProduction
        ? version + '/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && version + '/js/[name].chunk.js',
    };
    config.plugins[5].options.filename =
      version + '/css/[name].[contenthash:8].css';
    config.plugins[5].options.chunkFilename =
      version + '/css/[name].[contenthash:8].css';

    // 删除pwa serverWorker相关内容
    config.plugins.splice(8, 1);
    // 删除asset-manifest.json相关内容
    config.plugins.splice(6, 1);
  

    return config;
  }
);

module.exports = configResult;
