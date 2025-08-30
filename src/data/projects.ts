export interface ProjectData {
  image: string
  tags: string[]
  title: string
  subTitle?: string
  description: string
  url?: string
  archived?: boolean
}

export const projects: ProjectData[] = [
  {
    image: '/images/projects/caroline-andrusko.png',
    tags: ['NextJS', 'TailwindCSS', 'Resend'],
    title: 'Caroline Andrusko',
    subTitle: 'Local Business',
    description:
      "Caroline Andrusko, based in Curitiba, specializes in innovative designs for residential and commercial spaces. The website showcases their portfolio, highlighting a collaborative approach to creating personalized environments that meet each client's unique needs.",
    url: 'https://www.carolineandrusko.com.br/',
  },
  {
    image: '/images/projects/icab-chocolates.png',
    tags: ['Shopify', 'Zapier', 'Stripe'],
    title: 'ICAB Chocolates',
    subTitle: 'Local Business',
    description:
      'Founded in 1930 and based in Curitiba, ICAB Chocolates is a heritage chocolatier. The site highlights the brand’s legacy and complements its city boutiques with e-commerce, connecting tradition to a modern buying experience.',
    url: 'https://www.icabchocolates.com.br/',
  },
  {
    image: '/images/projects/seumecanico.png',
    tags: ['Typescript', 'NextJS', 'Vercel'],
    title: 'Seu Mecânico',
    subTitle: 'Startup',
    description:
      'An innovative startup that aims to connects car owners with reliable mechanics. "Seu Mecânico" intends to simplify the process of finding, rating, and booking car services.',
    url: 'https://www.seumecanico.com/',
  },
  {
    image: '/images/projects/zuno.png',
    tags: ['Typescript', 'TailwindCSS', 'SEO'],
    title: 'Zuno Cable Park',
    subTitle: 'Local Business',
    description:
      "Zuno Cable Park, located in Curitiba, is a premier destination for wakeboarding enthusiasts. The website highlights the park's facilities, activities, and booking options, providing an engaging experience for visitors to plan their adventure.",
    url: 'https://www.zunocablepark.com/',
  },
]

export const hiddenProjects: ProjectData[] = [
  {
    image: '/images/projects/analuizarocha.png',
    tags: ['NextJS', 'TailwindCSS', 'Medical'],
    title: 'Dra. Ana Luiza Rocha',
    subTitle: 'Medical Practice',
    description:
      'A specialized medical website for Dr. Ana Luiza Rocha, a coloproctologist in Curitiba. The site provides information about clinical and surgical treatments for intestinal, rectal, and anal conditions, emphasizing humanized medical care and breaking taboos around specialized healthcare.',
    url: 'https://www.analuizarocha.com.br/',
  },
  {
    image: '/images/projects/anapierin.png',
    tags: ['NextJS', 'TailwindCSS', 'Medical'],
    title: 'Dra. Ana Pierin',
    subTitle: 'Medical Practice',
    description:
      'A professional website for Dr. Ana Pierin, an orthopedist and traumatologist specializing in minimally invasive pain treatments. The site showcases services including ultrasound-guided procedures, shock wave therapy, and regenerative musculoskeletal medicine.',
    url: 'https://draanapierin.com.br/',
  },
  {
    image: '/images/projects/dayarasalomao.png',
    tags: ['NextJS', 'TailwindCSS', 'Medical'],
    title: 'Dra. Dayara Salomão',
    subTitle: 'Medical Practice',
    description:
      'A modern medical website for Dr. Dayara Salomão, featuring her coloproctology practice in Curitiba. The site highlights minimally invasive treatments using laser technology and emphasizes patient-centered care with technical excellence and compassion.',
    url: 'https://dayarasalomao.com.br',
  },
  {
    image: '/images/projects/versiani.png',
    tags: ['Framer Motion', 'Undraw', 'TailwindCSS'],
    title: 'Versiani',
    subTitle: 'Local Business',
    description:
      'A professional and user-friendly website for Versiani, a new car rental company. This site was developed using Framer Motion for smooth animations, Undraw for custom illustrations, and TailwindCSS for responsive design.',
    url: 'https://www.versianialugueldecarros.com.br/',
  },
  {
    image: '/images/projects/feather.ai-pricing.png',
    subTitle: 'Study case',
    tags: ['Playwright', 'Shopify', 'TailwindCSS'],
    title: 'Feather AI',
    description:
      'Featuring a pricing page for Feather AI, a machine learning FAKE startup. This project involved using Playwright for end-to-end testing, Shopify for e-commerce capabilities, and TailwindCSS for styling.',
    archived: true,
  },
  {
    image: '/images/projects/feather-blog.png',
    tags: ['Strapi', 'Jest', 'Railway'],
    title: 'Feather Blog',
    subTitle: 'Study case',
    description:
      'A personal blog developed using Strapi and hosted on Railway. An interesting aspect of this project was integrating Strapi for seamless content updates and creating a dynamic blog layout. Features robust testing with Jest to ensure reliability',
    archived: true,
  },
  {
    image: '/images/projects/grifemusic.png',
    tags: ['React', 'Firebase', 'Mailchimp'],
    title: 'GRIFE',
    subTitle: 'Music',
    description:
      "A simple website for GRIFE, an electronic music duo. This project showcases this duo's latest release and social media links",
    archived: true,
  },
  {
    image: '/images/projects/vipify.png',
    subTitle: 'Startup',
    tags: ['Prisma', 'GraphQL', 'Codegen'],
    title: 'Vipify',
    description: `"The ultimate tool for managing VIP lists, designed for nightclubs and event organizers". Unfortunately discontinued, vipify aims to simplify the process of adding, updating, and managing guests.`,
    archived: true,
  },
  {
    image: '/images/projects/grifecommerce.png',
    tags: ['KeystoneJS', 'GraphQL', 'Apollo'],
    title: 'GRIFE',
    subTitle: 'E-Commerce',
    description:
      'An online store that allows users to search, add to cart and checkout items. This e-commerce application features six main models: Users, Items, Orders, CartItems, OrderItems, and Roles. The project was inspired by the "Advanced React and GraphQL" course by Wes Bos.',
    archived: true,
  },
  {
    image: '/images/projects/burn360.png',
    tags: ['Next.js', 'TailwindCSS', 'Vercel'],
    title: 'BURN 360',
    subTitle: 'Fitness',
    description:
      'A fitness application designed for BURN 360, a boutique fitness studio. The app was intended to provide class scheduling, membership management, and workout tracking features for their specialized fitness programs.',
    archived: true,
  },
]
