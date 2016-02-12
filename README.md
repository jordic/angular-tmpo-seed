

## Angular seed

This is our angular seed, with our gulp tasks.

Mainly the project is based on yeoman gulp angular generator, but gulp tasks
are rewritten, and borwsersync is deleted.


## Motivation

To have a simple angular seed with related gulp tasks, that is easy pluggable, 
with a golang backend. (With golang, the usual is to use the same backend, as
a project webserver).

During development, you can run:

```gulp watch```

and point your golang backend to /tmp

When all is fine, you can build your project with:

```gulp dist```


If you don't want to use  golang backend... you can also serve the project
with gulp serve.
