import AudioPlayer from './AudioPlayer'
import ThemeToggle from './ThemeToggle'
import styles from './page.module.css'

const projects = [
  {
    title: 'OpenFat',
    category: 'Kotlin / Mobile',
    description: 'Простой и открытый дневник калорий, БЖУ и веса для Android. Без аккаунтов, рекламы и облака.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/OpenFat' }],
  },
  {
    title: 'Corrector BOT',
    category: 'Telegram / AI',
    description: 'Исправляет грамматику, орфографию и тон исходящих сообщений с помощью OpenAI API.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/correctorbot' }],
  },
  {
    title: 'Charm — Moder',
    category: 'Telegram',
    description: 'Бот-модератор для Telegram-чатов.',
    links: [{ label: 'Telegram', href: 'https://t.me/charmmoder_bot' }],
  },
  {
    title: 'Metro 2039',
    category: 'Web / Media',
    description: 'Лендинг и новостной проект о вселенной Metro.',
    links: [
      { label: 'Сайт', href: 'https://metro2039.ru' },
      { label: 'Telegram', href: 'https://t.me/m39ru' },
    ],
  },
  {
    title: 'TG Mailing BOT',
    category: 'Telegram',
    description: 'Инструмент рассылки по группам от имени Telegram-аккаунта.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/tg-mailing-bot' }],
  },
  {
    title: 'IKEA Parser',
    category: 'Python / Data',
    description: 'Парсер каталога товаров IKEA.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/ikeaparser' }],
  },
  {
    title: 'Fragment Parser',
    category: 'Python / Data',
    description: 'Парсер подарков с Fragment.com.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/fragmentparser' }],
  },
  {
    title: 'TODO List',
    category: 'Kotlin / Mobile',
    description: 'Нативный список задач для Android.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/TODO-List' }],
  },
  {
    title: 'SMS Forwarder',
    category: 'Kotlin / Mobile',
    description: 'Пересылает SMS с телефона в Telegram.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/SMSForwarder' }],
  },
  {
    title: 'AHKNS',
    category: 'Desktop',
    description: 'Открытая современная замена устаревшим биндерам.',
    links: [{ label: 'GitHub', href: 'https://github.com/Sterrist/AHKNS' }],
  },
]

const skills = ['BACKEND', 'TELEGRAM', 'FRONTEND', 'AUTOMATION', 'AI TOOLS']

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NODE_ENV === 'production' ? 'https://sterrist.dev' : 'http://localhost:3000')

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Sterrist',
      inLanguage: 'ru',
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Sterrist',
      url: siteUrl,
      image: `${siteUrl}/avatar.jpg`,
      email: 'mailto:sterrist@sterrist.dev',
      jobTitle: 'Разработчик',
      description: 'Разработчик Telegram-ботов, бэкенда и веб-продуктов.',
      knowsAbout: ['Telegram-боты', 'Python', 'Kotlin', 'Backend', 'Frontend', 'Автоматизация'],
      sameAs: ['https://github.com/Sterrist', 'https://vk.com/sterrist', 'https://t.me/sterrist_dev'],
    },
  ],
}

export default function Page() {
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Sterrist — наверх">
          Sterrist
        </a>

        <div className={styles.headerActions}>
          <nav className={styles.nav} aria-label="Основная навигация">
            <a href="#work">Проекты</a>
            <a href="#about">Обо мне</a>
            <a href="#contact">Контакты</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <section className={styles.hero} id="top">
        <h1 className={styles.heroTitle}>
          ПИШУ КОД,
          <br />
          КОТОРЫЙ <span>РАБОТАЕТ</span>
        </h1>

        <div className={styles.heroBottom}>
          <p>
            Привет, я Sterrist. Делаю бэкенд, ботов и веб — от первой идеи до работающего продукта.
          </p>

          <a className={styles.heroCta} href="#work">
            <span>Смотреть работы</span>
            <span className={styles.ctaArrow} aria-hidden="true">↓</span>
          </a>
        </div>

        <div className={styles.skillRow} aria-label="Специализация">
          {skills.map((skill, index) => (
            <span key={skill} className={index === skills.length - 1 ? styles.skillAccent : ''}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.work} id="work">
        <div className={styles.sectionHeading}>
          <p className={styles.sectionIndex}>01 / ИЗБРАННОЕ</p>
          <h2>ПРОЕКТЫ</h2>
          <p className={styles.projectCount}>{String(projects.length).padStart(2, '0')} работ</p>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <article className={styles.projectCard} key={project.title}>
              <div className={styles.cardTop}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.cardArrow} aria-hidden="true">↗</span>
              </div>
              <div className={styles.cardContent}>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
                <div className={styles.projectActions} aria-label={`Ссылки проекта ${project.title}`}>
                  {project.links.map((link) => (
                    <a
                      className={styles.projectLink}
                      href={link.href}
                      key={link.label}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.about} id="about">
        <p className={styles.sectionIndex}>02 / ОБО МНЕ</p>
        <div className={styles.aboutGrid}>
          <h2>
            МНОГО КОДА.
            <br />
            ЩЕПОТКА ДИЗАЙНА.
          </h2>
          <div className={styles.aboutCopy}>
            <p>
              Собираю практичные продукты: продумываю логику, пишу код и довожу интерфейс до состояния, когда им приятно пользоваться.
            </p>
            <p>
              Люблю автоматизацию, Telegram, Python и задачи, в которых можно убрать десять ручных действий одним хорошим скриптом.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer} id="contact">
        <p className={styles.sectionIndex}>03 / КОНТАКТЫ</p>
        <h2>ЕСТЬ ЗАДАЧА?</h2>
        <a className={styles.contactLink} href="https://t.me/sterrist_dev" rel="noopener noreferrer" target="_blank">
          НАПИСАТЬ В TELEGRAM <span aria-hidden="true">↗</span>
        </a>
        <a className={styles.contactLink} href="mailto:sterrist@sterrist.dev">
          sterrist@sterrist.dev <span aria-hidden="true">↗</span>
        </a>

        <div className={styles.footerBottom}>
          <p>Sterrist © {new Date().getFullYear()}</p>
          <div>
            <a href="https://github.com/Sterrist" rel="noopener noreferrer" target="_blank">GITHUB</a>
            <a href="https://vk.com/sterrist" rel="noopener noreferrer" target="_blank">VK</a>
          </div>
        </div>
      </footer>

      <AudioPlayer />
    </main>
  )
}
