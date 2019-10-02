# WP API To Static

Converts WordPress posts and pages to static JSON and markdown.


## Requriments

* Node 10+.
* Does NOT support the browser.

## Install

```
yarn add @staticish/wp-api-to-static
```

## Use

### Copy All Pages And Posts To Static Files

```javascript
//Get dependency
import {wpToStatic} from '@staticish/wp-api-to-static';
//directories to write to
wpToStatic(
    'https://make.wordpress.org/wp-json', {
        wpJsonPath: __dirname + '/static-json/', //directory for generated JSON files
        markdownPath: __dirname + '/static-markdown', //directory for generated markdown files
    }
);
```

### Copy One Chunk Of Content To Static Files
Copy a page of posts or pages to static JSON and markdown

```javascript
//Get dependency
import {postsToStatic} from '@staticish/wp-api-to-static';
//directories to write to
const filePathArgs = {
      wpJsonPath: __dirname + '/static-json/', //directory for generated JSON files
      markdownPath: __dirname + '/static-markdown', //directory for generated markdown files
}
//get the data and write to file
const data = await postsToStatic({
    endpoint: 'https://calderaforms.com/wp-json', //root for WordPress API
    perPage : 1, //number of posts/ pages to get per batch
    page : 2, //current page of data to get
}, filePathArgs);

//...
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
