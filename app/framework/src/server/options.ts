// tslint:disable-next-line: no-var-requires
const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'framework',
  frameworkPresets: [require.resolve('./framework-preset-framework.js')],
};
