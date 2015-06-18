## What is this?

#### http://danigb.github.io/The-Nature-of-Code/

This is my own version of [The Nature Of Code](http://natureofcode.com/) examples in Javascript, using [p5.js](http://p5js.org/) (but using others libraries is not discarded)

The original [Processing](http://processing.org) examples [can be found here](https://github.com/shiffman/The-Nature-of-Code-Examples), along with a [list of other ports](https://github.com/shiffman/The-Nature-of-Code-Examples/blob/master/README.md).


__This is a personal exercise and a work in progress.__ For a reference implementation using p5.js look at https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js

There are some differences between that implementation and this one:

- I use the p5 instantiation mode (instead of global mode)
- All the code is inside one file (`sketch.js`)
- The code is [standard](https://github.com/feross/standard) compilant
- This is a free interpretation of the examples, not a direct translation to p5.js


## How to?

You can see them at: http://danigb.github.io/The-Nature-of-Code/

Or you can clone the repo and start a http server at root. With node/iojs:

```bash
npm install -g http-server  # installs the server
http-server                 # starts the server
```

To build the site you need node/iojs installed:

```bash
node site/build.js
```


## License

Do what you want license
