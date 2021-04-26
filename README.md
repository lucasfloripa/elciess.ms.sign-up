[![Build Status](https://travis-ci.org/lucasfloripa/elciess.ms.sign-up.svg?branch=main)](https://travis-ci.org/lucasfloripa/elciess.ms.sign-up)
[![Coverage Status](https://coveralls.io/repos/github/lucasfloripa/elciess.ms.sign-up/badge.svg)](https://coveralls.io/github/lucasfloripa/elciess.ms.sign-up)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# Elciess Auth-Controll API
##### Tecnologies: Typescript, Node, Express, Jest, MongoDB, Swagger, Travis, Coveralls

<br />

### Why i made this project ? What is your purpose ?
Its an API to register users and to authenticate them in any other Elciess services.

### What this project have to show to you ?
TDD, Clean Architeture, Clean Code, SOLID Principles, Design Patterns and so on.

### Functional requirements
1. [Sign-Up](./requirements/signup.md)
2. [Login](./requirements/login.md)

### About the Structure
* Src
  * Presentation => Request handling. Points to Domain Layer.
    * controllers => handlers
    * errors => custom errors for responses
    * helpers => layer helpers
    * protocols => layer protocols
  * Domain => Bussiness rules. Final layer of the structure.
    * usecases => bussiness rule protocols
  * Data => Bussiness rules implementations. Points to Domain Layer.
    * protocols => implementation dependencies protocols 
    * usecases => implementation cases
  * Infra => Implementation oriented to frameworks. Points to Data Layer.
    * cryptography 
    * db
    * validators
  * Main => Project composer.
    * adapters => framework adapters
    * config => project configs
    * docs => swagger documentation
    * factories => project classes composer
    * middlewares => project middlewares
    * routes => project routes
  * Utils => Project utilities. Points to Presentation Layer.
    * protocols => utilities protocols 
    * validators => validation helper
* Tests => Integration and unit file tests.
* Requirements => Function requirement docs.