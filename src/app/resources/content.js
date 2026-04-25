import { Logo } from "@/once-ui/components";

const person = {
  firstName: "K. Sri Rishikesh varma",
  lastName: "",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI/ML Engineer",
  avatar: "/images/profile.jpg",
  email: "rishikeshvarma9854@gmail.com",
  location: "Hyderabad/India", // Display location
  timezone: "Asia/Kolkata", // Timezone for clock
  languages: ["English", "Telugu", "Hindi"], // optional: Leave the array empty if you don't want to display languages
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Kalki2898AD",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/rishikeshvarma-kucharlapati",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const about = {
  path: "/about",
  label: "About",
  title: `${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "#contact",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm an aspiring AI/ML Engineer and Cloud-native Web Developer with a deep passion for building innovative, real-world solutions. With a strong foundation in computer science and a drive to explore emerging technologies, I focus on creating scalable, efficient, and eco-conscious applications powered by intelligent systems and cloud infrastructure.
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      /*{
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },*/
      {
        company: "Student still pursuing my Education",
        timeframe: "2023 - 2027",
        role: "Student",
        achievements: [
          <>
            I am currently pursuing my Bachelor of Technology in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at Keshav Memorial Institute of Technology.
          </>,
        ],
      }
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Keshav Memorial Institute of Technology",
        timeframe: "2023 - 2027",
        description: <>Studying Computer Science and Engineering (AI/ML).</>,
      }
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    categories: [
      {
        title: "Programming Languages",
        skills: [
          "Python",
          "C++",
          "JavaScript",
          "HTML/CSS",
          "SQL"
        ]
      },
      {
        title: "Web Development",
        skills: [
          "MERN Stack",
          "React",
          "Node.js",
          "Express",
          "MongoDB"
        ]
      },
      {
        title: "Data Science & AI",
        skills: [
          "Machine Learning",
          "Deep Learning",
          "Computer Vision",
          "NLP",
          "Data Analysis"
        ]
      },
      {
        title: "Tools & Technologies",
        skills: [
          "TensorFlow",
          "PyTorch",
          "OpenCV",
          "Scikit-learn",
          "Pandas",
          "NumPy",
          "Git",
          "Docker"
        ]
      }
    ],
    descriptions: {
      "Python": ": Proficient in Python with extensive experience in NumPy, Pandas, Matplotlib, and Scikit-learn",
      "C++": ": Strong foundation in C++ and Data Structures & Algorithms",
      "MERN Stack": ": Full-stack development using MongoDB, Express, React, and Node.js",
      "Machine Learning": ": Implemented real time project using regression and classification algorithms",
      "Deep Learning": ": Experience with CNN, ANN, Transfer Learning, and Transformer architectures",
      "Computer Vision": ": Developed real-time autonomous driving car using OpenCV and YOLO",
      "Data Science": ": Expertise in data analysis, visualization, and statistical modeling"
    }
  },
  projects: {
    display: true,
    title: "Projects",
    items: [
      {
        name: "CopAD",
        description: "An advertisement text generator using pretrained models from huggingface with typescript, tailwindcss, Neon postgressql with help of replit agent and deployed in vercel",
        link: "https://github.com/Kalki2898AD/CopAD",
        website: "https://carlos-sandy-gamma.vercel.app/"
      },
      {
        name: "Portfolio Website",
        description: "My personal portfolio built with Next.js and reference of Once UI",
        link: "https://github.com/Kalki2898AD/portfolio",
        website: "https://portfolio-kalki2898ads-projects.vercel.app/",
      },
      {
        name: "NutriVision",
        description: "NutriVision is an AI-powered mobile website that scans food to estimate calories and nutrition. It offers personalized diet plans, daily tracking, and a smart chatbot for real-time dietary support.",
        link: "https://github.com/Kalki2898AD/Nutri_Vision",
        website: "https://nutrivision-oc9q.onrender.com/",
      }
    ]
  },
  contact: {
    display: true,
    title: "Contact",
    description: "",
  },
};

export { person, social, about };
