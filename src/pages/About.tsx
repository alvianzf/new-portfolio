import alvian from "../assets/potraits.png";
import { skills, categories } from "../data";
import SkillCard from "../components/SkillCard";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <img
            src={alvian}
            width={400}
            alt="Profile"
            className="w-100 h-100 rounded-full mx-auto mb-4 object-cover"
          />
          <h1 className="text-4xl font-bold mb-4 text-blue-400">
            Alvian Zachry Faturrahman
          </h1>
          <p className="text-xl text-gray-300">
            Senior Talent & Regional Operations Manager | Software Engineer |
            Instructor
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            Hi, I'm Ary—a versatile tech enthusiast and talent connector.
            Whether developing innovative full-stack solutions or mentoring
            future engineers, I thrive on creating impactful, scalable systems.
            I bridge Southeast Asian talent with European opportunities while
            fostering growth through thoughtful software development and
            tailored education programs.When I'm not working, you’ll find me
            refining Agile methodologies, coaching career transitions, or
            empowering engineering teams. Let’s connect and build something
            remarkable!
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">Skills</h2>
          {categories.map((category) => (
            <div key={category.name} className="mb-8">
              <div className="flex items-center mb-4">
                <category.icon className="w-6 h-6 mr-2 text-blue-400" />
                <h3 className="text-xl font-semibold text-gray-200">
                  {category.name}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills
                  .filter(
                    (skill) =>
                      skill.category ===
                      category.name.toLowerCase().split(" ")[0]
                  )
                  .map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
