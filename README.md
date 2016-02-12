
http://tmpo.io

## Angular TMPO seed

This is our angular seed, with our gulp tasks.

Mainly the project is based on yeoman gulp angular generator, but gulp tasks
are rewritten, and borwsersync is deleted.


## Motivation

To have a simple angular seed with related gulp tasks, that is easy pluggable, 
with a golang backend. (With golang, the usual is to use the same backend, as
a project webserver).

During development, you can run:

```gulp watch```

and point your golang backend to serve static files on /tmp

When all is fine, you can build your project with:

```gulp dist```

If you don't want to use  golang backend... you can also serve the project
with gulp serve.


Is also posbile to use gobindata to ship the generated asses on the main binary, 
but also, if you will deploy using docker, is more easy to just copy, the 
dest folder to your container, and serve it from go backend.

## Features

- Bower dependencies are automatically parsed, and injected on index.html
- App javascripts are injected on the app, it uses aungular-filesort for
  handling file orders
- Templates are parsed, and included as javascript files with, 
	angular-templatecache
- Unit tests are ready and setup. A task for gulp is created to run them 
``` gulp test ``` or to do TDD ```gulp test:auto```
- SCSS files are builded and autoprefixed. Is a good idea to include burbon mixins.
- During development all files are injected to index.html (You will not need sourcemaps, because they are injected as is). On release/build files are minified, and versioned.


