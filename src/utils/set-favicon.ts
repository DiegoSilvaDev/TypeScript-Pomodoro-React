export function setFavicon(href: string): void {
  let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';

    document.head.appendChild(favicon);
  }

  favicon.href = href;
}
