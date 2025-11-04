import Link from 'next/link';

// Функция для получения статей из Strapi
async function getArticles() {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  // 👇 Вот наш НОВЫЙ секретный токен
  const token = process.env.STRAPI_API_TOKEN;

  if (!token) {
    console.error("STRAPI_API_TOKEN не найден!");
    return { data: [] };
  }

  // 👇 Мы добавляем "Authorization" к запросу
  const res = await fetch(`${url}/api/articles?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error(`Failed to fetch articles from ${url}`);
    return { data: [] };
  }

  const json = await res.json();
  return json;
}

// ... (остальная часть кода для отображения страницы точно такая же, как была)
export default async function Home() {
  const articlesData = await getArticles();
  const articles = articlesData.data || [];

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Мой Блог (Загрузка из Strapi)</h1>

      {articles.length === 0 ? (
        <div className="text-center p-10 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-xl text-gray-600">Список статей пуст.</p>
          <p className="text-md text-gray-500 mt-2">Создайте первую статью в админке Strapi!</p>
          <p className="text-sm text-red-500 mt-4">
            *Если статьи есть, но не видны, проверьте токен API и права в Strapi.*
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const attributes = article.attributes;
            return (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full bg-gray-300 flex items-center justify-center">
                    <p className="text-gray-500">Изображение (Cover)</p>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{attributes.title}</h2>
                  <p className="text-gray-600 mb-4">{attributes.description || 'Нет описания.'}</p>
                  <Link href={`/article/${attributes.slug}`} legacyBehavior>
                    <a className="text-blue-500 hover:text-blue-700 font-medium">Читать далее &rarr;</a>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}