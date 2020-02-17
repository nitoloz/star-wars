# Star Wars
![Fild Details](/docs/film_details.png)

## Task
Create a single page “Star Wars” application using [SWAPI](https://swapi.co/). 

### Business requirements: 
* Scenario: Show home page 
  * When the user opens the application 
  * Then the user sees the list of “Star Wars” movies
 
* Scenario: Navigate to movie details page from home page 
  * Given the user opened the home page 
  * When the user clicks on a movie name 
  * Then the user is redirected to the movie details page 

* Scenario: Show movie details page 
  * When the user opened the movie details page 
  * Then the movie title, producer, director and release date are shown 
  * And the movie opening crawl is shown 
  * And the list of characters is shown 

* Scenario: Navigate to character details page from movie details page 
  * Given the user opened the movie details page 
  * When the user clicks on the character name 
  * Then the user is redirected to the character details page 

* Scenario: Show character details page 
  * When the user opened the character details page 
  * Then the character personal data is shown 
  * And the list of character movies is shown 

* Scenario: Navigate to movie details from character details page 
  * Given the user opened the character details page 
  * When the user clicks on the movie name 
  * Then the user is redirected to the movie details page 
  
### Technical requirements: 
1. Use Angular 
2. Use Angular Routing & Navigation 
3. Show spinner during loading the data 
4. Use Bootstrap, Angular Material or any other library to set up basic styles 
5. Use any other libraries if you need them 

Would be a plus: 
1. Avoid extra requests: don’t request the data from API if you already have loaded it 
2. Use NgRx or similar libraries for building reactive application 
3. Use private repository if possible

## Solution
| | |
|:-------------------------:|:-------------------------:|
|<img width="1604" alt="Films list" src="/docs/films_list.png">  Films list |  <img width="1604" alt="Film details" src="/docs/film_details.png"> Film details |
|<img width="1604" alt="Characters list" src="/docs/characters_list.png"> Characters list |  <img width="1604" alt="Character details" src="/docs/character_details.png"> Character details |

## Development

### Technologies
 Project is built using following frameworks and libraries:
 * angular v8.2.4;
 * angular/material v8.2.3;
 * rxjs v6.4.0;
 * angular-cli-ghpages: v0.6.2;
 
### Install and run

In order to install all dependencies run `npm install` from the root folder (where `package.json` is stored).
After that run `npm run start` to start a development server and open `http://localhost:4200/` in browser.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deploy

Run `npm run deploy` to deploy the project to Github pages.
