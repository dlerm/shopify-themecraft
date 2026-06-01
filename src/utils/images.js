export const getSizedImageUrl = (image, { width, height }) => {
  const url = image?.src;
  if (!url) return null;

  const urlParts = url.split('.');
  const extension = urlParts.pop();
  const basename = urlParts.join('.');

  let sizeParams = '';
  if (width) {
    sizeParams += `&width=${width}`;
  }
  if (height) {
    sizeParams += `&height=${height}`;
  }

  const sizedUrl = `${basename}.${extension}${sizeParams}`;
  return sizedUrl;
};

export const getSrcsetForWidths = (image, widths) => {
  if (!image?.src) return null;

  const srcset = widths.map((width) => `${getSizedImageUrl(image, { width })} ${width}w`);
  return srcset.join(', ');
};
