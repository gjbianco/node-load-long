# long-load

A simple node.js app that mocks up an application with a long start time.
Starts up the server after a configurable amount of time by waiting `START_DELAY` milliseconds.

## Usage

Intended to build with Podman (though Docker should work fine):

```sh
$ podman build . -t long-load
```

Start the container by binding to port 3000 in the container.

```sh
$ podman run --name long-load -p 3000:3000 long-load
```

## Options

`long-load` responds to the following environment variables:

* `START_DELAY`: How long to wait (in ms) before "starting".
Defaults to `1000`.

* `SHOW_HOST`: Whether to prefix replies with the hostname.
Set to `"true"` to enable (quotes required).
Must have hostname located in UTF-8 encoded file `/etc/hostname`.

## Routes

Note that all routes are of type GET for simplicity, even if they really should be something else.

### `/ping`

Replies with 'pong'.

### `/health`

Used as a health probe.
Replies with appropriate error if the app is either sick or still starting.

### `/togglesick`

Toggles whether the app is currently healthy or sick.

### `/destruct`

Kills the process with an error code.
Helps for simulating process crashes.


### `/leak`

USE WITH CAUTION.
Consumes a fixed amount of memory (~480MB).

### `/unleak`

Releases memory consumed with `/leak`.
Might not work on all systems, as it tries to force a full garbage collection cycle.
