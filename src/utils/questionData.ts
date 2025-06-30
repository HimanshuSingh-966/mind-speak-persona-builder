
interface Question {
  id: string;
  category: string;
  question: string;
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
}

const frontendQuestions: Question[] = [
  // Technical Questions
  {
    id: 'fe-1',
    category: 'JavaScript Fundamentals',
    question: 'What is the difference between null and undefined in JavaScript?',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'fe-2',
    category: 'CSS',
    question: 'Explain the box model in CSS.',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'fe-3',
    category: 'JavaScript Events',
    question: 'How does event delegation work in JavaScript?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'fe-4',
    category: 'Frontend Frameworks',
    question: 'What are the differences between React, Vue, and Angular?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'fe-5',
    category: 'Performance',
    question: 'What is DOM Virtualization?',
    type: 'technical',
    difficulty: 'hard'
  },
  {
    id: 'fe-6',
    category: 'JavaScript Fundamentals',
    question: 'What is the difference between == and ===?',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'fe-7',
    category: 'Browser Storage',
    question: 'Explain how localStorage, sessionStorage, and cookies differ.',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'fe-8',
    category: 'Architecture',
    question: 'What are SPA and SSR?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'fe-9',
    category: 'Performance',
    question: 'How would you optimize a website\'s performance?',
    type: 'technical',
    difficulty: 'hard'
  },
  {
    id: 'fe-10',
    category: 'Security',
    question: 'What is CORS and how do you handle it on the frontend?',
    type: 'technical',
    difficulty: 'medium'
  },
  // Behavioral Questions
  {
    id: 'fe-11',
    category: 'Learning & Development',
    question: 'How do you stay updated with frontend technologies?',
    type: 'behavioral',
    difficulty: 'easy'
  },
  {
    id: 'fe-12',
    category: 'Problem Solving',
    question: 'How do you handle browser compatibility issues?',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'fe-13',
    category: 'Project Experience',
    question: 'Can you describe a UI project you\'re most proud of?',
    type: 'behavioral',
    difficulty: 'easy'
  },
  {
    id: 'fe-14',
    category: 'Code Organization',
    question: 'How do you manage large-scale CSS?',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'fe-15',
    category: 'Debugging',
    question: 'What tools do you use for debugging frontend issues?',
    type: 'behavioral',
    difficulty: 'easy'
  }
];

const backendQuestions: Question[] = [
  // Technical Questions
  {
    id: 'be-1',
    category: 'API Design',
    question: 'What is REST API and how is it different from GraphQL?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'be-2',
    category: 'Authentication',
    question: 'How do JWT tokens work for authentication?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'be-3',
    category: 'Database',
    question: 'What are the differences between SQL and NoSQL databases?',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'be-4',
    category: 'Architecture',
    question: 'Explain the MVC architecture.',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'be-5',
    category: 'Performance',
    question: 'How do you handle rate limiting in an API?',
    type: 'technical',
    difficulty: 'hard'
  },
  {
    id: 'be-6',
    category: 'Express.js',
    question: 'What are middleware functions in Express.js?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'be-7',
    category: 'Scalability',
    question: 'How does load balancing work?',
    type: 'technical',
    difficulty: 'hard'
  },
  {
    id: 'be-8',
    category: 'Database',
    question: 'What is ORM and give examples (e.g., Sequelize, TypeORM)?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'be-9',
    category: 'Security',
    question: 'How do you ensure secure password storage?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'be-10',
    category: 'Integration',
    question: 'What is a webhook and when would you use one?',
    type: 'technical',
    difficulty: 'medium'
  },
  // Behavioral Questions
  {
    id: 'be-11',
    category: 'Error Handling',
    question: 'How do you handle and log errors on the backend?',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'be-12',
    category: 'Scalability',
    question: 'Describe a time you had to scale a backend system.',
    type: 'behavioral',
    difficulty: 'hard'
  },
  {
    id: 'be-13',
    category: 'Database Design',
    question: 'How do you structure your database for performance?',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'be-14',
    category: 'Security',
    question: 'How do you ensure your API is secure?',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'be-15',
    category: 'Problem Solving',
    question: 'What do you do when your server crashes unexpectedly?',
    type: 'behavioral',
    difficulty: 'hard'
  }
];

const dataAnalystQuestions: Question[] = [
  // Technical Questions
  {
    id: 'da-1',
    category: 'SQL',
    question: 'What is the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN in SQL?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'da-2',
    category: 'Data Cleaning',
    question: 'How would you handle missing data?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'da-3',
    category: 'Database Design',
    question: 'Explain normalization and denormalization in databases.',
    type: 'technical',
    difficulty: 'hard'
  },
  {
    id: 'da-4',
    category: 'Statistics',
    question: 'What\'s the difference between variance and standard deviation?',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'da-5',
    category: 'Statistics',
    question: 'What is p-value and how is it used in hypothesis testing?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'da-6',
    category: 'Business Intelligence',
    question: 'What are some common KPIs you\'ve worked with?',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'da-7',
    category: 'Data Visualization',
    question: 'Describe how you would build a dashboard for sales performance.',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'da-8',
    category: 'Tools',
    question: 'What are the differences between Excel, SQL, and Python in data analysis?',
    type: 'technical',
    difficulty: 'easy'
  },
  {
    id: 'da-9',
    category: 'Data Visualization',
    question: 'How do you decide which visualization to use for which data?',
    type: 'technical',
    difficulty: 'medium'
  },
  {
    id: 'da-10',
    category: 'Data Pipeline',
    question: 'What is ETL? Explain a simple pipeline you\'ve built.',
    type: 'technical',
    difficulty: 'hard'
  },
  // Behavioral Questions
  {
    id: 'da-11',
    category: 'Stakeholder Management',
    question: 'How do you prioritize when working with multiple stakeholders?',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'da-12',
    category: 'Problem Solving',
    question: 'Describe a time you found a critical insight from data.',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'da-13',
    category: 'Data Quality',
    question: 'How do you validate the accuracy of your data?',
    type: 'behavioral',
    difficulty: 'medium'
  },
  {
    id: 'da-14',
    category: 'Communication',
    question: 'How do you explain technical insights to non-technical stakeholders?',
    type: 'behavioral',
    difficulty: 'hard'
  },
  {
    id: 'da-15',
    category: 'Impact',
    question: 'Describe a time your analysis influenced a business decision.',
    type: 'behavioral',
    difficulty: 'hard'
  }
];

export const getQuestionsForDomain = (domainId: string): Question[] => {
  switch (domainId) {
    case 'frontend':
      return frontendQuestions;
    case 'backend':
      return backendQuestions;
    case 'data-analyst':
      return dataAnalystQuestions;
    default:
      return [];
  }
};

export const getAllQuestions = (): Record<string, Question[]> => {
  return {
    frontend: frontendQuestions,
    backend: backendQuestions,
    'data-analyst': dataAnalystQuestions
  };
};
