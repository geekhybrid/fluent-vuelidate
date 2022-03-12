const devPresets = ['@vue/babel-preset-app'];
const buildPresets =[['@babel/preset-env', {targets: {node: 'current'}}]];
module.exports = {
  presets: buildPresets,
};
