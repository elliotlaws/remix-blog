import { Link } from "remix";
import { BlurrableImage } from "~/components/blurrable-image";
import { getImageProps } from "~/components/image";

export default function Index() {
  const imageProps = getImageProps({
    url: `https://imagedelivery.net/aMtDG4Tev1jnhCpXZQ7ubg/c9d6c155-2832-419d-c7cd-6ca477226e00`,
    alt: "me",
    widths: [512, 650, 840, 1024, 1300, 1680, 2000, 2520],
    sizes: [
      "(max-width: 1023px) 80vw",
      "(min-width: 1024px) and (max-width: 1620px) 40vw",
      "650px",
    ],
    aspectRatio: "2425:3279",
  });

  return (
    <div className="grid pt-10 grid-cols-2 gap-10">
      <div className="mb-4 mr-6 text-lg text-zinc-400">
        <h2 className="text-3xl text-white mb-4 font-semibold">
          Hey, I'm Elliot 👋
        </h2>
        <h2 className="text-3xl mb-4"> 👨‍💻 Software Engineer</h2>
        <h2 className="text-3xl mb-4">🥁 Drummer</h2>
        <p>
          I'm a software engineer. I was born in 1992 and grew up in Hartlepool,
          North East England. I went to Leeds Metropolitan University (now Leeds
          Becket) and graduated with a degree in Music Technology.
        </p>
        <h3 className="text-xl text-white font-semibold my-4">
          Software Development
        </h3>
        <p>
          {/* I started out my software development career as more of a back-end
          engineer, working heavily with SQL and C# but then quickly developed
          an interest for front-end as it appealed to the creative in me. I then */}
          My first proper dev job was working as a full-stack engineer, working
          with C#, SQL and various different front-end frameworks. React is my
          favourite and I've since concentrated my efforts in becoming more of a
          React + TypeScript + Node engineer.
        </p>
        <h3 className="text-xl text-white font-semibold my-4">Music</h3>
        <p>
          When I'm not coding, I'll be playing my drums and practising with my
          band AVACET. We're a 3-piece post-punk band from Leeds, check us out.
        </p>
        {/* <Link
          to="/blog"
          className="group w-fit flex items-center font-medium text-xl text-zinc-400 hover:text-gray-500"
        >
          <span className="group-hover:-translate-x-1 block mr-2 transition ease-out hover:ease-in">{`</`}</span>
          Back to posts
        </Link> */}
        <Link
          to=""
          className="mt-6 group flex gap-2 items-center font-medium text-xl text-white hover:text-zinc-300"
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
        {/* <h3 className="text-xl text-white font-semibold my-4">
          How I became a software engineer
        </h3>
        <p>
          My first 'proper' job after University was working as a Data Verifier
          at StepChange Debt Charity (yes, it's as mundane as it sounds). I
          quickly grew very fed up and bored in this role and started messing
          around with VB scripts and Excel to create a 'note generator/template'
          app for the department to use. This eventually got me recognised by
          the IT department and I got my first job in IT as a Service Desk
          Engineer. Although this gave me my first step into the world of IT, it
          was never really for me (I posessed little patience for resetting
          passwords). I always knew that I wanted to pursue the whole web/app
          developer thing
        </p> */}
      </div>
      <div>
        <img
          className="rounded-lg"
          {...imageProps}
          width="2425"
          height="3279"
        />
      </div>
    </div>
  );
}
