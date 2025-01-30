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
              content="Software Engineer specializing in React, TypeScript, and Cloud technologies. Experienced in building AI-driven platforms, healthcare solutions, and fintech applications."
            />
            <Meta
              name="keywords"
              content="Software Engineer, React, TypeScript, AWS, AI Development, Healthcare Tech, FinTech, Mobile Development"
            />

            {/* Open Graph */}
            <Meta
              property="og:title"
              content="Diego Feder - Software Engineer"
            />
            <Meta
              property="og:description"
              content="Building innovative solutions across AI, Healthcare, and FinTech sectors using modern web technologies."
            />
            <Meta property="og:image" content="/images/dvf.webp" />
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
            <Meta name="twitter:image" content="/images/dvf.webp" />

            <Link rel="canonical" href="https://www.diegovfeder.com" />

            <script type="application/ld+json">
              {JSON.stringify({
                '@context': 'https://schema.org/',
                '@type': 'Person',
                name: 'Diego Feder',
                jobTitle: 'Software Engineer',
                url: 'https://www.diegovfeder.com',
                image: '/images/dvf.webp',
                sameAs: [
                  'https://www.linkedin.com/in/diegovfeder/',
                  'https://github.com/diegovfeder',
                ],
                knowsAbout: [
                  'Software Development',
                  'Front-end Development',
                  'React.js',
                  'TypeScript',
                  'Node.js',
                  'Cloud Computing',
                  'Agile Methodologies',
                ],
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
