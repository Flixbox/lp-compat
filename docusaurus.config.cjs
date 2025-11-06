// CommonJS config for Docusaurus to avoid ERR_REQUIRE_ESM when package.json uses "type": "module"

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const getDiscordLoginUrl = (client_id, redirect_uri) =>
  `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURI(
    redirect_uri
  )}&response_type=token&scope=identify%20guilds%20guilds.members.read`;

const config = {
  title: "Lucky Patcher Compatibility",
  tagline:
    "An inexhaustible list of apps frequently updated by user contributions which can be patched to get in-app purchases for free and remove ads",
  url: "https://flixbox.github.io",
  baseUrl: "/lp-compat/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  projectName: "flixbox.github.io/lp-compat",
  organizationName: "Flixbox",
  trailingSlash: false,

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.cjs'),
          editUrl: "https://github.com/Flixbox/lp-compat/blob/main/",
        },
        theme: {
          // use require.resolve for CJS
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
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
          value: `\n            <a id="discord-login" href="${getDiscordLoginUrl(
            "1021002998069067777",
            "https://flixbox.github.io/lp-compat/"
          )}">\n              Login\n            </a>`,
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },

  plugins: ["docusaurus-plugin-sass"],
};

module.exports = config;
