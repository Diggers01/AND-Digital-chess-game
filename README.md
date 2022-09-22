# Chess moves

Check if the chess moves are possible. Also have a webpage to test with interaction.
THe checks.js file is the script that will verify if the move is possible, all other files are related to the interface

## Installation

Copy files to local computer

## Usage

Open index.html in your local browser

## Interface
You can use the buttons or:
LEFT SHIFT to choose you starting point
SPACEBAR to choose you landing point
ENTER to execute the action an see if it is possible to make the move
BACKSPACE to reset the bored.
Select your piece on right hand side of the board

NOTE** One you click the starting point or landing point select a square on the board. The square selected will be highlighted

## Examples

If one get the checks.js files the they can call the following to test if the move is possible
Examples
canMove("Rook", "A8", "H8")
canMove("King", "D4", "E5")
canMove("Bishop", "A7", "G1")
canMove("Queen", "C4", "D6")
canMove("Knight", "C4", "A3")

NOTE** you can add a 4th parameter which is the colour of the piece you are moving.