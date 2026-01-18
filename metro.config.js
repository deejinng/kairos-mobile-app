// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');

// const config = getDefaultConfig(__dirname)

// module.exports = withNativeWind(config, { input: './global.css' })
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add this line to handle the .ttf font files
config.resolver.assetExts.push("ttf");

module.exports = withNativeWind(config, { input: "./global.css" });
