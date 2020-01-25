import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

export const initSmoothScroll = ({
  offsetTop = 0,
  offsetLeft = 0,
  block = 'start',
  inline = 'center',
  eventListenerOptions = {},
}) => {
  const scrollIntoElView = (el, scrollOptions) => {
    el.scrollIntoView(scrollOptions);
  };

  const smoothScroll = e => {
    const linkEl = e.target.closest('[data-smooth-scroll-to]');

    if (!linkEl) {
      return;
    }

    const destinationEl = document.getElementById(linkEl.dataset.smoothScrollTo);
    const scrollOptions = {
      block: linkEl.dataset.smoothScrollBlock || block,
      inline: linkEl.dataset.smoothScrollInline || inline,
      behavior: 'smooth',
    };

    if (offsetTop || offsetLeft) {
      const doesAnchorElExist = destinationEl.lastElementChild.classList.contains(
        'js-smooth-scroll-anchor'
      );
      const anchorEl = doesAnchorElExist
        ? destinationEl.lastElementChild
        : document.createElement('div');

      if (!doesAnchorElExist) {
        destinationEl.setAttribute('style', 'position: relative;');

        // prettier-ignore
        const anchorStyles = `
          position: absolute;
          z-index: -1;
          ${offsetTop ? `
            top: -${offsetTop}px;
            height: ${destinationEl.offsetHeight}px;
          ` : ''}
          ${offsetLeft ? `
            left: -${offsetLeft}px;
            width: ${destinationEl.offsetWidth}px;
          ` : ''}
        `.replace(/\s/g, '');

        anchorEl.setAttribute('style', anchorStyles);
        anchorEl.setAttribute('class', 'js-smooth-scroll-anchor');

        destinationEl.appendChild(anchorEl);
      }

      scrollIntoElView(anchorEl, scrollOptions);
    } else {
      scrollIntoElView(destinationEl, scrollOptions);
    }
  };

  document.addEventListener('click', smoothScroll, eventListenerOptions);

  return () => {
    document.removeEventListener('click', smoothScroll, eventListenerOptions);
  };
};
