const careerRoadmaps = {
  // --- ALIASES FOR BACKWARD COMPATIBILITY ---
  "Developer": {
    title: { en: "Technology & IT", hi: "प्रौद्योगिकी और आईटी" },
    description: { en: "Design, build, and maintain software, networks, and IT infrastructure.", hi: "सॉफ्टवेयर, नेटवर्क और आईटी इंफ्रास्ट्रक्चर का डिजाइन, निर्माण और रखरखाव करें।" },
    steps: [
      { step: 1, title: "Class 10th Foundation", description: "Focus on Mathematics, Science, and logical thinking." },
      { step: 2, title: "Class 12th Selection", description: "Select Science stream with Computer Science/Mathematics." },
      { step: 3, title: "Graduation (B.Tech/BCA/BSc)", description: "Complete B.Tech (CSE), BCA, or BSc Computer Science degree." },
      { step: 4, title: "Practical Internships", description: "Acquire hands-on experience in software companies." },
      { step: 5, title: "Industry Entry", description: "Get hired as a Junior Developer, Software Engineer, or QA Engineer." }
    ],
    skills: ["Programming (Python, JS, Java)", "Data Structures & Algorithms", "System Design", "Cloud Computing", "Database Management (SQL/NoSQL)"],
    entranceExams: ["JEE Mains", "JEE Advanced", "GATE", "CUET"],
    certifications: ["AWS Certified Solutions Architect", "Google Professional Cloud Developer", "Cisco CCNA", "Scrum Master"],
    opportunities: ["Software Developer", "Cloud Architect", "DevOps Engineer", "Cyber Security Analyst", "Systems Engineer"],
    salary: "₹4.5 LPA - ₹25+ LPA",
    growth: "Rapid advancement to Senior Developer, Tech Lead, Solutions Architect, and CTO roles.",
    schemes: [
      { name: "AICTE Pragati Scholarship", link: "https://www.aicte-india.gov.in/" },
      { name: "Digital India Internship Scheme", link: "https://digitalindia.gov.in/" },
      { name: "PM Kaushal Vikas Yojana (PMKVY) IT Courses", link: "https://www.pmkvyofficial.org/" }
    ]
  },
  "Doctor": {
    title: { en: "Medical & Healthcare", hi: "चिकित्सा और स्वास्थ्य सेवा" },
    description: { en: "Diagnose, treat, and care for patient health and well-being.", hi: "मरीजों के स्वास्थ्य और कल्याण का निदान, उपचार और देखभाल करें।" },
    steps: [
      { step: 1, title: "Class 10th Basics", description: "Strong focus on science subjects and human biology." },
      { step: 2, title: "Class 12th PCB Focus", description: "Choose Science stream with Physics, Chemistry, and Biology (PCB)." },
      { step: 3, title: "Clear NEET-UG", description: "Prepare for and clear NEET-UG to enter medical colleges." },
      { step: 4, title: "MBBS Graduation", description: "Complete MBBS degree along with a 1-year compulsory internship." },
      { step: 5, title: "Post Graduation & Practice", description: "Pursue MD/MS and register with the National Medical Commission (NMC)." }
    ],
    skills: ["Clinical Diagnosis", "Anatomy & Physiology", "Patient Care & Empathy", "Critical Thinking", "Surgical Basics"],
    entranceExams: ["NEET-UG", "NEET-PG", "INI-CET"],
    certifications: ["ACLS (Advanced Cardiovascular Life Support)", "BLS (Basic Life Support)", "NMC Registration"],
    opportunities: ["General Physician", "Surgeon", "Pediatrician", "Healthcare Administrator", "Medical Officer"],
    salary: "₹6.0 LPA - ₹30+ LPA",
    growth: "Progress to Medical Director, Hospital Superintendent, or independent clinic owner.",
    schemes: [
      { name: "National Scholarship Portal", link: "https://scholarships.gov.in/" },
      { name: "Nursing Scholarship Programs", link: "https://dghs.gov.in/" },
      { name: "Ayushman Bharat Training Programs", link: "https://pmjay.gov.in/" }
    ]
  },
  "Teacher": {
    title: { en: "Education & Teaching", hi: "शिक्षा एवं शिक्षण" },
    description: { en: "Inspire and educate students, design curricula, and contribute to academic research.", hi: "छात्रों को प्रेरित और शिक्षित करें, पाठ्यक्रम डिजाइन करें, और शैक्षणिक अनुसंधान में योगदान दें।" },
    steps: [
      { step: 1, title: "Class 10th Foundations", description: "Focus on general subjects, communication, and confidence." },
      { step: 2, title: "Class 12th Stream Choice", description: "Choose any stream of interest and achieve excellent board results." },
      { step: 3, title: "Bachelor's Degree + B.Ed", description: "Complete a Bachelor's degree (BA/BSc) and Bachelor of Education (B.Ed)." },
      { step: 4, title: "Eligibility Tests (CTET/TET)", description: "Clear CTET or state-level TET exams to qualify for school jobs." },
      { step: 5, title: "Higher Education / Lecture", description: "Complete Master's degree and UGC NET for college lecturer positions." }
    ],
    skills: ["Pedagogical Methods", "Public Speaking", "Patience & Empathy", "Curriculum Design", "Classroom Management"],
    entranceExams: ["CTET", "State TET", "UGC NET", "State SET", "B.Ed Entrances"],
    certifications: ["B.Ed Certificate", "M.Ed Certificate", "TEFL/TESOL (for English teaching)"],
    opportunities: ["Primary School Teacher", "High School Teacher", "College Professor", "Curriculum Developer", "Academic Counselor"],
    salary: "₹3.6 LPA - ₹15+ LPA",
    growth: "Promotion to Head of Department, School Principal, Academic Director, or University Registrar.",
    schemes: [
      { name: "NISHTHA Teacher Training Program", link: "https://nishtha.ncert.gov.in/" },
      { name: "National Fellowship for Higher Education", link: "https://scholarships.gov.in/" }
    ]
  },
  "CivilServant": {
    title: { en: "Government Services", hi: "सरकारी सेवाएं" },
    description: { en: "Manage public administration, formulate policies, and execute government welfare programs.", hi: "सार्वजनिक प्रशासन का प्रबंधन करें, नीतियों को तैयार करें और सरकारी कल्याण कार्यक्रमों को निष्पादित करें।" },
    steps: [
      { step: 1, title: "Class 10th Civics", description: "Build interest in history, geography, and current affairs." },
      { step: 2, title: "Class 12th Humanities/Any", description: "Study diverse subjects; arts/humanities provide a strong base." },
      { step: 3, title: "Graduation (Any Field)", description: "Obtain a Bachelor's degree in any field (mandatory for civil exams)." },
      { step: 4, title: "UPSC / State PSC Prep", description: "Dedicate 1-2 years for systematic study of CSE syllabus." },
      { step: 5, title: "Clearing Exam & Academy", description: "Pass Prelims, Mains, and Interview to join elite training (e.g. LBSNAA)." }
    ],
    skills: ["Public Administration", "Policy Formulation", "Leadership & Integrity", "Analytical Writing", "Decision Making"],
    entranceExams: ["UPSC Civil Services Exam", "SSC CGL", "State PSC Exams", "IBPS PO"],
    certifications: ["LBSNAA Training Certificate", "National Academy of Customs / Taxes Certificates"],
    opportunities: ["IAS Officer", "IPS Officer", "IFS Officer", "Deputy Collector", "Tax Commissioner"],
    salary: "₹7.0 LPA - ₹20+ LPA",
    growth: "Promoted to Joint Secretary, District Magistrate, Chief Secretary, or Union Cabinet Secretary.",
    schemes: [
      { name: "Free UPSC Coaching Schemes for SC/ST/OBC", link: "https://socialjustice.gov.in/" },
      { name: "UPSC Official Portal Guidance", link: "https://upsc.gov.in/" }
    ]
  },
  "Athlete": {
    title: { en: "Sports & Fitness", hi: "खेल और फिटनेस" },
    description: { en: "Compete in professional athletics, coach sports teams, or lead fitness operations.", hi: "पेशेवर एथलेटिक्स में प्रतिस्पर्धा करें, खेल टीमों को प्रशिक्षित करें, या फिटनेस संचालन का नेतृत्व करें।" },
    steps: [
      { step: 1, title: "Class 10th Fitness", description: "Establish physical agility, endurance, and learn sports rules." },
      { step: 2, title: "Class 12th Academy Join", description: "Enroll in regional sports academies and participate in local tournaments." },
      { step: 3, title: "Competitive Tournaments", description: "Participate in District, State, and National championships." },
      { step: 4, title: "BPEd / Sports Science", description: "Complete Bachelor of Physical Education (BPEd) for formal coaching routes." },
      { step: 5, title: "Professional Athlete/Coach", description: "Compete in national leagues, Olympics, or become certified sports trainers." }
    ],
    skills: ["Physical Endurance & Conditioning", "Agility & Teamwork", "Discipline & Sportsmanship", "First Aid", "Sports Psychology"],
    entranceExams: ["SAI Selection Trials", "BPEd Entrance Exams", "National Sports Federation Trials"],
    certifications: ["NSNIS Coaching Diploma", "ACSM Personal Trainer Certification", "Sports Nutritionist Certificate"],
    opportunities: ["Professional Athlete", "Sports Coach", "Fitness Instructor", "Sports Administrator", "Physiotherapist"],
    salary: "₹3.0 LPA - ₹20+ LPA",
    growth: "Advance to National Team Coach, Sports Academy Director, or Fitness Brand Consultant.",
    schemes: [
      { name: "Khelo India Scholarship", link: "https://kheloindia.gov.in/" },
      { name: "Sports Authority of India (SAI) Grants", link: "https://sportsauthorityofindia.nic.in/" }
    ]
  },
  "Artist": {
    title: { en: "Arts & Creativity", hi: "कला और रचनात्मकता" },
    description: { en: "Express ideas and emotions through visual arts, design, music, performing arts, and writing.", hi: "दृश्य कला, डिजाइन, संगीत, प्रदर्शन कला और लेखन के माध्यम से विचारों और भावनाओं को व्यक्त करें।" },
    steps: [
      { step: 1, title: "Class 10th Art Focus", description: "Practice drawing, sketching, crafting, or music basics." },
      { step: 2, title: "Class 12th Fine Arts", description: "Choose Humanities with Fine Arts or prepare design portfolios." },
      { step: 3, title: "Graduation (BFA/B.Des)", description: "Complete Bachelor of Fine Arts (BFA) or Bachelor of Design (B.Des)." },
      { step: 4, title: "Portfolio Exhibition", description: "Build a physical and digital portfolio and exhibit in local galleries." },
      { step: 5, title: "Creative Professional", description: "Launch career as a Freelance Artist, UI/UX Designer, or Illustrator." }
    ],
    skills: ["Visual Composition", "Creative Writing/Expression", "Digital Software (Adobe Creative Suite)", "Aesthetic Sense", "Craftsmanship"],
    entranceExams: ["NID DAT", "UCEED", "NIFT Entrance Exam", "BFA Entrances"],
    certifications: ["Adobe Certified Professional", "UI/UX Design Certification", "3D Animation Course Certificate"],
    opportunities: ["Graphic Designer", "Fine Artist", "UI/UX Designer", "Illustrator", "Art Director"],
    salary: "₹3.0 LPA - ₹18+ LPA",
    growth: "Advance to Creative Director, Art Studio Owner, Animation Head, or Design Consultant.",
    schemes: [
      { name: "Kala Sanskriti Vikas Yojana", link: "https://indiaculture.gov.in/" },
      { name: "National Scholarship for Young Artists", link: "https://indiaculture.gov.in/" }
    ]
  },
  "Entrepreneur": {
    title: { en: "Business & Entrepreneurship", hi: "व्यापार और उद्यमिता" },
    description: { en: "Launch startups, manage businesses, and build innovative products or services.", hi: "स्टार्टअप शुरू करें, व्यवसायों का प्रबंधन करें, और नवीन उत्पाद या सेवाएं बनाएं।" },
    steps: [
      { step: 1, title: "Class 10th Commerce", description: "Understand basic mathematics, marketing, and business concepts." },
      { step: 2, title: "Class 12th Business Studies", description: "Select Commerce stream focusing on Business Studies, Accountancy, and Economics." },
      { step: 3, title: "Business Graduation/MBA", description: "Pursue BBA, B.Com, or an MBA to learn professional management." },
      { step: 4, title: "Market Research & MVP", description: "Identify a customer problem, build a Minimum Viable Product (MVP), and validate." },
      { step: 5, title: "Business Setup & Scaling", description: "Register the company, secure seed funding, and scale operations." }
    ],
    skills: ["Business Strategy", "Financial Planning & Management", "Negotiation & Leadership", "Marketing & Growth Hacking", "Risk Management"],
    entranceExams: ["CAT", "MAT", "XAT", "GMAT"],
    certifications: ["Project Management Professional (PMP)", "Product Management Certificate", "Google Digital Marketing Course"],
    opportunities: ["Founder / CEO", "Product Manager", "Business Analyst", "Strategy Consultant", "venture Capitalist"],
    salary: "Variable (₹6.0 LPA base to high profit equity)",
    growth: "Establish multi-national enterprise, launch Initial Public Offering (IPO), or become an Angel Investor.",
    schemes: [
      { name: "PM Mudra Yojana", link: "https://www.mudra.org.in/" },
      { name: "Startup India Seed Fund Scheme", link: "https://www.startupindia.gov.in/" },
      { name: "Stand-Up India Scheme for Women", link: "https://www.standupmitra.in/" }
    ]
  },

  // --- THE 18 MAIN CORE DOMAINS ---
  "Technology & IT": {
    title: { en: "Technology & IT", hi: "प्रौद्योगिकी और आईटी" },
    description: { en: "Design, build, and maintain software, networks, and IT infrastructure.", hi: "सॉफ्टवेयर, नेटवर्क और आईटी इंफ्रास्ट्रक्चर का डिजाइन, निर्माण और रखरखाव करें।" },
    steps: [
      { step: 1, title: "Class 10th Foundation", description: "Focus on Mathematics, Science, and logical thinking." },
      { step: 2, title: "Class 12th Selection", description: "Select Science stream with Computer Science/Mathematics." },
      { step: 3, title: "Graduation (B.Tech/BCA/BSc)", description: "Complete B.Tech (CSE), BCA, or BSc Computer Science degree." },
      { step: 4, title: "Practical Internships", description: "Acquire hands-on experience in software companies." },
      { step: 5, title: "Industry Entry", description: "Get hired as a Junior Developer, Software Engineer, or QA Engineer." }
    ],
    skills: ["Programming (Python, JS, Java)", "Data Structures & Algorithms", "System Design", "Cloud Computing", "Database Management (SQL/NoSQL)"],
    entranceExams: ["JEE Mains", "JEE Advanced", "GATE", "CUET"],
    certifications: ["AWS Certified Solutions Architect", "Google Professional Cloud Developer", "Cisco CCNA", "Scrum Master"],
    opportunities: ["Software Developer", "Cloud Architect", "DevOps Engineer", "Cyber Security Analyst", "Systems Engineer"],
    salary: "₹4.5 LPA - ₹25+ LPA",
    growth: "Rapid advancement to Senior Developer, Tech Lead, Solutions Architect, and CTO roles.",
    schemes: [
      { name: "AICTE Pragati Scholarship", link: "https://www.aicte-india.gov.in/" },
      { name: "Digital India Internship Scheme", link: "https://digitalindia.gov.in/" },
      { name: "PM Kaushal Vikas Yojana (PMKVY) IT Courses", link: "https://www.pmkvyofficial.org/" }
    ]
  },
  "Medical & Healthcare": {
    title: { en: "Medical & Healthcare", hi: "चिकित्सा और स्वास्थ्य सेवा" },
    description: { en: "Diagnose, treat, and care for patient health and well-being.", hi: "मरीजों के स्वास्थ्य और कल्याण का निदान, उपचार और देखभाल करें।" },
    steps: [
      { step: 1, title: "Class 10th Basics", description: "Strong focus on science subjects and human biology." },
      { step: 2, title: "Class 12th PCB Focus", description: "Choose Science stream with Physics, Chemistry, and Biology (PCB)." },
      { step: 3, title: "Clear NEET-UG", description: "Prepare for and clear NEET-UG to enter medical colleges." },
      { step: 4, title: "MBBS Graduation", description: "Complete MBBS degree along with a 1-year compulsory internship." },
      { step: 5, title: "Post Graduation & Practice", description: "Pursue MD/MS and register with the National Medical Commission (NMC)." }
    ],
    skills: ["Clinical Diagnosis", "Anatomy & Physiology", "Patient Care & Empathy", "Critical Thinking", "Surgical Basics"],
    entranceExams: ["NEET-UG", "NEET-PG", "INI-CET"],
    certifications: ["ACLS (Advanced Cardiovascular Life Support)", "BLS (Basic Life Support)", "NMC Registration"],
    opportunities: ["General Physician", "Surgeon", "Pediatrician", "Healthcare Administrator", "Medical Officer"],
    salary: "₹6.0 LPA - ₹30+ LPA",
    growth: "Progress to Medical Director, Hospital Superintendent, or independent clinic owner.",
    schemes: [
      { name: "National Scholarship Portal", link: "https://scholarships.gov.in/" },
      { name: "Nursing Scholarship Programs", link: "https://dghs.gov.in/" },
      { name: "Ayushman Bharat Training Programs", link: "https://pmjay.gov.in/" }
    ]
  },
  "Government Services": {
    title: { en: "Government Services", hi: "सरकारी सेवाएं" },
    description: { en: "Manage public administration, formulate policies, and execute government welfare programs.", hi: "सार्वजनिक प्रशासन का प्रबंधन करें, नीतियों को तैयार करें और सरकारी कल्याण कार्यक्रमों को निष्पादित करें।" },
    steps: [
      { step: 1, title: "Class 10th Civics", description: "Build interest in history, geography, and current affairs." },
      { step: 2, title: "Class 12th Humanities/Any", description: "Study diverse subjects; arts/humanities provide a strong base." },
      { step: 3, title: "Graduation (Any Field)", description: "Obtain a Bachelor's degree in any field (mandatory for civil exams)." },
      { step: 4, title: "UPSC / State PSC Prep", description: "Dedicate 1-2 years for systematic study of CSE syllabus." },
      { step: 5, title: "Clearing Exam & Academy", description: "Pass Prelims, Mains, and Interview to join elite training (e.g. LBSNAA)." }
    ],
    skills: ["Public Administration", "Policy Formulation", "Leadership & Integrity", "Analytical Writing", "Decision Making"],
    entranceExams: ["UPSC Civil Services Exam", "SSC CGL", "State PSC Exams", "IBPS PO"],
    certifications: ["LBSNAA Training Certificate", "National Academy of Customs / Taxes Certificates"],
    opportunities: ["IAS Officer", "IPS Officer", "IFS Officer", "Deputy Collector", "Tax Commissioner"],
    salary: "₹7.0 LPA - ₹20+ LPA",
    growth: "Promoted to Joint Secretary, District Magistrate, Chief Secretary, or Union Cabinet Secretary.",
    schemes: [
      { name: "Free UPSC Coaching Schemes for SC/ST/OBC", link: "https://socialjustice.gov.in/" },
      { name: "UPSC Official Portal Guidance", link: "https://upsc.gov.in/" }
    ]
  },
  "Business & Entrepreneurship": {
    title: { en: "Business & Entrepreneurship", hi: "व्यापार और उद्यमिता" },
    description: { en: "Launch startups, manage businesses, and build innovative products or services.", hi: "स्टार्टअप शुरू करें, व्यवसायों का प्रबंधन करें, और नवीन उत्पाद या सेवाएं बनाएं।" },
    steps: [
      { step: 1, title: "Class 10th Commerce", description: "Understand basic mathematics, marketing, and business concepts." },
      { step: 2, title: "Class 12th Business Studies", description: "Select Commerce stream focusing on Business Studies, Accountancy, and Economics." },
      { step: 3, title: "Business Graduation/MBA", description: "Pursue BBA, B.Com, or an MBA to learn professional management." },
      { step: 4, title: "Market Research & MVP", description: "Identify a customer problem, build a Minimum Viable Product (MVP), and validate." },
      { step: 5, title: "Business Setup & Scaling", description: "Register the company, secure seed funding, and scale operations." }
    ],
    skills: ["Business Strategy", "Financial Planning & Management", "Negotiation & Leadership", "Marketing & Growth Hacking", "Risk Management"],
    entranceExams: ["CAT", "MAT", "XAT", "GMAT"],
    certifications: ["Project Management Professional (PMP)", "Product Management Certificate", "Google Digital Marketing Course"],
    opportunities: ["Founder / CEO", "Product Manager", "Business Analyst", "Strategy Consultant", "Venture Capitalist"],
    salary: "Variable (₹6.0 LPA base to high profit equity)",
    growth: "Establish multi-national enterprise, launch Initial Public Offering (IPO), or become an Angel Investor.",
    schemes: [
      { name: "PM Mudra Yojana", link: "https://www.mudra.org.in/" },
      { name: "Startup India Seed Fund Scheme", link: "https://www.startupindia.gov.in/" },
      { name: "Stand-Up India Scheme for Women", link: "https://www.standupmitra.in/" }
    ]
  },
  "Education & Teaching": {
    title: { en: "Education & Teaching", hi: "शिक्षा एवं शिक्षण" },
    description: { en: "Inspire and educate students, design curricula, and contribute to academic research.", hi: "छात्रों को प्रेरित और शिक्षित करें, पाठ्यक्रम डिजाइन करें, और शैक्षणिक अनुसंधान में योगदान दें।" },
    steps: [
      { step: 1, title: "Class 10th Foundations", description: "Focus on general subjects, communication, and confidence." },
      { step: 2, title: "Class 12th Stream Choice", description: "Choose any stream of interest and achieve excellent board results." },
      { step: 3, title: "Bachelor's Degree + B.Ed", description: "Complete a Bachelor's degree (BA/BSc) and Bachelor of Education (B.Ed)." },
      { step: 4, title: "Eligibility Tests (CTET/TET)", description: "Clear CTET or state-level TET exams to qualify for school jobs." },
      { step: 5, title: "Higher Education / Lecture", description: "Complete Master's degree and UGC NET for college lecturer positions." }
    ],
    skills: ["Pedagogical Methods", "Public Speaking", "Patience & Empathy", "Curriculum Design", "Classroom Management"],
    entranceExams: ["CTET", "State TET", "UGC NET", "State SET", "B.Ed Entrances"],
    certifications: ["B.Ed Certificate", "M.Ed Certificate", "TEFL/TESOL (for English teaching)"],
    opportunities: ["Primary School Teacher", "High School Teacher", "College Professor", "Curriculum Developer", "Academic Counselor"],
    salary: "₹3.6 LPA - ₹15+ LPA",
    growth: "Promotion to Head of Department, School Principal, Academic Director, or University Registrar.",
    schemes: [
      { name: "NISHTHA Teacher Training Program", link: "https://nishtha.ncert.gov.in/" },
      { name: "National Fellowship for Higher Education", link: "https://scholarships.gov.in/" }
    ]
  },
  "Arts & Creativity": {
    title: { en: "Arts & Creativity", hi: "कला और रचनात्मकता" },
    description: { en: "Express ideas and emotions through visual arts, design, music, performing arts, and writing.", hi: "दृश्य कला, डिजाइन, संगीत, प्रदर्शन कला और लेखन के माध्यम से विचारों और भावनाओं को व्यक्त करें।" },
    steps: [
      { step: 1, title: "Class 10th Art Focus", description: "Practice drawing, sketching, crafting, or music basics." },
      { step: 2, title: "Class 12th Fine Arts", description: "Choose Humanities with Fine Arts or prepare design portfolios." },
      { step: 3, title: "Graduation (BFA/B.Des)", description: "Complete Bachelor of Fine Arts (BFA) or Bachelor of Design (B.Des)." },
      { step: 4, title: "Portfolio Exhibition", description: "Build a physical and digital portfolio and exhibit in local galleries." },
      { step: 5, title: "Creative Professional", description: "Launch career as a Freelance Artist, UI/UX Designer, or Illustrator." }
    ],
    skills: ["Visual Composition", "Creative Writing/Expression", "Digital Software (Adobe Creative Suite)", "Aesthetic Sense", "Craftsmanship"],
    entranceExams: ["NID DAT", "UCEED", "NIFT Entrance Exam", "BFA Entrances"],
    certifications: ["Adobe Certified Professional", "UI/UX Design Certification", "3D Animation Course Certificate"],
    opportunities: ["Graphic Designer", "Fine Artist", "UI/UX Designer", "Illustrator", "Art Director"],
    salary: "₹3.0 LPA - ₹18+ LPA",
    growth: "Advance to Creative Director, Art Studio Owner, Animation Head, or Design Consultant.",
    schemes: [
      { name: "Kala Sanskriti Vikas Yojana", link: "https://indiaculture.gov.in/" },
      { name: "National Scholarship for Young Artists", link: "https://indiaculture.gov.in/" }
    ]
  },
  "Sports & Fitness": {
    title: { en: "Sports & Fitness", hi: "खेल और फिटनेस" },
    description: { en: "Compete in professional athletics, coach sports teams, or lead fitness operations.", hi: "पेशेवर एथलेटिक्स में प्रतिस्पर्धा करें, खेल टीमों को प्रशिक्षित करें, या फिटनेस संचालन का नेतृत्व करें।" },
    steps: [
      { step: 1, title: "Class 10th Fitness", description: "Establish physical agility, endurance, and learn sports rules." },
      { step: 2, title: "Class 12th Academy Join", description: "Enroll in regional sports academies and participate in local tournaments." },
      { step: 3, title: "Competitive Tournaments", description: "Participate in District, State, and National championships." },
      { step: 4, title: "BPEd / Sports Science", description: "Complete Bachelor of Physical Education (BPEd) for formal coaching routes." },
      { step: 5, title: "Professional Athlete/Coach", description: "Compete in national leagues, Olympics, or become certified sports trainers." }
    ],
    skills: ["Physical Endurance & Conditioning", "Agility & Teamwork", "Discipline & Sportsmanship", "First Aid", "Sports Psychology"],
    entranceExams: ["SAI Selection Trials", "BPEd Entrance Exams", "National Sports Federation Trials"],
    certifications: ["NSNIS Coaching Diploma", "ACSM Personal Trainer Certification", "Sports Nutritionist Certificate"],
    opportunities: ["Professional Athlete", "Sports Coach", "Fitness Instructor", "Sports Administrator", "Physiotherapist"],
    salary: "₹3.0 LPA - ₹20+ LPA",
    growth: "Advance to National Team Coach, Sports Academy Director, or Fitness Brand Consultant.",
    schemes: [
      { name: "Khelo India Scholarship", link: "https://kheloindia.gov.in/" },
      { name: "Sports Authority of India (SAI) Grants", link: "https://sportsauthorityofindia.nic.in/" }
    ]
  },
  "Law & Legal Services": {
    title: { en: "Law & Legal Services", hi: "कानून और कानूनी सेवाएं" },
    description: { en: "Interpret laws, advise clients, draft legal documents, and advocate in courts of law.", hi: "कानूनों की व्याख्या करें, ग्राहकों को सलाह दें, कानूनी दस्तावेज तैयार करें और कानून की अदालतों में पैरवी करें।" },
    steps: [
      { step: 1, title: "Class 10th Foundations", description: "Develop logical reasoning, civic awareness, and strong reading habits." },
      { step: 2, title: "Class 12th CLAT prep", description: "Select any stream (Humanities is preferred) and prepare for CLAT / AILET." },
      { step: 3, title: "Integrated Law Degree (LLB)", description: "Complete 5-year Integrated BA LLB / BBA LLB from a National Law University." },
      { step: 4, title: "Internships & Bar Exam", description: "Intern with Law Firms, Corporate Offices, and clear the All India Bar Exam (AIBE)." },
      { step: 5, title: "Law Practice Entry", description: "Practice as an Advocate in courts or join corporate firms as a Legal Associate." }
    ],
    skills: ["Legal Research & Case Analysis", "Drafting & Conveyancing", "Persuasive Oratory & Debate", "Contract Negotiation", "Analytical Problem Solving"],
    entranceExams: ["CLAT-UG", "AILET", "LSAT India", "State Law CETs", "Judiciary Exams"],
    certifications: ["Bar Council of India Enrollment", "Cyber Law Specialist Diploma", "Intellectual Property Rights Certificate"],
    opportunities: ["Corporate Lawyer", "Litigation Advocate", "Legal Consultant", "Judicial Magistrate", "Legal Analyst"],
    salary: "₹4.8 LPA - ₹24+ LPA",
    growth: "Elevation to Law Firm Partner, Senior Advocate in High Court/Supreme Court, or High Court Judge.",
    schemes: [
      { name: "National Legal Services Authority (NALSA) Internships", link: "https://nalsa.gov.in/" },
      { name: "Ministry of Law & Justice Fellowships", link: "https://legalaffairs.gov.in/" }
    ]
  },
  "Finance & Commerce": {
    title: { en: "Finance & Commerce", hi: "वित्त और वाणिज्य" },
    description: { en: "Manage corporate finances, audit accounting systems, analyze markets, and advise on investments.", hi: "कॉर्पोरेट वित्त का प्रबंधन करें, लेखांकन प्रणालियों का ऑडिट करें, बाजारों का विश्लेषण करें और निवेश पर सलाह दें।" },
    steps: [
      { step: 1, title: "Class 10th Math Focus", description: "Establish a strong base in arithmetic, algebra, and statistics." },
      { step: 2, title: "Class 12th Commerce Stream", description: "Choose Commerce stream with Accountancy, Economics, Business Studies, and Mathematics." },
      { step: 3, title: "B.Com / CA Foundation", description: "Begin B.Com (Hons.) or enroll in Chartered Accountancy (CA) / CFA programs." },
      { step: 4, title: "Articleship / Internship", description: "Complete CA articleship for 3 years or complete financial corporate internships." },
      { step: 5, title: "Professional Finance Specialist", description: "Work as a Chartered Accountant, Portfolio Manager, or Investment Banker." }
    ],
    skills: ["Financial Accounting & Auditing", "Corporate Taxation & Compliance", "Data Modeling & MS Excel", "Portfolio & Wealth Management", "Risk Assessment"],
    entranceExams: ["CA Foundation / IPCC / Final", "CFA Levels 1-3", "CUET (B.Com)", "CAT (MBA Finance)"],
    certifications: ["Chartered Accountant (ICAI)", "Chartered Financial Analyst (CFA)", "Certified Financial Planner (CFP)", "FRM Certificate"],
    opportunities: ["Chartered Accountant", "Financial Analyst", "Investment Banker", "Auditor", "Wealth Advisor"],
    salary: "₹6.0 LPA - ₹28+ LPA",
    growth: "Promotion to Chief Financial Officer (CFO), Portfolio Manager, Investment Director, or Finance Partner.",
    schemes: [
      { name: "National Merit Scholarship Schemes", link: "https://scholarships.gov.in/" },
      { name: "Financial Literacy Programs by SEBI", link: "https://investor.sebi.gov.in/" }
    ]
  },
  "Agriculture & Rural Development": {
    title: { en: "Agriculture & Rural Development", hi: "कृषि और ग्रामीण विकास" },
    description: { en: "Modernize farming techniques, research crop yields, and implement rural development initiatives.", hi: "खेती की तकनीकों का आधुनिकीकरण करें, फसल की पैदावार पर शोध करें और ग्रामीण विकास पहलों को लागू करें।" },
    steps: [
      { step: 1, title: "Class 10th Science", description: "Study biology, environmental science, and geography diligently." },
      { step: 2, title: "Class 12th Science Stream", description: "Choose Science stream with Biology, Chemistry, and Agriculture (if available)." },
      { step: 3, title: "BSc Agriculture", description: "Complete a 4-year Bachelor of Science (BSc) in Agriculture or Agricultural Engineering." },
      { step: 4, title: "Agri-Specialization", description: "Pursue MSc in Agronomy/Soil Science or Agribusiness MBA." },
      { step: 5, title: "Agricultural Professional", description: "Work as an Agricultural Officer, Research Scientist, or Agribusiness Lead." }
    ],
    skills: ["Soil Science & Chemistry", "Agronomy & Crop Management", "Precision Farming Technologies", "Agribusiness Strategy", "Rural Policy understanding"],
    entranceExams: ["ICAR AIEEA", "State-level Agricultural CETs", "NABARD Officer Exams", "UGC NET (Agronomy)"],
    certifications: ["Precision Agriculture Technology", "Organic Farming Inspector Certification", "Seed Analyst Training"],
    opportunities: ["Agricultural Officer", "Agronomist", "Agribusiness Manager", "Farm Director", "Rural Development Specialist"],
    salary: "₹3.6 LPA - ₹12+ LPA",
    growth: "Rise to Chief Scientist, Agriculture Extension Director, Agricultural Policy Advisor, or Agri-Entrepreneur.",
    schemes: [
      { name: "PM Krishi Sinchayee Yojana Training", link: "https://pmksy.gov.in/" },
      { name: "NABARD Student Internship Scheme", link: "https://www.nabard.org/" },
      { name: "PM-KISAN Skill Development Initiatives", link: "https://www.india.gov.in/" }
    ]
  },
  "Beauty & Wellness": {
    title: { en: "Beauty & Wellness", hi: "सौंदर्य और कल्याण" },
    description: { en: "Provide aesthetic care, skin therapy, spa operations, and overall lifestyle wellness guidance.", hi: "सौंदर्य देखभाल, त्वचा चिकित्सा, स्पा संचालन और समग्र जीवन शैली कल्याण मार्गदर्शन प्रदान करें।" },
    steps: [
      { step: 1, title: "Class 10th Grooming", description: "Focus on interpersonal communication and aesthetics." },
      { step: 2, title: "Class 12th Vocational", description: "Select any stream; vocational subjects in cosmetology or beauty care are a plus." },
      { step: 3, title: "Professional Cosmetology Diploma", description: "Complete professional courses in beauty, hair styling, and skin care." },
      { step: 4, title: "Salon/Spa Apprenticeship", description: "Work as an apprentice in luxury salons or Ayurvedic wellness centers." },
      { step: 5, title: "Therapist / Consultant", description: "Provide aesthetic treatment, manage salons, or offer corporate wellness consultations." }
    ],
    skills: ["Cosmetic Chemistry & Skin Biology", "Aesthetic Treatments & Makeup Artistry", "Massage & Aromatherapy techniques", "Client Relationship Management", "Sanitation & Hygiene Standards"],
    entranceExams: ["Cosmetology Institute Entry Exams", "CIDESCO International Examinations"],
    certifications: ["CIDESCO Diploma", "CIBTAC Certification", "VLCC Institute Professional Cosmetology Certificate"],
    opportunities: ["Cosmetologist", "Celebrity Makeup Artist", "Salon Manager", "Wellness Consultant", "Spa Therapist"],
    salary: "₹2.4 LPA - ₹8.0 LPA",
    growth: "Advance to Salon Franchise Owner, Spa Chain Manager, Cosmetics Brand Stylist, or Wellness Director.",
    schemes: [
      { name: "PMKVY Beauty & Wellness Certifications", link: "https://www.pmkvyofficial.org/" },
      { name: "NSDC Skill India Beauty Courses", link: "https://nsdcindia.org/" }
    ]
  },
  "Homemaker & Home Business": {
    title: { en: "Homemaker & Home Business", hi: "गृहणी और गृह व्यवसाय" },
    description: { en: "Manage family affairs while establishing home-based boutique businesses, catering, or crafts.", hi: "पारिवारिक मामलों का प्रबंधन करें और साथ ही घर-आधारित बुटीक व्यवसाय, खानपान या शिल्प स्थापित करें।" },
    steps: [
      { step: 1, title: "Class 10th Basic Craft", description: "Learn cooking, crafting, knitting, and basic budgeting." },
      { step: 2, title: "Class 12th Stream of Choice", description: "Complete 12th in any stream; learn digital media and bookkeeping." },
      { step: 3, title: "Home Business Mastery", description: "Complete training in baking, digital design, tailoring, or tutoring." },
      { step: 4, title: "Digital Shop Setup", description: "Launch business on Etsy, Amazon, Instagram, or local community networks." },
      { step: 5, title: "Micro-Entrepreneur", description: "Operate a scaling micro-business directly from home while managing household tasks." }
    ],
    skills: ["Household Budgeting & Finance", "Niche Skill (Baking/Catering/Tailoring)", "Social Media Marketing", "Time Management", "E-commerce Operations"],
    entranceExams: ["MSME Entrepreneurship Training Intake"],
    certifications: ["FSSAI License (for home cooking/baking)", "MSME Udyam Registration", "Digital Marketing Basics Certificate"],
    opportunities: ["Home-based Baker/Chef", "Online Tutor", "Boutique Owner / Tailor", "Handicraft Creator", "Freelance Digital Specialist"],
    salary: "₹1.8 LPA - ₹10+ LPA (variable based on business scale)",
    growth: "Scale home business to a registered MSME factory, franchise network, or popular online brand.",
    schemes: [
      { name: "Mudra Shishu Loan Scheme", link: "https://www.mudra.org.in/" },
      { name: "Mahila Co-operative Credit Schemes", link: "https://www.ncdc.in/" },
      { name: "Stand-Up India Scheme for Women Entrepreneurs", link: "https://www.standupmitra.in/" }
    ]
  },
  "Media & Communication": {
    title: { en: "Media & Communication", hi: "मीडिया और संचार" },
    description: { en: "Broadcast news, write compelling stories, produce content, and manage public relations.", hi: "समाचार प्रसारित करें, सम्मोहक कहानियां लिखें, सामग्री का निर्माण करें और जनसंपर्क का प्रबंधन करें।" },
    steps: [
      { step: 1, title: "Class 10th Language Focus", description: "Develop excellent writing skills, reading habits, and public speaking." },
      { step: 2, title: "Class 12th Humanities", description: "Choose Humanities stream with History, Literature, and Political Science." },
      { step: 3, title: "Journalism Graduation (BJMC)", description: "Earn a Bachelor of Journalism & Mass Communication (BJMC)." },
      { step: 4, title: "Media Internships", description: "Intern with newspaper houses, radio channels, or digital news publications." },
      { step: 5, title: "Media Practitioner", description: "Start working as a Journalist, Reporter, Copywriter, or PR Specialist." }
    ],
    skills: ["News Journalism & Storytelling", "Copywriting & Editing", "Video Editing & Production", "Public Relations & Brand Strategy", "Social Media Analytics"],
    entranceExams: ["IIMC Entrance Exam", "Jamia Millia Journalism Entrance", "CUET Journalism"],
    certifications: ["Adobe Premiere Pro Certified Professional", "Google Digital Garage SEO Certificate", "Public Relations Society Certificate"],
    opportunities: ["Journalist / News Reporter", "Public Relations Executive", "Social Media Manager", "Video Producer", "Content Writer"],
    salary: "₹3.0 LPA - ₹15+ LPA",
    growth: "Ascend to Editor-in-Chief, PR Director for multi-nationals, Broadcast Head, or Media Startup Founder.",
    schemes: [
      { name: "Indian Institute of Mass Communication Fellowships", link: "http://iimc.nic.in/" },
      { name: "Press Information Bureau (PIB) Internships", link: "https://pib.gov.in/" }
    ]
  },
  "Defence & Security": {
    title: { en: "Defence & Security", hi: "रक्षा और सुरक्षा" },
    description: { en: "Protect the country, enforce national security, and manage emergency response services.", hi: "देश की रक्षा करें, राष्ट्रीय सुरक्षा लागू करें और आपातकालीन प्रतिक्रिया सेवाओं का प्रबंधन करें।" },
    steps: [
      { step: 1, title: "Class 10th Athletic Prep", description: "Maintain physical fitness, join sports teams, and build leadership skills." },
      { step: 2, title: "Class 12th Science (PCM)", description: "Select Science stream with Physics, Chemistry, and Mathematics (essential for Air Force/Navy)." },
      { step: 3, title: "Clear NDA Exam", description: "Prepare and clear the NDA written exam and Services Selection Board (SSB) interviews." },
      { step: 4, title: "NDA/IMA Academy Training", description: "Complete 3-year academic and physical training at NDA, followed by specialization." },
      { step: 5, title: "Commissioned Officer", description: "Join as a Lieutenant (Army), Sub-Lieutenant (Navy), or Flying Officer (Air Force)." }
    ],
    skills: ["Tactical Leadership & Team Building", "Physical Combat & Fitness", "Strategic Planning", "Weapons Handling & Safety", "Survival & Navigation Techniques"],
    entranceExams: ["National Defence Academy (NDA) Exam", "Combined Defence Services (CDS) Exam", "AFCAT", "CAPF (AC) Exam"],
    certifications: ["NDA / IMA Graduation Certificate", "Weapons Proficiency Certificate", "Military Leadership Course Diploma"],
    opportunities: ["Army Officer", "Navy Officer", "Air Force Officer", "Coast Guard Commander", "CAPF Assistant Commandant"],
    salary: "₹8.0 LPA - ₹22+ LPA",
    growth: "Promotion to Colonel, Brigadier, General, or chief strategic commander of national security councils.",
    schemes: [
      { name: "National Cadet Corps (NCC) Special Entry Schemes", link: "https://indianarmy.nic.in/" },
      { name: "Prime Minister's Scholarship Scheme for CAPF & AR", link: "https://www.warwidowsindia.org/" }
    ]
  },
  "Social Service & NGO": {
    title: { en: "Social Service & NGO", hi: "सामाजिक सेवा और एनजीओ" },
    description: { en: "Drive social reform, manage community welfare programs, and advocate for human rights.", hi: "सामाजिक सुधारों को गति दें, सामुदायिक कल्याण कार्यक्रमों का प्रबंधन करें और मानवाधिकारों की वकालत करें।" },
    steps: [
      { step: 1, title: "Class 10th Social Studies", description: "Understand community issues, social structures, and volunteer for local causes." },
      { step: 2, title: "Class 12th Stream Selection", description: "Select any stream, focus on geography, sociology, and political science." },
      { step: 3, title: "Social Work Degree (BSW/MSW)", description: "Complete Bachelor of Social Work (BSW) followed by Master of Social Work (MSW)." },
      { step: 4, title: "Fieldwork & Volunteering", description: "Work with grassroot NGOs, rural clinics, and community relief centers." },
      { step: 5, title: "Social Worker / NGO Lead", description: "Run community development programs, secure grants, and direct NGO projects." }
    ],
    skills: ["Community Mobilization & Advocacy", "NGO Administration & Management", "Fundraising & Proposal Writing", "Empathy & Interpersonal Counseling", "Corporate Social Responsibility (CSR) compliance"],
    entranceExams: ["TISS-NET", "CUET PG (Social Work)", "Delhi University MSW Entrance"],
    certifications: ["NGO Management Certificate", "CSR Policy Specialist Certificate", "Human Rights Law Course Certificate"],
    opportunities: ["NGO Project Manager", "Social Worker", "CSR Specialist", "Community Organizer", "Human Rights Advocate"],
    salary: "₹2.5 LPA - ₹10.0 LPA",
    growth: "Advance to International NGO Director (UN, UNICEF, CRY), CSR Head at major corporations, or Social Enterprise CEO.",
    schemes: [
      { name: "Tata Institute of Social Sciences (TISS) Fellowships", link: "https://tiss.edu/" },
      { name: "National Fellowship for Scheduled Castes / Tribes", link: "https://scholarships.gov.in/" }
    ]
  },
  "Hospitality & Tourism": {
    title: { en: "Hospitality & Tourism", hi: "आतिथ्य और पर्यटन" },
    description: { en: "Manage hotel operations, coordinate luxury tours, and deliver world-class guest services.", hi: "होटल संचालन का प्रबंधन करें, लक्जरी दौरों का समन्वय करें और विश्व स्तरीय अतिथि सेवाएं प्रदान करें।" },
    steps: [
      { step: 1, title: "Class 10th Communication", description: "Practice verbal communication and study geography and global cultures." },
      { step: 2, title: "Class 12th Hotel Entrance", description: "Choose any stream and prepare for the NCHMCT JEE exam." },
      { step: 3, title: "Hotel Management Degree (BHM)", description: "Complete a 4-year Bachelor of Hotel Management (BHM) or BSc in Hospitality." },
      { step: 4, title: "Industrial Training", description: "Undergo mandatory 6-month training in all departments of a 5-star hotel." },
      { step: 5, title: "Hospitality Executive", description: "Secure entry-level job in Front Office, Food & Beverage, or Guest Relations." }
    ],
    skills: ["Guest Relations & Customer Service", "Hotel & Culinary Operations", "Event Planning & Coordination", "Foreign Language & Interpersonal Skills", "Crisis Management & Budgeting"],
    entranceExams: ["NCHMCT JEE", "IIHM eCHAT Entrance Exam", "GNIHM Jet Exam"],
    certifications: ["WSET Wine Certifications", "Food Safety (HACCP) Certificate", "Travel & Tourism Professional Diploma (IATA)"],
    opportunities: ["Hotel General Manager", "Tour Operator / Guide", "Event Manager", "Guest Relations Executive", "F&B Director"],
    salary: "₹3.0 LPA - ₹18+ LPA",
    growth: "Promoted to Regional Director of Hotel Operations, Luxury Travel Consultant, or international cruise line executive.",
    schemes: [
      { name: "Hunar Se Rozgar Tak Skill Program", link: "https://tourism.gov.in/" },
      { name: "Incredible India Tourist Facilitator (IITFC) Program", link: "https://iitf.tourism.gov.in/" }
    ]
  },
  "Research & Science": {
    title: { en: "Research & Science", hi: "अनुसंधान और विज्ञान" },
    description: { en: "Conduct scientific experiments, publish research journals, and discover new technological advancements.", hi: "वैज्ञानिक प्रयोग करें, शोध पत्रिकाओं को प्रकाशित करें और नई तकनीकी प्रगति की खोज करें।" },
    steps: [
      { step: 1, title: "Class 10th Science Zeal", description: "Strong focus on science practicals and mathematical methods." },
      { step: 2, title: "Class 12th Science Focus", description: "Choose Science stream with Physics, Chemistry, Biology, and Mathematics." },
      { step: 3, title: "Dual Degree (BS-MS)", description: "Complete 5-year integrated BS-MS program from IISER, IISc, or premier universities." },
      { step: 4, title: "Doctoral Research (Ph.D.)", description: "Clear GATE / CSIR NET and pursue Ph.D. research under junior fellowships." },
      { step: 5, title: "Scientific Researcher", description: "Join ISRO, DRDO, CSIR labs, or work as university research scientists." }
    ],
    skills: ["Scientific Method & Experimentation", "Data Analysis & Statistical Tools (R/Python)", "Academic Manuscript Drafting", "Lab Equipment Operation & Safety", "Hypothesis Development"],
    entranceExams: ["IISER Aptitude Test (IAT)", "NEST Exam", "GATE Exam", "CSIR-UGC NET Exam"],
    certifications: ["Lab Biosafety Certification", "Python for Scientific Research Certificate", "Ethics in Scientific Research Course"],
    opportunities: ["Research Scientist", "Laboratory Director", "R&D Scientist", "Academic Researcher", "Scientific Officer"],
    salary: "₹4.8 LPA - ₹20+ LPA",
    growth: "Lead national labs (ISRO, DRDO, CSIR), publish high-impact journals, or earn national/international scientific awards.",
    schemes: [
      { name: "INSPIRE Scholarship for Higher Education", link: "https://online-inspire.gov.in/" },
      { name: "KVPY Related Research Fellowships", link: "http://www.kvpy.iisc.ernet.in/" },
      { name: "DST Women Scientist Scheme", link: "https://dst.gov.in/" }
    ]
  },
  "Skilled Trades & Vocational Careers": {
    title: { en: "Skilled Trades & Vocational Careers", hi: "कुशल व्यापार और व्यावसायिक करियर" },
    description: { en: "Perform precision technical craftsmanship in fields like electrical engineering, plumbing, HVAC, and carpentry.", hi: "विद्युत इंजीनियरिंग, प्लंबिंग, एचवीएसी और बढ़ईगीरी जैसे क्षेत्रों में सटीक तकनीकी शिल्प कौशल का प्रदर्शन करें।" },
    steps: [
      { step: 1, title: "Class 10th Basic Craft", description: "Learn basic physics, safety measures, and practical geometry." },
      { step: 2, title: "ITI Trade School Selection", description: "Select trade of choice (Electrician, Fitter, Welder) at an Industrial Training Institute (ITI)." },
      { step: 3, title: "National Trade Certificate (NTC)", description: "Complete 1-2 years ITI course and pass the All India Trade Test (AITT)." },
      { step: 4, title: "Apprenticeship Program", description: "Undergo mandatory apprenticeship at manufacturing plants or construction projects." },
      { step: 5, title: "Certified Specialist / Business", description: "Work as an Industrial Technician or launch an independent service contractor business." }
    ],
    skills: ["Technical Troubleshooting & Blueprint Reading", "Power Tool & Equipment Operations", "Industrial Safety Regulations (OSHA)", "Drafting & Layout Measurement", "Materials Science"],
    entranceExams: ["ITI Entrance Exams", "Apprenticeship Selection trials", "All India Trade Test (AITT)"],
    certifications: ["National Trade Certificate (NTC)", "State Electrician / Boiler License", "AWS Welding Certification"],
    opportunities: ["Industrial Electrician", "Welder / Fabricator", "HVAC Maintenance Specialist", "Plumbing Contractor", "Production Line Technician"],
    salary: "₹2.0 LPA - ₹6.5 LPA",
    growth: "Establish technical services firm, work in high-demand international markets, or become a Chief Safety Auditor.",
    schemes: [
      { name: "National Apprenticeship Promotion Scheme (NAPS)", link: "https://www.apprenticeshipindia.gov.in/" },
      { name: "PM Kaushal Vikas Yojana (PMKVY) Trade Certifications", link: "https://www.pmkvyofficial.org/" },
      { name: "Craftsmen Training Scheme (CTS)", link: "https://dgt.gov.in/" }
    ]
  }
};

export default careerRoadmaps;
