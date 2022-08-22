module.exports = function (api) {
  api.cache(true);
  return {
<<<<<<< HEAD
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel", 'react-native-reanimated/plugin'],
      },
=======
    presets: ['babel-preset-expo'],
    plugins: [ 'react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: ['react-native-paper/babel', ]
      },
      
>>>>>>> 2f6fd3470824b4213285032a836321615747b48e
    },
  };
};