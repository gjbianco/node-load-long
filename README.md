# long-load

A simple node.js app that mocks up an application with a long start time.
Starts up the server after a configurable amount of time by waiting `START_DELAY` milliseconds.

## Usage

Intended to build with Podman (though Docker should work fine):

```sh
$ podman build . -t long-load
```

Start the container by binding to port 3000 in the container.
`START_DELAY` defaults to 10,000 milliseconds.

```sh
$ podman run --name long-load -p 3000:3000 long-load
```

Optionally, specify a start delay time.

```sh
$ podman run --name long-load -p 3000:3000 -e START_DELAY=3000 long-load
```

## Routes

Note that all routes are of type GET for simplicity, even if they really should be something else.

### `/ping`

Replies with 'pong'.
Can be used as a health probe endpoint as it will crash if the app is set to be sick.

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
