# Spork

> Pithy project description

## Team

  - __Product Owner__: Gerrit Yntema
  - __Scrum Master__: Sondra Silverhawk
  - __Development Team Members__: Nick Echols, Sivaguru Periyasamy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements
[npm](https://www.npmjs.com/)

[nodemon](https://github.com/remy/nodemon)

[forever](https://github.com/foreverjs/forever)

## Development

### Installing Dependencies

From within the project directory:
```sh
npm install -g nodemon
npm install -g forever
npm install
```

### Tasks

Run tests
```sh
npm tests
```
See "Running below for info on running in various environments"

## Running

Run in development mode using nodemon and webpack middleware:
```sh
npm start
```

Build files into ``dist`` folder for production
```sh
npm run build
```
Run in production mode on ports 80 (http) & 443 (https)
```sh
npm run prod
```
Run in production mode on ports 8080 & 8443 (ports below 1024 are reserved for root user)
```sh
npm run localprod
```
Build and run on 80 & 443 
```sh
npm run deploy
```
Build and run on 8080 & 8443 
```sh
npm run localdeploy
```
use [forever](https://github.com/foreverjs/forever) to run on remote server (NOTE: this contains specific file structures from our production server, you may have to change it)
```sh
npm run forever
```
build and run forever (see above)
```sh
npm run deployforever
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

