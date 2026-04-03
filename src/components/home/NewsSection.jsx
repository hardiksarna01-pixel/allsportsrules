import { useSportsNews } from '../../hooks/useLiveData';

export default function NewsSection() {
  const { data: articles, loading } = useSportsNews('sports rules');

  if (!articles && !loading) return null; // No API key or no data — hide section

  return (
    <section className="mt-8 md:mt-12">
      <h2 className="font-[Outfit] text-lg font-bold text-gray-900 mb-4">Latest news</h2>
      {loading && !articles ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border border-gray-100 animate-pulse">
              <div className="w-16 h-16 rounded-lg bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {articles?.slice(0, 3).map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow"
            >
              {a.urlToImage && (
                <img
                  src={a.urlToImage}
                  alt=""
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
              )}
              <div>
                <div className="font-[Outfit] text-sm font-bold text-gray-800 line-clamp-2">
                  {a.title}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {a.source?.name} &middot;{' '}
                  {new Date(a.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
