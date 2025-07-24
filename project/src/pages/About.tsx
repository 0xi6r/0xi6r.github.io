import React from 'react';
import { Shield, Award, Users, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Shield, label: 'Years Experience', value: '2+' },
    { icon: Award, label: 'Certifications', value: '3' },
    { icon: Users, label: 'Companies Secured', value: '50+' },
    { icon: Clock, label: 'Vulnerabilities Found', value: '200+' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-black">
      <section className="py-20 bg-black-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Whoami?</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Summary</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                My name is Isaac, a 23-year-old offensive security researcher specializing in vulnerability research, penetration testing, and red team operations. I focus on identifying and exploiting security vulnerabilities, 
                developing EDR evasion techniques, and providing comprehensive mitigation strategies for potential attack vectors 
                that threat actors could leverage. My primary objective is to enhance the overall security posture of organizations 
                through advanced offensive security methodologies and strategic risk assessment
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I hold multiple industry certifications including OSCP, and CEH.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not hunting for vulnerabilities, I contribute to open-source security tools and prioritize maintaining a healthy work-life balance through outdoor activities and 
                  personal pursuits that provide fresh perspective and mental clarity; touching more grass to keep a balanced perspective.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className="w-12 h-12 text-cyan-500 mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-black-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {[
              {
                year: '2025 - Present',
                title: 'Freelance Security Researcher',
                company: 'N/A',
                description: 'Independent cybersecurity researcher specializing in vulnerability research, penetration testing, and red team assessments. I help organizations identify and remediate security weaknesses before ...'
              },
              {
                year: '3rd April 2024 - 2025',
                title: 'Penetration Tester',
                company: 'SecureNet Solutions',
                description: 'Conducted comprehensive security assessments for various companies and government agencies.'
              },
              {
                year: '5th May - 20th August (2023)',
                title: 'Intern Security Analyst',
                company: 'TechGuard Inc.',
                description: 'Analyzed security incidents and developed incident response procedures for enterprise clients.'
              }
            ].map((exp, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 border-l-4 border-cyan-400">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <span className="text-cyan-400 font-medium">{exp.year}</span>
                </div>
                <p className="text-gray-400 mb-2">{exp.company}</p>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;