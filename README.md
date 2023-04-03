# wordict

## Description
Wordict is a hybrid dictionary and word game application accompanied by an API and a database

Runs on Node.js

## Installation

1. Clone the repo from https://gitlab.com/dawson2223/620-w23/s01/TeamF/wordict.git

1. Create two .env files, one in the root directory and one in the `java/population_app` directory. Add url to mongoBD named `ATLAS_URI` to both.

1. Add the absolute path to the `dict` directory file to the root .env file as `CSV_PATH` (for java test you also need to add the absolute path to the `test.csv` file to the .env file in the `java/population_app` directory as `TEST_PATH`).  


1. Run java population script to populate DB

1. Go to https://console.cloud.google.com/ and create a new project in order to obtain a secret string and the google client id. Save them in root .env file as `SECRET` and `REACT_APP_GOOGLE_CLIENT_ID` respectively. Additionally create a third .env file in the client directory and save ONLY `REACT_APP_GOOGLE_CLIENT_ID` in it.

1. Run `npm run build` in the root of the project

1. Run `npm start` in the root of the project

## Project status
This app is currently a work in progress and more features are to be implemented

## Feature and Known Bugs

### Features
- Simple game of Wordle
- Search page for word definitions
- API to query our database of words
- Find words with specific length
- Test coverage
- Java population/seeding script
- Multiplayer Wordle game using web sockets
- Start sequence to the multiplayer Wordle game
- Profile page view/edit with get api
- Favorite words in profile leading to dictionary
- Visual accessibility features for Wordle game

### Bugs/Issues
- Any String of characters is accepted by the game as a guess (doesn't check if it's a real word)
- Profile editing shifts the entire screen when modifying the user name

## Authors and acknowledgment
Nolan Ganz

Jeremy Tang

Mark Benedict Agluba

Grigor Lyubomirov Mihaylov

Jacky Tat

Inspired by Wordle
