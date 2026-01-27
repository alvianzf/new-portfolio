
import TypeEditor from '../../components/games/TypeEditor';

export default function LearnTypeScript() {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <div className="font-bold text-2xl text-blue-600">TS</div>
          </div>
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            Type Torture
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            You said you know TypeScript. Prove it.
            <br />
            Replace the <span className="font-mono text-red-500">any</span> with something that makes the linter happy (and your colleagues confused).
          </p>
        </div>

        <TypeEditor />
      </div>
    </div>
  );
}
