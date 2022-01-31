// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');
const webpack = require('webpack');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'pdfme',
  url: 'https://pdfme.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'pdfme',
  projectName: 'pdfme',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // TODO 変更する
          editUrl: 'https://github.com/hand-dot/pdfme-beta/tree/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        readme: 'none',
        sidebar: {
          position: 3,
        },
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
      },
    ],
    function myPlugin() {
      return {
        name: 'custom-docusaurus-plugin',
        configureWebpack(config, isServer) {
          const fontRule = config.module.rules.find(
            (r) => r.test.toString() === /\.(woff|woff2|eot|ttf|otf)$/.toString()
          );
          // Remove ttf rule
          fontRule.test = /\.(woff|woff2|eot|otf)$/;

          const newConfig = {
            plugins: [
              new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
              }),
            ],
            module: {
              rules: [
                // Add ttf rule. Because we use Helvetica.ttf as data from src/libs/helper #getDefaultFont.
                {
                  test: /\.ttf$/,
                  use: ['url-loader'],
                },
                // Add svg rule for src/
                {
                  test: /\.svg$/,
                  use: ['url-loader'],
                },
              ],
            },
          };
          if (isServer) {
            newConfig.resolve = {
              alias: {
                canvas: false,
              },
            };
          }

          return newConfig;
        },
      };
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
      hideOnScroll: true,
      navbar: {
        title: 'pdfme(BETA)',
        items: [
          {
            type: 'doc',
            docId: 'getting-started',
            position: 'right',
            label: 'Docs',
          },
          {
            to: '/template-design',
            position: 'right',
            label: 'Template Design',
          },
          {
            to: '/help',
            position: 'right',
            label: 'Help',
          },
          {
            href: 'https://github.com/hand-dot/pdfme-beta',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'API',
                to: '/docs/api',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Template Design',
                to: '/template-design',
              },
              {
                label: 'Help',
                to: '/help',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/hand-dot/pdfme-beta',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} pdfme`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;