# Code Challenge for Crossover Intelligence

### Dependencies
To use the latest version of this repository, check out the latest version branch and include the files from the dist folder with your package manager of choice. To compile from source, npm is a required dependency. You can find instructions on how to install npm at [http://blog.npmjs.org/post/85484771375/how-to-install-npm].

#### Compiling from source

To compile from source, check out the repository and run the following commands from the project directory (these instructions assume you have npm installed). 

```
npm install
node_modules/.bin/gulp
```

optionally if you wish to compile without the external libraries included in the distribution you can replace your gulp command with the following:

```
node_modules/.bin/gulp no-deps
```

And your dist folder will be built with the appropriate dependencies.
