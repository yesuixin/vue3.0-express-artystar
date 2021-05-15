/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2020-11-20 18:38:22
 * @,@LastEditTime: ,: 2020-11-20 21:29:00
 * @,@LastEditors: ,: Please set LastEditors
 * @,@Description: ,: In User Settings Edit
 * @,@FilePath: ,: \client\postcss.config.js
 */
module.exports = {
    plugins: [
      require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})// 自动添加css前缀
    ]
  }