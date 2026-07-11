const learningResources = {
  "Technology & IT": {
    courses: [
      { name: "Harvard CS50's Introduction to Computer Science", description: "An introduction to the intellectual enterprises of computer science and the art of programming.", category: "Recommended Courses", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science", buttonLabel: "Visit Course" },
      { name: "FreeCodeCamp Responsive Web Design", description: "Learn HTML, CSS, and web layout with hands-on projects.", category: "Recommended Courses", url: "https://www.freecodecamp.org/", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Google IT Support Professional Certificate", description: "Prepare for an entry-level role in IT support.", category: "Certifications", url: "https://www.coursera.org/professional-certificates/google-it-support", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "AICTE Pragati Scholarship for Girls", description: "Financial support for girls pursuing technical education.", category: "Scholarships", url: "https://www.myscheme.gov.in", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Digital India Internship Scheme", description: "Opportunities for students to gain exposure in MeitY.", category: "Government Schemes", url: "https://digitalindia.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "Cisco Networking Academy", description: "Learn networking, cybersecurity, and IoT skills.", category: "Training Programs", url: "https://www.netacad.com/", buttonLabel: "Visit Course" }
    ],
    exams: [
      { name: "GATE CS Preparation Resources", description: "Study materials and past papers for GATE Computer Science.", category: "Entrance Exam Resources", url: "https://gate.iitk.ac.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "MDN Web Docs", description: "Documentation for web technologies (HTML, CSS, JS).", category: "Useful Career Resources", url: "https://developer.mozilla.org/", buttonLabel: "Official Website" }
    ]
  },
  "Medical & Healthcare": {
    courses: [
      { name: "WHO Health Learning Platform", description: "Free online courses on public health, clinical management, and emergency response.", category: "Recommended Courses", url: "https://openwho.org/", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Basic Life Support (BLS) Certification", description: "Accredited certification for performing high-quality CPR.", category: "Certifications", url: "https://www.heart.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "National Merit Scholarship Portal", description: "Central scholarships for students pursuing professional medical degrees.", category: "Scholarships", url: "https://scholarships.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Ayushman Bharat PM-JAY", description: "Universal health schemes and healthcare training incentives.", category: "Government Schemes", url: "https://pmjay.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "Nursing Training Programs", description: "Official diplomas and practical training guidance by DGHS.", category: "Training Programs", url: "https://dghs.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "NEET UG Entrance Resources", description: "Official NTA portal for medical college entrance examinations.", category: "Entrance Exam Resources", url: "https://neet.nta.nic.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "PubMed Central (PMC)", description: "Free archive of biomedical and life sciences journal literature.", category: "Useful Career Resources", url: "https://www.ncbi.nlm.nih.gov/pmc/", buttonLabel: "Official Website" }
    ]
  },
  "Government Services": {
    courses: [
      { name: "Public Administration Basics", description: "Understand civics, state structures, and policies.", category: "Recommended Courses", url: "https://www.edx.org/course/introduction-to-public-administration", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "LBSNAA Foundation Training", description: "Overview of civil services training modules.", category: "Certifications", url: "https://www.lbsnaa.gov.in/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "Pre-Exam Coaching Scholarships", description: "Financial assistance for SC/ST/OBC preparing for civil services.", category: "Scholarships", url: "https://socialjustice.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "National Career Service (NCS) Portal", description: "Job matching and civil career resources by Ministry of Labour.", category: "Government Schemes", url: "https://www.ncs.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "State PSC Coaching Centers", description: "Government-sponsored guidance programs for state services.", category: "Training Programs", url: "https://www.india.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "UPSC Official Examination Portal", description: "Syllabus, calendars, and past question papers for civil services.", category: "Entrance Exam Resources", url: "https://upsc.gov.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "PIB (Press Information Bureau)", description: "Official updates, releases, and policy briefs from the Government of India.", category: "Useful Career Resources", url: "https://pib.gov.in/", buttonLabel: "Official Website" }
    ]
  },
  "Business & Entrepreneurship": {
    courses: [
      { name: "Startup India Learning Program", description: "Free official program by Invest India for entrepreneurs.", category: "Recommended Courses", url: "https://www.startupindia.gov.in/", buttonLabel: "Visit Course" },
      { name: "Google Digital Marketing Course", description: "Learn core digital advertising and e-commerce basics.", category: "Recommended Courses", url: "https://grow.google/certificates/digital-marketing-ecommerce/", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Project Management Professional (PMP)", description: "Global standard certification for project leaders.", category: "Certifications", url: "https://www.pmi.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "Startup India Seed Fund Scheme", description: "Early-stage financial grants for innovative startups.", category: "Scholarships", url: "https://www.startupindia.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Pradhan Mantri Mudra Yojana", description: "Financial loans for small micro-enterprises.", category: "Government Schemes", url: "https://www.mudra.org.in/", buttonLabel: "Official Website" },
      { name: "Stand-Up India Scheme for Women", description: "Bank loans for greenfield enterprises started by women.", category: "Government Schemes", url: "https://www.standupmitra.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "MSME Entrepreneurship Training", description: "Skills development programs and industrial incubation training.", category: "Training Programs", url: "https://www.msmetraining.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "CAT Exam Official Portal", description: "Entrance portal for postgraduate business management programs.", category: "Entrance Exam Resources", url: "https://iimcat.ac.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Startup India Hub", description: "One-stop platform for startup resources, mentors, and networks.", category: "Useful Career Resources", url: "https://www.startupindia.gov.in/", buttonLabel: "Official Website" }
    ]
  },
  "Education & Teaching": {
    courses: [
      { name: "SWAYAM Teacher Education Courses", description: "Free online education modules run by UGC and NCERT.", category: "Recommended Courses", url: "https://swayam.gov.in/", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "TEFL / TESOL Certification", description: "English language teaching credentials for global opportunities.", category: "Certifications", url: "https://www.tesol.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "National Fellowship for Higher Education", description: "Financial support for research and teaching aspirants.", category: "Scholarships", url: "https://scholarships.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "NISHTHA Teacher Training Initiative", description: "National initiative for school heads and teachers' holistic advancement.", category: "Government Schemes", url: "https://nishtha.ncert.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "DIET Teacher Training Modules", description: "District Institutes of Education and Training portal.", category: "Training Programs", url: "https://ncert.nic.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "CTET Official Website", description: "Central Teacher Eligibility Test updates and syllabi.", category: "Entrance Exam Resources", url: "https://ctet.nic.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "NCERT Textbooks & Resources", description: "Official database of teaching materials and reference books.", category: "Useful Career Resources", url: "https://ncert.nic.in/", buttonLabel: "Official Website" }
    ]
  },
  "Arts & Creativity": {
    courses: [
      { name: "Introduction to Graphic Design", description: "Learn visual hierarchy, layout, and graphic principles.", category: "Recommended Courses", url: "https://www.coursera.org/learn/graphic-design", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Adobe Certified Professional", description: "Industry validation for Photoshop, Illustrator, and Premiere Pro.", category: "Certifications", url: "https://www.adobe.com/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "National Scholarship for Young Artists", description: "Financial assistance for outstanding artists in traditional fields.", category: "Scholarships", url: "https://indiaculture.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Kala Sanskriti Vikas Yojana", description: "Scheme to support visual arts, theater, and creative crafts.", category: "Government Schemes", url: "https://indiaculture.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "NID Design Incubation", description: "Design training programs hosted by National Institute of Design.", category: "Training Programs", url: "https://www.nid.edu/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "UCEED Design Entrance", description: "Undergraduate Common Entrance Examination for Design portal.", category: "Entrance Exam Resources", url: "http://www.uceed.iitb.ac.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Behance Portfolio Hub", description: "Showcase creative portfolios and discover worldwide designs.", category: "Useful Career Resources", url: "https://www.behance.net/", buttonLabel: "Official Website" }
    ]
  },
  "Sports & Fitness": {
    courses: [
      { name: "Science of Exercise", description: "Physiology, metabolism, and conditioning basics.", category: "Recommended Courses", url: "https://www.coursera.org/learn/science-exercise", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "ACSM Personal Trainer Certification", description: "Accredited fitness trainer standard credentials.", category: "Certifications", url: "https://www.acsm.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "Khelo India Sports Scholarship", description: "Annual financial grant for talented national athletes.", category: "Scholarships", url: "https://kheloindia.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Sports Authority of India (SAI) Schemes", description: "Infrastructure support and athlete training schemes.", category: "Government Schemes", url: "https://sportsauthorityofindia.nic.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "NSNIS Coaching Diploma", description: "Academic coaching diplomas at Netaji Subhas National Institute of Sports.", category: "Training Programs", url: "https://nsnis.org/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "SAI Selection Trials", description: "Trials schedules for entering National Centers of Excellence.", category: "Entrance Exam Resources", url: "https://sportsauthorityofindia.nic.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "WADA Athlete Zone", description: "World Anti-Doping Agency guidelines and safe sport resources.", category: "Useful Career Resources", url: "https://www.wada-ama.org/", buttonLabel: "Official Website" }
    ]
  },
  "Law & Legal Services": {
    courses: [
      { name: "Introduction to International Law", description: "Understand legal systems, treaties, and public frameworks.", category: "Recommended Courses", url: "https://www.coursera.org/learn/international-law", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Bar Council of India Enrollment", description: "Mandatory qualification to practice law in Indian courts.", category: "Certifications", url: "http://www.barcouncilofindia.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "Ministry of Law & Justice Fellowships", description: "Fellowship support for postgraduate legal research.", category: "Scholarships", url: "https://legalaffairs.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Free Legal Aid Portal", description: "Access justice schemes managed by National Legal Services Authority.", category: "Government Schemes", url: "https://nalsa.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "NALSA Legal Literacy Internship", description: "Practical exposure in organizing legal aid and awareness camps.", category: "Training Programs", url: "https://nalsa.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "CLAT Consortium Website", description: "Common Law Admission Test registration, syllabus, and timelines.", category: "Entrance Exam Resources", url: "https://consortiumofnlus.ac.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Indian Kanoon Case Search", description: "Free searchable database of Indian laws and court judgments.", category: "Useful Career Resources", url: "https://indiankanoon.org/", buttonLabel: "Official Website" }
    ]
  },
  "Finance & Commerce": {
    courses: [
      { name: "Financial Markets by Yale University", description: "Introduction to risk management, banking, and financial systems.", category: "Recommended Courses", url: "https://www.coursera.org/learn/financial-markets-global", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "NISM Certification Exams", description: "Mandatory certifications for operating in Indian securities markets.", category: "Certifications", url: "https://www.nism.ac.in/certification-exams/", buttonLabel: "Official Website" },
      { name: "Chartered Financial Analyst (CFA)", description: "Global benchmark for investment and financial analytics.", category: "Certifications", url: "https://www.cfainstitute.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "National Merit Scholarship Portal", description: "Central scholarships for students pursuing commerce degrees.", category: "Scholarships", url: "https://scholarships.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Financial Literacy Schemes by SEBI", description: "SEBI initiatives to educate retail investors.", category: "Government Schemes", url: "https://investor.sebi.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "NSE Academy Courses", description: "Practical accounting, stock trading, and wealth management modules.", category: "Training Programs", url: "https://www.nseindia.com/learn/find-a-course", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "ICAI Chartered Accountancy Exams", description: "Information about CA Foundation, Intermediate, and Final exams.", category: "Entrance Exam Resources", url: "https://www.icai.org/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Moneycontrol Finance Portal", description: "Live stock market tracking, tax calculators, and business news.", category: "Useful Career Resources", url: "https://www.moneycontrol.com/", buttonLabel: "Official Website" }
    ]
  },
  "Agriculture & Rural Development": {
    courses: [
      { name: "Sustainable Agricultural Land Management", description: "Learn agricultural soil conservation and yield management.", category: "Recommended Courses", url: "https://www.coursera.org/learn/sustainable-agriculture", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Organic Farming Inspector Certification", description: "Credentials for certifying organic agricultural farms.", category: "Certifications", url: "https://dgt.gov.in/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "ICAR AIEEA Merit Scholarship", description: "Scholarships for pursuing undergraduate agricultural courses.", category: "Scholarships", url: "https://icar.org.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "PM Kisan Samman Nidhi", description: "Direct financial support scheme for agricultural households.", category: "Government Schemes", url: "https://pmkisan.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "KVK (Krishi Vigyan Kendra) Training", description: "Hands-on technological farm training programs.", category: "Training Programs", url: "https://kvk.icar.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "ICAR Agricultural Admission Portal", description: "Details on ICAR AIEEA exams for agricultural universities.", category: "Entrance Exam Resources", url: "https://icar.nta.ac.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Farmer's Portal India", description: "One-stop database for fertilizers, crop details, and weather.", category: "Useful Career Resources", url: "https://farmer.gov.in/", buttonLabel: "Official Website" }
    ]
  },
  "Beauty & Wellness": {
    courses: [
      { name: "Cosmetology & Aesthetic Therapy", description: "Learn hair styling, skincare science, and salon services.", category: "Recommended Courses", url: "https://www.vlccinstitute.com/", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "CIDESCO Diploma", description: "International premier standard in beauty and spa therapy.", category: "Certifications", url: "https://cidesco.com/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "VLCC Scholarship Programs", description: "Vocational financial support for aspiring beauty practitioners.", category: "Scholarships", url: "https://www.vlccinstitute.com/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "PMKVY Cosmetology Scheme", description: "Free government certified training in beauty care.", category: "Government Schemes", url: "https://www.pmkvyofficial.org/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "Skill India Wellness Academy", description: "Accredited practical training in grooming and skin therapy.", category: "Training Programs", url: "https://nsdcindia.org/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "CIDESCO International Examinations", description: "Entrance and examination guidelines for CIDESCO centers.", category: "Entrance Exam Resources", url: "https://cidesco.com/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Beauty & Wellness Skill Council", description: "Professional guidelines and industry safety standards.", category: "Useful Career Resources", url: "https://www.bwssc.in/", buttonLabel: "Official Website" }
    ]
  },
  "Homemaker & Home Business": {
    courses: [
      { name: "How to Start a Home-Based Business", description: "Learn pricing, niche creation, and home boutique management.", category: "Recommended Courses", url: "https://www.startupindia.gov.in/", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "FSSAI Food Safety License", description: "Mandatory safety license for launching home bakeries or catering.", category: "Certifications", url: "https://foscos.fssai.gov.in/", buttonLabel: "Official Website" },
      { name: "MSME Udyam Registration", description: "Official government registration to unlock small business benefits.", category: "Certifications", url: "https://udyamregistration.gov.in/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "Mudra Shishu Loan Scheme", description: "Micro-business seed funding grants up to Rs. 50,000.", category: "Scholarships", url: "https://www.mudra.org.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Priyadarshini Yojana Scheme", description: "Subsidy scheme for women setting up home boutiques.", category: "Government Schemes", url: "https://www.standupmitra.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "MSME Micro-Enterprise Incubation", description: "Online webinars and physical workshops on home packaging and accounting.", category: "Training Programs", url: "https://www.msmetraining.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "MSME Entrepreneur Training Entry", description: "Application portal for free regional craft and packaging programs.", category: "Entrance Exam Resources", url: "https://www.msmetraining.gov.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Government e-Marketplace (GeM)", description: "Sell handicrafts and home products directly to government offices.", category: "Useful Career Resources", url: "https://gem.gov.in/", buttonLabel: "Official Website" }
    ]
  },
  "Media & Communication": {
    courses: [
      { name: "Journalism Foundations", description: "Understand news gathering, reporting ethics, and digital media.", category: "Recommended Courses", url: "https://www.coursera.org/learn/journalism", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Adobe Premiere Pro Certification", description: "Professional credentials in video editing software.", category: "Certifications", url: "https://www.adobe.com/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "National Media Fellowship", description: "Grant schemes for women reporters studying developmental issues.", category: "Scholarships", url: "https://pib.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Press Information Bureau Internship", description: "Government scheme providing journalism students media exposure.", category: "Government Schemes", url: "https://pib.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "IIMC Short-Term Media Training", description: "Broadcasting and social media management courses.", category: "Training Programs", url: "http://iimc.nic.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "IIMC Entrance Examination Portal", description: "Details on PG Diploma admissions at premier media institutes.", category: "Entrance Exam Resources", url: "http://iimc.nic.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Press Council of India Guidelines", description: "Ethical journalism guidelines and reporting resources.", category: "Useful Career Resources", url: "https://presscouncil.nic.in/", buttonLabel: "Official Website" }
    ]
  },
  "Defence & Security": {
    courses: [
      { name: "Security & Strategic Studies", description: "Understanding national defense tactics, crisis management, and history.", category: "Recommended Courses", url: "https://www.coursera.org/learn/security-strategic", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "NCC C-Certificate", description: "Accredited national cadet training validating military discipline.", category: "Certifications", url: "https://indiancc.nic.in/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "Prime Minister's Scholarship Scheme (PMSS)", description: "Scholarship support for wards of army, police, and CAPF families.", category: "Scholarships", url: "https://scholarships.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "NCC Special Entry Schemes", description: "Direct SSB entry opportunities for NCC C-Certificate holders.", category: "Government Schemes", url: "https://joinindianarmy.nic.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "Agniveer Recruitment Training", description: "Guidance and physical training academies run by local administrations.", category: "Training Programs", url: "https://joinindianarmy.nic.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "NDA Entrance Exam Portal", description: "UPSC page for National Defence Academy admissions.", category: "Entrance Exam Resources", url: "https://upsc.gov.in/", buttonLabel: "Official Website" },
      { name: "Indian Air Force AFCAT Exam", description: "Official entry portal for Air Force flying and ground branches.", category: "Entrance Exam Resources", url: "https://afcat.cdac.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Join Indian Army Portal", description: "Direct official recruitment notices, schedules, and eligibility.", category: "Useful Career Resources", url: "https://joinindianarmy.nic.in/", buttonLabel: "Official Website" }
    ]
  },
  "Social Service & NGO": {
    courses: [
      { name: "Social Work Methods", description: "Introduction to community reform, ethics, and field practices.", category: "Recommended Courses", url: "https://www.coursera.org/learn/social-work", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "NGO Administration Certification", description: "Learn compliance, bookkeeping, and grant applications.", category: "Certifications", url: "https://tiss.edu/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "National Fellowship for Social Sciences", description: "Scholarships for research into rural welfare and anthropology.", category: "Scholarships", url: "https://scholarships.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "STEP (Support to Training for Women)", description: "Government scheme providing employment opportunities to women.", category: "Government Schemes", url: "https://wcd.nic.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "TISS Rural Fieldwork Program", description: "Guided fieldwork and community organizing internships.", category: "Training Programs", url: "https://tiss.edu/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "TISS-NET Admission Portal", description: "Entrance portal for Master of Social Work (MSW) courses.", category: "Entrance Exam Resources", url: "https://tiss.edu/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Darpan NGO Portal", description: "Government platform for registering NGOs and checking grants.", category: "Useful Career Resources", url: "https://ngodarpan.gov.in/", buttonLabel: "Official Website" }
    ]
  },
  "Hospitality & Tourism": {
    courses: [
      { name: "Hotel Management Fundamentals", description: "Learn front office operations, catering, and guest relationship.", category: "Recommended Courses", url: "https://www.edx.org/course/hotel-management", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "IATA Travel & Tourism Diploma", description: "Global standard qualification for airline and travel consultants.", category: "Certifications", url: "https://www.iata.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "NCHMCT Merit Scholarships", description: "Financial grants for top-performing hotel management students.", category: "Scholarships", url: "https://nchm.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "Incredible India Tourist Facilitator Program", description: "Free training and registration portal to become official tourist guides.", category: "Government Schemes", url: "https://iitf.tourism.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "Hunar Se Rozgar Tak Initiative", description: "Free short-term vocational courses in food, bakery, and service.", category: "Training Programs", url: "https://tourism.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "NCHMCT JEE Admission Portal", description: "Entrance test guidelines for National Council of Hotel Management.", category: "Entrance Exam Resources", url: "https://nchmjee.nta.nic.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Ministry of Tourism Official Website", description: "Policy guidelines, tourism statistics, and development updates.", category: "Useful Career Resources", url: "https://tourism.gov.in/", buttonLabel: "Official Website" }
    ]
  },
  "Research & Science": {
    courses: [
      { name: "Understanding Research Methods", description: "Learn quantitative and qualitative experimentation models.", category: "Recommended Courses", url: "https://www.coursera.org/learn/research-methods", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "Lab Biosafety Certification", description: "International standard credentials for lab safety handling.", category: "Certifications", url: "https://dgt.gov.in/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "INSPIRE Scholarship for Higher Education", description: "DST scheme supporting scientific research aspirants.", category: "Scholarships", url: "https://online-inspire.gov.in/", buttonLabel: "Apply Now" },
      { name: "CSIR Junior Research Fellowship", description: "Fellowships for doctoral scientific researchers.", category: "Scholarships", url: "https://csirnet.nta.nic.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "DST Women Scientists Scheme", description: "Initiatives to encourage women to restart careers in science.", category: "Government Schemes", url: "https://dst.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "ISRO / DRDO Summer Internships", description: "Project internships for science graduates in premium research labs.", category: "Training Programs", url: "https://www.isro.gov.in/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "IISER Aptitude Test (IAT) Portal", description: "Admissions information for integrated BS-MS science programs.", category: "Entrance Exam Resources", url: "https://iiseradmission.in/", buttonLabel: "Official Website" },
      { name: "CSIR UGC NET Examination Portal", description: "Official updates, syllabus, and results for JRF credentials.", category: "Entrance Exam Resources", url: "https://csirnet.nta.nic.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "DST (Department of Science & Technology)", description: "Research funding opportunities and scientific project databases.", category: "Useful Career Resources", url: "https://dst.gov.in/", buttonLabel: "Official Website" }
    ]
  },
  "Skilled Trades & Vocational Careers": {
    courses: [
      { name: "Basic Electrical Wiring & Safety", description: "Practical introduction to home circuits, currents, and safety.", category: "Recommended Courses", url: "https://dgt.gov.in/", buttonLabel: "Visit Course" }
    ],
    certifications: [
      { name: "National Trade Certificate (NTC)", description: "Official trade validation issued after ITI trade certification.", category: "Certifications", url: "https://www.apprenticeshipindia.gov.in/", buttonLabel: "Official Website" },
      { name: "AWS Welding Certification", description: "International standard credentials for fabricators.", category: "Certifications", url: "https://www.aws.org/", buttonLabel: "Official Website" }
    ],
    scholarships: [
      { name: "National Apprenticeship Stipend", description: "Financial monthly stipend support during vocational training.", category: "Scholarships", url: "https://www.apprenticeshipindia.gov.in/", buttonLabel: "Apply Now" }
    ],
    schemes: [
      { name: "National Apprenticeship Promotion Scheme (NAPS)", description: "Government apprenticeship integration with industrial training.", category: "Government Schemes", url: "https://www.apprenticeshipindia.gov.in/", buttonLabel: "Official Website" },
      { name: "Craftsmen Training Scheme (CTS)", description: "Structured trade-based classroom training programs.", category: "Government Schemes", url: "https://dgt.gov.in/", buttonLabel: "Official Website" }
    ],
    training: [
      { name: "PMKVY Technical Skill Training", description: "Short-term courses on HVAC, plumbing, and automotive trades.", category: "Training Programs", url: "https://www.pmkvyofficial.org/", buttonLabel: "Official Website" }
    ],
    exams: [
      { name: "All India Trade Test (AITT) Portal", description: "Schedules and examinations guidelines for NTC certification.", category: "Entrance Exam Resources", url: "https://dgt.gov.in/", buttonLabel: "Official Website" }
    ],
    resources: [
      { name: "Directorate General of Training (DGT)", description: "List of government ITIs, trade syllabi, and safety guidelines.", category: "Useful Career Resources", url: "https://dgt.gov.in/", buttonLabel: "Official Website" }
    ]
  }
};

export default learningResources;
