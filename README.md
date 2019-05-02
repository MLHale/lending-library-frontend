# lending-library-frontend

This README outlines the details of collaborating on the lending library frontend application.

This project is a component of the lending-library-site-builds repository. It is recommended to follow the instructions from the lending-library-site-builds README so that development of this app can be coordinated with the lending-library-backend repository. Frontend functionality is dependent upon lending-library-backend.

## Application Functionality

The Frontend application allows users to:
* login to the website
* place items into their cart by itemtype and quantity
* place items into their cart by adding a package containing a group of itemtypes and respective quantities
* remove individual itemtype-quantities from their cart
* empty their cart
* place an order if sufficient items exist

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd lending-library-frontend`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)
