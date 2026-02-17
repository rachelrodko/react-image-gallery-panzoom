# Image Gallery and Panzoom (React)

I have created a small image gallery and panzoom application in React. This is a personal side project that I created resulting from a requirement to build a zoom / drag component to help transcribers more easily view and document genealogical archive information from birth / marriage / death certificates. 

I created it in order to become more familiar with the React fundamentals of effects, components and state and also because I wanted to see how far I would get creating a panzoom app from scratch even though others exist in various React libraries.

## How it works

Clicking on one of the smaller images on the left will load the clicked image as the main image in the gallery. There are + and - buttons to zoom in and out. When zoomed in the user can pan over the image by dragging it. The user cannot zoom out the image any less than its actual size. The drag functionality can only happen within the boundaries of the image and not beyond.

I have used six of my own images but these are just for testing purposes. I have deliberately chosen very large images to better test the zoom in function but any images can be used.

## Installation

Clone the project onto PC:
```bash
$ git clone https://github.com/rachelrodko/react-image-gallery-panzoom.git image-gallery
```

Check for latest updates then install Vite and load project onto PC:

```bash
$ npm install
$ npm run dev
```

## Amendments for the future

The drag functionality is not as smooth as I would like and the coordination with the mouse needs to be refined, especially when an image is very zoomed in. Also there is a small bug when the the user attempts to drag beyond the confines of the image (it keeps snapping back to the last permitted coordinate) which I will need to fix.
