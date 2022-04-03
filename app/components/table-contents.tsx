import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();

  /**
   * Only show the table of content between 7% and 95%
   * of the page scrolled.
   */
  const shouldShowTableOfContent =
    readingProgress > 0.1 && readingProgress < 0.95;

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
    show: () => ({
      opacity: shouldReduceMotion || shouldShowTableOfContent ? 1 : 0,
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
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
    <motion.div
      className="hidden xl:flex fixed h-[500px] top-1/2 left-[75%]"
      style={{ transform: "translateY(-47vh)" }}
      variants={variants}
      initial="hide"
      animate="show"
      exit="exit"
      transition={{ type: "spring" }}
    >
      <ReadingProgress progress={readingProgress} />
      {ids.length > 0 ? (
        <ul className="grid gap-8 px-4 content-start">
          {ids.map((item, index) => (
            <motion.li
              key={item.id}
              initial="inactive"
              animate={currentActiveIndex === index ? "active" : "inactive"}
              transition={{ type: "spring", stiffness: 70 }}
              variants={{
                active: {
                  opacity: "100%",
                  fontSize: "16.5px",
                },
                inactive: {
                  opacity: "60%",
                  fontSize: "16px",
                },
              }}
            >
              <motion.a
                href={`#${item.id}`}
                className="text-[#3a3d4a] dark:text-[#A1A1AA]"
                onClick={(event) => handleLinkClick(event, item.id)}
              >
                {item.title}
              </motion.a>
            </motion.li>
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}
