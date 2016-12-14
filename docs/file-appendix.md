
## .babelrc

[.babelrc](https://babeljs.io/docs/usage/babelrc/) is a configuration file for passing options to [Babel](https://babeljs.io) - the ES2015 transpiler recommended for writing next-generation JavaScript in Web Starter Kit. 

## .editorconfig

[EditorConfig](http://editorconfig.org/) is a file format and collection of text editor plugins for maintaining consistent coding styles between different editors and IDEs.

## .eslintignore

[.eslintignore](http://eslint.org/docs/user-guide/configuring) is a configuration file for telling ES Lint files that we don't care to lint.

This is good for things like third party libraries that aren't sourced from CDNs.

## gulpfile.babel.js

[Gulp](http://gulpjs.com) is a streaming build system that allows you to automate tedious development tasks. Compared with other build systems, such as Grunt, gulp uses Node.js streams as a means to automate tasks, thereby removing the need to create intermediate files when transforming source files. 

In gulp, you would install plugins, that do one thing and do it well, and construct a 'pipeline' by connecting them to each other. A `gulpfile` allows you to put together tasks that use plugins to accomplish a task like minification. 

`gulpfile.babel.js` is a gulpfile written in ES2015. The `babel` portion of the name refers to its use of the [Babel](https://babeljs.io) transpiler for enabling ES2015 code to run there.

## package.json

A [package.json](https://docs.npmjs.com/files/package.json) file is used to specify project tooling dependencies from [npm](http://npmjs.org) - the Node package manager. When you run `npm install`, `package.json` is read to discover what packages need to be installed. 

`package.json` can also contain other metadata such as a project description, version, license and configuration information.

## app/service-worker.js

A [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) is a script that is run by your browser in the background, separate from a web page, opening the door to features such as offline support. In Web Starter Kit, the `app/service-worker.js` script is automatically generated for you by our build process via [sw-precache](https://github.com/GoogleChrome/sw-precache/).
