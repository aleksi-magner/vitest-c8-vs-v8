import { vi } from 'vitest';

vi.mock('purejs-idb');

window.URL.createObjectURL = vi.fn(() => '<Object URL>');
window.URL.revokeObjectURL = vi.fn();

document.createElement = (function (create) {
  return function () {
    // @ts-ignore
    const element: HTMLElement = create.apply(this, arguments); // eslint-disable-line

    if (element.tagName === 'INPUT') {
      (<HTMLInputElement>element).focus = vi.fn();
      (<HTMLInputElement>element).blur = vi.fn();
    } else if (element.tagName === 'TEXTAREA') {
      (<HTMLTextAreaElement>element).onfocus = vi.fn();
      (<HTMLTextAreaElement>element).onblur = vi.fn();
    } else if (element.tagName === 'IMG') {
      const image: HTMLElement = element;

      image.onload = vi.fn();
      image.onerror = vi.fn();

      const load = () => {
        setTimeout((): void => {
          const valid: boolean = image.hasAttribute('src') && !!(<HTMLImageElement>image).src;

          if (valid && image?.onload) {
            image.onload(new Event('load'));
          } else if (image?.onerror) {
            image.onerror(new Event('error'));

            setTimeout(load, 0);
          }
        }, 0);
      };

      load();
    } else if (element.tagName === 'CANVAS') {
      (<HTMLCanvasElement>element).getContext = vi.fn().mockReturnValue({
        drawImage: vi.fn(),
      });

      (<HTMLCanvasElement>element).toDataURL = vi.fn().mockReturnValue({
        node: element,
        data: '<Image in Base64>',
      });
    }

    return element;
  };
})(document.createElement);

Object.defineProperty(Image.prototype, 'src', {
  set(): void {
    setTimeout((): void => {
      this.onload();
    }, 0);
  },
});
