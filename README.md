# Overview of LP Compatibility
[![deploy](https://github.com/Flixbox/lp-compat/actions/workflows/deploy.yml/badge.svg)](https://github.com/Flixbox/lp-compat/actions/workflows/deploy.yml)
[![uptime](https://img.shields.io/uptimerobot/ratio/m792717344-6d627ad71592aa371175f9d6?style=flat&logo=github)](https://stats.uptimerobot.com/kPYMYIk88k)

[![maintainability](https://img.shields.io/codeclimate/maintainability/Flixbox/lp-compat?style=flat&logo=code%20climate)
![issues](https://img.shields.io/codeclimate/issues/Flixbox/lp-compat?style=flat&logo=code%20climate)
![tech-debt](https://img.shields.io/codeclimate/tech-debt/Flixbox/lp-compat?style=flat&logo=code%20climate)
](https://codeclimate.com/github/Flixbox/lp-compat)

This repository contains a website and Discord bot that help users determine which apps can be patched with Lucky Patcher. The website, which can be accessed at https://flixbox.github.io/lp-compat/, displays a list of compatible apps. The Discord bot allows users to add apps to the list without editing the code directly.

If you have any questions or want to discuss the project with others, you can use the unofficial subreddit and Discord server. These platforms are not affiliated with the developer of Lucky Patcher (ChelpuS), but they provide a space for users to share information and ideas. To access the subreddit or Discord server, click on the following buttons:

[![discuss-reddit](https://img.shields.io/static/v1?label=Discuss&message=on%20Reddit&color=FF4500&style=flat&logo=reddit)](https://www.reddit.com/r/luckypatcher/)
[![discuss-discord](https://img.shields.io/static/v1?label=Discuss&message=on%20Discord&color=7289DA&style=flat&logo=discord)](https://discord.gg/RS5ddYf7mw)


## Setting up the project
To get started with this project, you will need to install two pieces of software on your computer: *Node.js* and *yarn*.

1. Visit the [Node.js](https://nodejs.org/) website and click on the "Download" button. Follow the prompts to install *Node.js* on your computer.
2. Once *Node.js* is installed, visit the [yarn](https://yarnpkg.com/) website and follow the instructions to install *yarn* on your computer.
3. Now that you have both *Node.js* and *yarn* installed, open a terminal or command prompt window and navigate to the root directory of this project.
4. Run the following command to install the necessary dependencies for the project:
   1. ``yarn``
5. Run the following command to start the development server:
   1. ``npm run start``

That's it! The project should now be set up and running on your local development environment.

## Adding a new app to the list
To add a new app to the list, you will need to edit the "apps.json" file located in the "static/compat-data" directory of the project.

1. Open the "apps.json" file in a text editor.
2. Add the new app to the file using the following format:
```json
{
  "packageName": "com.example.app",
  "name": "Example App",
  "compatible": true,
  "features": [
    "warning::IAP patch only works on version 4.2; download APK on APKPure"
  ]
}
```
3. Save the file and close the text editor.
4. If the app you added is completely new (i.e. its data has not yet been scraped from the Play Store), the page may crash when you try to view it. You can either wait for the continuous integration (CI) process to scrape the data for you (if you have checked in your changes), or you can run the following command to scrape the data manually:
   1. ``npm run scrape``
5. To add custom features to the app, use the following syntax: 
   1. ``<color>::<feature text>``. 
     - For example:
       1. ``warning::IAP patch only works on version 4.2; download APK on APKPure.`` (*Make sure not to include any commas in the feature list, as it may cause issues with the Discord regex.*)
6. To check that the app is being shown correctly, run the following command:
   1. ``npm run start``

Alternatively, you can use the Discord bot to add the app to the list without having to edit the code directly:

![discord-bot](https://img.shields.io/static/v1?label=Discord%20bot%20on&message=Railway&color=blueviolet&style=flat&logo=railway)

# Handling Issues and Pull Requests
This project uses GitHub's issue tracker and pull request feature to track and resolve issues and to review and merge contributions from the community.

## Reporting Issues
If you encounter a problem while using this project, or if you have an idea for a new feature or improvement, you can open a new issue to let us know. To do this, follow these steps:

1. Navigate to the issue tracker for this project.
2. Click on the "New issue" button.
3. Fill out the form with a clear and concise description of the issue or suggestion. Be sure to include any relevant details, such as error messages or steps to reproduce the issue.
4. Click on the "Submit new issue" button to open the issue.

## Submitting Pull Requests
If you want to contribute code or other changes to this project, you can submit a pull request (PR) for review and potential inclusion in the project. To do this, follow these steps:

1. Choose the repo you want to make a PR for<br><br>
2. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repo to your own account<br><br>
3. Install [Git](https://git-scm.com/) and [Github Desktop](https://desktop.github.com/) (Git is a prerequisite for the next steps, and Github Desktop will make the subsequent steps easier)<br><br>
4. Clone the repo to be stored locally. To do this, open a normal terminal or command prompt window and run the following command:<br><br>
```git clone https://github.com/**<your-username>**/lp-compat.git```<br><br>
Example: ```git clone https://github.com/**rarelygoeshere**/lp-compat.git```<br><br>
5. Once this is done, locate where the repo's folder is saved. Use [Everything by Voidtools](https://www.voidtools.com/) to hasten this search<br><br>
6. Open Github Desktop.<br><br>
7. Add the local repo to Github Desktop. You can start by either clicking "Add an existing Repository from your hard drive" or navigate to the File button at the top leftmost, then click it to open a drop-down list, then choose "Add local repository...". Moreover, you can quickly use the hotkey ```Ctrl + O``` to open the Add local repository window<br><br>
8. Press "choose..." to start locating your repo folder manually, or copypaste the address of the repo folder to the local path textbox<br><br>
9. Press "Add repository"<br><br>
10. Once the process is completed, press "Show in Explorer", or the hotkey ```Ctrl + Shift + D``` to view the files of your repository in Explorer<br><br>
11. Select the files you want to change and open with the editor of your choice normally([Notepad++](https://notepad-plus-plus.org/) is a good recommentation)<br><br>
12. Once you saved the changes you made, Github Desktop will display the changes on its window for you to review. If you found everything to be satisfactory, then press "commit to main"<br><br>
13. Afterward, if you are satisfied with what you've changed, press "Push Origin"
14. Nagivate to your browser and click the forked repo in your account, and press "Contribute", then press "Open pull request".
15. Add a title and/or description to your pull request, then press "Create pull request".
The project maintainers will review your PR and provide feedback or merge it if it meets the project's standards.
