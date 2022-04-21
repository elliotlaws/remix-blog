import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useScrollSpy } from "~/hooks/useScrollSpy";
import { ReadingProgress } from "./reading-progress";

export function TableContents({
  readingProgress,
}: {
  readingProgress: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [ids, setIds] = useState<Array<{ id: string; title: string }>>([]);

  useEffect(() => {
    const newIds = [...document.querySelectorAll("h2")].map((title) => ({
      id: title.id,
      title: title.innerText,
    }));
    setIds(newIds);
  }, []);

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
   * Variants handling hidding/showing the table of content
   * based on the amount scrolled by the reader
   */
  const variants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (shouldShowTableOfContents: boolean) => ({
      opacity: shouldReduceMotion || shouldShowTableOfContents ? 1 : 0,
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const articleSections = useMemo(
    () =>
      ids.map(
        ({ id }) => document.querySelector(`#${id}`)?.closest("section")!
      ),
    [ids]
  );

  /**
   * Get the index of the current active section that needs
   * to have its corresponding title highlighted in the
   * table of content
   */
  const [activeIndex] = useScrollSpy(articleSections, {
    offset: 100,
  });

  return (
    <motion.div
      className="sticky top-0 self-start flex"
      variants={variants}
      custom={readingProgress > 0.1}
      initial="hide"
      animate="show"
      exit="exit"
      transition={{ type: "spring" }}
    >
      <ReadingProgress progress={readingProgress} />
      {ids.length > 0 ? (
        <ul className="grid gap-8 px-4 content-start">
          {ids.map(({ id, title }, index) => (
            <motion.li
              key={id}
              initial="inactive"
              animate={activeIndex === index ? "active" : "inactive"}
              transition={{ type: "spring", stiffness: 70 }}
              variants={{
                active: {
                  opacity: "100%",
                },
                inactive: {
                  opacity: "60%",
                },
              }}
            >
              <motion.a
                href={`#${id}`}
                className="text-[#3a3d4a] dark:text-[#A1A1AA]"
                onClick={(event) => handleLinkClick(event, id)}
              >
                {title}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}
