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

### Technical Debt

Some technical debt that was assumed during this project. This debt was taken on because of limited project time and tracked here to be prioritized or forgotten as necessary.

```
fieldChange class is duplicated in multiple components. These components could potentially extend from a master component that implements this class.
Event data is assumed to be valid when catching events. Error checking mechanisms can be added here
Better form validation - Start time should not exceed end time. Max duration on start time. Error messages
```
