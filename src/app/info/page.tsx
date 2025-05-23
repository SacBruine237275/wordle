import Link from 'next/link';

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl bg-gray-900 rounded-xl shadow-xl p-8 space-y-6 border border-gray-700">
        <h1 className="text-4xl font-extrabold tracking-tight">À propos de ce projet</h1>
        <p className="text-lg leading-relaxed">
          Ce projet est une recréation du jeu <strong>Wordle</strong>, accessible à l'adresse&nbsp;
          <a href="https://wordle.louan.me/"  target="_blank" rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-400 transition-colors duration-200">
            https://wordle.louan.me/
          </a>.
        </p>

        <p className="text-lg leading-relaxed">
          Le jeu utilise un système de mot unique par jour, garantissant une expérience
          cohérente et partagée pour tous les joueurs.
        </p>

        <p className="text-lg leading-relaxed">
          Ce site est développé avec <strong>Next.js</strong> pour une expérience rapide et moderne.
        </p>

        <p className="text-lg leading-relaxed">
          Le code source est accessible ici : &nbsp;
          <a
            href="https://github.com/SacBruine237275/wordle" target="_blank" rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-400 transition-colors duration-200">
            GitHub
          </a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Améliorations possibles</h2>

        <p className="text-lg leading-relaxed">
          Il serait possible d'améliorer le système actuel en limitant le joueur à une seule tentative par jour,
          en remplaçant la gestion via cookie par un système plus robuste qui préserverait également la progression
          du joueur, même en cas de fermeture ou de rechargement de la page.
        </p>

        <Link 
          href="/" 
          className="inline-block mt-8 px-6 py-3 bg-blue-600 rounded-md text-white font-semibold text-center
                     hover:bg-blue-700 transition-colors duration-200">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
