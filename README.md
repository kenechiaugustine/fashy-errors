# Fashy Errors

Fashy Errors is an npm package that provides a simple way to handle errors in your Node.js / Express application.

# Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install fashy-errors
```

# Usage

## Simple Usage (Enable _fashy-errors_ Global Error Handler Middleware)

To use Fashy Errors as the global error handler middleware in your Express application, you can simply import the _GlobalErrorHandler_ function from the package and use it as middleware:

```javascript
const express = require('express');
const { GlobalErrorHandler } = require('fashy-errors');

const app = express();

app.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Hello world',
  });
});

// Global Error Handler Middleware
app.use(GlobalErrorHandler);

app.listen(4000, () => console.log(`Server running`));
```

## Using Custom Errors

You can also create and use custom errors in your application by importing the _CustomError_ class from the package and throwing a new error with it:

```javascript
const { CustomError } = require('fashy-errors');

app.all('*', (req, res, next) => {
  // Custom Error Message
  throw new CustomError('Page not found !!!', 404);
});
```

## Contribution

Contributions to this project are welcome 🤗. Feel free to open issues and submit pull requests.

## License

Fashy Errors is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php). See the LICENSE file for more information.

## Author

Fashy Errors is developed by [Kenechukwu Arionye](https://github.com/kenechiaugustine). You can contact me at [kenechiaugustine@gmail.com](mailto:kenechiaugustine@gmail.com)
