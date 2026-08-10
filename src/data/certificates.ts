export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "course" | "workshop" | "program";
  file: string;
};

export const certificates: Certificate[] = [
  {
    id: "ieee-robotics",
    title: "Full-Stack Robotics Engineer",
    issuer: "Smart Methods · IEEE",
    date: "2026",
    category: "program",
    file: "/certificates/SmartMethods_Full_Stack_Robotics_Engineer_IEEE_2026.pdf",
  },
  {
    id: "robotics-ai",
    title: "Robotics & AI Program",
    issuer: "Smart Methods",
    date: "2026",
    category: "program",
    file: "/certificates/SmartMethods_Robotics_AI_Internship_2026.pdf",
  },
  {
    id: "electronics-iot",
    title: "Electronics, Power & IoT",
    issuer: "Smart Methods",
    date: "2026",
    category: "program",
    file: "/certificates/SmartMethods_Electronics_Power_IoT_Internship_2026.pdf",
  },
  {
    id: "web-nlp",
    title: "Web Development & NLP",
    issuer: "Smart Methods",
    date: "2026",
    category: "program",
    file: "/certificates/SmartMethods_Web_NLP_Internship_2026.pdf",
  },
  {
    id: "mechanical-design",
    title: "Mechanical Design",
    issuer: "Smart Methods",
    date: "2026",
    category: "program",
    file: "/certificates/SmartMethods_Mechanical_Design_Internship_2026.pdf",
  },
  {
    id: "linux-ros",
    title: "Linux Fundamentals & ROS 2",
    issuer: "Smart Methods",
    date: "Jul 2026",
    category: "course",
    file: "/certificates/SmartMethods_Linux_Fundamentals_2026-07-27.pdf",
  },
  {
    id: "3d-printing",
    title: "3D Printing",
    issuer: "Smart Methods",
    date: "Aug 2026",
    category: "course",
    file: "/certificates/SmartMethods_3D_Printing_2026-08-02.pdf",
  },
  {
    id: "engineering-skills",
    title: "Engineering Skills",
    issuer: "Smart Methods",
    date: "Jul 2026",
    category: "course",
    file: "/certificates/SmartMethods_Engineering_Skills_2026-07-15.pdf",
  },
  {
    id: "electric-circuits",
    title: "Fundamentals of Electric Circuits",
    issuer: "Smart Methods",
    date: "Jul 2026",
    category: "course",
    file: "/certificates/SmartMethods_Fundamentals_of_Electric_Circuits_2026-07-05.pdf",
  },
  {
    id: "mechanical-fundamentals",
    title: "Mechanical Fundamentals",
    issuer: "Smart Methods",
    date: "Jul 2026",
    category: "course",
    file: "/certificates/SmartMethods_Mechanical_Fundamentals_2026-07-05.pdf",
  },
  {
    id: "devops-git",
    title: "DevOps & Git/GitHub Workshop",
    issuer: "Smart Methods",
    date: "Jun 2026",
    category: "workshop",
    file: "/certificates/SmartMethods_DevOps_Git_Workshop_2026-06-30.pdf",
  },
];
