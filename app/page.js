import Link from 'next/link';

// Функция для получения статей из Strapi
async function getArticles() {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
  // Здесь мы используем NEXT_PUBLIC_STRAPI_API_URL для обращения к твоему Strapi
  const res = await fetch(`${url}/api/articles?populate=*`);

  if (!res.ok) {
    // В случае ошибки просто выводим ее в консоль и возвращаем пустой список
    console.error(`Failed to fetch articles from ${url}`);
    return { data: [] };
  }

  const json = await res.json();
  return json;
}

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
            {/* Это сообщение показывается, если статьи нет, но если есть проблема с CORS, то сюда мы и попадаем */}
            *Если вы уверены, что статьи есть, возможно, проблема с подключением/брандмауэром.*
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const attributes = article.attributes;
            // Упрощенный вывод: вместо изображения просто серый блок
            // const coverUrl = attributes.cover?.data?.attributes?.url || '/default-image.jpg'; 

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