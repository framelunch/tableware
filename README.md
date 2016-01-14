# tableware project

This project is environment to develop Javascript Library by FRAME LUNCH.   
Now we exports below. 

* zaru: You can use canvas very easy.
* obon: Animation everything.

## Importance Technology
* [Gulp](http://gulpjs.com/)
* [Webpack](https://webpack.github.io/)
* [EJS](http://www.embeddedjs.com/)
* [Sass](http://sass-lang.com/)

## Directory Layout
    .
    |- /_dist/            # exports javascript library
    |- /assets/           # assets files about img, font..
    |- /common/           # common files about sass, ejs..
    |- /ejs/              # ejs files
    |- /gulp/         
    |    |- /config.js    # configuration of gulp
    |    |- /tasks/       # gulp tasks
    |    |- /
    |- /js/               # js files. these are as entry point of webpack. 
    |- /lib/              # javascript library
    |- /sass/             # sass files
    |- .gitignore
    |- gulpfile.js
    |- bower.json
    |- package.json
    |- README.md

## Getting Started

    npm install
    bower install
    gulp
    
Then browser will open. and can use auto sync.   
And exports js library for distribution.   
Command is below.

    gulp dist

## Updates
* v0.1.0: first commit.