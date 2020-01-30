# Smooth smooth scroll

That's a simple to use realization of a smooth scroll for your website. It's especially useful if you have some fixed elements and want to correct the scroll destination.

## Advantages

- Very lightweight - only _1.94 KB_
- Works in all alive browsers (requires _4.1 KB_ of polyfills)
- You can change parameters of scroll after the first activation with a bit of js and easily add new links
- It's built with `scrollIntoView` what gives a lot of advantages other smooth-scroll packages don't have:

  - It has good performance without weird jankiness and other bugs
  - You will not have any problems if you start clicking on the smooth-scroll trigger button as crazy
  - If the scroll event has already started it can be easily stoped before the end
  - There is a way to choose the position of the destination element. So, let's just say, if you have some element on your page, you can set either it's going to be at the top edge of the screen, at center, or the bottom edge after scroll
  - The same thing works with horizontal scrolling or even with both at the same time

- And the last but one of the most essential features of the package is the ability to set an offset for scroll. It may be useful just for small adjustments, but the most obvious use case is to prevent content overlap with a fixed header

## Disadvantages

- There is no a proper way to know when the scroll event is finished
- You cannot set up easing for scroll animation
- Some people may complain about accessibility
- URL doesn't change, but, on the other hand, you can make any element a link

## How to

### 1. Install via npm

```
npm i smooth-smooth-scroll
```

### 2. Include _smooth-smooth-scroll_ in your project

```js
// Don't forget polyfill first if you need it (Required by Safari and IE)
import 'smooth-smooth-scroll/polyfill';
import { initSmoothScroll } from 'smooth-smooth-scroll';
```

> Note: Polyfill file contains two things: [smoothscroll-polyfill](https://www.npmjs.com/package/smoothscroll-polyfill) and [closest polyfill](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest).

So, it means you can use them further in the project without any old browser support worries.

### 3. Initialize

```js
const disableSmoothScroll = initSmoothScroll(smoothScrollOptions);
```

The `initSmoothScroll` returns a function which removes the eventListener used by _smooth-smooth-scroll_.

### 4. Create a link

You just need to add a data attribute to any element. You can do it initially by hand in your Html file or later with javascript.

```html
<div class="some-element" data-smooth-scroll-to="element-id"></div>
<div class="another-element" id="element-id"></div>
```

```js
const someElement = document.querySelector('.some-element');

someElement.setAttribute('data-smooth-scroll-to', 'element-id');
// or
someElement.dataset.smoothScrollTo = 'element-id';
```

I recommend to use `<button>` tags for link elements.

### 5. Let's talk about options

By default they are like this:

```js
{
  offsetTop: 0,
  offsetBottom: 0,
  offsetLeft: 0,
  offsetRight: 0,
  block: 'start',
  inline: 'nearest',
  eventListenerOptions: {},
}
```

You'll probably need only the `offsetTop` property. Just set your fixed header height and thats all. All the other offsets may be needed if you have some other elements from other directions.

Talking about `block` and `inline`, they represent literally the same thing as in [scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) do. But don't afraid if you use only `block: 'start'` for all links on the page and suddenly realize you need `block: 'center'` for one element - there is a solution for this at the next step.

The `eventListenerOptions` object goes to the smooth-smooth-scroll eventListener options. There is only one, it is setten on `document` so you can not to afraid of performance issues if you have thousands of links.

### 6. Options for specific element

You can set them via data-attributes, such as:

```html
data-smooth-scroll-block="center"
<!-- and -->
data-smooth-scroll-inline="end"
```

Look at the third step for more code examples.

## Finally

At first, I didn't want to create an npm package for this, but the name `smooth-smooth-scroll` I come up with sounded so cool so I decided to do it. I hope you find it useful!
