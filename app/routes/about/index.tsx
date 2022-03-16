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
    <div className="grid mt-6 grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="mr-6 text-lg text-zinc-600 dark:text-zinc-400">
        <h2 className="text-3xl text-black dark:text-white mb-4 font-semibold">
          Hey, I'm Elliot <WavingHand />
        </h2>
        <h2 className="text-xl text-black dark:text-white font-medium mb-4">
          👨‍💻 Software Engineer
        </h2>
        <h2 className="text-xl text-black dark:text-white font-medium mb-4">
          🥁 Drummer
        </h2>
        <p>
          I'm a software engineer. I was born in 1992 and grew up in Hartlepool,
          North East England. I went to Leeds Metropolitan University (now Leeds
          Beckett) and graduated with a degree in Music Technology.
        </p>
        <h3 className="text-xl text-black dark:text-white font-semibold my-4">
          Software Development
        </h3>
        <p>
          My first 'proper' dev job was working as a full-stack engineer,
          working with C#, SQL and various front-end frameworks. React is my
          favourite, and I've since concentrated my efforts on becoming more of
          a React + TypeScript + Node engineer.
        </p>
        <h3 className="text-xl text-black dark:text-white font-semibold my-4">
          Music
        </h3>
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
          className="mt-6 group flex gap-2 items-center font-medium text-xl text-black dark:text-white dark:hover:text-zinc-300"
        >
          How I became a software engineer
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:translate-x-1 block mr-2 transition ease-out hover:ease-in"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </div>
      <div>
        <BlurrableImage
          img={
            <img
              className="rounded-lg"
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
      </div>
    </div>
  );
}
