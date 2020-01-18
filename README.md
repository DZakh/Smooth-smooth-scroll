# smoothScroll()
My realization of a smooth scrolling function. It'd be much easier to just use something like `window.scroll()` or `window.scrollBy()`, but I encountered the problem with them that everything becomes kind of janky after scroll. So here is my solution, it comes up with the `scrollIntoView()` function which doesn't create lags and also preventable. And in order to use it with some extra offset we use a small hack with adding element and using it as an anchor, that may be an extremely useful thing when you have something like a fixed header on the top of your screen. Also, there is a lightweight polyfill, so this will work even in IE and Safari.

## How to use
### 1. Install [polyfill](https://www.npmjs.com/package/smoothscroll-polyfill)
```
# npm 
npm install smoothscroll-polyfill --save
 
# yarn 
yarn add smoothscroll-polyfill
```
### 2. Copy the code from `index.js` and add it to your project.
### 3. Connect the `smoothScroll` function to your javascript.
```js
import { activateSmoothScroll } from './place-where-you-keep-your-handlers';

actiavateSmoothScroll();
```
### 4. In your Html create something like link elements
```html
<div class="some-element" data-smooth-scroll-to="element-id"></div>
<div id="element-id"></div>
```
It may be any element, you just need to add the folowing data attribute:
```html
data-smooth-scroll-to="element-id"
```
After click on the element with such a data attribute the page will be scrolled to the choosen distination.
Also, you can set another data attribute to your link elements:
```html
data-smooth-scroll-block="start"
```
It represents the `block` option of the `scrollIntoView()` function. By default, it's `start`. Read more on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView).
### 5. Adjust the smoothScroll function to your needs
There are few reasons why I decided not to create an ultimate npm package with a bunch of options from this peace of code:  
The first one, really, it's really really small.  
And the second one - being an npm package it would need to have options for all the possible usage cases and a lot of useless code because of that. I think it's better to keep it compact and be able to easily adjust it when you really need. So feel free to mess up with my solution, because it's definitely isn't perfect and also may cover not all of your cases.  
For example, if you have some fixed header (or I call it with the word `masthead`) you can do something like this:
```js
const mastheadEl = document.querySelector(someMastheadSelector);

// and add it's height to the EXTRA_OFFSET variable

const EXTRA_OFFSET = mastheadEl.offsetHeight - 3;
```
If you don't have such a case, then just delete it, why not :-D.
## Finally
By all these things I want to say feel free to create your own `smoothScroll` function and share the solution with the world.
