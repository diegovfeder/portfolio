import { createSignal, onMount, onCleanup } from "solid-js";

import Case from "../case";

const CasesSection = () => {
  let containerRef: HTMLDivElement | null = null;
  const [showScroll, setShowScroll] = createSignal(false);

  const checkScroll = () => {
    if (containerRef) {
      setShowScroll(containerRef.scrollWidth > containerRef.clientWidth);
    }
  };

  onMount(() => {
    // Ensure this only runs on the client side
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScroll);
      checkScroll();
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", checkScroll);
    }
  });

  // TODO: Adjust the layout to be responsive and flexible.
  // At the 'xl' breakpoint, allow the images and text to expand and utilize available space,
  // ensuring a balanced and visually appealing presentation.
  return (
    <section id="cases" class="relative pt-4">
      <h2 class="text-start text-xl font-bold mb-4 whitespace-nowrap">
        cases
        <div class="border-b-4 w-16 text-xl font-bold border-slate-700 dark:border-slate-300" />
      </h2>
      <div
        class={`flex justify-around ${
          showScroll() ? "overflow-x-scroll" : "overflow-x-hidden"
        }`}
        ref={(el) => (containerRef = el)}
      >
        <Case
          src="/images/cases/atet.png"
          title="AT&T TV Demo"
          subtitle="Building a Scalable Multi-variant React Native App"
          body="In this project, I worked on developing the AT&T TV mobile app using React Native and TypeScript. I was responsible for automating the entire build and release process of 16 app variants using Fastlane and CircleCI, drastically improving deployment efficiency. Additionally, I contributed to building the core features such as media content management and deep linking. The app interacts with a CMS hosted in Azure, storing and mapping content dynamically for easy screen access. I also focused on optimizing the UX for sales personnel to showcase TV and internet packages. After 7 months, I transitioned to another project, but this remains one of my proudest contributions."
        />
        <Case
          src="/images/cases/hrhealthcare.png"
          title="HR HealthCare"
          subtitle="AI-Powered Data Extraction for Healthcare Solutions"
          body="In my latest project at HR HealthCare, I focused on integrating AI-driven solutions to enhance the data extraction process from various document types, including PDFs and images. Leveraging OpenAI’s capabilities, I developed a system that could automatically process and extract key data points from healthcare forms, contracts, and medical records. This dramatically improved the efficiency of handling large volumes of documents, reducing manual input and potential errors. The task involved creating a pipeline that converts images and PDF files into structured data, which could then be analyzed or integrated into the platform’s existing database. My work included fine-tuning models to handle specific formats and medical terminologies, ensuring accurate extraction and high data fidelity. This integration has significantly streamlined HR HealthCare’s data entry processes, offering a scalable solution for future AI implementations across other areas of the platform."
        />
        <Case
          src="/images/cases/tempworks.png"
          title="TempWorks"
          subtitle="Enhancing Enterprise HR Software"
          body="At TempWorks, I contributed to improving their HR software platform by building and optimizing UI components. My focus was on creating intuitive and responsive layouts for the company's various client-facing modules, improving performance, and ensuring cross-browser compatibility. I also implemented some backend integration tasks using Node.js and assisted in streamlining the communication between the frontend and backend APIs to make data retrieval more efficient for users. It was an exciting project where I had a direct impact on the product's scalability and user satisfaction."
        />
        <Case
          src="/images/cases/augeo.png"
          title="Augeo Marketing: Structrual"
          subtitle="Revamping the UI for an Employee Engagement Platform"
          body="During my time working for Augeo, I led the efforts to reboot their entire UI by introducing modern, reusable components. I specifically worked on the Postcard components and the rewards page, which were essential for enhancing user interaction. I also implemented new modals and grid layouts that helped improve the overall look and feel of the platform. Collaborating closely with the design team, I ensured that the new components fit seamlessly into the existing system, while providing a consistent, engaging user experience."
        />
        <Case
          src="/images/cases/nexben.png"
          title="Nexben"
          subtitle="Scaling a Healthcare Benefits Marketplace"
          body="At Nexben, I contributed to the development of a healthcare benefits marketplace that connects employers and providers. My work focused on building and refining the frontend components, especially those that handled complex workflows for benefits enrollment and management. I implemented several UI improvements, enhancing the performance and usability of the web application. Additionally, I worked on integrations between the frontend and backend services, ensuring smooth data exchanges across the platform."
        />
        <Case
          src="/images/cases/lucra.png"
          title="Lucra Sports"
          subtitle="Building Peer-to-Peer Sports Contests"
          body="At Lucra Sports, I played a pivotal role in developing a peer-to-peer sports betting app primarily for iOS. One of my major contributions was building the Notifications Service, which allowed administrators to send custom notifications using APNs through AWS. I also developed serverless functions to schedule and manage these notifications. On the frontend, I focused on improving the user experience in the Admin App, which included tables, forms, and actions to facilitate interaction with the backend. This project showcased my ability to handle both frontend and backend tasks while delivering a highly reliable system."
        />
        <Case
          src="/images/cases/icapital.png"
          title="iCapitalNetwork"
          subtitle="Creating Reusable UI Components for FinTech"
          body="At iCapitalNetwork, I collaborated closely with the UX and Dev teams to create reusable React components, improving consistency across the platform. I worked on a variety of elements such as date pickers, modal dialogs, and AG Grid-wrapped tables. My main responsibility was ensuring that these components were responsive, accessible (a11y), and thoroughly tested. I also provided Storybook renders for the design team, allowing them to review and iterate on components more efficiently. Our team’s greatest accomplishment was releasing a component library, which streamlined future development efforts across the platform."
        />
        <Case
          src="/images/cases/culltive.png"
          title="Culltive"
          subtitle="An IoT Automated Gardening Solution (MVP)"
          body="At Culltive, I was involved in building an IoT automated gardening device that aimed to simplify plant care. I was responsible for developing both the web and mobile applications, using React and React Native, respectively. Additionally, I worked with Firebase for real-time database management and handled communication between the device and the app. This project required not only technical expertise but also an understanding of IoT hardware integration, which I found both challenging and rewarding. The MVP was a functional product that provided a seamless experience for users looking to automate their plant care routines."
        />
        <Case
          src="/images/cases/bosch.png"
          title="Bosch"
          subtitle="Early Career in Android & CAN Protocol Integration"
          body="At Bosch Engineering, I started my career as an Android Mobile App developer. My primary responsibility was integrating Bluetooth communication with the CAN protocol, enabling real-time data exchange between mobile devices and ECUs (Electronic Control Units). I worked on several projects that aimed to push and pull data to engine control units, which allowed for monitoring and configuration of automotive systems. This experience gave me a strong foundation in low-level communication protocols and Android development before I transitioned to JavaScript and Node.js development."
        />
      </div>
    </section>
  );
};

export default CasesSection;
