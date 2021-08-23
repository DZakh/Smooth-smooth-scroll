export const initSmoothScroll = ({
  offsetTop = 0,
  offsetBottom = 0,
  offsetLeft = 0,
  offsetRight = 0,
  block = 'start',
  inline = 'nearest',
  eventListenerOptions = {},
} = {}) => {
  const scrollIntoElView = (el, scrollOptions) => {
    el.scrollIntoView(scrollOptions);
  };

  const smoothScroll = e => {
    const linkEl = e.target.closest('[data-smooth-scroll-to]');

    if (!linkEl) {
      return;
    }

    const destinationEl = document.getElementById(linkEl.dataset.smoothScrollTo);

    if (destinationEl === null) {
      throw new Error('Destination element not found.');
    }

    const scrollOptions = {
      block: linkEl.dataset.smoothScrollBlock || block,
      inline: linkEl.dataset.smoothScrollInline || inline,
      behavior: 'smooth',
    };

    const isVerticalOffset = offsetTop || offsetBottom;
    const isHorizontalOffset = offsetLeft || offsetRight;

    if (isVerticalOffset || isHorizontalOffset) {
      const existingAnchorEl = [...destinationEl.children].find(el =>
        el.matches('.js-smooth-scroll-anchor')
      );

      const anchorEl = existingAnchorEl || document.createElement('div');

      if (!existingAnchorEl) {
        destinationEl.style.position = 'relative';

        const defaultStyles = `position:absolute;z-index:-1;`;
        // prettier-ignore
        const verticalStyles = isVerticalOffset ? `height:calc(100% + ${offsetTop + offsetBottom}px);${offsetTop ? `top:-${offsetTop}px;` : ''}` : `height:100%;`;
        // prettier-ignore
        const horizontalStyles = isHorizontalOffset ? `width:calc(100% + ${offsetLeft + offsetRight}px);${offsetLeft ? `left:-${offsetLeft}px;` : ''}` : `width:100%;`;

        const anchorStyles = defaultStyles + verticalStyles + horizontalStyles;

        anchorEl.setAttribute('style', anchorStyles);
        anchorEl.setAttribute('class', 'js-smooth-scroll-anchor');

        destinationEl.insertAdjacentElement('afterbegin', anchorEl);
      }

      scrollIntoElView(anchorEl, scrollOptions);
    } else {
      scrollIntoElView(destinationEl, scrollOptions);
    }
  };

  document.addEventListener('click', smoothScroll, eventListenerOptions);

  return () => {
    document.removeEventListener('click', smoothScroll, eventListenerOptions);

    const anchorEls = [...document.querySelectorAll('.js-smooth-scroll-anchor')];
    anchorEls.forEach(anchor => anchor.parentNode.removeChild(anchor));
  };
};
