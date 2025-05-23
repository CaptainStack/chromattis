# [Chromattis](https://captainstack.github.io/chromattis/)

[![pages-build-deployment](https://github.com/CaptainStack/chromattis/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/CaptainStack/chromattis/actions/workflows/pages/pages-build-deployment)

Chromattis is a simple, fun, and challenging puzzle game by [Andre Stackhouse](https://captainstack.github.io/public-stackhouse/portfolio/). Do you have the brains to solve it?

![Homepage screenshot](https://captainstack.github.io/chromattis/chromattis-social-preview.png "Chromattis homepage screenshot")

This project was bootstrapped with [Vite](https://vite.dev) and [Redux](https://github.com/reduxjs/redux). Hosting done via [GitHub Pages](https://captainstack.github.io/chromattis/).

## How to play
1. Chromattis is played by tapping or clicking `Tiles` on the game `Board`.

2. Each `Tile` has a `Color` (also represented as a number).

3. Tapping or clicking a `Tile` changes the `Color` of one or more `Tiles` on the `Board`.

4. The goal of the game is to solve the puzzle by getting every `Tile` to share the same `Color`.

5. It is not possible to lose, but solving the puzzle in fewer moves is considered a higher score.

## Hints & strategies

Chromattis is a new kind of puzzle and can be counterintuitive to solve. While clicking `Tiles` randomly can help you get an intuitive feeling for how the game works, success comes from observing how different moves effect different `Tiles` and recognizing patterns.

1. `Tiles` cycle through `Colors` in a consistent cycle which matches their numeric values. 0 = `Red`, 1 = `Orange`, 2 = `Yellow`, 3 = `Green`, 4 = `Blue`, 5 = `White`. 

2. A `Tile` only ever advances by one color at a time.

3. You can move `Tiles` backwards through the `Color` cycle by right-clicking.

4. You can cancel a move by long-pressing or letting go of a click outside of the clicked/tapped `Tile`.

5. Start by trying to get certain parts of the `Board`, for instance the corners or the edges to the same `Color`.

6. Try to eliminate the number of `Colors` on the `Board` down to just two.

7. See if you can get those two `Colors` to be "three apart" in the `Color` cycle described in Hint #1 (e.g. `Red` & `Green` or `Yellow` & `White`). Since there exactly six Colors in the cycle these can be considered inverted values.

8. Try clicking on the same `Tile` in bursts of 3 to "invert" that set's colors.

## Chromattis Command Line Interface (CLI)
Chromattis comes with a built in command line interface which can be used from the browser developer tools (often accessed with F12 or Ctrl + i). Look for a "Console" tab. The CLI is made up of JavaScript functions loaded in `index.html` and therefore can be run directly from the console. Because they are JavaScript functions, all commands must be entered with open and close parenthesis `()`. Some functions take a parameter.

Below is a list of all available commands:

`help()` - displays all CLI commands.

`show_board()` - Prints the current state of the game board to the console.

`shuffle()` - Resets the board by shuffling, also sets movecount back to 0.

`press(index)` - Takes an integer corresponding to a Tile on the board. Triggers a press of that tile.

`reverse(index)` - Takes an integer corresponding to a Tile on the board. Triggers a reverse-press of that tile.

`preview(index)` - Takes an integer corresponding to a Tile on the board and prints all the tiles that pressing it would impact.

`undo()` - Undoes the last move taken - cannot be used twice in a row.

`next_level()` - Navigates the game to the next level if unlocked.

`previous_level()` - Navigates the game to the previous level.

`goto_level(index)` - Takes a level index and navigates the game to it.

`install()` - Installs Chromattis to your device. Requires Progressive Web Application (PWA) support.

# Developers
Chromattis is an open source project under the permissive MIT license. Those interested should feel empowered and encouraged to clone or fork the repository, experiment with changes, and to send in pull requests (see the Contributing to Chromattis section for more information).

## Dependencies
In order to run a development build of Chromattis you will have to have `nodejs` and `npm` installed.

Installing `git` is also recommended in order to clone the repository, track changes, and send in pull requests.

## Installation

1. `git clone https://github.com/CaptainStack/chromattis.git`
2. `cd chromattis`
3. `npm install`

## Running chromattis
To run Chromattis locally type the following command from the root directory.

$ ./chromattis> `npm start` (or npm run dev)

The game should now be accessible and playable in a web browser. If the game does not start automatically open a browser and go to `https://localhost:3000`.

## Development
Chromattis is a single page application (SPA) that runs entirely client-side within a web browser. It may be installed locally as a progressive web application (PWA).

1. `ReactJS` handles UI components and rendering.
2. `Redux` is used to manage all application state and state changes.
3. `CSS` with no additional frameworks or libraries is used to manage all styling.
4. `localstorage` is to store player progress persistently between sessions.

### Application structure

* `/` - the root directory contains config files as well as the project's readme and license. For project dependencies see `package.json`.
* `/src` - Location of most development files including React components, Redux reducers, CSS styles, and event handlers.
* `/public` - Store static assets here including the main application container `index.html`.
* `/build` - Generated by build process, files should not be modified by developer.
* `/src/components` - location for all React components
* `src/styles` - contains all additional CSS styles.

### Important files
* `index.html` - the main application container that the React app loads into.
* `index.jsx` - the JavaScript file which binds the React app to index.html.
* `actions.js` - The file which contains all JavaScript actions fired from event handlers or reducers.
* `events.js` - The file which contains all UI event listeners.
* `reducer.js` - The file which specifies all operations which modify the Redux state. All state management must be done via reducers defined in this file.
* `sw.js` - The service worker which handles application caching.
* `app.webmanifest` - the file which specifies metadata necessary to install Chromattis as a PWA.

### Deploying to GitHub Pages

Deployment is handled by the `gh-pages` package which specifies a deployment script in `package.json`. In order for the deployemnt to work, you will need to set up your GitHub repository to deploy via `GitHub Pages`. The branch which should be deployed should be called `gh-pages`.

The deployment script is:

`npm run deploy`

IMPORTANT - this deployment script will deploy your application as it currently stands on your local setup, it does not deploy from your main branch on GitHub. Always deploy from a clean branch instead of a working branch.

### Contributing to Chromattis

Chromattis has been to date the project of a single developer. As such, there is no currently defined contribution process other than to send a pull request.

However, before investing significant development time with hopes that your changes will be merged into the project, please consult with our [issues tracker](https://github.com/CaptainStack/chromattis/issues) and [milestones](https://github.com/CaptainStack/chromattis/milestones) to get a sense of what is being worked on and what the project's priorities are.

If you spot an issue you'd like to take on consider contacting the developer first to set expectations and create a plan of action.

Currently Chromattis makes no reveneue and there is no plan to incorporate paid contributors to the project.

### Donations ###

 If you'd like to support Chromattis's development financially you may donate to the project on [Open Collective](https://www.opencollective.com/public-stackhouse/projects/chromattis/donate?interval=month&amount=10&contributeAs=me). Your donation is helping to fund open source indie game development and is much appreciated.