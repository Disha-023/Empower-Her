import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { ChevronRight, ArrowLeft, Check, CheckCircle2, Award, BookOpen, Heart, Activity, Compass, Bookmark, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const questions = [
  {
    id: 1,
    question: "Which activities do you enjoy the most?",
    options: [
      { text: "Developing apps, websites, or solving coding problems", domains: ["Technology & IT"] },
      { text: "Helping sick or injured people", domains: ["Medical & Healthcare"] },
      { text: "Leading a team or managing events", domains: ["Business & Entrepreneurship", "Government Services", "Hospitality & Tourism"] },
      { text: "Teaching others", domains: ["Education & Teaching"] },
      { text: "Drawing, designing, or creating content", domains: ["Arts & Creativity", "Media & Communication"] },
      { text: "Playing sports or exercising", domains: ["Sports & Fitness"] },
      { text: "Studying laws and debating issues", domains: ["Law & Legal Services"] },
      { text: "Conducting experiments and research", domains: ["Research & Science"] }
    ]
  },
  {
    id: 2,
    question: "Which subjects do you enjoy most?",
    options: [
      { text: "Mathematics", domains: ["Finance & Commerce", "Technology & IT", "Research & Science"] },
      { text: "Science", domains: ["Research & Science", "Medical & Healthcare"] },
      { text: "Biology", domains: ["Medical & Healthcare", "Research & Science"] },
      { text: "Computer Science", domains: ["Technology & IT"] },
      { text: "Economics", domains: ["Finance & Commerce", "Business & Entrepreneurship"] },
      { text: "Political Science", domains: ["Government Services", "Law & Legal Services"] },
      { text: "Physical Education", domains: ["Sports & Fitness", "Defence & Security"] },
      { text: "Arts & Literature", domains: ["Arts & Creativity", "Media & Communication"] }
    ]
  },
  {
    id: 3,
    question: "What kind of work environment attracts you?",
    options: [
      { text: "Office with technology and innovation", domains: ["Technology & IT", "Business & Entrepreneurship"] },
      { text: "Hospital or healthcare center", domains: ["Medical & Healthcare", "Beauty & Wellness"] },
      { text: "Government office", domains: ["Government Services"] },
      { text: "School or college", domains: ["Education & Teaching"] },
      { text: "Sports ground or gym", domains: ["Sports & Fitness", "Beauty & Wellness"] },
      { text: "Courtroom or legal office", domains: ["Law & Legal Services"] },
      { text: "Research laboratory", domains: ["Research & Science"] },
      { text: "Outdoor/agricultural field", domains: ["Agriculture & Rural Development", "Skilled Trades & Vocational Careers"] }
    ]
  },
  {
    id: 4,
    question: "What would you prefer to do in your free time?",
    options: [
      { text: "Learn new technologies", domains: ["Technology & IT"] },
      { text: "Read medical or health-related content", domains: ["Medical & Healthcare"] },
      { text: "Watch business and startup videos", domains: ["Business & Entrepreneurship", "Finance & Commerce"] },
      { text: "Create art, music, or content", domains: ["Arts & Creativity", "Media & Communication"] },
      { text: "Play sports", domains: ["Sports & Fitness"] },
      { text: "Volunteer for social causes", domains: ["Social Service & NGO"] },
      { text: "Read scientific discoveries", domains: ["Research & Science"] },
      { text: "Learn beauty and wellness techniques", domains: ["Beauty & Wellness", "Hospitality & Tourism"] }
    ]
  },
  {
    id: 5,
    question: "Which achievement would make you happiest?",
    options: [
      { text: "Building a successful software product", domains: ["Technology & IT"] },
      { text: "Saving someone's life", domains: ["Medical & Healthcare", "Defence & Security"] },
      { text: "Becoming a government officer", domains: ["Government Services"] },
      { text: "Starting a successful company", domains: ["Business & Entrepreneurship", "Homemaker & Home Business"] },
      { text: "Inspiring students", domains: ["Education & Teaching"] },
      { text: "Winning a sports competition", domains: ["Sports & Fitness"] },
      { text: "Solving an important scientific problem", domains: ["Research & Science"] },
      { text: "Helping society", domains: ["Social Service & NGO", "Agriculture & Rural Development"] }
    ]
  },
  {
    id: 6,
    question: "What are your strongest skills?",
    options: [
      { text: "Logical thinking", domains: ["Technology & IT", "Research & Science", "Finance & Commerce"] },
      { text: "Communication", domains: ["Media & Communication", "Education & Teaching", "Hospitality & Tourism"] },
      { text: "Leadership", domains: ["Business & Entrepreneurship", "Government Services", "Defence & Security"] },
      { text: "Creativity", domains: ["Arts & Creativity", "Media & Communication", "Homemaker & Home Business"] },
      { text: "Physical fitness", domains: ["Sports & Fitness", "Defence & Security"] },
      { text: "Observation and research", domains: ["Research & Science", "Law & Legal Services"] },
      { text: "Problem-solving", domains: ["Technology & IT", "Skilled Trades & Vocational Careers"] },
      { text: "Patience and empathy", domains: ["Medical & Healthcare", "Social Service & NGO", "Education & Teaching"] }
    ]
  },
  {
    id: 7,
    question: "Which of these tools would you enjoy using?",
    options: [
      { text: "Computer and software", domains: ["Technology & IT", "Finance & Commerce"] },
      { text: "Medical equipment", domains: ["Medical & Healthcare"] },
      { text: "Scientific instruments", domains: ["Research & Science"] },
      { text: "Sports equipment", domains: ["Sports & Fitness"] },
      { text: "Camera and editing software", domains: ["Media & Communication", "Arts & Creativity"] },
      { text: "Legal documents", domains: ["Law & Legal Services"] },
      { text: "Financial software", domains: ["Finance & Commerce", "Business & Entrepreneurship"] },
      { text: "Agricultural machinery", domains: ["Agriculture & Rural Development", "Skilled Trades & Vocational Careers"] }
    ]
  },
  {
    id: 8,
    question: "Which challenge excites you?",
    options: [
      { text: "Solving technical problems", domains: ["Technology & IT"] },
      { text: "Diagnosing diseases", domains: ["Medical & Healthcare"] },
      { text: "Running a business", domains: ["Business & Entrepreneurship", "Homemaker & Home Business"] },
      { text: "Creating innovative designs", domains: ["Arts & Creativity", "Media & Communication"] },
      { text: "Training for competitions", domains: ["Sports & Fitness"] },
      { text: "Investigating legal cases", domains: ["Law & Legal Services"] },
      { text: "Conducting research", domains: ["Research & Science"] },
      { text: "Managing social welfare projects", domains: ["Social Service & NGO", "Government Services"] }
    ]
  },
  {
    id: 9,
    question: "What kind of impact do you want to create?",
    options: [
      { text: "Technological advancement", domains: ["Technology & IT"] },
      { text: "Better healthcare", domains: ["Medical & Healthcare", "Beauty & Wellness"] },
      { text: "National development", domains: ["Government Services", "Defence & Security"] },
      { text: "Employment generation", domains: ["Business & Entrepreneurship", "Homemaker & Home Business"] },
      { text: "Education improvement", domains: ["Education & Teaching"] },
      { text: "Social welfare", domains: ["Social Service & NGO"] },
      { text: "Scientific discoveries", domains: ["Research & Science"] },
      { text: "Rural development", domains: ["Agriculture & Rural Development"] }
    ]
  },
  {
    id: 10,
    question: "Which role would you enjoy most?",
    options: [
      { text: "Software Engineer", domains: ["Technology & IT"] },
      { text: "Doctor", domains: ["Medical & Healthcare"] },
      { text: "IAS/IPS Officer", domains: ["Government Services", "Defence & Security"] },
      { text: "Entrepreneur", domains: ["Business & Entrepreneurship"] },
      { text: "Teacher", domains: ["Education & Teaching"] },
      { text: "Athlete", domains: ["Sports & Fitness"] },
      { text: "Scientist", domains: ["Research & Science"] },
      { text: "Lawyer", domains: ["Law & Legal Services"] }
    ]
  },
  {
    id: 11,
    question: "How do you prefer solving problems?",
    options: [
      { text: "Data and technology", domains: ["Technology & IT", "Finance & Commerce"] },
      { text: "Research and evidence", domains: ["Research & Science", "Medical & Healthcare"] },
      { text: "Team discussions", domains: ["Business & Entrepreneurship", "Social Service & NGO", "Hospitality & Tourism"] },
      { text: "Creativity and innovation", domains: ["Arts & Creativity", "Media & Communication"] },
      { text: "Practical experience", domains: ["Skilled Trades & Vocational Careers", "Agriculture & Rural Development", "Homemaker & Home Business"] },
      { text: "Legal frameworks", domains: ["Law & Legal Services", "Government Services"] }
    ]
  },
  {
    id: 12,
    question: "Which type of content do you watch online?",
    options: [
      { text: "Tech videos", domains: ["Technology & IT"] },
      { text: "Medical videos", domains: ["Medical & Healthcare"] },
      { text: "UPSC/Government exam videos", domains: ["Government Services"] },
      { text: "Startup podcasts", domains: ["Business & Entrepreneurship", "Finance & Commerce"] },
      { text: "Educational content", domains: ["Education & Teaching"] },
      { text: "Fitness videos", domains: ["Sports & Fitness", "Beauty & Wellness"] },
      { text: "Science documentaries", domains: ["Research & Science"] },
      { text: "Social awareness content", domains: ["Social Service & NGO", "Media & Communication"] }
    ]
  },
  {
    id: 13,
    question: "If given a project, what role would you choose?",
    options: [
      { text: "Developer", domains: ["Technology & IT"] },
      { text: "Team Leader", domains: ["Business & Entrepreneurship", "Government Services", "Defence & Security"] },
      { text: "Researcher", domains: ["Research & Science", "Law & Legal Services"] },
      { text: "Designer", domains: ["Arts & Creativity"] },
      { text: "Presenter", domains: ["Media & Communication", "Education & Teaching"] },
      { text: "Financial Planner", domains: ["Finance & Commerce"] },
      { text: "Legal Advisor", domains: ["Law & Legal Services"] },
      { text: "Trainer", domains: ["Education & Teaching", "Sports & Fitness", "Beauty & Wellness", "Hospitality & Tourism"] }
    ]
  },
  {
    id: 14,
    question: "Which future goal appeals most to you?",
    options: [
      { text: "Work in a top tech company", domains: ["Technology & IT"] },
      { text: "Become a doctor", domains: ["Medical & Healthcare"] },
      { text: "Serve the nation", domains: ["Government Services", "Defence & Security"] },
      { text: "Build a successful business", domains: ["Business & Entrepreneurship", "Homemaker & Home Business"] },
      { text: "Become a professor", domains: ["Education & Teaching"] },
      { text: "Become a national athlete", domains: ["Sports & Fitness"] },
      { text: "Become a scientist", domains: ["Research & Science"] },
      { text: "Lead a social organization", domains: ["Social Service & NGO"] }
    ]
  },
  {
    id: 15,
    question: "Which statement best describes you?",
    options: [
      { text: "I love innovation and technology.", domains: ["Technology & IT", "Skilled Trades & Vocational Careers"] },
      { text: "I enjoy helping people physically and mentally.", domains: ["Medical & Healthcare", "Beauty & Wellness", "Social Service & NGO"] },
      { text: "I want authority and responsibility.", domains: ["Government Services", "Defence & Security"] },
      { text: "I enjoy taking risks and building businesses.", domains: ["Business & Entrepreneurship"] },
      { text: "I love sharing knowledge.", domains: ["Education & Teaching"] },
      { text: "I enjoy competition and fitness.", domains: ["Sports & Fitness"] },
      { text: "I enjoy discovering new things.", domains: ["Research & Science"] },
      { text: "I want to improve society.", domains: ["Social Service & NGO", "Agriculture & Rural Development"] }
    ]
  }
];

// Clean option texts to dynamic reasons
const optionToReasonText = {
  "Developing apps, websites, or solving coding problems": "Strong interest in app development and programming.",
  "Helping sick or injured people": "Innate desire to care for and heal others physically.",
  "Leading a team or managing events": "Demonstrated interest in management, leadership, and organization.",
  "Teaching others": "Love for sharing knowledge and academic mentoring.",
  "Drawing, designing, or creating content": "Creative inclination toward visual layout and content development.",
  "Playing sports or exercising": "High commitment to active training and physical fitness.",
  "Studying laws and debating issues": "Strong analytical approach to arguments, policies, and regulations.",
  "Conducting experiments and research": "Curiosity and systematic approach to experimental research.",
  "Mathematics": "High analytical aptitude and numerical problem-solving skills.",
  "Science": "Keen interest in natural sciences and investigative logic.",
  "Biology": "Strong foundation and curiosity about living organisms and biology.",
  "Computer Science": "Fascinated by computing systems, algorithms, and logic.",
  "Economics": "Aptitude for economic systems, market trends, and financial structures.",
  "Political Science": "Deep interest in administrative frameworks and political structures.",
  "Physical Education": "Understanding of fitness principles and physical activities.",
  "Arts & Literature": "Strong appreciation for literature, aesthetics, and fine arts.",
  "Office with technology and innovation": "Prefer working in tech-focused and forward-thinking work environments.",
  "Hospital or healthcare center": "Attracted to clinical setups and wellness environments.",
  "Government office": "Motivation for structured, public-serving administrative environments.",
  "School or college": "Comfortable in academic, teaching, or mentoring environments.",
  "Sports ground or gym": "Prefer dynamic, high-energy, athletic workspaces.",
  "Courtroom or legal office": "Interested in formal justice systems and debate-focused settings.",
  "Research laboratory": "Prefer focused, evidence-driven, and experimental laboratories.",
  "Outdoor/agricultural field": "Enjoy hands-on, natural, or trade-based field work.",
  "Learn new technologies": "Proactively explore tech advancements and digital tools.",
  "Read medical or health-related content": "Regularly follow health, healthcare, and biological discoveries.",
  "Watch business and startup videos": "Engaged with startup podcasts, financial systems, and venture ideas.",
  "Create art, music, or content": "Love for artistic design and content production during leisure.",
  "Play sports": "Active participant in competitive or recreational athletics.",
  "Volunteer for social causes": "Empathetic engagement with charity, social welfare, or community service.",
  "Read scientific discoveries": "Passionate reader of technological and scientific findings.",
  "Learn beauty and wellness techniques": "Interest in grooming, styling, and wellness treatment.",
  "Building a successful software product": "Goal-oriented toward launching digital products or platforms.",
  "Saving someone's life": "Welfare-centric goal of saving and protecting human lives.",
  "Becoming a government officer": "Aspire to hold positions of public responsibility and policy execution.",
  "Starting a successful company": "Aspire to build commercial enterprises or home businesses.",
  "Inspiring students": "Aspire to motivate, educate, and empower younger generations.",
  "Winning a sports competition": "Highly motivated by competitive sports achievements.",
  "Solving an important scientific problem": "Driven to decode scientific complex questions.",
  "Helping society": "Goal-oriented toward social justice and rural development.",
  "Logical thinking": "Highly developed reasoning and logical processing.",
  "Communication": "Excellent verbal articulation and interpersonal communication skills.",
  "Leadership": "Excellent group leading, guidance, and team building skills.",
  "Creativity": "Out-of-the-box thinking, drawing, or content creation abilities.",
  "Physical fitness": "High level of endurance, physical health, and stamina.",
  "Observation and research": "High attention to detail and rigorous inquiry skill.",
  "Problem-solving": "Practical troubleshooting and technical problem-solving ability.",
  "Patience and empathy": "High emotional intelligence, empathy, and active listening skills.",
  "Computer and software": "Enjoy operating computing hardware, software, and databases.",
  "Medical equipment": "Interest in diagnostic tools and medical care instruments.",
  "Scientific instruments": "Comfortable using advanced scientific and lab equipment.",
  "Sports equipment": "Prefer working with sports gear and fitness facilities.",
  "Camera and editing software": "Skilled at editing, videography, or media publishing tools.",
  "Legal documents": "Fascinated by contracts, statutes, and legal texts.",
  "Financial software": "Prefer using accounting sheets, budgets, and commercial software.",
  "Agricultural machinery": "Interest in operating mechanical systems and crop tools.",
  "Solving technical problems": "Excited by debugging errors and building technological models.",
  "Diagnosing diseases": "Excited by diagnosing symptoms and suggesting cures.",
  "Running a business": "Excited by market competition, trading, and business ownership.",
  "Creating innovative designs": "Excited by prototyping layouts and fashion concepts.",
  "Training for competitions": "Excited by intensive training schedules and tournament prep.",
  "Investigating legal cases": "Excited by defending rights, proving facts, and debating cases.",
  "Conducting research": "Excited by deep research questions and publishing studies.",
  "Managing social welfare projects": "Excited by social impact and public service organization.",
  "Technological advancement": "Want to contribute to global tech breakthroughs.",
  "Better healthcare": "Want to improve health accessibility and physical care.",
  "National development": "Want to strengthen the state administration and security services.",
  "Employment generation": "Want to create business opportunities and support home workers.",
  "Education improvement": "Want to elevate the quality of education and literacy.",
  "Social welfare": "Want to support marginalized communities and raise social justice.",
  "Scientific discoveries": "Want to uncover new laws of science and nature.",
  "Rural development": "Want to modernize villages and agricultural sectors.",
  "Software Engineer": "Strong alignment with software coding and engineering jobs.",
  "Doctor": "Strong alignment with medical practitioners and clinicians.",
  "IAS/IPS Officer": "Strong alignment with civil services, policing, and administration.",
  "Entrepreneur": "Strong alignment with startup founders and business owners.",
  "Teacher": "Strong alignment with school educators, tutors, and academic guides.",
  "Athlete": "Strong alignment with professional sports persons and athletes.",
  "Scientist": "Strong alignment with laboratory scientists and academic researchers.",
  "Lawyer": "Strong alignment with legal counsels, lawyers, and corporate attorneys.",
  "Data and technology": "Prefer data-backed and digital tools for solving problems.",
  "Research and evidence": "Prefer scientific research, empirical evidence, and clinical trials.",
  "Team discussions": "Prefer group discussions, corporate meetings, and brainstorming sessions.",
  "Creativity and innovation": "Prefer original design, aesthetic models, and creative content.",
  "Practical experience": "Prefer hand-on execution, physical tools, and vocational trades.",
  "Legal frameworks": "Prefer legal codes, administrative statutes, and regulatory guidelines.",
  "Tech videos": "Regular consumer of technology news and coding tutorials.",
  "Medical videos": "Regular consumer of medical case studies and healthcare content.",
  "UPSC/Government exam videos": "Regularly study civil service and administration content.",
  "Startup podcasts": "Frequently listen to startup stories and marketing strategies.",
  "Educational content": "Regular viewer of educational and tutoring channels.",
  "Fitness videos": "Frequently watch active workouts and wellness tutorials.",
  "Science documentaries": "Frequent viewer of scientific breakthroughs and nature documentaries.",
  "Social awareness content": "Regular consumer of social advocacy and PR media.",
  "Developer": "Project preference: coding products and database frameworks.",
  "Team Leader": "Project preference: managing team milestones and deliverables.",
  "Researcher": "Project preference: literature search, legal briefs, or scientific queries.",
  "Designer": "Project preference: building UI graphics or layout themes.",
  "Presenter": "Project preference: speech delivery and public pitching.",
  "Financial Planner": "Project preference: budget estimation and accounting ledger.",
  "Legal Advisor": "Project preference: verifying terms, compliance, and legal guidelines.",
  "Trainer": "Project preference: coaching, personal fitness, or technical skills.",
  "Work in a top tech company": "Long-term goal: join leading global technology networks.",
  "Become a doctor": "Long-term goal: practice medicine and save patient lives.",
  "Serve the nation": "Long-term goal: join the defence forces or civil services.",
  "Build a successful business": "Long-term goal: construct scalable businesses or creative studios.",
  "Become a professor": "Long-term goal: join universities and lead advanced lectures.",
  "Become a national athlete": "Long-term goal: represent the country in professional athletic events.",
  "Become a scientist": "Long-term goal: discover new research findings at top scientific labs.",
  "Lead a social organization": "Long-term goal: direct social NGOs and charity missions.",
  "I love innovation and technology.": "Self-description: tech enthusiast focused on innovation.",
  "I enjoy helping people physically and mentally.": "Self-description: compassionate helper for healthcare and beauty.",
  "I want authority and responsibility.": "Self-description: ready for administration and national defence.",
  "I enjoy taking risks and building businesses.": "Self-description: risk-taker aiming at entrepreneurship.",
  "I love sharing knowledge.": "Self-description: knowledge sharer aligned with education.",
  "I enjoy competition and fitness.": "Self-description: competitive spirit with a passion for physical fitness.",
  "I enjoy discovering new things.": "Self-description: curious mind focused on scientific research.",
  "I want to improve society.": "Self-description: social activist motivated to aid local communities."
};

// Supported domains normalization helper
const getNormalizedDomainKey = (domain) => {
  if (!domain) return 'technology';
  const lower = domain.toLowerCase();
  if (lower.includes('tech')) return 'technology';
  if (lower.includes('med') || lower.includes('health')) return 'medical';
  if (lower.includes('educ') || lower.includes('teach')) return 'education';
  if (lower.includes('sport') || lower.includes('fit')) return 'sports';
  if (lower.includes('entrepreneur')) return 'entrepreneurship';
  if (lower.includes('business')) return 'business';
  if (lower.includes('gov')) return 'government';
  if (lower.includes('fin') || lower.includes('commerc')) return 'finance';
  if (lower.includes('law') || lower.includes('legal')) return 'law';
  if (lower.includes('art') || lower.includes('creative')) return 'arts';
  if (lower.includes('medi') || lower.includes('commun')) return 'media';
  if (lower.includes('agri') || lower.includes('rural')) return 'agriculture';
  if (lower.includes('beauty') || lower.includes('well')) return 'beauty';
  if (lower.includes('research') || lower.includes('science')) return 'research';
  if (lower.includes('def') || lower.includes('polic') || lower.includes('secur')) return 'defence';
  if (lower.includes('ngo') || lower.includes('social') || lower.includes('welfa')) return 'ngo';
  if (lower.includes('home')) return 'homemaker';
  if (lower.includes('hospit') || lower.includes('tour')) return 'hospitality';
  if (lower.includes('trade') || lower.includes('vocat')) return 'trades';
  return 'technology';
};

// 19 Career Domains Mapping Registry
const domainMappings = {
  technology: {
    domainName: "Technology",
    careerPaths: ["Software Developer", "Data Analyst", "Web Developer", "Cyber Security Analyst"],
    courses: [
      { title: "Introduction to Python Programming", url: "https://www.coursera.org/learn/python-basics" },
      { title: "Web Development Bootcamp", url: "https://www.freecodecamp.org/" }
    ],
    schemes: [
      { name: "Pragati Scholarship Scheme", url: "https://www.myscheme.gov.in" },
      { name: "Inspire Scholarship Program", url: "https://www.myscheme.gov.in" }
    ]
  },
  medical: {
    domainName: "Medical",
    careerPaths: ["Doctor", "Nurse", "Pharmacist", "Physiotherapist"],
    courses: [
      { title: "Introduction to Human Physiology", url: "https://www.coursera.org/learn/physiology" },
      { title: "Medical Terminology Course", url: "https://www.coursera.org/learn/medical-terminology" }
    ],
    schemes: [
      { name: "Ayushman Bharat PM-JAY", url: "https://www.myscheme.gov.in" },
      { name: "PM Mahila Shakti Kendra Scheme", url: "https://www.myscheme.gov.in" }
    ]
  },
  education: {
    domainName: "Education",
    careerPaths: ["School Teacher", "College Professor", "Education Consultant", "Corporate Trainer"],
    courses: [
      { title: "Foundations of Teaching for Learning", url: "https://www.coursera.org/learn/foundations-of-teaching" }
    ],
    schemes: [
      { name: "CBSE Udaan Scheme", url: "https://www.myscheme.gov.in" },
      { name: "Begum Hazrat Mahal National Scholarship", url: "https://www.myscheme.gov.in" }
    ]
  },
  sports: {
    domainName: "Sports",
    careerPaths: ["Professional Athlete", "Sports Coach", "Fitness Trainer", "Sports Journalist"],
    courses: [
      { title: "Science of Exercise", url: "https://www.coursera.org/learn/science-exercise" }
    ],
    schemes: [
      { name: "Khelo India National Programme", url: "https://www.myscheme.gov.in" }
    ]
  },
  business: {
    domainName: "Business",
    careerPaths: ["Business Development Manager", "Operations Manager", "Market Analyst"],
    courses: [
      { title: "Introduction to Business Management", url: "https://www.edx.org/course/introduction-to-business-management" }
    ],
    schemes: [
      { name: "Pradhan Mantri Mudra Yojana", url: "https://www.myscheme.gov.in" },
      { name: "Stand-Up India Scheme", url: "https://www.myscheme.gov.in" }
    ]
  },
  entrepreneurship: {
    domainName: "Entrepreneurship",
    careerPaths: ["Startup Founder", "Small Business Owner", "Business Consultant"],
    courses: [
      { title: "Women Entrepreneurship Program", url: "https://www.coursera.org/learn/women-entrepreneurship" }
    ],
    schemes: [
      { name: "Mahila Coir Yojana", url: "https://www.myscheme.gov.in" },
      { name: "Stand-Up India Scheme", url: "https://www.myscheme.gov.in" }
    ]
  },
  government: {
    domainName: "Government Jobs",
    careerPaths: ["Civil Servant (IAS/IPS)", "Public Officer", "Administrative Assistant"],
    courses: [
      { title: "Public Administration Basics", url: "https://www.edx.org/course/introduction-to-public-administration" }
    ],
    schemes: [
      { name: "NARI Portal Services", url: "https://www.myscheme.gov.in" }
    ]
  },
  finance: {
    domainName: "Finance",
    careerPaths: ["Financial Analyst", "Investment Banker", "Accountant", "Tax Consultant"],
    courses: [
      { title: "Financial Markets by Yale University", url: "https://www.coursera.org/learn/financial-markets-global" }
    ],
    schemes: [
      { name: "Mahila Samman Savings Certificate", url: "https://www.myscheme.gov.in" },
      { name: "Sukanya Samriddhi Yojana", url: "https://www.myscheme.gov.in" }
    ]
  },
  law: {
    domainName: "Law",
    careerPaths: ["Lawyer", "Legal Advisor", "Corporate Counsel", "Judge"],
    courses: [
      { title: "Introduction to International Law", url: "https://www.coursera.org/learn/international-law" }
    ],
    schemes: [
      { name: "Free Legal Aid for Women", url: "https://www.myscheme.gov.in" },
      { name: "Nari Adalat Schemes", url: "https://www.myscheme.gov.in" }
    ]
  },
  arts: {
    domainName: "Arts",
    careerPaths: ["Graphic Designer", "Illustrator", "Fashion Designer", "Animator"],
    courses: [
      { title: "Introduction to Graphic Design", url: "https://www.coursera.org/learn/graphic-design" }
    ],
    schemes: [
      { name: "Cultural Talent Search Scholarship", url: "https://www.myscheme.gov.in" }
    ]
  },
  media: {
    domainName: "Media",
    careerPaths: ["Journalist", "Content Creator", "Editor", "Public Relations Specialist"],
    courses: [
      { title: "Introduction to Journalism", url: "https://www.coursera.org/learn/journalism" }
    ],
    schemes: [
      { name: "National Media Fellowships for Women", url: "https://www.myscheme.gov.in" }
    ]
  },
  agriculture: {
    domainName: "Agriculture",
    careerPaths: ["Agronomist", "Agricultural Officer", "Farm Manager"],
    courses: [
      { title: "Sustainable Agricultural Land Management", url: "https://www.coursera.org/learn/sustainable-agriculture" }
    ],
    schemes: [
      { name: "Mahila Kisan Sashaktikaran Pariyojana (MKSP)", url: "https://www.myscheme.gov.in" },
      { name: "PM Kisan Samman Nidhi", url: "https://www.myscheme.gov.in" }
    ]
  },
  beauty: {
    domainName: "Beauty & Wellness",
    careerPaths: ["Beautician", "Salon Manager", "Makeup Artist", "Wellness Consultant"],
    courses: [
      { title: "Cosmetology & Beauty Therapy", url: "https://www.udemy.com/topic/cosmetology/" }
    ],
    schemes: [
      { name: "PM Kaushal Vikas Yojana (PMKVY) - Beauty Therapy", url: "https://www.myscheme.gov.in" },
      { name: "Nayi Roshni Scheme", url: "https://www.myscheme.gov.in" }
    ]
  },
  research: {
    domainName: "Research",
    careerPaths: ["Research Scientist", "Lab Technician", "Data Scientist"],
    courses: [
      { title: "Understanding Research Methods", url: "https://www.coursera.org/learn/research-methods" }
    ],
    schemes: [
      { name: "WOS-A (Women Scientists Scheme)", url: "https://www.myscheme.gov.in" },
      { name: "CURIE Scheme", url: "https://www.myscheme.gov.in" }
    ]
  },
  defence: {
    domainName: "Defence",
    careerPaths: ["Army Officer", "Police Officer", "Security Consultant"],
    courses: [
      { title: "Security & Strategic Studies", url: "https://www.coursera.org/learn/security-strategic" }
    ],
    schemes: [
      { name: "Short Service Commission for Women", url: "https://www.myscheme.gov.in" }
    ]
  },
  ngo: {
    domainName: "NGO & Social Work",
    careerPaths: ["Social Worker", "NGO Director", "Community Coordinator"],
    courses: [
      { title: "Global Social Work", url: "https://www.coursera.org/learn/social-work" }
    ],
    schemes: [
      { name: "Support to Training and Employment Programme for Women (STEP)", url: "https://www.myscheme.gov.in" },
      { name: "Swadhar Greh Scheme", url: "https://www.myscheme.gov.in" }
    ]
  },
  homemaker: {
    domainName: "Homemaker & Home Business",
    careerPaths: ["Home Baker", "Fashion Tailor", "Craft Business Owner"],
    courses: [
      { title: "How to Start a Home-Based Business", url: "https://www.udemy.com/course/start-your-own-home-business/" }
    ],
    schemes: [
      { name: "Priyadarshini Yojana", url: "https://www.myscheme.gov.in" },
      { name: "Dena Shakti Scheme", url: "https://www.myscheme.gov.in" }
    ]
  },
  hospitality: {
    domainName: "Hospitality & Tourism",
    careerPaths: ["Hotel Manager", "Tour Guide", "Event Planner", "Travel Agent"],
    courses: [
      { title: "Hotel Management Fundamentals", url: "https://www.edx.org/course/hotel-management" }
    ],
    schemes: [
      { name: "Hunar Se Rozgar Tak (HSRT) Initiative", url: "https://www.myscheme.gov.in" }
    ]
  },
  trades: {
    domainName: "Skilled Trades",
    careerPaths: ["Electrician", "Carpenter", "Welder", "HVAC Technician"],
    courses: [
      { title: "Basic Electrical Safety & Wiring", url: "https://www.udemy.com/course/electrical-wiring/" }
    ],
    schemes: [
      { name: "Jan Shikshan Sansthan (JSS) Vocational Courses", url: "https://www.myscheme.gov.in" },
      { name: "Craftsmen Training Scheme (CTS)", url: "https://www.myscheme.gov.in" }
    ]
  }
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIdx]: [selectedOptionTexts] }
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null); // { top3: [{domain, percentage}], dynamicReasons: [str], scores: {} }
  const [selectedCareer, setSelectedCareer] = useState('');
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);


  // Load existing quiz result if user already completed it
  useEffect(() => {
    const fetchLatest = async () => {
      // Check localStorage first
      const storedResults = localStorage.getItem('quiz_results');
      const storedCareer = localStorage.getItem('selected_career');
      if (storedResults && storedCareer) {
        try {
          const parsed = JSON.parse(storedResults);
          if (parsed && typeof parsed === 'object' && Array.isArray(parsed.top3)) {
            setResults(parsed);
            if (storedCareer) {
              setSelectedCareer(storedCareer);
            }
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // If logged in, fetch from backend as fallback/sync
      if (user) {
        try {
          const res = await api.get('/quiz/latest');
          if (res && res.data) {
            const quizData = res.data;
            if (quizData && typeof quizData === 'object') {
              const topRecommendationsList = Array.isArray(quizData.topRecommendations) ? quizData.topRecommendations : [];
              const top3Formatted = topRecommendationsList
                .filter(domain => typeof domain === 'string')
                .map((domain) => ({
                  domain,
                  percentage: (quizData.confidenceScores && typeof quizData.confidenceScores === 'object')
                    ? quizData.confidenceScores[domain] || 0
                    : 0
                }));

              if (top3Formatted.length > 0) {
                const quizResultsObject = {
                  top3: top3Formatted,
                  scores: quizData.scores || {},
                  dynamicReasons: generateReasonsForDomain(top3Formatted[0]?.domain || '', quizData.quizAnswers || {})
                };
                setResults(quizResultsObject);
                setSelectedCareer(user?.career || top3Formatted[0]?.domain || '');
              }
            }
          }
        } catch (err) {
          console.error("Error fetching latest quiz", err);
        }
      }
    };
    fetchLatest();
  }, [user]);

  const handleOptionToggle = (optionText) => {
    if (!optionText) return;
    const currentSelections = Array.isArray(answers?.[currentQuestion]) ? answers[currentQuestion] : [];
    if (currentSelections.includes(optionText)) {
      setAnswers({
        ...answers,
        [currentQuestion]: currentSelections.filter(text => text !== optionText)
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion]: [...currentSelections, optionText]
      });
    }
  };

  const handleNext = () => {
    const totalQ = activeQuestions?.length || 0;
    if (currentQuestion < totalQ - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateReasonsForDomain = (targetDomain, quizAnswersObject) => {
    if (!targetDomain) return ["Strong interest in the domain field.", "Aligned with the professional standards of this sector.", "Goal-oriented career growth path."];
    const selectedOptionsList = Object.values(quizAnswersObject || {})
      .filter(Array.isArray)
      .flat()
      .filter(Boolean);
    const matches = [];

    const activeQList = Array.isArray(activeQuestions) ? activeQuestions : [];

    activeQList.forEach(q => {
      if (!q || !Array.isArray(q.options)) return;
      q.options.forEach(opt => {
        if (opt && opt.text && selectedOptionsList.includes(opt.text) && Array.isArray(opt.domains) && opt.domains.includes(targetDomain)) {
          const reasonText = optionToReasonText[opt.text];
          if (reasonText && !matches.includes(reasonText)) {
            matches.push(reasonText);
          }
        }
      });
    });

    // Fallback reasons if not enough matches found
    const defaultReasons = {
      "Technology & IT": ["Interest in building modern web systems.", "Logical coding and system design mindset.", "Interest in software technology solutions."],
      "Medical & Healthcare": ["Inclination to care for patient welfare.", "Passionate about health science and clinic systems.", "Aptitude for human biology and diagnosis."],
      "Government Services": ["Desire for public policy administration.", "Strong motivation to serve state welfare platforms.", "General knowledge and governance Interest."],
      "Business & Entrepreneurship": ["Startup and risk management tendency.", "Product planning and business growth mindset.", "Interest in commercial enterprise scale."],
      "Education & Teaching": ["Love for mentoring and sharing subjects.", "Comfortable with academic pedagogy.", "Inspiring students and teaching goals."],
      "Arts & Creativity": ["Aesthetic layout design and illustration interest.", "Creative fine art and portfolio preparation focus.", "Appreciation for music and performance."],
      "Sports & Fitness": ["Dedication to athletic conditioning.", "Competitiveness and sports industry alignment.", "Agility and fitness mentorship mindset."],
      "Law & Legal Services": ["Interest in judicial structures and legal text.", "Drafting contracts and debate logic.", "Advocating for civil rights and litigation."],
      "Finance & Commerce": ["Aptitude for bookkeeping and auditing.", "Economics, investment strategy, and finance spreadsheet interest.", "Corporate compliance and accounting focus."],
      "Agriculture & Rural Development": ["Motivated to support regional agrarian economies.", "Soil science, genetics, and food yield interest.", "Precision farming techniques focus."],
      "Beauty & Wellness": ["Cosmetology, salon management, and hair styling interest.", "Aesthetic care and relaxation wellness treatments.", "Client grooming consultation alignment."],
      "Homemaker & Home Business": ["Micro-business operation and home boutique setup.", "Creative craft design, baking, or tailoring business interest.", "Family logistics and micro-saving strategy."],
      "Media & Communication": ["Copywriting, reporting, and PR media management.", "News broadcasting and digital video production interest.", "Public communication and brand storytelling."],
      "Defence & Security": ["High respect for armed forces and police services.", "Physical fitness, tactical survival, and command logic.", "Serving the nation in crisis response."],
      "Social Service & NGO": ["Welfare program advocacy and grant application interest.", "Community development and social justice alignment.", "Empathetic social counseling focus."],
      "Hospitality & Tourism": ["Delivering high-quality guest services.", "Hotel management and tourism booking interest.", "Foreign culture, travel scheduling, and gastronomy."],
      "Research & Science": ["Experimental research and data modeling tools.", "Aptitude for scientific theories and academic manuscripts.", "Discovering physical and bio laws."],
      "Skilled Trades & Vocational Careers": ["Practical carpentry, HVAC, or welding trades interest.", "Boiler operations, electrical safety, and tool assembly.", "Contracting field services focus."]
    };

    // Make targetDomain fallback matching clean (e.g. Technology vs Technology & IT)
    let domainKey = targetDomain;
    if (!defaultReasons[domainKey]) {
      const match = Object.keys(defaultReasons).find(k => k.toLowerCase().includes(targetDomain.toLowerCase()) || targetDomain.toLowerCase().includes(k.toLowerCase()));
      if (match) domainKey = match;
    }

    while (matches.length < 3) {
      const defs = defaultReasons[domainKey] || ["Strong interest in the domain field.", "Aligned with the professional standards of this sector.", "Goal-oriented career growth path."];
      const nextDef = defs.find(d => !matches.includes(d)) || defs[0];
      matches.push(nextDef);
    }

    return matches.slice(0, 4);
  };

  const calculateResults = () => {
    setLoading(true);
    
    // Initialize scores
    const scores = {};
    const allDomains = [
      "Technology & IT", "Medical & Healthcare", "Government Services", 
      "Business & Entrepreneurship", "Education & Teaching", "Arts & Creativity", 
      "Sports & Fitness", "Law & Legal Services", "Finance & Commerce", 
      "Agriculture & Rural Development", "Beauty & Wellness", "Homemaker & Home Business", 
      "Media & Communication", "Defence & Security", "Social Service & NGO", 
      "Hospitality & Tourism", "Research & Science", "Skilled Trades & Vocational Careers",
      "Technology", "Medical", "Education", "Sports", "Business", "Entrepreneurship",
      "Government Jobs", "Finance", "Law", "Arts", "Media", "Agriculture",
      "Research", "Defence", "NGO & Social Work", "Skilled Trades"
    ];
    allDomains.forEach(d => { scores[d] = 0; });

    // Loop through answers and increment score
    const activeQList = Array.isArray(activeQuestions) ? activeQuestions : [];
    Object.values(answers || {})
      .filter(Array.isArray)
      .flat()
      .forEach(optionText => {
        if (!optionText) return;
        // Find option domains
        activeQList.forEach(q => {
          if (!q || !Array.isArray(q.options)) return;
          const foundOpt = q.options.find(o => o && o.text === optionText);
          if (foundOpt && Array.isArray(foundOpt.domains)) {
            foundOpt.domains.forEach(d => {
              if (!d) return;
              scores[d] = (scores[d] || 0) + 1;
              // Also score equivalent normalized domain names to sync custom vs static question arrays
              allDomains.forEach(altD => {
                if (altD !== d && getNormalizedDomainKey(altD) === getNormalizedDomainKey(d)) {
                  scores[altD] = (scores[altD] || 0) + 1;
                }
              });
            });
          }
        });
      });

    // Sort domains
    const sortedDomains = Object.entries(scores)
      .filter(([domain, score]) => score >= 0)
      .sort((a, b) => b[1] - a[1]);

    // Format top 3 with confidence percentage
    const totalLen = activeQuestions?.length || 1;
    const top3 = sortedDomains.slice(0, 3).map(([domain, score]) => {
      // Premium confidence calculation formula: base 40% + scaling up to 96%
      const confidence = score === 0 ? 0 : Math.min(96, 40 + Math.round((score / totalLen) * 56));
      return { domain, percentage: confidence };
    });

    const highestDomain = top3[0]?.domain || "Technology";
    const dynamicReasons = generateReasonsForDomain(highestDomain, answers || {});

    const calculatedResult = {
      top3,
      scores,
      dynamicReasons
    };

    // Save to State
    setResults(calculatedResult);

    // Save to LocalStorage
    localStorage.setItem('quiz_results', JSON.stringify(calculatedResult));
    localStorage.setItem('quiz_answers', JSON.stringify(answers || {}));

    const confidenceMap = {};
    top3.forEach(t => { if (t) confidenceMap[t.domain] = t.percentage; });
    const topRecs = top3.map(t => t?.domain).filter(Boolean);
    const quizDate = new Date().toISOString();

    localStorage.setItem('quizAnswers', JSON.stringify(answers || {}));
    localStorage.setItem('confidenceScores', JSON.stringify(confidenceMap));
    localStorage.setItem('topRecommendations', JSON.stringify(topRecs));
    localStorage.setItem('quizDate', quizDate);
    localStorage.setItem('careerExplanation', JSON.stringify(dynamicReasons));
    
    // Save default selected career
    const defaultCareer = topRecs[0] || 'Technology & IT';
    localStorage.setItem('selected_career', defaultCareer);
    localStorage.setItem('selectedCareer', defaultCareer);
    setSelectedCareer(defaultCareer);

    // Post to server if logged in
    const saveToServer = async () => {
      if (user) {
        try {
          const confidenceMapObj = {};
          top3.forEach(t => { if (t) confidenceMapObj[t.domain] = t.percentage; });

          await api.post('/quiz/save', {
            primaryCategory: highestDomain,
            scores: scores,
            topRecommendations: top3.map(t => t?.domain).filter(Boolean),
            confidenceScores: confidenceMapObj,
            quizAnswers: answers || {}
          });
        } catch (e) {
          console.error("Backend offline, quiz saved to local storage", e);
        }
      }
    };
    saveToServer();
    setLoading(false);
  };

  const handleSelectCareer = async (careerDomain) => {
    if (!careerDomain) return;
    setSelectedCareer(careerDomain);
    localStorage.setItem('selected_career', careerDomain);
    localStorage.setItem('selectedCareer', careerDomain);

    const completionDate = new Date().toISOString();
    localStorage.setItem('quiz_completion_date', completionDate);
    localStorage.setItem('quizDate', completionDate);

    // Save user career selection locally
    let storedUser = {};
    try {
      storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      console.error(e);
    }
    
    const top3List = results && Array.isArray(results.top3) ? results.top3 : [];
    const topRecs = top3List.map(r => r?.domain).filter(Boolean);
    const confidenceMap = top3List.reduce((acc, curr) => {
      if (curr && curr.domain) {
        acc[curr.domain] = curr.percentage;
      }
      return acc;
    }, {});
    const quizScores = results?.scores || {};

    const updatedUser = {
      ...storedUser,
      career: careerDomain,
      quizCompleted: true,
      quizDate: completionDate,
      topRecommendations: topRecs,
      confidenceScores: confidenceMap,
      quizScores: quizScores
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    if (setUser) {
      setUser(updatedUser);
    }

    // Call server to persist profile update
    if (user) {
      try {
        await api.put('/auth/update-profile', {
          career: careerDomain,
          quizCompleted: true,
          quizDate: completionDate,
          topRecommendations: topRecs,
          confidenceScores: confidenceMap,
          quizScores: quizScores
        });
        toast.success(`Career Path chosen: ${careerDomain}!`);
      } catch (err) {
        console.error("Backend error updating profile, saved to local storage", err);
      }
    }

    navigate('/career-roadmap');
  };

  const handleRetakeQuiz = () => {
    setResults(null);
    setAnswers({});
    setCurrentQuestion(0);
    setSelectedCareer('');
    localStorage.removeItem('quiz_results');
    localStorage.removeItem('quiz_answers');
    localStorage.removeItem('selected_career');
    localStorage.removeItem('quiz_completion_date');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('topRecommendations');
    localStorage.removeItem('selectedCareer');
    localStorage.removeItem('quizDate');
    localStorage.removeItem('confidenceScores');
    localStorage.removeItem('careerExplanation');
    localStorage.removeItem('recommendedSchemes');
    localStorage.removeItem('recommendedScholarships');
  };

  const totalQuestions = activeQuestions?.length || 0;
  const progressPercentage = totalQuestions > 0 ? Math.round(((currentQuestion + 1) / totalQuestions) * 100) : 0;

  // --- RESULT VIEW PANEL ---
  if (results) {
    const top3List = Array.isArray(results.top3) ? results.top3 : [];
    const topDomain = top3List[0] || { domain: 'Technology', percentage: 0 };
    const reasons = Array.isArray(results.dynamicReasons) ? results.dynamicReasons : [];
    
    return (
      <div className="max-w-4xl mx-auto text-left dark:text-white space-y-8 animate-fadeIn">
        <div className="card-ui bg-gradient-to-br from-violet-600 to-pink-500 p-8 text-white rounded-3xl shadow-xl border-0 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">Quiz Completed</span>
            <h1 className="text-3xl md:text-4xl font-extrabold">Your Career Assessment Results</h1>
            <p className="text-white/80 text-sm md:text-base">We analyzed your selections and mapped them to professional fields matching your interests and skills.</p>
          </div>
          <button 
            onClick={handleRetakeQuiz}
            className="relative z-10 bg-white text-violet-700 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-violet-50 transition-colors shadow-md active:scale-95 flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            Retake Assessment
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Recommendations Cards */}
          <div className="md:col-span-2 card-ui p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700">
              <Award className="text-pink-500" /> Recommended Careers
            </h2>
            <div className="space-y-4">
              {top3List.map((rec, idx) => {
                if (!rec) return null;
                const pct = rec.percentage || 0;
                return (
                  <div 
                    key={idx} 
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      idx === 0 
                        ? 'border-violet-300 dark:border-violet-800 bg-violet-50/40 dark:bg-violet-950/10' 
                        : 'border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-gray-400">Recommendation #{idx + 1}</span>
                      <span className={`text-sm font-black ${idx === 0 ? 'text-violet-600 dark:text-violet-400' : 'text-pink-600 dark:text-pink-400'}`}>
                        {pct}% Confidence
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-800 dark:text-white">{rec.domain || 'Unknown Domain'}</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          idx === 0 ? 'bg-gradient-to-r from-violet-600 to-pink-500' : 'bg-pink-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why This Career Suggested */}
          <div className="card-ui p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-md font-extrabold text-gray-800 dark:text-white flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700 mb-4">
                <Compass className="text-violet-600" /> Why {topDomain.domain || 'Recommended Career'}
              </h3>
              <div className="space-y-3">
                {reasons.map((reason, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={16} />
                    <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-6 bg-gray-50/50 dark:bg-gray-900/10 p-3 rounded-xl">
              <p className="text-[10px] text-gray-400 font-bold leading-normal">
                Analysis is generated dynamically based on items matching this domain in your questionnaire.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Mapping details of top matched career domain */}
        {(() => {
          const normKey = getNormalizedDomainKey(topDomain.domain);
          const mapping = domainMappings[normKey] || domainMappings.technology;
          const careerPaths = Array.isArray(mapping?.careerPaths) ? mapping.careerPaths : [];
          const courses = Array.isArray(mapping?.courses) ? mapping.courses : [];
          const schemes = Array.isArray(mapping?.schemes) ? mapping.schemes : [];
          
          return (
            <div className="card-ui p-6 md:p-8 space-y-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm text-left">
              <h2 className="text-xl font-extrabold text-gray-800 dark:text-white flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700">
                <BookOpen className="text-pink-500" /> Career Path & Resources for {mapping?.domainName || 'Your Domain'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Career Paths */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Potential Career Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {careerPaths.map((path, pIdx) => (
                      <span key={pIdx} className="px-3 py-1.5 bg-violet-50 dark:bg-violet-950/35 text-violet-750 dark:text-violet-400 text-xs font-bold rounded-xl border border-violet-100 dark:border-violet-900/50">
                        {path}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Relevant Courses */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Recommended Skill Courses</h3>
                  <div className="space-y-2">
                    {courses.map((course, cIdx) => (
                      <a 
                        key={cIdx} 
                        href={course?.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 bg-gray-50 hover:bg-violet-50/50 dark:bg-gray-900 dark:hover:bg-violet-950/20 border border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-900 rounded-xl transition-all group"
                      >
                        <Award size={16} className="text-pink-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{course?.title}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Recommended Schemes */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Recommended Government Schemes</h3>
                  <div className="space-y-2">
                    {schemes.map((sch, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={sch?.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2.5 bg-gray-50 hover:bg-pink-50/50 dark:bg-gray-900 dark:hover:bg-pink-950/10 border border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-900 rounded-xl transition-all group"
                      >
                        <Bookmark size={16} className="text-violet-650 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{sch?.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Career Selection Section */}
        <div className="card-ui p-6 md:p-8 space-y-6 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-gray-800 dark:text-white">Choose Your Career Path</h2>
            <p className="text-gray-500 dark:text-gray-350 text-sm">Select one domain from your top recommendations. This will lock in your personalized roadmap, and show relevant scholarship opportunities.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-2">
            {top3List.map((rec, idx) => {
              if (!rec) return null;
              const isSelected = selectedCareer === rec.domain;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCareer(rec.domain)}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between items-center text-center group cursor-pointer active:scale-95 ${
                    isSelected 
                      ? 'border-violet-600 bg-violet-50/40 dark:bg-violet-950/20 text-violet-800 dark:text-violet-300' 
                      : 'border-gray-100 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-800 hover:bg-gray-50 dark:hover:bg-gray-850 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Option #{idx+1}</span>
                    <h4 className="font-extrabold text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 leading-snug">{rec.domain || 'Unknown Domain'}</h4>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:gap-1.5 transition-all">
                    {isSelected ? 'Selected' : 'Select'} <ChevronRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>

          {selectedCareer && (
            <div className="pt-4 flex justify-center animate-fadeIn">
              <button
                onClick={() => handleSelectCareer(selectedCareer)}
                className="gradient-btn px-8 py-3.5 font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer text-sm flex items-center gap-2"
              >
                View Personalized Roadmap <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback empty-state UI if no questions exist
  if (!activeQuestions || activeQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center dark:text-white space-y-6 py-12 animate-fadeIn">
        <div className="card-ui p-8 md:p-12 space-y-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-16 h-16 bg-pink-50 dark:bg-pink-950/35 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="text-pink-500" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-850 dark:text-white">No Questions Available</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No quiz questions available at the moment.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-xl text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-md active:scale-95 animate-pulse"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // --- QUIZ GAMEPLAY PANEL ---
  const currentQ = activeQuestions[currentQuestion];
  const isQuestionAnswered = answers && Array.isArray(answers[currentQuestion]) && answers[currentQuestion].length > 0;
  const qOptions = currentQ && Array.isArray(currentQ.options) ? currentQ.options : [];

  return (
    <div className="max-w-2xl mx-auto text-left dark:text-white space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white mb-1">Career Quiz</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Discover which domain matching your skill matrix.</p>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xs md:justify-end">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-violet-600 to-pink-500 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-xs font-black text-gray-400 flex-shrink-0">{progressPercentage}%</span>
        </div>
      </div>

      <div className="card-ui p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-gray-50 dark:border-gray-700/60">
          <span className="text-xs font-bold text-pink-500 bg-pink-50 dark:bg-pink-950/30 px-3 py-1 rounded-full uppercase tracking-wider">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold italic">Multiple selection allowed</span>
        </div>

        <h2 className="text-xl md:text-2xl font-extrabold text-gray-850 dark:text-white leading-snug">
          {currentQ?.question || 'Untitled Question'}
        </h2>

        <div className="space-y-2.5">
          {qOptions.map((opt, idx) => {
            if (!opt) return null;
            const isSelected = answers && Array.isArray(answers[currentQuestion]) && answers[currentQuestion].includes(opt.text);
            return (
              <button
                key={idx}
                onClick={() => handleOptionToggle(opt.text)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group cursor-pointer ${
                  isSelected 
                    ? 'border-violet-600 bg-violet-50/40 dark:bg-violet-950/20 text-violet-900 dark:text-violet-300 font-bold' 
                    : 'border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-950/30 hover:bg-gray-50 dark:hover:bg-gray-850 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-sm font-semibold pr-4">{opt.text || 'Option'}</span>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'border-violet-600 bg-violet-600 text-white' : 'border-gray-300 dark:border-gray-600 group-hover:border-pink-300'
                }`}>
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-50 dark:border-gray-700/60">
          <button 
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={16} /> Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isQuestionAnswered || loading}
            className="flex-1 gradient-btn py-3 text-xs font-bold flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Analyzing...' : currentQuestion === totalQuestions - 1 ? 'Analyze My Answers' : 'Next Question'}
            {currentQuestion !== totalQuestions - 1 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Quiz Error Boundary specifically to wrap the Quiz Module page
class QuizErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("QuizErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto text-center dark:text-white space-y-6 py-12">
          <div className="card-ui p-8 md:p-12 space-y-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-xl font-bold text-red-650 dark:text-red-400">Oops! Something went wrong with the Quiz</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              An unexpected error occurred while loading or displaying the quiz content.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-xl text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-md active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const QuizPageWithBoundary = (props) => (
  <QuizErrorBoundary>
    <QuizPage {...props} />
  </QuizErrorBoundary>
);

export default QuizPageWithBoundary;
