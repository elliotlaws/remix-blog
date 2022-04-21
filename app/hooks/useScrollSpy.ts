import React from "react";

export const useScrollSpy = (
  elements: Element[],
  options: {
    offset?: number;
    root?: Element;
  }
): [number] => {
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(-1);
  const observer = React.useRef<IntersectionObserver>();

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) =>
        setActiveSectionIndex(
          entries.findIndex((entry) => entry.isIntersecting)
        ),
      {
        root: options?.root || null,
        rootMargin: `-${options?.offset || 0}px 0px 0px 0px`,
      }
    );

    const { current: currentObserver } = observer;

    // observe all the elements passed as argument of the hook
    elements.forEach((element) => currentObserver.observe(element));

    return () => currentObserver.disconnect();
  }, [elements, options]);

  return [activeSectionIndex];
};
