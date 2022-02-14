const presets = ["next/babel"];
const plugins = [];

const isProd = process.env["NODE_ENV"] === "production";
const isDev = process.env["NODE_ENV"] === "development";

plugins.push(["styled-components", { ssr: true, displayName: isDev }]);

module.exports = { presets, plugins };
