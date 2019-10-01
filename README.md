# WP API To Static

Converts WordPress posts and pages to static JSON and markdown.


## Usage

Requires Node 10+. Does NOT support the browser.

### Install

```
yarn install...
```

### Use

```
//Get dependency
const wpToStatic = require( 'wp-api-to-static' );
//directories to write to
const filePathArgs = {
      wpJsonPath: __dirname + '/static-json/', //directory for generated JSON files
      markdownPath: __dirname + '/static-markdown', //directory for generated markdown files
}
const data = await wpToStatic({
          endpoint: 'https://calderaforms.com/wp-json',
          perPage : 1,
          page : 2,
      }, filePathArgs);
....
```

### Develop

- Clone
    - `git clone git@github.com:Shelob9/wp-api-to-static.git`
- Install
    - `cd wp-api-to-static && yarn`
- Test
    - `yarn test`
- Build
    - `yarn build`
