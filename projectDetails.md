# Project 2 GIF Me A Laugh
-----------------------
A game where the player(s) add a caption to a randomly provided giphy image, funny or smart, to a giphy image.

## Wireframes
![alt text](https://git.generalassemb.ly/Yamil/Project-2/blob/master/wireframes.JPG)

## PsuedoCode
* Enter a name before starting the game (else one is given by default).
* Player must type in the textbox which will be saved as a string when submitted.
* Player must then wait for all other Players to finish their submissions.
* Player then get to see all of the captions one by one for a period of time.
* Player can vote for their favorite caption of the bunch (can't vote for self).
* Once votes are all assigned, show the round results with the vote points given out.
* Player is finally given an option to either continue playing or start fresh (Keep part of the database entries or erase all of it).

## Database Table

ID === SERIAL PRIMARYKEY 		</br>
NAME === VARCHAR			</br>
CAPTION === VARCHAR			</br>
VOTES === INTEGER			</br>
TOTAL === INTEGER			</br>
POSTED === BOOLEAN			</br>

| ID |  Name  | Caption                | Votes | Total | Posted |
|:--:|:------:|:----------------------:|:-----:|:-----:|:------:|
|  1 | John   | Batteries not included |   2   |   4   |  True  |
|  2 | Nathan | I need an adult!       |   1   |   2   |  True  |
|  3 | Cathy  | Shaken not stirred     |   0   |   1   |  True  |
|  4 | Kris   | Come on Snake Eyes!    |   1   |   2   |  False |

## User Stories
* As a user I like to be able to hide my working caption from others.
* As a user I like to be able to see what player I am.
* As a user I like to have a random image displayed everytime I play.
* As a user I like the image to be the same for all 4 players.
* As a user I like to not be able to vote for my own captions.
* As a user I like to see my points from voting this round and in total.
* As a user I like to have the option to play again or start over.		

Trello Board: https://trello.com/b/v8MvbDvM/gif-me-a-laugh

## Technologies used/npm Modules
* HTML, CSS & Javascript - Building blocks used to create GIF Me A Lab using style and logic.

* Giphy API - Natively embed all the best features of the world's largest and most powerful GIF library into your app.
	* Link: https://github.com/Giphy/GiphyAPI

* NPM - A package manager for javascript.

* Express - Express is a fast, un-opinionated, minimalist web framework. It provides small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.

* Nodemon - It is a simple monitor script for use during development of a node.js app, It will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

* Jquery - jQuery is a fast, small, and feature-rich JavaScript library.

* Socket - Its a node.js realtime framework server.

* Debug - Debug is a tiny node.js debugging utility modelled after node core's debugging technique.
