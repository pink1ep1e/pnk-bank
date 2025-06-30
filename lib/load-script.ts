export const loadScript = (src: string, callback: () => void) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
}; 