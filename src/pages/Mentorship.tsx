import { motion } from 'framer-motion';
import { ExternalLink, Flame, Target, MessageCircle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import ModernCard from '../components/ModernCard';

export default function Mentorship() {
  const features = [
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Get Roasted",
      description: "I'll dig into your fundamentals until you discover your own gaps."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real Interview Simulation",
      description: "Practice with someone who's been on both sides of the interview table."
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Brutally Honest Feedback",
      description: "No nitpicking on hard skills—just pure interview performance."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Find Your Gaps",
      description: "You'll identify exactly where you need to improve—yourself."
    }
  ];

  const benefits = [
    "Interview communication skills",
    "Fundamentals deep-dive",
    "Problem-solving approach",
    "Thinking out loud",
    "Handling pressure",
    "Self-awareness building"
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-brand-red rounded-full text-sm font-medium mb-6">
            <Flame className="w-4 h-4" />
            Now Accepting Students
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            I'll <span className="text-brand-red">Roast</span> Your Tech Interview Skills
            <span className="text-brand-red">.</span>
          </h1>

          <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            No fluff. No hand-holding. Just brutal, honest feedback that'll actually prepare you
            for the real thing. Think you're ready? Let's find out.
          </p>

          <motion.a
            href="https://learnwithandi.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-lg rounded-full hover:bg-brand-red transition-colors shadow-lg hover:shadow-xl"
          >
            Book a Session
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ModernCard className="p-6 h-full hover:border-brand-red/30">
                <div className="p-3 bg-red-50 text-brand-red rounded-xl w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.description}</p>
              </ModernCard>
            </motion.div>
          ))}
        </motion.div>

        {/* What You'll Get Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              What You'll Get <span className="text-brand-red">Grilled</span> On
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <ModernCard className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-none text-white">
            <div className="text-center">
              <p className="text-slate-300 mb-2">Ready to get uncomfortable?</p>
              <h3 className="text-2xl font-bold mb-4">Stop practicing in your comfort zone</h3>
              <p className="text-slate-400 mb-6">
                Real interviews are stressful. That's why I make our sessions stressful too.
                The more you sweat in training, the less you bleed in battle.
              </p>
              <a
                href="https://learnwithandi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-brand-red hover:text-white transition-colors"
              >
                Visit learnwithandi.com
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ModernCard>
        </motion.div>

        {/* Social Proof / Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-400 text-sm">
            Mentoring aspiring engineers to land their dream jobs at top tech companies.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
