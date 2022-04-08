import { motion } from "framer-motion";
import { Link } from "remix";
import { Arrow } from "~/components/arrow";
import { H2, H3, Paragraph } from "~/components/typography";

const WavingHand = () => (
  <motion.div
    style={{
      marginBottom: "-20px",
      marginRight: "-45px",
      paddingBottom: "20px",
      paddingRight: "45px",
      display: "inline-block",
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: "mirror",
      duration: 0.2,
      delay: 0.5,
      ease: "easeInOut",
      type: "tween",
    }}
  >
    👋
  </motion.div>
);

export default function Index() {
  return (
    <div className="md:max-w-[65ch] mx-auto px-4">
      <div>
        <H2 className="my-6">
          Hi <WavingHand /> &nbsp;I'm Elliot,&nbsp;
          <span className="text-secondary">A Leeds based&nbsp;</span>
          Software Engineer 👨‍💻&nbsp;
          <span className="text-secondary">and&nbsp;</span>
          Drummer 🥁
        </H2>
        <Paragraph>
          I was born in 1992 and grew up in Hartlepool, North East England. I
          went to Leeds Metropolitan University (now Leeds Beckett) and
          graduated with a degree in Music Technology.
        </Paragraph>
        <H3 className="my-4">Software Development</H3>
        <Paragraph>
          My first 'proper' dev job was working as a full-stack engineer,
          working with C#, SQL and various front-end frameworks. React is my
          favourite, and I've since concentrated my efforts on becoming more of
          a React + TypeScript + Node engineer.
        </Paragraph>
        <H3 className="my-4">Music</H3>
        <Paragraph>
          When I'm not coding, I'll play my drums and practice with my band
          AVACET. We're a 3-piece post-punk band from Leeds;{" "}
          <a href="https://avacet.bandcamp.com/" target="_blank">
            check us out.
          </a>
        </Paragraph>
        <Link
          to="software-engineer-story"
          className="my-4 group flex gap-2 items-center"
        >
          <H3>How I became a software engineer</H3>
          <Arrow />
        </Link>
      </div>
      {/* <div>
        <BlurrableImage
          img={
            <img
              className=""
              {...getImageProps({
                url: `https://imagedelivery.net/aMtDG4Tev1jnhCpXZQ7ubg/c9d6c155-2832-419d-c7cd-6ca477226e00`,
                alt: "me",
                widths: [512, 650, 840, 1024, 1300, 1680, 2000, 2520],
                sizes: [
                  "(max-width: 1023px) 80vw",
                  "(min-width: 1024px) and (max-width: 1620px) 40vw",
                  "650px",
                ],
                aspectRatio: "2425:3279",
              })}
              width="2425"
              height="3279"
            />
          }
        />
      </div> */}
    </div>
  );
}
