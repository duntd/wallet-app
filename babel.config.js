// babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            apis: './src/apis',
            assets: './src/assets/',
            components: './src/components',
            utils: './src/utils',
            hooks: './src/hooks',
            common: './src/common',
            screens: './src/screens',
            styles: './src/styles',
            store: './src/store',
            json: './src/json',
            const: './src/constants',
            features: './src/features',
            routes: './src/routes',
            auth: './src/auth',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'NODE_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
