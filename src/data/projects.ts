export type ProjectVideo = {
  id: string;
  title: string;
  primary?: boolean;
};

export type ProjectImage = {
  src: string;
  alt: string;
};

export type ProjectMedia = {
  images: ProjectImage[];
  videos: ProjectVideo[];
  docLink?: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  github?: string;
  featured: boolean;
  category: "fullstack" | "mobile" | "iot" | "ai" | "web";
  media?: ProjectMedia;
};

export const projects: Project[] = [
  {
    id: "alhulul",
    title: "AlHulul HR Platform",
    subtitle: "Leading Solutions for Business Services",
    description:
      "Full-stack HR and operations platform for seasonal workforce management in the Hajj sector — built end-to-end for office administration workflows.",
    highlights: [
      "Admin dashboard with analytics, employee management, and contract tracking",
      "Multi-step applicant portal with OTP verification and Hijri date support",
      "Automated document generation (contracts, clearance, experience certificates)",
      "Digital signature portals and SMS/email notifications via Supabase Edge Functions",
      "Role-based access control and attendance system integration",
    ],
    tech: ["React", "Supabase", "Framer Motion", "Recharts", "docxtemplater", "Edge Functions"],
    featured: true,
    category: "fullstack",
  },
  {
    id: "smart-academic",
    title: "Smart Academic Manager",
    subtitle: "University Graduation Project · AOU 2026",
    description:
      "Cross-platform Flutter app for GPA tracking, course registration, academic calendar, and semester history with real-time Firebase sync.",
    highlights: [
      "Live CGPA calculation engine with Firestore real-time updates",
      "Dashboard with progress charts (fl_chart) and upcoming events",
      "Bilingual UI (Arabic/English) with GetX architecture",
      "PDF export and printing for academic records",
    ],
    tech: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "GetX", "fl_chart"],
    featured: true,
    category: "mobile",
  },
  {
    id: "robodog",
    title: "RoboDog BodyV2",
    subtitle: "Quadruped IoT Robot",
    description:
      "Four-legged walking robot controlled remotely via MQTT with manual buttons and bilingual voice commands.",
    highlights: [
      "ESP32 firmware with LEDC PWM for 4× SG90 servos (diagonal gait)",
      "Web control panel over WSS/MQTT — works from mobile or laptop",
      "Voice control in Arabic and English via Web Speech API",
      "Full technical documentation (19 sections) and deployment guide",
    ],
    tech: ["C++", "ESP32", "MQTT", "JavaScript", "HTML/CSS"],
    github: "https://github.com/HZCS-IoT/Mechanics-walking-robot-",
    featured: true,
    category: "iot",
    media: {
      images: [
        { src: "/projects/robodog/frame_001.jpg", alt: "RoboDog BodyV2 — hardware setup" },
        { src: "/projects/robodog/frame_002.jpg", alt: "Quadruped walking test" },
        { src: "/projects/robodog/frame_003.jpg", alt: "ESP32 and servo wiring" },
        { src: "/projects/robodog/frame_004.jpg", alt: "Control panel demo" },
        { src: "/projects/robodog/det_015.jpg", alt: "RoboDog movement capture" },
        { src: "/projects/robodog/det_020.jpg", alt: "Leg gait sequence" },
        { src: "/projects/robodog/det_025.jpg", alt: "MQTT remote control test" },
      ],
      videos: [
        { id: "XNNBhHW6kjc", title: "Walking demo (3 gaits)", primary: true },
        { id: "KG-kgXi6Zhg", title: "Servo leg movement" },
        { id: "DsWuTCv1QBQ", title: "ESP32 wiring guide" },
      ],
      docLink: "https://github.com/HZCS-IoT/Mechanics-walking-robot-/blob/main/docs/robodog/README.md",
    },
  },
  {
    id: "kiba",
    title: "Kiba RoboDog",
    subtitle: "9-DoF Quadruped · ESP32 + MPU6050",
    description:
      "Modular quadruped robot firmware with dynamic stabilization using IMU feedback.",
    highlights: [
      "9 degrees of freedom with MPU6050 dynamic stabilization",
      "Mechanical blueprints and calibration utilities",
      "Designed in Onshape (Kiba V1 concept)",
    ],
    tech: ["C++", "ESP32", "MPU6050", "Onshape"],
    github: "https://github.com/HZCS-IoT/Kiba-Robodog",
    featured: true,
    category: "iot",
  },
  {
    id: "voice-ai",
    title: "Voice Assistant AI",
    subtitle: "Voice-to-Voice AI",
    description: "Real-time voice-to-voice AI assistant built with TypeScript.",
    highlights: ["Speech recognition and synthesis pipeline", "Interactive voice conversation flow"],
    tech: ["TypeScript", "Web APIs", "AI"],
    github: "https://github.com/HZCS-IoT/Voice-Assistant-AI-task3-",
    featured: false,
    category: "ai",
  },
  {
    id: "ai-object",
    title: "AI Object Recognition",
    subtitle: "Computer Vision",
    description: "Object detection and recognition system using Python and ML models.",
    highlights: ["Image classification pipeline", "Real-time object detection"],
    tech: ["Python", "Machine Learning", "Computer Vision"],
    github: "https://github.com/HZCS-IoT/AI-Object-Recognition--task2",
    featured: false,
    category: "ai",
  },
  {
    id: "fruit-classifier",
    title: "Fresh vs Rotten Fruit Classifier",
    subtitle: "ML Classification Model",
    description: "Trained model to classify fresh from rotten fruits.",
    highlights: ["Dataset training and evaluation", "Classification inference"],
    tech: ["Python", "Machine Learning"],
    github: "https://github.com/HZCS-IoT/Classification-model-AI-task1",
    featured: false,
    category: "ai",
  },
  {
    id: "web-panel",
    title: "RoboDog Control Panel",
    subtitle: "Web Remote Control",
    description: "Web-based control panel for RoboDog via voice or manual input.",
    highlights: ["MQTT integration", "Manual and voice control modes"],
    tech: ["HTML", "JavaScript", "MQTT"],
    github: "https://github.com/HZCS-IoT/Web-ControlPanel-for-RoboDog",
    featured: false,
    category: "web",
    media: {
      images: [],
      videos: [{ id: "XNNBhHW6kjc", title: "Control panel demo", primary: true }],
      docLink: "https://github.com/HZCS-IoT/Mechanics-walking-robot-/tree/main/web/h",
    },
  },
  {
    id: "smart-gate",
    title: "Smart Gate System",
    subtitle: "Electronics · ESP32",
    description: "Automated gate control through web server with servo integration.",
    highlights: ["Web server on ESP32", "Servo gate control", "Ultrasonic sensing"],
    tech: ["C++", "ESP32", "Servo", "Ultrasonic"],
    github: "https://github.com/HZCS-IoT/Electronics-task4",
    featured: false,
    category: "iot",
  },
  {
    id: "hashem-os",
    title: "Hashem OS",
    subtitle: "3D Cyberpunk Productivity Shell",
    description:
      "Interactive 3D desktop environment with window manager, kanban, calendar, and React Three Fiber scene.",
    highlights: [
      "Three.js cyberpunk environment with character and camera DOF",
      "Window manager, dock, command palette, and task apps",
      "Framer Motion UI with magnetic hover interactions",
    ],
    tech: ["React", "TypeScript", "React Three Fiber", "Zustand", "Framer Motion"],
    featured: false,
    category: "fullstack",
  },
];

export const githubRepos = [
  { name: "Mechanics-walking-robot-", url: "https://github.com/HZCS-IoT/Mechanics-walking-robot-", lang: "C++" },
  { name: "Kiba-Robodog", url: "https://github.com/HZCS-IoT/Kiba-Robodog", lang: "C++" },
  { name: "Voice-Assistant-AI-task3-", url: "https://github.com/HZCS-IoT/Voice-Assistant-AI-task3-", lang: "TypeScript" },
  { name: "Web-ControlPanel-for-RoboDog", url: "https://github.com/HZCS-IoT/Web-ControlPanel-for-RoboDog", lang: "HTML" },
  { name: "AI-Object-Recognition--task2", url: "https://github.com/HZCS-IoT/AI-Object-Recognition--task2", lang: "Python" },
  { name: "Classification-model-AI-task1", url: "https://github.com/HZCS-IoT/Classification-model-AI-task1", lang: "Python" },
  { name: "Electronics-task4", url: "https://github.com/HZCS-IoT/Electronics-task4", lang: "C++" },
  { name: "WebDev-BrokenBot-task3-", url: "https://github.com/HZCS-IoT/WebDev-BrokenBot-task3-", lang: "JavaScript" },
  { name: "mechanics-Algorithm-exploded-view-", url: "https://github.com/HZCS-IoT/mechanics-Algorithm-exploded-view-", lang: "CAD" },
  { name: "ROS2-Humble-installation", url: "https://github.com/HZCS-IoT/ROS2-Humble-installation", lang: "ROS 2" },
];
