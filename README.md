# Code Challenge for Krossover Intelligence

## Overview
This project is my answer for the code challenge posed by Crossover intelligence. It fulfills all of the specs for the mandatory features and the bonus features, and is very modular. The UI/UX is simple and straightforward, and also is mildly responsive. To see the examples in action, simply view the files in the examples directory. There is a sample that allows editing and a readonly page that demonstrates a different arrangement of the components of the page. 

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
fix a bug that prevent one from pausing using the standard controls if there are multiple clips in the list. Will need to use custom controls anyway
fieldChange class is duplicated in multiple components. These components could potentially extend from a master component that implements this class.
Event data is assumed to be valid when catching events. Error checking mechanisms can be added here
Better form validation - Start time should not exceed end time. Max duration on start time. Error message
Improve the ui on clip edit - It can be neater with a little extra formattings
Passing in clip data - Could just pass in the clip object itself, instead of creating a new property. Fix this later
Code standards - Setup ESLint coding standard rules to keep spacing etc. consistent
Gulp task to handle Minification and concatenation of less/js files 
Gulp task to handle optimization of image assets
Fix jumpiness in certain state changes by using fixed width divs in example
Message functionality is pretty standard, could probably go into a master class to be inherited
Used div tags to structure the break between some elements, such as label and input for filter to save time. Would be better to use css display property for flexibility 
SVG animations are deprecated. Utilize a new SVG.
Bootstrap animation for the timeline is a little jumpy when going forward, it sometimes goes back.
```

### Product ideas

Some product ideas worth exploring for the future:

```
Allow user to upload a 'poster' (aka teaser) image for the video in case it is shared elsewhere
Save button should highlight whenever there is unsaved changes
```

### v1.0.0

This branch contains the mandatory features according to the challenge specs and all dependencies compiled.

### v1.0.1

Bonus feature to continuously play through cliplist with 3 second delay and overlay

### v1.0.2

Bonus feature ability to persist clip data throughout session

### v1.0.3

Bonus feature ability to filter by tag names

### v1.0.4

Bonus feature ability to move to previous and next clip with the F7 and F9 keys respectively
Fixed a bug with the clip indexes and added highlight to selected clip

### v1.0.5
Bonus feature ability to click on marker tags on timeline to jump to clip position.
added ability to pause in between clips before it transitions to a new clip.

### v1.0.6
Bonus feature included an example of a readonly arrangement of the components
