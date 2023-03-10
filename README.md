# wordict

## Description
Wordict is a hybrid dictonary and word game application accompanied by an API and a database

Runs on Node.js

## Installation

1. Clone the repo from https://gitlab.com/dawson2223/620-w23/s01/TeamF/wordict.git

1. Create .env with url to mongoBD named `ATLAS_URI`

1. Add the absolute path to the `dictionary.csv` file to the .env as `SVG_PATH` (for java test you also need to add the absolute path to the `test.csv` file to the .env in the java/population_app fodler as `TEST_PATH`)

1. Run java population script to populate DB

1. Run `npm run build` in the root of the project

1. Run `npm start` in the root of the project

## Project status
This app is currently a work in progress and more features are to be implemented

## Feature and Known Bugs

### Features
- Simple game of wordle
- Search page for word definitions
- API to query our databse of words
- Find words with specific length

### Bugs/Issues
- Any String of charecters is accepted by the game as a guess (doesn't check if it's a real word)
- Lacking a display for the definition of a guessed word
- Currently working with mock data
- Tests use actual db instead of mocking it

## Authors and acknowledgment
Nolan Ganz

Jeremy Tang

Mark Benedict Agluba

Grigor Lyubomirov Mihaylov

Jacky Tat

Inspired by Wordle
