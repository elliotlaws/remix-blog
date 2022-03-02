export default function Image({ url, alt }: any) {
  const src = `https://elliotlaws.com/cdn-cgi/image/format=auto,quality=75/${url}`;

  return <img src={src} alt={alt} />;
}

export const getImageProps = (
  url: string,
  alt: string,
  transition: Transformation
) => {
  const { width, height } = transformations[transition];

  const src = `https://elliotlaws.com/cdn-cgi/image/format=auto,quality=100,fit=crop,width=${width},height=${height}/${url}`;

  return { src, alt, width: 560, height: 747 };
};

type Transformation = "cropped" | "blogPage";

export const transformations = {
  cropped: { width: 560, height: 747 },
  blogPage: { width: 1366, height: 768 },
};
