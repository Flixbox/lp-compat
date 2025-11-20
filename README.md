# Overview of LP Compatibility

[![deploy](https://github.com/Flixbox/lp-compat/actions/workflows/deploy.yml/badge.svg)](https://github.com/Flixbox/lp-compat/actions/workflows/deploy.yml)
[![uptime](https://img.shields.io/uptimerobot/ratio/m792717344-6d627ad71592aa371175f9d6?style=flat&logo=github)](https://stats.uptimerobot.com/kPYMYIk88k)

[![Maintainability](https://qlty.sh/gh/Flixbox/projects/lp-compat/maintainability.svg)](https://qlty.sh/gh/Flixbox/projects/lp-compat)

This repository contains a website and Discord bot that help users determine which apps can be patched with Lucky Patcher. The website, which can be accessed at https://flixbox.github.io/lp-compat/, displays a list of compatible apps. The list can be added to on the Discord server below using a bot or on edited on the website (requires logging on with Discord).

If you have any questions or want to discuss the project with others, you can use the unofficial subreddit and Discord server. These platforms are not affiliated with the developer of Lucky Patcher (ChelpuS), but they provide a space for users to share information and ideas. To access the subreddit or Discord server, click on the following buttons:

[![discuss-reddit](https://img.shields.io/static/v1?label=Discuss&message=on%20Reddit&color=FF4500&style=flat&logo=reddit)](https://www.reddit.com/r/luckypatcher/)
[![discuss-discord](https://img.shields.io/static/v1?label=Discuss&message=on%20Discord&color=7289DA&style=flat&logo=discord)](https://discord.gg/RS5ddYf7mw)

- Uses GitHub Pages to host the main site
- Uses Cloudflare to host the main backend
- Uses Vercel to host the play store scraper, since Cloudflare doesn't like Node.js



## Setting up the project

To get started with this project, you will need to install the following pieces of software on your computer: 

- _fnm_ (including terminal setup)
- _bun_
- _pnpm_

Open a terminal or command prompt window and navigate to the root directory of this project.

Run the following command to install the necessary dependencies for the project:

`bun i`

Run the following command to start the development server:

`bun start`

That's it! The project should now be set up and running on your local development environment.

Worker setup (If you wanna run the cloudflare worker locally):

`cd .\packages\app-list-service\`

`bunx wrangler secret put GITHUB_TOKEN`

## Adding a new app to the list

You can use the ![discord-bot](https://img.shields.io/static/v1?label=Discord%20bot%20on&message=Railway&color=blueviolet&style=flat&logo=railway) to add the app to the list. [![discuss-discord](https://img.shields.io/static/v1?label=Discuss&message=on%20Discord&color=7289DA&style=flat&logo=discord)](https://discord.gg/RS5ddYf7mw)

Alternatively, you can log in with Discord on the website to add an app. After logging in, options to add and edit apps will be shown.

# Handling Issues and Pull Requests

This project uses GitHub's issue tracker and pull request feature to track and resolve issues and to review and merge contributions from the community.

## Reporting Issues

If you encounter a problem while using this project, or if you have an idea for a new feature or improvement, you can open a new issue to let us know. To do this, follow these steps:

1. Navigate to the [issue tracker](https://github.com/Flixbox/lp-compat/issues) for this project.
2. Click on the "New issue" button.
3. Fill out the form with a clear and concise description of the issue or suggestion. Be sure to include any relevant details, such as error messages or steps to reproduce the issue.
4. Click on the "Submit new issue" button to open the issue.

## Submitting Pull Requests

If you want to contribute code or other changes to this project, you can submit a pull request (PR) for review and potential inclusion in the project. To do this, follow the steps in either of the following methods below.

The project maintainers will review your PR and provide feedback or merge it if it meets the project's standards.

### Easy method

- Choose the repo you want to make a PR for
- Click on the page you want to edit
- Select the edit button (the pencil icon button) and make your changes

![](static/img/github_file_edit_button.png)

- Select **Fork this repository** and begin making your changes

![](static/img/github_fork_repo_button.png)

- Select **Commit changes...** once you are finished
- Select **Propose changes** (The commit message and extended description are optional)
- Select **Create pull request** on the next page
- Select **Create pull request** again on the next page to create a PR

### Method 2: github.dev web editor

- Choose the repo you want to make a PR for
- On the same browser tab, you can open the [github.dev](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) in the following ways:<br>

1. To open the repository in the same browser tab, press **the period key ( . )** while browsing any repository or pull request on GitHub
2. To open the repository in a new browser tab, press **Shift + . (>)**
3. Change the URL from "github.com" to "github.dev"
4. When viewing a file, select the dropdown menu on the right next to the pencil button (Edit this file) and click "github.dev"

- In the web editor, look to the left hand side to see "Source Control" view along with the explorer panel which displays all of the repo's files
- Navigate to the file of your choice and click on them to open a tab and begin typing. If the tab in on preview, simply double click to edit in markdown.
- Once you are done, scroll down the Source Control view to see the **Commit & Push** button. Type in the message textbox pertaining what you did (This is mandatory), then press the aforementioned button below.
- If it is done properly, a popup will appear asking if you want to fork the project you are trying to make changes to. Press **Fork Repository**.
- Another popup will appear, asking you to provide a new branch name. Type in the name you want then either Press **Enter** to confirm, or **Escape** to cancel.
- Once this is done, a popup will appear asking whether you want to switch to your fork to continue making changes. You can either press **Switch to Fork** to continue, or **Cancel** to close the popup.
- If you're ready to make a pull request, press **Cancel** then navigate to your fork in the browser view and you will see a line above your fork that should say "**(Your branch name) had recent pushes 1 minute ago**". Press **Compare & pull request**
- If this line doesn't appear, you can navigate to your branch by pressing **(number) branches** which is next to the "**main**" dropdown menu button to move to another page in the same tab that displays all your branches, to which then you may press **New pull request**
- This will take you to another page on the same tab where it will begin comparing changes to see whether the base repository and the head repository - that being your fork - can be merged. If they are able to merge, you can now press **Create Pull Request**

### Method 3: Traditional

- Choose the repo you want to make a PR for
- [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repo to your own account
- Install [Git](https://git-scm.com/) and [Github Desktop](https://desktop.github.com/) (Git is a prerequisite for the next steps, and Github Desktop will make the subsequent steps easier)
- Clone the repo to be stored locally. To do this, open a normal terminal or command prompt window and run the following command:<br>
  `git clone https://github.com/**<your-username>**/lp-compat.git`<br>
  Example: `git clone https://github.com/**rarelygoeshere**/lp-compat.git`
- Once this is done, locate where the repo's folder is saved. Use [Everything by Voidtools](https://www.voidtools.com/) to hasten this search
- Open Github Desktop.
- Add the local repo to Github Desktop. You can start by either clicking **Add an existing Repository from your hard drive** or navigate to the File button at the top leftmost, then click it to open a drop-down list, then choose **Add local repository...**. Moreover, you can quickly use the hotkey `Ctrl + O` to open the Add local repository window
- Press **choose...** to start locating your repo folder manually, or copypaste the address of the repo folder to the local path textbox
- Press **Add repository**
- Once the process is completed, press "Show in Explorer", or the hotkey `Ctrl + Shift + D` to view the files of your repository in Explorer
- Select the files you want to change and open with the editor of your choice normally([Notepad++](https://notepad-plus-plus.org/) is a good recommentation)
- Once you saved the changes you made, Github Desktop will display the changes on its window for you to review. If you found everything to be satisfactory, then press **commit to main**
- Afterward, if you are satisfied with what you've changed, press **Push Origin**
- Nagivate to your browser and click the forked repo in your account, and press **Contribute**, then press **Open pull request**.
- Add a title and/or description to your pull request, then press **Create pull request**.

## Star History

<a href="https://star-history.com/#Flixbox/lp-compat&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Flixbox/lp-compat&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Flixbox/lp-compat&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Flixbox/lp-compat&type=Date" />
  </picture>
</a>
