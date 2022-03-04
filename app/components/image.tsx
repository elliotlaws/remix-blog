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

{
  /* <img
  title="Photo by Kari Shea"
  class="z-10 rounded-lg object-cover object-center transition-opacity"
  alt="MacBook Pro on top of brown table"
  src="https://res.cloudinary.com/kentcdodds-com/image/upload/w_1517,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop"
  srcset="
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_280,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop   280w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_560,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop   560w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_840,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop   840w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_1100,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 1100w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_1650,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 1650w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_2500,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 2500w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_2100,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 2100w,
    https://res.cloudinary.com/kentcdodds-com/image/upload/w_3100,q_auto,f_auto,b_rgb:e6e9ee/kentcdodds.com/content/blog/how-i-built-a-modern-website-in-2021/banner_iplhop 3100w
  "
  sizes="(max-width:1023px) 80vw, (min-width:1024px) and (max-width:1620px) 67vw, 1100px"
/> */
}
