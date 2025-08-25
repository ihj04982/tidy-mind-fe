export const CATEGORIES = {
  TASK: {
    name: 'Task',
    color: '#3378FF',
  },
  IDEA: {
    name: 'Idea',
    color: '#63B6FF',
  },
  REMINDER: {
    name: 'Reminder',
    color: '#FD7642',
  },
  WORK: {
    name: 'Work',
    color: '#00B380',
  },
  GOAL: {
    name: 'Goal',
    color: '#7448F7',
  },
  PERSONAL: {
    name: 'Personal',
    color: '#FF8BB7',
  },
  OTHER: {
    name: 'Other',
    color: '#F5C3BD',
  },
};

// Mock note data
export const mockNotes = [
  {
    _id: '1',
    userId: 'user-1',
    title: 'Project Planning Notes',
    content:
      'Need to review the quarterly goals and set up team meetings for next sprint. Key points:\n- Update project timeline\n- Schedule stakeholder review\n- Prepare presentation materials\n- Follow up with design team',
    images: [
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756020638/s05mwwhlbyrbqznvpmxg.png',
    ],
    category: CATEGORIES.TASK,
    completion: {
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isCompleted: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    userId: 'user-1',
    title: 'Creative Idea for New Feature',
    content:
      'What if we could implement a smart categorization system that automatically tags notes based on content analysis? This could use NLP to identify:\n- Task-related keywords\n- Idea patterns\n- Time-sensitive content\n- Priority indicators',
    images: [],
    category: CATEGORIES.IDEA,
    completion: null,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    _id: '3',
    userId: 'user-1',
    title: 'Meeting with Client Tomorrow',
    content:
      "Remember to prepare the following for tomorrow's client meeting:\n- Project status update\n- Budget review\n- Timeline discussion\n- Next steps planning",
    images: [],
    category: CATEGORIES.REMINDER,
    completion: {
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isCompleted: false,
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '4',
    userId: 'user-1',
    title: 'Book Recommendations',
    content:
      'Books to read this month:\n1. "Atomic Habits" by James Clear\n2. "Deep Work" by Cal Newport\n3. "The Pragmatic Programmer"\n4. "Designing Data-Intensive Applications"',
    images: [
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756020709/ovy5hqdol5wi6s053q6v.jpg',
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756020779/cgi7bqhbmtla1obnfkqt.webp',
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756020779/xlacucmtkggs848otds7.jpg',
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756020904/nzvp2cbfaxvmm1jao6ms.jpg',
    ],
    category: CATEGORIES.PERSONAL,
    completion: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '9',
    userId: 'user-1',
    title: 'Work Project Planning',
    content:
      'Q4 project planning for the new feature:\n- User research phase\n- Design system updates\n- Development timeline\n- Testing strategy',
    images: [],
    category: CATEGORIES.WORK,
    completion: null,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '10',
    userId: 'user-1',
    title: 'Personal Fitness Goal',
    content:
      'Fitness goals for this year:\n- Run a marathon by October\n- Build muscle mass\n- Improve flexibility\n- Maintain healthy diet',
    images: [],
    category: CATEGORIES.GOAL,
    completion: null,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '11',
    userId: 'user-1',
    title: 'Personal Reflection',
    content:
      "Today's reflection:\n- Grateful for supportive team\n- Need to improve time management\n- Learning new technologies is exciting\n- Should spend more time with family",
    images: [],
    category: CATEGORIES.PERSONAL,
    completion: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '5',
    userId: 'user-1',
    title: 'Code Refactoring Ideas',
    content:
      'The current authentication system needs refactoring. Consider:\n- Implementing JWT tokens\n- Adding refresh token rotation\n- Improving error handling\n- Adding rate limiting',
    images: [],
    category: CATEGORIES.IDEA,
    completion: null,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    _id: '6',
    userId: 'user-1',
    title: 'Weekly Team Standup',
    content:
      "Agenda for this week's standup:\n- Review last week's progress\n- Discuss blockers\n- Plan this week's tasks\n- Share updates on ongoing projects",
    images: [],
    category: CATEGORIES.TASK,
    completion: {
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      isCompleted: false,
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '7',
    userId: 'user-1',
    title: 'Random Thought',
    content:
      "The best code is the code that doesn't need to be written. Sometimes the simplest solution is the most elegant one.",
    images: [],
    category: CATEGORIES.OTHER,
    completion: null,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '8',
    userId: 'user-1',
    title: 'Database Optimization',
    content:
      'Need to optimize the database queries:\n- Add proper indexes\n- Review slow queries\n- Consider query caching\n- Monitor performance metrics',
    images: [],
    category: CATEGORIES.TASK,
    completion: {
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      isCompleted: false,
    },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '12',
    userId: 'user-1',
    title: 'Image Test',
    content: 'Image Test',
    images: [
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756017580/l4q9ydstzy5rdjira7cl.png',
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756017580/cgx4a6nhd1ayijwmtnfn.png',
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756017580/oqtacaskdgnurmytcpbe.png',
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756017580/x4onyhjqeo7tws9k9rdx.png',
      'https://res.cloudinary.com/ddw9xklog/image/upload/v1756017580/pgjekmva8lwhdgdegimp.png',
    ],
    category: CATEGORIES.TASK,
    completion: {
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isCompleted: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
