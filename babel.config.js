// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"]
// };

// babel.config.js
module.exports = {
  presets: [
    ["@vue/app", {
      useBuiltIns: "entry",
    }],
  ]
};