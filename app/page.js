export default function Home() {
  return (
    <main style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🥳 Мой Сайт Работает!</h1>
      <p>Я победил все баги! Это простой сайт без Strapi.</p>
      <a 
        href="https://github.com/fevralsky1992/my-strapi-next-blog" 
        style={{ 
          display: 'inline-block', 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}
      >
        Смотреть код на GitHub
      </a>
    </main>
  )
}