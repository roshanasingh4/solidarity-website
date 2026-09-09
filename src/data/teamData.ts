interface TeamMember {
  slug: string
  name: string
  role: string
  photo: string
  bio: string
  linkedin?: string
}

const teamMembers: TeamMember[] = [
  {
    slug: 'manish-gupta',
    name: 'Manish Gupta',
    role: 'Founder & Chief Investment Officer',
    photo: '/assets/team/Manish_Gupta.png',
    bio: 'Manish is an MBA from IIM Ahmedabad. He wants to build a business which delivers profits with purpose. Through Solidarity, he is attempting to turn aspirations to reality. Prior to founding Solidarity, he worked for 7 years with The Boston Consulting Group and for 8 years with Rakesh Jhunjhunwala. In his free time, he enjoys traveling, reading, meditation, and looking at the world through his daughters’ perspectives.',
  },
  {
    slug: 'don-thadeuse',
    name: 'Don Thadeuse',
    role: 'Chief Operating Officer',
    photo: '/assets/team/Don_Thadeuse.jpg',
    bio: 'Don Thadeuse has over 21 years of experience in Operations, Fund Administration. Prior to joining Solidarity, Don worked with Quantum Advisors Private Limited as SVP Operations. He received his Bachelor’s degree in commerce from M.S. University in 2001 and Master’s in Business administration (MBA) from Chennai University in 2003. In his spare time, he loves reading and listening to AR Rahman songs and enjoy thriller movies.',
  },
  {
    slug: 'anirudh-shetty',
    name: 'Anirudh Shetty',
    role: 'Partner',
    photo: '/assets/team/Anirudh_Shetty.png',
    bio: 'A qualified Chartered Accountant, Anirudh worked in the Audit Team at Ernst and Young before joining Solidarity. He also completed CFA to stay abreast with the changes in the investment world. Apart from this, you’ll find Anirudh indulging in conversations on philosophy. He is also passionate about mountain trekking, reading, writing and listening to music.',
  },
  {
    slug: 'naarah-pereira',
    name: 'Naarah Pereira',
    role: 'Partner',
    photo: '/assets/team/Naarah_Pereira.png',
    bio: 'Naarah began her career as an Administrative Assistant at Solidarity, got promoted to Office Manager, and now heads Operations and Compliance. She prides herself in her ability to stay calm during stressful situations. However, amidst all of this, she loves traveling, kayaking and quilling.',
  },
  {
    slug: 'aman-thadani',
    name: 'Aman Thadani',
    role: 'Senior Analyst',
    photo: '/assets/team/Aman_Thadani.png',
    bio: 'A graduate from HR College, Mumbai, Aman worked as a research analyst at Consortium PMS before joining Solidarity. He has also completed his CFA. Outside of work, Aman enjoys reading, playing chess and spending time with family.',
  },
  {
    slug: 'pratik-jain',
    name: 'Pratik Jain',
    role: 'Senior Analyst',
    photo: '/assets/team/Pratik.jpg',
    bio: 'After graduating as an electrical engineer, Pratik completed his MBA (Finance) from Mumbai University. Following a summer internship at Solidarity during his MBA, he joined in a full-time role. Outside of work, he likes to spend his time playing chess and football.',
  },
  {
    slug: 'dinesh-gianchandani',
    name: 'Dinesh Gianchandani',
    role: 'Operations Manager',
    photo: '/assets/team/Dinesh.jpg',
    bio: 'Dinesh is a CA Final candidate. Prior to joining Solidarity, he worked with Aditya Birla Capital and Ventura Securities In PMS Operations domain. In his spare time, he loves playing Cricket, traveling, and spending time with family & friends.',
  },
  {
    slug: 'sanyam-shah',
    name: 'Sanyam Shah',
    role: 'Analyst',
    photo: '/assets/team/Sanyam.jpg',
    bio: 'After completing the Finbridge program from Finnacle, Sanyam joined Solidarity as an intern and transitioned into a full-time role. He has completed his graduation and cleared CFA Level 1, with plans to pursue the remaining levels. Outside of work, he enjoys gaming and playing cricket.',
  },
  {
    slug: 'zahra-patel',
    name: 'Zahra Patel',
    role: 'Analyst',
    photo: '/assets/team/Zahra.jpg',
    bio: 'A graduate from KC College, Mumbai, Zahra joined us after completing her Finbridge program at Finnacle. She plans to pursue the CFA program. Outside of work, she enjoys playing badminton and basketball, and loves to travel.',
  },
]

export { teamMembers }
export type { TeamMember }
