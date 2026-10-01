export const skills = [
  {
    group: 'Languages',
    short: 'Languages',
    items: ['Python', 'JavaScript', 'HTML', 'C', 'C++'],
  },
  {
    group: 'Libraries / Frameworks',
    short: 'Frameworks',
    items: ['FastAPI', 'ReactJS', 'Tailwind CSS', 'Bootstrap', 'SQLAlchemy'],
  },
  {
    group: 'Technologies',
    short: 'Technologies',
    items: [
      'REST APIs',
      'MySQL',
      'SQLite',
      'Supabase',
      'JWT Authentication',
      'Role-Based Access Control',
    ],
  },
  {
    group: 'Tools',
    short: 'Tools',
    items: ['Git & GitHub', 'Docker', 'Render', 'Netlify'],
  },
]

export const projects = [
  {
    title: 'Blood Donation & Emergency Assistance Platform',
    description:
      'A full-stack platform that connects people who need blood with donors, with separate tools for users, donors and administrators.',
    points: [
      'Implemented JWT authentication with signup, login, token refresh, password reset and protected routes.',
      'Built role-based features for normal users, donors and administrators, including admin dashboards.',
      'Created CRUD workflows for blood requests, donor responses, user management and request status.',
      'Added search, filtering, sorting and pagination for users, donors and blood requests.',
    ],
    tags: ['FastAPI', 'SQLAlchemy', 'SQLite', 'React', 'JWT'],
    demo: 'https://blood-aid-assistance.netlify.app/',
    frontend: 'https://github.com/talha-khondoker/blood-donation-emergency-assistance-platform-frontend',
    backend: 'https://github.com/talha-khondoker/blood-donation-emergency-assistance-platform-backend',
  },
  // {
  //   title: 'FastAPI Backend Projects',
  //   description:
  //     'REST APIs built with FastAPI and SQLAlchemy, covering authentication, protected routes and role-based access control.',
  //   points: [
  //     'Built CRUD operations and protected endpoints with JWT authentication.',
  //     'Worked with relational databases, request validation and API dependencies.',
  //   ],
  //   tags: ['FastAPI', 'Python', 'SQLAlchemy', 'MySQL', 'REST API'],
  //   demo: null,
  //   github: 'https://github.com/talha-khondoker',
  // },
]

export const codingProfiles = [
  {
    platform: 'Codeforces',
    href: 'https://codeforces.com/profile/talhakhondoker',
    value: '323+',
    text: 'problems solved, peak rating 975.',
  },
  {
    platform: 'CodeChef',
    href: 'https://www.codechef.com/users/talhakhondoker',
    value: '2★',
    text: 'rating 1447 across 10 rated contests.',
  },
  {
    platform: 'LeetCode',
    href: 'https://leetcode.com/u/talhak01/',
    value: '60+',
    text: 'problems solved, mostly in C++.',
  },
]

export const education = [
  {
    title: 'BSc in Mathematics',
    place: 'M M College Jashore, National University',
    note: '2023 to present, 3rd year',
  },
  {
    title: 'Higher Secondary Certificate (HSC), Science',
    place: 'B A F Shaheen College Jashore',
    note: '2021, GPA 5.00',
  },
  {
    title: 'Secondary School Certificate (SSC), Science',
    place: 'B A F Shaheen College Jashore',
    note: '2019, GPA 4.72',
  },
]