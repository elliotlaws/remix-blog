import clsx from "clsx";
import { useEffect } from "react";
import useProgress from "~/hooks/useProgress";
import useScrollSpy from "~/hooks/useScrollSpy";
import { ReadingProgress } from "./reading-progress";

interface Props {
  ids: Array<{ id: string; title: string }>;
}

/**
 * This offset is meant for the smooth scrolling and
 * Scrollspy to take into account the header height
 */
const OFFSET = 150;

export function TableContents({ ids }: Props) {
  const readingProgress = useProgress();

  /**
   * Only show the table of content between 7% and 95%
   * of the page scrolled.
   */
  const shouldShowTableOfContent = readingProgress > 0.15;

  /**
   * Handles clicks on links of the table of content and smooth
   * scrolls to the corresponding section.
   * @param {React.MouseEvent} event the click event
   * @param {string} id the id of the section to scroll to
   */
  const handleLinkClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();

    const element = document.getElementById(id)!;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - 20;

    /**
     * Note @MaximeHeckel: This doesn't work on Safari :(
     * TODO: find an alternative for Safari
     */
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  /**
   * Get the index of the current active section that needs
   * to have its corresponding title highlighted in the
   * table of content
   */
  const [currentActiveIndex] = useScrollSpy(
    ids.map(
      (item) => document.querySelector(`#${item.id}`)?.closest("section")!
    ),
    { offset: OFFSET }
  );

  return (
    <div
      className={clsx(
        "fixed right-[80px] h-[500px] -translate-y-1/2 top-1/2",
        shouldShowTableOfContent ? "flex" : "hidden"
      )}
    >
      <ReadingProgress progress={readingProgress} />
      {ids.length > 0 ? (
        <ul className="grid gap-8 px-4 content-start">
          {ids.map((item, index) => {
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={clsx(
                    "text-lg transition-all duration-200 ease-in",
                    currentActiveIndex === index ? "opacity-100" : "opacity-50"
                  )}
                  onClick={(event) => handleLinkClick(event, item.id)}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
