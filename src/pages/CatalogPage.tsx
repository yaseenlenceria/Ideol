import { ArrowRight } from 'lucide-react';
import { EXPERIENCES } from '../data/kpopData';
import { useOrbit } from '../context/OrbitContext';
import { ExperienceCategory } from '../types/kpop';

export function CatalogPage({ category }: { category: ExperienceCategory }) {
  const { navigate } = useOrbit();
  const items = EXPERIENCES.filter((e) => e.category === category);

  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#8B5CF6] dark:text-pink-300">
          {category === 'quiz' ? '6 Interactive Quizzes' : '6 K-pop Utility Tools'}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#170B35] dark:text-white">
          {category === 'quiz' ? 'K-pop Quizzes & Games' : 'Interactive Fan Tools'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-violet-200/80 max-w-2xl">
          {category === 'quiz'
            ? 'Deterministic personality matches, verified group trivia, stage silhouette challenges, and head-to-head bias tournaments.'
            : 'Real-time KST countdowns, exact verified idol age calculators, customizable 1080×1920 fan cards, and your photocard binder.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((exp) => (
          <button
            key={exp.slug}
            type="button"
            onClick={() => navigate(exp.path)}
            className="text-left rounded-3xl bg-[#201148] hover:bg-[#281659] border border-violet-300/18 hover:border-pink-400/50 overflow-hidden flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="relative h-40 bg-[#170B35] overflow-hidden">
                <img
                  src={exp.imageUrl}
                  alt={exp.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#201148] via-[#201148]/30 to-transparent"
                  aria-hidden="true"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-pink-300">{exp.durationOrMode}</p>
                <h2 className="font-display text-xl font-bold text-white mt-1">{exp.title}</h2>
                <p className="text-sm text-violet-200/80 mt-2 leading-relaxed">{exp.description}</p>
              </div>
            </div>
            <div className="px-5 pb-5 flex items-center justify-between text-xs font-semibold text-violet-100">
              <span>{exp.tagline}</span>
              <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
