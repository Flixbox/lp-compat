// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Lucky Patcher Compatibility",
  tagline:
    "An incomplete & frequently updated list of apps that can be patched to get in-app purchases for free and remove ads",
  url: "https://flixbox.github.io",
  baseUrl: "/lp-compat/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  projectName: "flixbox.github.io/lp-compat",
  organizationName: "Flixbox",
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Flixbox/lp-compat/blob/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "LP-Compat",
        logo: {
          alt: "LP-Compat Logo",
          src: "img/logo.svg",
        },
        items: [
          { to: "/", label: "Compatibility list", position: "left" },
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/Flixbox/lp-compat",
            label: "GitHub",
            position: "right",
          },
          {
            label: "Discord",
            href: "https://discord.gg/RS5ddYf7mw",
            position: "right",
          },
          {
            type: "html",
            position: "right",
            value: `
            <a id="discord-login" href="https://discord.com/api/oauth2/authorize?client_id=1021002998069067777&redirect_uri=https%3A%2F%2Fflixbox.github.io%2Flp-compat%2F&response_type=token&scope=identify%20guilds%20guilds.members.read">
              Login
            </a>`,
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
