import { H2, Paragraph } from "~/components/typography";

export default function Index() {
  return (
    <div className="grid gap-4 px-4 md:max-w-[65ch] mx-auto">
      <div className="text-6xl text-secondary">
        🤷‍♂️ <span className="text-4xl">→</span> 👨‍💻
      </div>
      <H2 className="mb-2">How I became a software engineer</H2>
      <Paragraph>
        My first full-time job after University was working as a Data Verifier
        at StepChange Debt Charity (yes, it's as mundane as it sounds). I
        quickly grew quite fed up in this role and started messing around with
        VB scripts and Excel to create a 'note generator/template' app for my
        department to use.
      </Paragraph>
      <Paragraph>
        Eventually, this got me recognised by the IT department, and I got my
        first job in IT as a Service Desk Engineer. Although this gave me my
        first step into IT, it was never really for me (I possessed little
        patience for resetting passwords). However, I always knew I wanted to
        pursue the whole web/app developer thing, so I applied for internal web
        developer roles. Finally, after my third attempt, I got a Junior 'Web
        Developer' job.
      </Paragraph>
      <Paragraph>
        The job turned out to be more application support than web development.
        So my day to day mainly consisted of working with SQL to run a fix into
        the database...pretty dull stuff. Although, I managed to decrease the
        teams' incidents by automating things and working with the team to
        release permanent fixes. While in the role, I began teaching myself
        languages such as C#, JavaScript/TypeScript, HTML CSS. I was learning a
        lot during this time, and it got to the point where I felt confident
        enough to take things to the next level, so I put myself out there to
        find a 'proper' dev job.
      </Paragraph>
      <Paragraph>
        I landed at Answer Digital; they were a digital consultancy, and the
        role included a three-month training academy to learn the fundamentals
        of full-stack development. The tech stack was .NET on the back-end with
        various JS frameworks. After only a few months on the job, I'd been on
        about four different projects, and each one required working with a
        different set of technologies. I found it challenging to settle into the
        role and get used to the constant change in tech. However, of all the
        technologies/languages/frameworks I touched, React and TypeScript became
        my favourite. So I moved into React, Node and TypeScript in my next role
        as a Front-End Developer at Sycous.
      </Paragraph>
    </div>
  );
}
