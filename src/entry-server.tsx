// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <MetaProvider>
            <Title>Diego Feder - Front-end Engineer</Title>
            <Meta name="description" content="Diego Feder is a front-end engineer specializing in React, TypeScript, and modern web technologies." />
            <Meta property="og:title" content="Diego Feder - Front-end Engineer" />
            <Meta property="og:description" content="Experienced front-end engineer specializing in React, TypeScript, and modern web technologies." />
            <Meta property="og:image" content="https://avatars.githubusercontent.com/u/63731464?v=4" />
            <Meta property="og:url" content="https://www.diegovfeder.com" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Link rel="canonical" href="https://www.diegovfeder.com" />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Person",
                "name": "Diego Feder",
                "jobTitle": "Front-end Engineer",
                "url": "https://www.diegovfeder.com",
                "sameAs": [
                  "https://www.linkedin.com/in/diegovfeder/",
                  "https://github.com/diegovfeder"
                ],
                "knowsAbout": [
                  "Software Development",
                  "Front-end Development",
                  "React.js",
                  "TypeScript",
                  "Node.js",
                  "Cloud Computing",
                  "Agile Methodologies"
                ]
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
));
