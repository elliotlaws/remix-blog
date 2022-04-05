import { motion } from "framer-motion";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { BlurrableImage } from "~/components/blurrable-image";
import { getImageProps } from "~/components/image";

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
    <div className="grid mt-6 grid-cols-1 gap-10 px-4 lg:px-32 md:px-6">
      <div className="mr-6 text-lg text-zinc-600 dark:text-zinc-400">
        <h2 className="text-3xl text-black dark:text-white mb-4 font-medium leading-10">
          Hi <WavingHand /> &nbsp;I'm Elliot,&nbsp;
          <span className="text-zinc-500 dark:text-zinc-400">
            A Leeds based{" "}
            <span className="text-black dark:text-white">
              Software Engineer 👨‍💻{" "}
            </span>{" "}
            and <span className="text-black dark:text-white">Drummer 🥁 </span>
          </span>
        </h2>
        <p>
          I was born in 1992 and grew up in Hartlepool, North East England. I
          went to Leeds Metropolitan University (now Leeds Beckett) and
          graduated with a degree in Music Technology.
        </p>
        <h3 className="text-xl text-black dark:text-white my-4">
          Software Development
        </h3>
        <p>
          My first 'proper' dev job was working as a full-stack engineer,
          working with C#, SQL and various front-end frameworks. React is my
          favourite, and I've since concentrated my efforts on becoming more of
          a React + TypeScript + Node engineer.
        </p>
        <h3 className="text-xl text-black dark:text-white my-4">Music</h3>
        <p>
          When I'm not coding, I'll play my drums and practice with my band
          AVACET. We're a 3-piece post-punk band from Leeds;{" "}
          <a
            href="https://avacet.bandcamp.com/"
            target="_blank"
            className="dark:text-zinc-300"
          >
            check us out.
          </a>
        </p>
        <Link
          to="software-engineer-story"
          className="mt-6 group flex gap-2 items-center text-xl text-black dark:text-white dark:hover:text-zinc-300"
        >
          How I became a software engineer
          <div className="h-10 w-10 text-xl group-hover:translate-x-1 transition ease-out hover:ease-in flex items-center">
            →
          </div>
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
