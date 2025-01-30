// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'
import { MetaProvider, Title, Meta, Link } from '@solidjs/meta'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />

          <MetaProvider>
            <Title>Diego Feder - Software Engineer</Title>
            <Meta
              name="description"
              content="Software Engineer specializing in React, Node.js, TypeScript and Cloud technologies. Experienced in delivering robust experiences across diverse industries."
            />
            <Meta
              name="keywords"
              content="Software Engineer, React, Node, TypeScript, AWS, Tailwind, Javascript, CSS, HTML, AI, Healthcare, FinTech"
            />

            {/* Open Graph (OG) for social sharing */}
            <Meta
              property="og:title"
              content="Diego Feder - Software Engineer"
            />
            <Meta
              property="og:description"
              content="Building scalable solutions with React, Node, TypeScript and "
            />
            <Meta
              property="og:image"
              content="https://www.diegovfeder.com/images/bio/dvf.webp"
            />
            <Meta property="og:url" content="https://www.diegovfeder.com" />
            <Meta property="og:type" content="website" />

            {/* Twitter */}
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta
              name="twitter:title"
              content="Diego Feder - Software Engineer"
            />
            <Meta
              name="twitter:description"
              content="Building innovative solutions across AI, Healthcare, and FinTech sectors."
            />
            <Meta
              name="twitter:image"
              content="https://www.diegovfeder.com/images/bio/dvf.webp"
            />

            {/* Canonical Link */}
            <Link rel="canonical" href="https://www.diegovfeder.com" />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
              {JSON.stringify({
                '@context': 'https://schema.org/',
                '@type': 'Person',
                name: 'Diego Feder',
                jobTitle: 'Software Engineer',
                url: 'https://www.diegovfeder.com',
                image: 'https://www.diegovfeder.com/images/bio/dvf.webp',
                sameAs: [
                  'https://www.linkedin.com/in/diegovfeder/',
                  'https://github.com/diegovfeder',
                ],
                knowsAbout: [
                  'Software Engineering',
                  'Front-end Development',
                  'React.js',
                  'TypeScript',
                  'Node.js',
                  'AWS & Cloud Architecture',
                  'System Design',
                  'Mobile Development',
                ],
                worksFor: [
                  {
                    '@type': 'Organization',
                    name: 'Tarmac.io',
                    description: 'Full-stack development',
                  },
                  {
                    '@type': 'Organization',
                    name: 'Atypical AI',
                    description: 'AI-driven educational platform',
                  },
                ],
                location: {
                  '@type': 'Place',
                  name: 'Curitiba, Brazil',
                },
              })}
            </script>
          </MetaProvider>

          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
