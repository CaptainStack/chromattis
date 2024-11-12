// The Chromattis Command Line Interface (CLI) is implemented in JavaScript
// and is designed to be run in the console in the browser developer tools
// The scripts are separate from the React application and do not have access
// to the application scope. All interactions between the CLI and the React
// application happen via presses of buttons (sometimes hidden) simulated via JavaScript.
// These buttons are bound to the same React event handlers as the visible UI.

let man, help, commands;
man = help = commands = function() {
  console.log(`
Welcome to the Chromattis Command Line Interface (CLI)

All commands are JavaScript functions and must be invoked as function calls complete with open and close parenthesis ()
Every Tile has an ID starting with the first Tile in the upper left at 0, and going up by one with each Tile from there.

Below is a list of all available commands:

help() - displays all CLI commands.

show_board() - Prints the current state of the game board to the console.
shuffle() - Resets the board by shuffling, also sets movecount back to 0.

press(index) - Takes an integer corresponding to a Tile on the board. Triggers a press of that tile.
reverse(index) - Takes an integer corresponding to a Tile on the board. Triggers a reverse-press of that tile.
preview(index) - Takes an integer corresponding to a Tile on the board and prints all the tiles that pressing it would impact.
undo() - Undoes the last move taken - cannot be used twice in a row.

next_level() - Navigates the game to the next level if unlocked.
previous_level() - Navigates the game to the previous level.
goto_level(index) - Takes a level index and navigates the game to it.

install() - Installs Chromattis to your device. Requires Progressive Web Application (PWA) support.
  `);
}

const press = (index) => {
  document.getElementById(`press_tile_${index}`).click();
}

const reverse = (index) => {
  document.getElementById(`reverse_tile_${index}`).click();
}

const preview = (index) => {
  document.getElementById(`preview_tile_${index}`).click();
}

const shuffle = () => {
  document.getElementById('reset_game').click();
}

const install = () => {
  document.getElementById('install').click();
}

const next_level = () => {
  document.getElementById('next_puzzle_button').click();
}

const previous_level = () => {
  document.getElementById('previous_puzzle_button').click();
}

const goto_level = (index) => {
  document.getElementsByClassName('level-navigation-button')[index].click();
}

const show_board = () => {
  document.getElementById('show_board').click();
}

const undo = () => {
  document.getElementById('undo').click();
}

help()
