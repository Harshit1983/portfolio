const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Harshit Pandiyar data...');

  // 1. Update Settings
  // Find existing settings or create
  const existingSettings = await prisma.settings.findFirst();
  const settingsData = {
    name: 'Harshit Pandiyar',
    bio: "I'm Harshit Pandiyar, a Computer Science Engineering student at Lovely Professional University, Punjab. I build machine learning models and software applications to solve real problems.",
    tagline: 'Software Engineer',
    location: 'Madhya Pradesh, India',
    email: 'harshitpandiyar1983@gmail.com',
    phone: '+91 9009039343',
    linkedinUrl: 'http://www.linkedin.com/in/harshit775/',
    githubUrl: 'https://github.com/Harshit1983',
    showBlog: false,
    showTestimonials: false,
    showOpenSource: false
  };

  if (existingSettings) {
    await prisma.settings.update({
      where: { id: existingSettings.id },
      data: settingsData
    });
  } else {
    await prisma.settings.create({ data: settingsData });
  }

  // Clear previous data
  await prisma.skill.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.education.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.achievement.deleteMany({});

  // 2. Insert Skills
  const languages = ['C++', 'Python', 'C', 'Java'];
  const tools = ['Scikit-learn', 'Streamlit', 'NumPy', 'Pandas', 'Matplotlib'];
  const soft = ['Problem-Solving', 'Team Player', 'Adaptability', 'Time Management'];

  let order = 1;
  for (const s of languages) {
    await prisma.skill.create({ data: { name: s, category: 'Languages', order: order++ }});
  }
  for (const s of tools) {
    await prisma.skill.create({ data: { name: s, category: 'Tools/Platforms', order: order++ }});
  }
  for (const s of soft) {
    await prisma.skill.create({ data: { name: s, category: 'Soft Skills', order: order++ }});
  }

  // 3. Projects
  await prisma.project.create({
    data: {
      title: 'Rainfall-Irrigation Analysis',
      description: 'Developed an unsupervised machine learning system to analyze rainfall and irrigation patterns across crops and regions. Utilized clustering techniques including K-Means and DBSCAN to uncover hidden structures. Created visual dashboards highlighting trends and spatial distributions.',
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
      featured: true,
      order: 1
    }
  });

  await prisma.project.create({
    data: {
      title: 'House Price Prediction using Machine Learning',
      description: 'Instigated a machine learning solution to estimate house prices based on property and location features. Evaluated Linear Regression, Random Forest, and Gradient Boosting models. Integrated an interactive interface for user input and real-time price prediction.',
      techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Streamlit'],
      featured: true,
      order: 2
    }
  });

  await prisma.project.create({
    data: {
      title: 'Cat-Dog Classifier',
      description: 'Trained a supervised image classification model on a large dataset of cat and dog images. Applied preprocessing techniques such as resizing, normalization, augmentation. Compared SVM, Random Forest, and CNN-based feature extraction.',
      techStack: ['Python', 'Scikit-learn', 'scikit-image'],
      featured: true,
      order: 3
    }
  });

  // 4. Education
  await prisma.education.create({
    data: {
      institution: 'Lovely Professional University',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      score: '7.67',
      scoreType: 'CGPA',
      startYear: 'Aug 2023',
      endYear: 'Present',
      location: 'Phagwara, Punjab',
      order: 1
    }
  });

  await prisma.education.create({
    data: {
      institution: 'Saint Paul Convent School',
      degree: 'Intermediate PCM',
      field: 'Science',
      score: '70',
      scoreType: 'Percentage',
      startYear: 'April 2021',
      endYear: 'April 2022',
      location: 'Jaora, Madhya Pradesh',
      order: 2
    }
  });

  await prisma.education.create({
    data: {
      institution: 'Saint Paul Convent School',
      degree: 'Matriculation',
      field: 'General',
      score: '51',
      scoreType: 'Percentage',
      startYear: 'April 2019',
      endYear: 'March 2020',
      location: 'Jaora, Madhya Pradesh',
      order: 3
    }
  });

  // 5. Certificates
  await prisma.certificate.create({
    data: {
      title: 'Cloud Computing',
      organization: 'NPTEL',
      date: 'Nov 2025'
    }
  });

  await prisma.certificate.create({
    data: {
      title: 'Computer Communications Specialization',
      organization: 'COURSERA',
      date: 'Sep 2024'
    }
  });

  // 6. Achievements
  await prisma.achievement.create({
    data: {
      platform: 'IamNeo',
      description: 'Solved 200+ Data structures and algorithms Problems across arrays, linked lists, trees, graphs, and hashing.'
    }
  });

  await prisma.achievement.create({
    data: {
      platform: 'Code Tantra',
      description: 'Finished 200+ Python Problems, strengthening Python fundamentals, logical thinking, and coding efficiency.'
    }
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
