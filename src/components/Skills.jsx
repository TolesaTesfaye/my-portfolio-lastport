import { motion } from 'framer-motion'
import {
  FaReact,
  FaNode,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaMobile,
  FaBrain,
} from 'react-icons/fa'
import { SiMongodb, SiMysql, SiTailwindcss, SiTypescript, SiExpress, SiPhp } from 'react-icons/si'

const Skills = ({ darkMode }) => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: FaReact, level: 90, color: 'text-blue-400' },
        { name: 'HTML5', icon: FaHtml5, level: 95, color: 'text-orange-400' },
        { name: 'CSS3', icon: FaCss3Alt, level: 90, color: 'text-blue-500' },
        { name: 'JavaScript', icon: FaJs, level: 88, color: 'text-yellow-400' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 85, color: 'text-cyan-400' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: FaNode, level: 85, color: 'text-green-400' },
        { name: 'Express.js', icon: SiExpress, level: 88, color: 'text-gray-400' },
        { name: 'TypeScript', icon: SiTypescript, level: 82, color: 'text-blue-500' },
        { name: 'PHP', icon: SiPhp, level: 80, color: 'text-indigo-400' },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 80, color: 'text-green-500' },
        { name: 'MySQL', icon: SiMysql, level: 82, color: 'text-blue-600' },
        { name: 'Database Design', icon: FaDatabase, level: 85, color: 'text-purple-400' },
      ],
    },
    {
      title: 'Specializations',
      skills: [
        { name: 'AI Integration', icon: FaBrain, level: 75, color: 'text-pink-400' },
        { name: 'Mobile Apps', icon: FaMobile, level: 78, color: 'text-indigo-400' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? 'bg-gray-800/30' 
        : 'bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50' 
                  : 'bg-white/90 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl'
              }`}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gradient">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <skill.icon className={`text-2xl ${skill.color}`} />
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2.5 overflow-hidden ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className={`h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-gradient">
            Additional Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['RESTful APIs', 'Git & GitHub', 'Responsive Design', 'UI/UX Design', 'Problem Solving', 'Team Collaboration'].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 border rounded-lg hover:border-blue-500/50 transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700 text-gray-300' 
                    : 'bg-white/90 border-gray-200/80 text-gray-800 shadow-md hover:shadow-lg'
                }`}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

