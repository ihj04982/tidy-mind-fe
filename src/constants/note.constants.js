export const CATEGORIES = {
  TASK: {
    id: 'task',
    name: 'Task',
    color: '#3378FF',
    type: 'withDate',
  },
  IDEA: {
    id: 'idea',
    name: 'Idea',
    color: '#63B6FF',
    type: 'general',
  },
  REMINDER: {
    id: 'reminder',
    name: 'Reminder',
    color: '#FD7642',
    type: 'withDate',
  },
  WORK: {
    id: 'work',
    name: 'Work',
    color: '#00B380',
    type: 'general',
  },
  GOAL: {
    id: 'goal',
    name: 'Goal',
    color: '#7448F7',
    type: 'withDate',
  },
  PERSONAL: {
    id: 'personal',
    name: 'Personal',
    color: '#FF8BB7',
    type: 'general',
  },
  OTHER: {
    id: 'other',
    name: 'Other',
    color: '#F5C3BD',
    type: 'general',
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
    categoryId: CATEGORIES.TASK.id,
    withDate: true,
    dateMeta: {
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      done: false,
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
    categoryId: CATEGORIES.IDEA.id,
    withDate: false,
    dateMeta: null,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    _id: '3',
    userId: 'user-1',
    title: 'Meeting with Client Tomorrow',
    content:
      "Remember to prepare the following for tomorrow's client meeting:\n- Project status update\n- Budget review\n- Timeline discussion\n- Next steps planning",
    categoryId: CATEGORIES.REMINDER.id,
    withDate: true,
    dateMeta: {
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      done: false,
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
    categoryId: CATEGORIES.PERSONAL.id,
    withDate: false,
    dateMeta: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '9',
    userId: 'user-1',
    title: 'Work Project Planning',
    content:
      'Q4 project planning for the new feature:\n- User research phase\n- Design system updates\n- Development timeline\n- Testing strategy',
    categoryId: CATEGORIES.WORK.id,
    withDate: false,
    dateMeta: null,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '10',
    userId: 'user-1',
    title: 'Personal Fitness Goal',
    content:
      'Fitness goals for this year:\n- Run a marathon by October\n- Build muscle mass\n- Improve flexibility\n- Maintain healthy diet',
    categoryId: CATEGORIES.GOAL.id,
    withDate: true,
    dateMeta: {
      dueDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      done: false,
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '11',
    userId: 'user-1',
    title: 'Personal Reflection',
    content:
      "Today's reflection:\n- Grateful for supportive team\n- Need to improve time management\n- Learning new technologies is exciting\n- Should spend more time with family",
    categoryId: CATEGORIES.PERSONAL.id,
    withDate: false,
    dateMeta: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '5',
    userId: 'user-1',
    title: 'Code Refactoring Ideas',
    content:
      'The current authentication system needs refactoring. Consider:\n- Implementing JWT tokens\n- Adding refresh token rotation\n- Improving error handling\n- Adding rate limiting',
    categoryId: CATEGORIES.IDEA.id,
    withDate: false,
    dateMeta: null,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    _id: '6',
    userId: 'user-1',
    title: 'Weekly Team Standup',
    content:
      "Agenda for this week's standup:\n- Review last week's progress\n- Discuss blockers\n- Plan this week's tasks\n- Share updates on ongoing projects",
    categoryId: CATEGORIES.TASK.id,
    withDate: true,
    dateMeta: {
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      done: false,
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
    categoryId: CATEGORIES.OTHER.id,
    withDate: false,
    dateMeta: null,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    _id: '8',
    userId: 'user-1',
    title: 'Database Optimization',
    content:
      'Need to optimize the database queries:\n- Add proper indexes\n- Review slow queries\n- Consider query caching\n- Monitor performance metrics',
    categoryId: CATEGORIES.TASK.id,
    withDate: true,
    dateMeta: {
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      done: false,
    },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];
