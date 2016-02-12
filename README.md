

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


http://tmpo.io
