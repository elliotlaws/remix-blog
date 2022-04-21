import { H2, Paragraph } from "~/components/typography";

export default function Index() {
  return (
    <div className="grid justify-center gap-4 px-4 max-w-screen-lg mx-auto">
      <div className="text-6xl text-secondary">
        🤷‍♂️ <span className="text-4xl">→</span> 👨‍💻
      </div>
      <H2 className="mb-2">How I became a software engineer</H2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Paragraph className="mb-6">
            My first full-time job after University was working as a Data
            Verifier at StepChange Debt Charity (yes, it's as mundane as it
            sounds). I quickly grew quite fed up in this role and started
            messing around with VB scripts and Excel to create a 'note
            generator/template' app for my department to use. The development of
            this became my full-time job and over time I added additional
            features.
          </Paragraph>
          <Paragraph>
            Eventually, this got me recognised by the IT department, and I got
            my first job in IT as a Service Desk Engineer. Although this gave me
            my first step into IT, it was never really for me (I possessed
            little patience for resetting passwords). However, I always knew I
            wanted to pursue the whole web/app developer thing, so I applied for
            internal web developer roles. Finally, after my third attempt, I got
            a Junior 'Web Developer' job.
          </Paragraph>
        </div>
        <div>
          <Paragraph className="mb-6">
            The job turned out to be more application support than web
            development. The majority of the role consisted of working with SQL
            to run a fix into the database...pretty dull stuff. I began teaching
            myself C#, JavaScript/TypeScript, HTML and CSS, eventually I felt
            confident enough to take things to the next level, so I put myself
            out there to find a 'proper' dev job.
          </Paragraph>
          <Paragraph>
            I landed at Answer Digital; they were a digital consultancy, and the
            role included a three-month training academy to learn the
            fundamentals of full-stack development. The tech stack was .NET on
            the back-end with various JS frameworks. After only a few months on
            the job, I'd been on several different projects, with each one
            involving a different set of technologies. Out of all the
            technologies/languages/frameworks I touched, React and TypeScript
            became my favourite.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
