type GetImagePropsParams = {
  url: string;
  alt: string;
  widths: Array<number>;
  sizes: Array<string>;
  aspectRatio: string;
};

export const getImageProps = ({
  url,
  alt,
  widths,
  sizes,
  aspectRatio,
}: GetImagePropsParams) => {
  const avgWidth = Math.ceil(widths.reduce((a, s) => a + s) / widths.length);
  const [ratio1, ratio2] = aspectRatio.split(":").map((ratio) => Number(ratio));
  const avgHeight = (avgWidth / ratio1) * ratio2;

  const src = `https://elliotlaws.com/cdn-cgi/image/fit=cover,format=auto,width=${avgWidth},height=${avgHeight}/${url}`;

  const srcSet = widths
    .map((width) => {
      const ratio = width / ratio1;
      const height = ratio * ratio2;

      return `https://elliotlaws.com/cdn-cgi/image/fit=cover,format=auto,width=${width},height=${height}/${url} ${width}w`;
    })
    .join(",");

  return {
    src,
    alt,
    srcSet,
    sizes: sizes.join(","),
  };
};
