const timelineRoadmaps = {
  // --- MAIN 18 DOMAINS ---
  "Technology & IT": [
    {
      id: "Class 10",
      title: "Class 10th - Foundation",
      content: {
        focus: "Math + Logic building",
        skills: ["Basic coding", "Logical reasoning"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Tech Focus",
      content: {
        focus: "Science stream + Computer elective",
        skills: ["Python/C++ basics", "Analytical thinking"],
        exams: ["JEE Mains", "CUET"]
      }
    },
    {
      id: "College",
      title: "College (B.Tech/BCA/BSc)",
      content: {
        focus: "Core computer science fundamentals",
        skills: ["Data Structures & Algorithms", "Full Stack Web Dev"],
        courses: ["Database Management (DBMS)", "Operating Systems"]
      }
    },
    {
      id: "Career",
      title: "Technology Career",
      content: {
        focus: "Industry-ready professional work",
        skills: ["System Design", "Cloud Computing"],
        opportunities: ["Software Developer", "DevOps Engineer", "Cloud Architect"]
      }
    }
  ],
  "Medical & Healthcare": [
    {
      id: "Class 10",
      title: "Class 10th - Biology Basics",
      content: {
        focus: "Science & Human physiology",
        skills: ["Scientific Observation", "Memorization"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - PCB Preparation",
      content: {
        focus: "Physics, Chemistry, Biology stream",
        skills: ["Lab experimentation", "Anatomical terms"],
        exams: ["NEET-UG"]
      }
    },
    {
      id: "College",
      title: "Medical School (MBBS/BDS)",
      content: {
        focus: "Clinical sciences and diagnostics",
        skills: ["Clinical Diagnosis", "Patient Care"],
        courses: ["Anatomy", "Pathology", "Pharmacology"]
      }
    },
    {
      id: "Career",
      title: "Healthcare Practice",
      content: {
        focus: "Patient welfare and specialization",
        skills: ["Empathy", "Surgical Basics"],
        opportunities: ["General Physician", "Surgeon", "Pediatrician"]
      }
    }
  ],
  "Government Services": [
    {
      id: "Class 10",
      title: "Class 10th - Civic Foundation",
      content: {
        focus: "Social Sciences and Civics",
        skills: ["General Knowledge", "Critical reading"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - General Awareness",
      content: {
        focus: "Arts stream or general subjects",
        skills: ["Essay Writing", "Polity awareness"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "College",
      title: "College (Any stream) + Prep",
      content: {
        focus: "UPSC/State PSC exam curriculum",
        skills: ["Analytical Thinking", "Ethics"],
        courses: ["Indian History", "Public Administration"]
      }
    },
    {
      id: "Career",
      title: "Public Administration",
      content: {
        focus: "Welfare policy implementation",
        skills: ["Leadership", "Crisis Management"],
        opportunities: ["IAS Officer", "IPS Officer", "Revenue Inspector"]
      }
    }
  ],
  "Business & Entrepreneurship": [
    {
      id: "Class 10",
      title: "Class 10th - Basic Finance",
      content: {
        focus: "Mathematics and commerce base",
        skills: ["Basic calculation", "Communication"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Business Basics",
      content: {
        focus: "Commerce stream (Accounts & Business)",
        skills: ["Economic Analysis", "Market understanding"],
        exams: ["Boards", "CUET"]
      }
    },
    {
      id: "College",
      title: "College (BBA/B.Com/MBA)",
      content: {
        focus: "Marketing, operations, and finance",
        skills: ["Pitching & Funding", "Team Management"],
        courses: ["Business Ethics", "Corporate Finance"]
      }
    },
    {
      id: "Career",
      title: "Startup & Scale Phase",
      content: {
        focus: "Value creation and monetization",
        skills: ["Risk Assessment", "Strategic Networking"],
        opportunities: ["Startup Founder", "Product Manager", "Business Analyst"]
      }
    }
  ],
  "Education & Teaching": [
    {
      id: "Class 10",
      title: "Class 10th - Communication",
      content: {
        focus: "All-round academic performance",
        skills: ["Reading", "Presentation skills"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Subject Interest",
      content: {
        focus: "Choosing a core domain of interest",
        skills: ["Explaining complex ideas", "Patience"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "College",
      title: "Graduation + B.Ed / Teaching course",
      content: {
        focus: "Pedagogical methodologies",
        skills: ["Curriculum Design", "Classroom Management"],
        courses: ["Child Psychology", "Education Philosophy"]
      }
    },
    {
      id: "Career",
      title: "Education Sector",
      content: {
        focus: "Student mentorship & curriculum delivery",
        skills: ["Public Speaking", "Instructional Design"],
        opportunities: ["High School Teacher", "College Professor", "Tutor"]
      }
    }
  ],
  "Arts & Creativity": [
    {
      id: "Class 10",
      title: "Class 10th - Art & Sketching",
      content: {
        focus: "Visual and craft exploration",
        skills: ["Drawing", "Observation"],
        exams: ["School competitions"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Design Portfolio",
      content: {
        focus: "Aesthetics and digital art basics",
        skills: ["Color theory", "Visual storytelling"],
        exams: ["Fine Art Boards", "NID/UCEED prelims"]
      }
    },
    {
      id: "College",
      title: "College (BFA / B.Des)",
      content: {
        focus: "Professional creative techniques",
        skills: ["Adobe Suite", "3D Modeling"],
        courses: ["Art History", "Design Thinking"]
      }
    },
    {
      id: "Career",
      title: "Creative Career",
      content: {
        focus: "Commercial design and self-expression",
        skills: ["Freelance management", "Networking"],
        opportunities: ["Graphic Designer", "UI/UX Designer", "Art Director"]
      }
    }
  ],
  "Sports & Fitness": [
    {
      id: "Class 10",
      title: "Class 10th - Athletics",
      content: {
        focus: "Physical fitness and agility",
        skills: ["Endurance", "Basic sports skills"],
        exams: ["School Sports Meets"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Competitive",
      content: {
        focus: "District and State tournaments",
        skills: ["Strength training", "Strategic play"],
        exams: ["State Federation Trials"]
      }
    },
    {
      id: "College",
      title: "College (BPEd / Academy)",
      content: {
        focus: "Professional training & coaching physics",
        skills: ["Advanced conditioning", "Dietetics"],
        courses: ["Kinesiology", "Sports Nutrition"]
      }
    },
    {
      id: "Career",
      title: "Sports & Fitness Path",
      content: {
        focus: "Professional competition & coaching",
        skills: ["Leadership", "Discipline"],
        opportunities: ["Professional Athlete", "Sports Coach", "Fitness Trainer"]
      }
    }
  ],
  "Law & Legal Services": [
    {
      id: "Class 10",
      title: "Class 10th - Logical Base",
      content: {
        focus: "Civics, language, and logic",
        skills: ["Critical Reading", "Debating"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - CLAT Prep",
      content: {
        focus: "Humanities stream + GK",
        skills: ["Analytical reasoning", "Legal awareness"],
        exams: ["CLAT", "AILET", "LSAT"]
      }
    },
    {
      id: "College",
      title: "Law School (BA LLB/BBA LLB)",
      content: {
        focus: "Constitutional and corporate law",
        skills: ["Legal Research", "Drafting"],
        courses: ["Jurisprudence", "Contract Law", "Criminal Law"]
      }
    },
    {
      id: "Career",
      title: "Legal Practice",
      content: {
        focus: "Client advocacy & advisory",
        skills: ["Negotiation", "Oratory"],
        opportunities: ["Advocate", "Corporate Lawyer", "Legal Analyst"]
      }
    }
  ],
  "Finance & Commerce": [
    {
      id: "Class 10",
      title: "Class 10th - Math Base",
      content: {
        focus: "Mathematics and percentages",
        skills: ["Calculation speed", "Data interpretation"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Commerce stream",
      content: {
        focus: "Accountancy and economics basics",
        skills: ["Bookkeeping", "Economic theory"],
        exams: ["Boards", "CA Foundation"]
      }
    },
    {
      id: "College",
      title: "College (B.Com / CA articleship)",
      content: {
        focus: "Financial systems and corporate taxation",
        skills: ["Financial Analysis", "Auditing"],
        courses: ["Cost Accounting", "Corporate Law"]
      }
    },
    {
      id: "Career",
      title: "Finance Professional",
      content: {
        focus: "Fiduciary management and auditing",
        skills: ["Tax Compliance", "Investment Advisory"],
        opportunities: ["Chartered Accountant", "Financial Analyst", "Tax Consultant"]
      }
    }
  ],
  "Agriculture & Rural Development": [
    {
      id: "Class 10",
      title: "Class 10th - Geography",
      content: {
        focus: "Geography and environmental biology",
        skills: ["Observation", "Basic scientific inquiry"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Agri/Biology",
      content: {
        focus: "Science stream with Botany/Chemistry",
        skills: ["Lab testing", "Field study"],
        exams: ["ICAR AIEEA"]
      }
    },
    {
      id: "College",
      title: "College (BSc Agriculture)",
      content: {
        focus: "Soil chemistry, crop yields, and rural economics",
        skills: ["Soil Analysis", "Farm management"],
        courses: ["Agronomy", "Plant Genetics", "Agri-machinery"]
      }
    },
    {
      id: "Career",
      title: "Agricultural Services",
      content: {
        focus: "Technological farm modernization",
        skills: ["Agri-business strategy", "Sustainable farming"],
        opportunities: ["Agricultural Officer", "Agronomist", "Agri-Entrepreneur"]
      }
    }
  ],
  "Beauty & Wellness": [
    {
      id: "Class 10",
      title: "Class 10th - Communication",
      content: {
        focus: "Social communication & personal hygiene",
        skills: ["Active listening", "Basic grooming"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Vocational Beauty",
      content: {
        focus: "Introduction to aesthetic care & cosmetics",
        skills: ["Styling basics", "Skin analysis"],
        exams: ["Vocational Boards"]
      }
    },
    {
      id: "College",
      title: "Cosmetology School (CIDESCO)",
      content: {
        focus: "Skin science, therapies, and cosmetology",
        skills: ["Therapeutic massage", "Aesthetic treatment"],
        courses: ["Cosmetic Chemistry", "Skin Biology", "Salon Management"]
      }
    },
    {
      id: "Career",
      title: "Beauty & Wellness Specialist",
      content: {
        focus: "Client wellness & visual artistry",
        skills: ["Customer care", "Business operations"],
        opportunities: ["Cosmetologist", "Makeup Artist", "Spa Consultant"]
      }
    }
  ],
  "Homemaker & Home Business": [
    {
      id: "Class 10",
      title: "Class 10th - Practical Skills",
      content: {
        focus: "Household resource management",
        skills: ["Cooking/Crafts", "Micro-saving"],
        exams: ["School crafts"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Digital Literacy",
      content: {
        focus: "General studies and social media basics",
        skills: ["Digital navigation", "Product photography"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "College",
      title: "Vocational Diplomas (Home business)",
      content: {
        focus: "Micro-entrepreneurship and product development",
        skills: ["Online shop management", "Cost estimation"],
        courses: ["Micro-finance", "Marketing on Instagram", "FSSAI Safety"]
      }
    },
    {
      id: "Career",
      title: "Home Entrepreneur",
      content: {
        focus: "Sustaining home-based businesses",
        skills: ["Customer support", "Packaging & delivery"],
        opportunities: ["Home-business Owner", "Online Instructor", "Artisan"]
      }
    }
  ],
  "Media & Communication": [
    {
      id: "Class 10",
      title: "Class 10th - Language arts",
      content: {
        focus: "English/Vernacular writing and debates",
        skills: ["Grammar", "Confidence in speech"],
        exams: ["School debates"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Mass Media Elective",
      content: {
        focus: "Humanities with journalism basics",
        skills: ["Content Writing", "Social media content"],
        exams: ["CUET", "State CETs"]
      }
    },
    {
      id: "College",
      title: "College (BJMC / Journalism)",
      content: {
        focus: "Broadcasting and editorial writing",
        skills: ["Video Editing", "PR Strategy"],
        courses: ["Media Laws & Ethics", "News Reporting"]
      }
    },
    {
      id: "Career",
      title: "Media Career",
      content: {
        focus: "Information curation and audience reach",
        skills: ["Public Relations", "Brand Storytelling"],
        opportunities: ["Journalist", "Public Relations Officer", "Video Editor"]
      }
    }
  ],
  "Defence & Security": [
    {
      id: "Class 10",
      title: "Class 10th - Athletic Routine",
      content: {
        focus: "Physical education and science stream prep",
        skills: ["Physical stamina", "First Aid basics"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Science (PCM)",
      content: {
        focus: "Physics, Chemistry, and Mathematics",
        skills: ["Discipline", "Stress tolerance"],
        exams: ["NDA written exam"]
      }
    },
    {
      id: "College",
      title: "NDA Academy / CDS Entry",
      content: {
        focus: "Tactical training & military science",
        skills: ["Weapons handling", "Navigational tactics"],
        courses: ["Military Tactics", "Strategic Defence studies"]
      }
    },
    {
      id: "Career",
      title: "Military Commission",
      content: {
        focus: "Serving the nation & tactical leadership",
        skills: ["Command operations", "Survival skills"],
        opportunities: ["Army Officer", "Navy Officer", "Air Force Officer"]
      }
    }
  ],
  "Social Service & NGO": [
    {
      id: "Class 10",
      title: "Class 10th - Volunteering",
      content: {
        focus: "Civics and community outreach",
        skills: ["Empathy", "Group collaboration"],
        exams: ["Local NGO certificate"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Sociology focus",
      content: {
        focus: "Humanities focusing on social structures",
        skills: ["Report writing", "Social problem identification"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "College",
      title: "College (BSW / MSW)",
      content: {
        focus: "Rural welfare, sociology, and NGO policies",
        skills: ["Grant Writing", "Fundraising"],
        courses: ["Social Work Methods", "Human Rights", "CSR Policy"]
      }
    },
    {
      id: "Career",
      title: "Social Development",
      content: {
        focus: "Poverty alleviation & community upliftment",
        skills: ["Social Advocacy", "Project Coordination"],
        opportunities: ["NGO Director", "Social Worker", "CSR Manager"]
      }
    }
  ],
  "Hospitality & Tourism": [
    {
      id: "Class 10",
      title: "Class 10th - Languages",
      content: {
        focus: "Language fluency and customer handling",
        skills: ["Polite communication", "Multi-tasking"],
        exams: ["School cultural coordination"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Entrance prep",
      content: {
        focus: "Preparing for hotel management test",
        skills: ["Interpersonal charm", "Problem solving"],
        exams: ["NCHMCT JEE"]
      }
    },
    {
      id: "College",
      title: "College (BHM / Hotel Management)",
      content: {
        focus: "Front office, culinary arts, and housekeeping",
        skills: ["Guest Relationship Management", "Operations control"],
        courses: ["F&B Management", "Front Office Operations"]
      }
    },
    {
      id: "Career",
      title: "Hospitality Career",
      content: {
        focus: "Quality service delivery & hotel administration",
        skills: ["Hospitality sales", "Team supervision"],
        opportunities: ["Hotel General Manager", "Tour Guide", "Event Planner"]
      }
    }
  ],
  "Research & Science": [
    {
      id: "Class 10",
      title: "Class 10th - Math & Science",
      content: {
        focus: "Analytical physics and chemistry labs",
        skills: ["Scientific method", "Hypothesis building"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Science (PCM/PCB)",
      content: {
        focus: "Rigorous science theory and research prep",
        skills: ["Advanced Mathematics", "Lab safety"],
        exams: ["IISER Aptitude Test (IAT)", "NEST"]
      }
    },
    {
      id: "College",
      title: "College (BS-MS / MSc)",
      content: {
        focus: "Specialized scientific studies and research projects",
        skills: ["Lab tools operation", "Academic publishing"],
        courses: ["Quantum Mechanics/Genetics", "Statistical Analysis"]
      }
    },
    {
      id: "Career",
      title: "Scientific Research",
      content: {
        focus: "Scientific discovery and technological breakthroughs",
        skills: ["Funding proposal drafting", "Python/R analytics"],
        opportunities: ["Research Scientist", "Lab Director", "R&D Lead"]
      }
    }
  ],
  "Skilled Trades & Vocational Careers": [
    {
      id: "Class 10",
      title: "Class 10th - Practical Shop",
      content: {
        focus: "Geometry, simple physics, and manual handling",
        skills: ["Tool usage", "Safety rules"],
        exams: ["School craft courses"]
      }
    },
    {
      id: "Class 12",
      title: "ITI Trade School Selection",
      content: {
        focus: "Technical trades (electrical, machining, plumbing)",
        skills: ["Trade blueprints", "Troubleshooting"],
        exams: ["State ITI Entrances"]
      }
    },
    {
      id: "College",
      title: "Apprenticeship & Licensing",
      content: {
        focus: "Hands-on field experience",
        skills: ["Machinery operations", "State electrical codes"],
        courses: ["OSHA Safety Standards", "Electrical blueprint design"]
      }
    },
    {
      id: "Career",
      title: "Precision Trades",
      content: {
        focus: "On-site infrastructure delivery",
        skills: ["Technical maintenance", "Business Contracting"],
        opportunities: ["Industrial Electrician", "Welder", "HVAC Contractor"]
      }
    }
  ],

  // --- ALIASES FOR BACKWARD COMPATIBILITY ---
  "Developer": [
    {
      id: "Class 10",
      title: "Class 10th - Foundation",
      content: {
        focus: "Math + Logic building",
        skills: ["Basic coding", "Logical reasoning"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Tech Focus",
      content: {
        focus: "Science stream + Computer elective",
        skills: ["Python/C++ basics", "Analytical thinking"],
        exams: ["JEE Mains", "CUET"]
      }
    },
    {
      id: "College",
      title: "College (B.Tech/BCA/BSc)",
      content: {
        focus: "Core computer science fundamentals",
        skills: ["Data Structures & Algorithms", "Full Stack Web Dev"],
        courses: ["Database Management (DBMS)", "Operating Systems"]
      }
    },
    {
      id: "Career",
      title: "Technology Career",
      content: {
        focus: "Industry-ready professional work",
        skills: ["System Design", "Cloud Computing"],
        opportunities: ["Software Developer", "DevOps Engineer", "Cloud Architect"]
      }
    }
  ],
  "Doctor": [
    {
      id: "Class 10",
      title: "Class 10th - Biology Basics",
      content: {
        focus: "Science & Human physiology",
        skills: ["Scientific Observation", "Memorization"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - PCB Preparation",
      content: {
        focus: "Physics, Chemistry, Biology stream",
        skills: ["Lab experimentation", "Anatomical terms"],
        exams: ["NEET-UG"]
      }
    },
    {
      id: "College",
      title: "Medical School (MBBS/BDS)",
      content: {
        focus: "Clinical sciences and diagnostics",
        skills: ["Clinical Diagnosis", "Patient Care"],
        courses: ["Anatomy", "Pathology", "Pharmacology"]
      }
    },
    {
      id: "Career",
      title: "Healthcare Practice",
      content: {
        focus: "Patient welfare and specialization",
        skills: ["Empathy", "Surgical Basics"],
        opportunities: ["General Physician", "Surgeon", "Pediatrician"]
      }
    }
  ],
  "Teacher": [
    {
      id: "Class 10",
      title: "Class 10th - Communication",
      content: {
        focus: "All-round academic performance",
        skills: ["Reading", "Presentation skills"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Subject Interest",
      content: {
        focus: "Choosing a core domain of interest",
        skills: ["Explaining complex ideas", "Patience"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "College",
      title: "Graduation + B.Ed / Teaching course",
      content: {
        focus: "Pedagogical methodologies",
        skills: ["Curriculum Design", "Classroom Management"],
        courses: ["Child Psychology", "Education Philosophy"]
      }
    },
    {
      id: "Career",
      title: "Education Sector",
      content: {
        focus: "Student mentorship & curriculum delivery",
        skills: ["Public Speaking", "Instructional Design"],
        opportunities: ["High School Teacher", "College Professor", "Tutor"]
      }
    }
  ],
  "CivilServant": [
    {
      id: "Class 10",
      title: "Class 10th - Civic Foundation",
      content: {
        focus: "Social Sciences and Civics",
        skills: ["General Knowledge", "Critical reading"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - General Awareness",
      content: {
        focus: "Arts stream or general subjects",
        skills: ["Essay Writing", "Polity awareness"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "College",
      title: "College (Any stream) + Prep",
      content: {
        focus: "UPSC/State PSC exam curriculum",
        skills: ["Analytical Thinking", "Ethics"],
        courses: ["Indian History", "Public Administration"]
      }
    },
    {
      id: "Career",
      title: "Public Administration",
      content: {
        focus: "Welfare policy implementation",
        skills: ["Leadership", "Crisis Management"],
        opportunities: ["IAS Officer", "IPS Officer", "Revenue Inspector"]
      }
    }
  ],
  "Athlete": [
    {
      id: "Class 10",
      title: "Class 10th - Athletics",
      content: {
        focus: "Physical fitness and agility",
        skills: ["Endurance", "Basic sports skills"],
        exams: ["School Sports Meets"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Competitive",
      content: {
        focus: "District and State tournaments",
        skills: ["Strength training", "Strategic play"],
        exams: ["State Federation Trials"]
      }
    },
    {
      id: "College",
      title: "College (BPEd / Academy)",
      content: {
        focus: "Professional training & coaching physics",
        skills: ["Advanced conditioning", "Dietetics"],
        courses: ["Kinesiology", "Sports Nutrition"]
      }
    },
    {
      id: "Career",
      title: "Sports & Fitness Path",
      content: {
        focus: "Professional competition & coaching",
        skills: ["Leadership", "Discipline"],
        opportunities: ["Professional Athlete", "Sports Coach", "Fitness Trainer"]
      }
    }
  ],
  "Artist": [
    {
      id: "Class 10",
      title: "Class 10th - Art & Sketching",
      content: {
        focus: "Visual and craft exploration",
        skills: ["Drawing", "Observation"],
        exams: ["School competitions"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Design Portfolio",
      content: {
        focus: "Aesthetics and digital art basics",
        skills: ["Color theory", "Visual storytelling"],
        exams: ["Fine Art Boards", "NID/UCEED prelims"]
      }
    },
    {
      id: "College",
      title: "College (BFA / B.Des)",
      content: {
        focus: "Professional creative techniques",
        skills: ["Adobe Suite", "3D Modeling"],
        courses: ["Art History", "Design Thinking"]
      }
    },
    {
      id: "Career",
      title: "Creative Career",
      content: {
        focus: "Commercial design and self-expression",
        skills: ["Freelance management", "Networking"],
        opportunities: ["Graphic Designer", "UI/UX Designer", "Art Director"]
      }
    }
  ],
  "Entrepreneur": [
    {
      id: "Class 10",
      title: "Class 10th - Basic Finance",
      content: {
        focus: "Mathematics and commerce base",
        skills: ["Basic calculation", "Communication"],
        exams: ["Board Exams"]
      }
    },
    {
      id: "Class 12",
      title: "Class 12th - Business Basics",
      content: {
        focus: "Commerce stream (Accounts & Business)",
        skills: ["Economic Analysis", "Market understanding"],
        exams: ["Boards", "CUET"]
      }
    },
    {
      id: "College",
      title: "College (BBA/B.Com/MBA)",
      content: {
        focus: "Marketing, operations, and finance",
        skills: ["Pitching & Funding", "Team Management"],
        courses: ["Business Ethics", "Corporate Finance"]
      }
    },
    {
      id: "Career",
      title: "Startup & Scale Phase",
      content: {
        focus: "Value creation and monetization",
        skills: ["Risk Assessment", "Strategic Networking"],
        opportunities: ["Startup Founder", "Product Manager", "Business Analyst"]
      }
    }
  ]
};

export default timelineRoadmaps;
