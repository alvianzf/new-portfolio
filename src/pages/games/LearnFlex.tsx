import { Layout } from 'lucide-react';
import FlexPlayground from '../../components/games/FlexPlayground';

export default function LearnFlex() {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform">
            <Layout className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Learn Flexbox (The "Fun" Way)
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Forget about Froggy. Here you center divs because the client changed their mind 5 times today.
            <br />
            <span className="text-xs font-mono bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded mt-2 inline-block">display: flex; justify-content: cry;</span>
          </p>
        </div>

        <FlexPlayground />
      </div>
    </div>
  );
}
