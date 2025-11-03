// Используем переменную окружения, которую ты настроил
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// Асинхронная функция для получения данных с Strapi
async function getArticles() {
  const res = await fetch(`${STRAPI_URL}/api/articles`);

  if (!res.ok) {
    // В случае ошибки (например, 403 Forbidden), выводим сообщение
    console.error("Failed to fetch articles:", res.status, res.statusText);
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}

export default async function Home() {
  let articles = [];
  let error = null;

  try {
    // Загружаем данные
    const data = await getArticles();
    articles = data.data; // В Strapi данные лежат в поле 'data'
  } catch (e) {
    error = e.message;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Мой Блог (Загрузка из Strapi)</h1>

      {error && <p className="text-red-500">{error}</p>}

      {articles.length === 0 && !error && (
        <p>
          Список статей пуст. 
          <a href={`${STRAPI_URL}/admin`} target="_blank" className="text-blue-500 underline ml-2">
            Создайте первую статью в админке Strapi!
          </a>
        </p>
      )}

      {articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map(article => (
            <div key={article.id} className="p-6 border rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold">{article.attributes.title || "Нет заголовка"}</h2>
              <p className="text-gray-600 mt-2">ID статьи: {article.id}</p>
              {/* Мы пока не знаем, какие у тебя поля, используем ID для примера */}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}