INSERT OR IGNORE INTO profiles (id, name, title, biography, email, phone, location, created_at, updated_at)
VALUES ('profile-tolesa', 'Tolesa Tesfaye', 'Software Engineer', 'Software engineering student and full-stack developer building practical web applications and learning platforms.', 'tolesatesfay273@gmail.com', '+251975863448', 'Haramaya University, Ethiopia', unixepoch() * 1000, unixepoch() * 1000);

INSERT OR IGNORE INTO skills (id, name, category, proficiency, display_order, published, created_at, updated_at) VALUES
('skill-react', 'React', 'Frontend', 90, 1, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-html5', 'HTML5', 'Frontend', 95, 2, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-css3', 'CSS3', 'Frontend', 90, 3, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-javascript', 'JavaScript', 'Frontend', 88, 4, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-tailwind', 'Tailwind CSS', 'Frontend', 85, 5, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-typescript', 'TypeScript', 'Frontend', 82, 6, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-node', 'Node.js', 'Backend', 85, 1, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-express', 'Express.js', 'Backend', 88, 2, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-nest', 'NestJS', 'Backend', 80, 3, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-fastify', 'Fastify', 'Backend', 80, 4, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-fastapi', 'FastAPI', 'Backend', 80, 5, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-mern', 'MERN Stack', 'Backend', 88, 6, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-mongodb', 'MongoDB', 'Other', 85, 1, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-mysql', 'MySQL', 'Other', 82, 2, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-database-design', 'Database Design', 'Other', 85, 3, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-postman', 'Postman', 'Other', 82, 4, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-git', 'Git', 'Other', 85, 5, 1, unixepoch() * 1000, unixepoch() * 1000),
('skill-github', 'GitHub', 'Other', 85, 6, 1, unixepoch() * 1000, unixepoch() * 1000);

INSERT OR IGNORE INTO experiences (id, position, organization, employment_type, description, start_date, end_date, currently_working, location, published, created_at, updated_at) VALUES
('experience-current', 'Software Engineer', 'Independent Projects', 'Project work', 'Building full-stack web applications and learning platforms with modern JavaScript technologies.', '2024', NULL, 1, 'Ethiopia', 1, unixepoch() * 1000, unixepoch() * 1000),
('experience-successbridge', 'Platform Developer', 'SuccessBridge', 'Project work', 'Developed a learning platform for high school and university students with resources, quizzes, and learning materials.', '2024', '2024', 0, 'Ethiopia', 1, unixepoch() * 1000, unixepoch() * 1000),
('experience-youtube', 'Content Creator', 'Tolman Tube', 'Content creation', 'Created educational content and tutorials for students and developers.', '2024', NULL, 1, 'Ethiopia', 1, unixepoch() * 1000, unixepoch() * 1000);

INSERT OR IGNORE INTO projects (id, title, description, github_url, live_url, featured, display_order, published, created_at, updated_at) VALUES
('project-successbridge', 'SuccessBridge', 'Comprehensive student management platform connecting students, teachers, and parents with academic progress tracking, grade management, assignments, and communication tools.', 'https://github.com/TolesaTesfaye/SuccessBridge', 'https://success-bridge-ten.vercel.app/', 1, 1, 1, unixepoch() * 1000, unixepoch() * 1000),
('project-gbaab', 'GBAAB Association', 'Association project providing digital solutions and an online presence with membership management, event announcements, and community engagement tools.', 'https://github.com/TolesaTesfaye/GBAAB', 'https://gamataa-barattoota-ada-aa-bargaa.vercel.app/', 0, 2, 1, unixepoch() * 1000, unixepoch() * 1000),
('project-task-management', 'Task Management System', 'Modern task management application with drag-and-drop functionality, team collaboration, deadline tracking, and productivity analytics.', 'https://github.com/TolesaTesfaye/Task-Managemant-System', 'https://github.com/TolesaTesfaye/Task-Managemant-System', 0, 3, 1, unixepoch() * 1000, unixepoch() * 1000),
('project-recruitment', 'Recruitment Management System', 'Recruitment management system with applicant tracking, interview scheduling, candidate evaluation, resume parsing, and automated communication.', 'https://github.com/TolesaTesfaye/recruitment-management', 'https://github.com/TolesaTesfaye/recruitment-management', 0, 4, 1, unixepoch() * 1000, unixepoch() * 1000),
('project-portfolio', 'Personal Portfolio', 'Responsive portfolio website showcasing projects and skills with dark mode, smooth animations, and interactive components.', 'https://github.com/TolesaTesfaye/my-portfolio-lastport', 'https://my-portfolio-lastport.vercel.app/', 0, 5, 1, unixepoch() * 1000, unixepoch() * 1000),
('project-telegram-bot', 'SuccessBridge Telegram Bot', 'Telegram bot providing SuccessBridge students with learning materials, quizzes, and study resources through chat commands.', 'https://github.com/TolesaTesfaye/SuccessBridge', 'https://t.me/successbridgebot', 0, 6, 1, unixepoch() * 1000, unixepoch() * 1000);

INSERT OR IGNORE INTO project_technologies (id, project_id, technology) VALUES
('technology-successbridge-react', 'project-successbridge', 'React'),
('technology-successbridge-node', 'project-successbridge', 'Node.js'),
('technology-successbridge-express', 'project-successbridge', 'Express'),
('technology-successbridge-mongo', 'project-successbridge', 'MongoDB'),
('technology-successbridge-typescript', 'project-successbridge', 'TypeScript'),
('technology-successbridge-tailwind', 'project-successbridge', 'Tailwind CSS'),
('technology-gbaab-react', 'project-gbaab', 'React'),
('technology-gbaab-node', 'project-gbaab', 'Node.js'),
('technology-gbaab-express', 'project-gbaab', 'Express'),
('technology-gbaab-mongo', 'project-gbaab', 'MongoDB'),
('technology-gbaab-tailwind', 'project-gbaab', 'Tailwind CSS'),
('technology-task-react', 'project-task-management', 'React'),
('technology-task-node', 'project-task-management', 'Node.js'),
('technology-task-mongo', 'project-task-management', 'MongoDB'),
('technology-task-socket', 'project-task-management', 'Socket.io'),
('technology-task-tailwind', 'project-task-management', 'Tailwind CSS'),
('technology-recruitment-react', 'project-recruitment', 'React'),
('technology-recruitment-node', 'project-recruitment', 'Node.js'),
('technology-recruitment-express', 'project-recruitment', 'Express'),
('technology-recruitment-mongo', 'project-recruitment', 'MongoDB'),
('technology-recruitment-redux', 'project-recruitment', 'Redux'),
('technology-recruitment-tailwind', 'project-recruitment', 'Tailwind CSS'),
('technology-portfolio-react', 'project-portfolio', 'React'),
('technology-portfolio-tailwind', 'project-portfolio', 'Tailwind CSS'),
('technology-portfolio-motion', 'project-portfolio', 'Framer Motion'),
('technology-portfolio-vite', 'project-portfolio', 'Vite'),
('technology-portfolio-vercel', 'project-portfolio', 'Vercel'),
('technology-bot-node', 'project-telegram-bot', 'Node.js'),
('technology-bot-telegram', 'project-telegram-bot', 'Telegram Bot API'),
('technology-bot-mongo', 'project-telegram-bot', 'MongoDB'),
('technology-bot-javascript', 'project-telegram-bot', 'JavaScript'),
('technology-bot-dotenv', 'project-telegram-bot', 'dotenv');

INSERT OR IGNORE INTO education (id, institution, degree, field_of_study, start_date, end_date, description, published, created_at, updated_at)
VALUES ('education-haramaya', 'Haramaya University', 'Bachelor''s Degree', 'Software Engineering', '2021', NULL, 'Pursuing a bachelor degree in Software Engineering.', 1, unixepoch() * 1000, unixepoch() * 1000);

INSERT OR IGNORE INTO certificates (id, title, issuer, issue_date, description, published, created_at, updated_at) VALUES
('certificate-full-stack', 'Full Stack Web Development', 'Udemy', '2024', 'Full-stack web development course covering MERN, REST APIs, authentication, and deployment.', 1, unixepoch() * 1000, unixepoch() * 1000),
('certificate-aws-ai', 'AWS AI Practitioner Challenge', 'AWS', '2026', 'Certificate recognizing completion of the AWS AI Practitioner Challenge.', 1, unixepoch() * 1000, unixepoch() * 1000),
('certificate-leadership', 'Leadership Excellence Award', 'Leadership Excellence Award', '2026', 'Recognition for demonstrating leadership excellence and commitment to achievement.', 1, unixepoch() * 1000, unixepoch() * 1000);

INSERT OR IGNORE INTO social_links (id, platform, url, display_order, published, created_at, updated_at) VALUES
('social-github', 'GitHub', 'https://github.com/TolesaTesfaye', 1, 1, unixepoch() * 1000, unixepoch() * 1000),
('social-linkedin', 'LinkedIn', 'https://linkedin.com', 2, 1, unixepoch() * 1000, unixepoch() * 1000),
('social-youtube', 'YouTube', 'https://www.youtube.com/@tolinaaf', 3, 1, unixepoch() * 1000, unixepoch() * 1000),
('social-telegram', 'Telegram', 'https://t.me/+ap3RyRf-wvEyNTg0', 4, 1, unixepoch() * 1000, unixepoch() * 1000);
