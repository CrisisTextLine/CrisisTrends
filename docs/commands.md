## Deploy

```sh
$ npm run gulp deploy
```

This will automatically run the build & optimize scripts, then deploy out the current working
directory to the gh-pages branch. Note that this will deploy your current code, regardless of
whether or not it is committed.

## Watch For Changes & Automatically Refresh Across Devices

```sh
$ npm run gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices
connected to your network.
`serve` does not use [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
caching, so your site will stop being available when the web server stops running.

## Build & Optimize

```sh
$ npm run gulp
```

Build and optimize the current project, ready for deployment.
This includes linting as well as image, script, stylesheet and HTML optimization and minification.
Also, a [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
script will be automatically generated, which will take care of precaching your sites' resources.
On browsers that [support](https://jakearchibald.github.io/isserviceworkerready/) service
workers, the site will be loaded directly from the service worker cache, bypassing the server.
This means that this version of the site will work when the server isn't running or when there is
no network connectivity.

## Serve the Fully Built & Optimized Site

```sh
$ npm run gulp serve:dist
```

This outputs an IP address you can use to locally test and another that can be used on devices
connected to your network.
`serve:dist` includes will serve a local copy of the built and optimized site generated as part
of the `default` task.
Because the optimized site includes a service worker which serves your site directly from the
cache, you will need to reload the page after regenerating the site to pick up the latest changes.
`serve:dist` uses a different HTTP port than `serve`, which means that the service workers are
kept isolated in different [scopes](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Registering_your_worker).

## Difference Between `serve` & `serve:dist`

It is important to note a difference between the `serve` and `serve:dist` tasks.

* `serve` uses a no-op `service-worker.js` and cannot run offline.
* `serve:dist` uses the `sw-precache`-generated output and can run offline.

The `serve` task runs on port 3000 and `serve:dist` runs on port 3001.
The main purpose is to ensure that different service workers will not impact each other's environment.
Using the `sw-precache`-generated output makes it very difficult to quickly test local changes which is not ideal for a development server environment.
