// The Chromattis Command Line Interface (CLI) is implemented in JavaScript
// and is designed to be run in the console in the browser developer tools
// The scripts are separate from the React application and do not have access
// to the application scope. All interactions between the CLI and the React
// application happen via presses of hidden buttons simulated via JavaScript.
// These hidden buttons are bound to the same React event handlers as the visible UI.

let man, help, commands;
man = help = commands = function() {
  console.log(`
    Welcome to the Chromattis Command Line Interface (CLI)
    All commands are JavaScript functions and must be invoked as function calls complete with open and close parenthesis ()

    Below is a list of all available commands:

    shuffle() - reset the board by shuffling, also sets movecount back to 0.
    help() - displays all CLI commands.
    press(index) - Takes an integer corresponding to a tile on the board. Triggers a press of that tile.
  `);
}

const press = (index) => {
  document.getElementById(`press_${index}`).click();
}

const reverse = (index) => {
  document.getElementById(`reverse_${index}`).click();
}

const preview = (index) => {
  document.getElementById(`preview_${index}`).click();
}

const shuffle = () => {
  document.getElementById('reset').click();
}

help()
