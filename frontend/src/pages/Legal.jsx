import { useLang } from '../context/LangContext'

function Legal() {
  const { lang } = useLang()

  const t = {
    en: {
      title: 'Privacy Policy & Accessibility',
      lastUpdated: 'Last updated: June 2026',

      privacyTitle: 'Privacy Policy',
      p1: 'The "Bride of Jesus" Afula congregation website (hereinafter: "the Site") is operated by the Bride of Jesus Messianic congregation in Afula, Israel.',
      p2: 'We are committed to protecting the privacy of our visitors in accordance with the Israeli Privacy Protection Law, 5741-1981.',

      dataTitle: 'What data do we collect?',
      dataText: 'This site does not collect personal data from general visitors. The members section requires a shared congregation password — no personal accounts are created. The photo gallery section requires a name and administrator approval — this name is stored solely for the purpose of access management and is not shared with third parties.',

      cookiesTitle: 'Cookies',
      cookiesText: 'This site uses minimal local storage (not cookies) to remember your language preference and congregation access. No tracking or advertising cookies are used.',

      photosTitle: 'Photos',
      photosText: 'Photos of congregation members are published only in the restricted members section, accessible only to approved members. If you wish to have your photo removed, please contact us.',

      contactTitle: 'Contact',
      contactText: 'For any privacy-related request, please contact us at: info@afula-messianic.org or by phone: 055-299-8715.',

      accessTitle: 'Accessibility Statement',
      accessText: 'The Bride of Jesus congregation is committed to making its website accessible to all people, including those with disabilities, in accordance with the Israeli Equal Rights for Persons with Disabilities Law, 5758-1998, and Israeli Standard 5568.',

      accessFeatures: 'Accessibility features on this site:',
      feature1: 'Font size adjustment available on sermon reading pages',
      feature2: 'The site supports right-to-left (RTL) display for Hebrew',
      feature3: 'The site is navigable by keyboard',
      feature4: 'Color contrast meets accessibility standards',
      feature5: 'The site is compatible with screen readers',

      accessContact: 'If you encounter any accessibility issue, please contact us at info@afula-messianic.org and we will do our best to assist.',

      accessLevel: 'Current accessibility level: Partial compliance with Israeli Standard 5568 (AA level). We are continuously working to improve.',
    },
    ru: {
      title: 'Политика конфиденциальности и доступность',
      lastUpdated: 'Последнее обновление: июнь 2026',

      privacyTitle: 'Политика конфиденциальности',
      p1: 'Сайт общины "Невеста Иисуса" в Афуле (далее — "Сайт") управляется мессианской общиной "Невеста Иисуса" в Афуле, Израиль.',
      p2: 'Мы обязуемся защищать конфиденциальность наших посетителей в соответствии с израильским Законом о защите персональных данных 5741-1981.',

      dataTitle: 'Какие данные мы собираем?',
      dataText: 'Сайт не собирает личные данные от обычных посетителей. Раздел для прихожан требует общего пароля общины — личные аккаунты не создаются. Раздел фотогалереи требует имя и подтверждение администратора — это имя хранится исключительно для управления доступом и не передаётся третьим лицам.',

      cookiesTitle: 'Файлы cookie',
      cookiesText: 'Сайт использует минимальное локальное хранилище (не cookies) для запоминания языковых предпочтений и доступа к разделу прихожан. Отслеживающие или рекламные файлы cookie не используются.',

      photosTitle: 'Фотографии',
      photosText: 'Фотографии членов общины публикуются только в закрытом разделе, доступном только одобренным членам. Если вы хотите удалить своё фото, свяжитесь с нами.',

      contactTitle: 'Контакты',
      contactText: 'По любым вопросам, связанным с конфиденциальностью, свяжитесь с нами: info@afula-messianic.org или по телефону: 055-299-8715.',

      accessTitle: 'Заявление о доступности',
      accessText: 'Община "Невеста Иисуса" обязуется сделать свой сайт доступным для всех людей, включая людей с ограниченными возможностями, в соответствии с израильским Законом о равных правах для людей с ограниченными возможностями 5758-1998 и израильским стандартом 5568.',

      accessFeatures: 'Функции доступности на этом сайте:',
      feature1: 'Возможность изменения размера шрифта на страницах чтения проповедей',
      feature2: 'Сайт поддерживает отображение справа налево (RTL) для иврита',
      feature3: 'Навигация по сайту возможна с клавиатуры',
      feature4: 'Контрастность цветов соответствует стандартам доступности',
      feature5: 'Сайт совместим с программами для чтения с экрана',

      accessContact: 'Если вы столкнулись с проблемой доступности, свяжитесь с нами по адресу info@afula-messianic.org и мы постараемся помочь.',

      accessLevel: 'Текущий уровень доступности: частичное соответствие израильскому стандарту 5568 (уровень AA). Мы постоянно работаем над улучшением.',
    },
    he: {
      title: 'מדיניות פרטיות ונגישות',
      lastUpdated: 'עדכון אחרון: יוני 2026',

      privacyTitle: 'מדיניות פרטיות',
      p1: 'אתר קהילת "כלת ישוע" בעפולה (להלן: "האתר") מופעל על ידי קהילת כלת ישוע המשיחית בעפולה, ישראל.',
      p2: 'אנו מחויבים להגן על פרטיות המבקרים באתר בהתאם לחוק הגנת הפרטיות, התשמ"א-1981.',

      dataTitle: 'אילו נתונים אנו אוספים?',
      dataText: 'אתר זה אינו אוסף נתונים אישיים ממבקרים כלליים. אזור חברי הקהילה דורש סיסמה משותפת — לא נוצרים חשבונות אישיים. גלריית התמונות דורשת שם ואישור מנהל — שם זה נשמר אך ורק לצורך ניהול הגישה ואינו משותף עם גורמים שלישיים.',

      cookiesTitle: 'עוגיות (Cookies)',
      cookiesText: 'אתר זה משתמש באחסון מקומי מינימלי (לא עוגיות) לזכירת העדפות שפה וגישה לאזור חברי הקהילה. לא נעשה שימוש בעוגיות מעקב או פרסום.',

      photosTitle: 'תמונות',
      photosText: 'תמונות של חברי הקהילה מפורסמות רק באזור הסגור לחברים, הנגיש רק לחברים מאושרים. אם ברצונך להסיר את תמונתך, אנא צור קשר.',

      contactTitle: 'יצירת קשר',
      contactText: 'לכל פנייה הקשורה לפרטיות, אנא צור קשר: info@afula-messianic.org או בטלפון: 055-299-8715.',

      accessTitle: 'הצהרת נגישות',
      accessText: 'קהילת כלת ישוע מחויבת להנגיש את אתרה לכלל האנשים, לרבות אנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998, ותקן ישראלי 5568.',

      accessFeatures: 'תכונות נגישות באתר:',
      feature1: 'אפשרות שינוי גודל גופן בדפי קריאת דרשות',
      feature2: 'האתר תומך בתצוגה מימין לשמאל (RTL) בעברית',
      feature3: 'ניתן לנווט באתר באמצעות מקלדת',
      feature4: 'ניגודיות הצבעים עומדת בתקני הנגישות',
      feature5: 'האתר תואם לתוכנות קריאת מסך',

      accessContact: 'אם נתקלת בבעיית נגישות, אנא פנה אלינו בכתובת info@afula-messianic.org ונעשה כמיטב יכולתנו לסייע.',

      accessLevel: 'רמת נגישות נוכחית: תאימות חלקית לתקן ישראלי 5568 (רמה AA). אנו עובדים באופן מתמיד על שיפור.',
    },
  }

  const T = t[lang]
  const isHe = lang === 'he'

  const sectionStyle = {
    background: 'rgba(201,168,76,0.06)', border: '1px solid #8a6a1f',
    borderRadius: '8px', padding: '2rem', marginBottom: '2rem'
  }
  const h2Style = {
    fontFamily: 'serif', color: '#c9a84c', fontSize: '1.5rem', marginBottom: '1rem'
  }
  const pStyle = {
    color: '#d4c4a0', lineHeight: '1.8', marginBottom: '1rem', fontSize: '1rem'
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#1a1208', color: '#f5f0e8',
      padding: '4rem 8%', direction: isHe ? 'rtl' : 'ltr'
    }}>
      <h1 style={{ fontFamily: 'serif', color: '#c9a84c', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        {T.title}
      </h1>
      <p style={{ color: '#8a6a1f', marginBottom: '3rem', fontSize: '0.9rem' }}>{T.lastUpdated}</p>

      {/* Privacy */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>🔒 {T.privacyTitle}</h2>
        <p style={pStyle}>{T.p1}</p>
        <p style={pStyle}>{T.p2}</p>

        <h3 style={{ color: '#e8cc7a', marginBottom: '0.5rem', marginTop: '1.5rem' }}>{T.dataTitle}</h3>
        <p style={pStyle}>{T.dataText}</p>

        <h3 style={{ color: '#e8cc7a', marginBottom: '0.5rem', marginTop: '1.5rem' }}>{T.cookiesTitle}</h3>
        <p style={pStyle}>{T.cookiesText}</p>

        <h3 style={{ color: '#e8cc7a', marginBottom: '0.5rem', marginTop: '1.5rem' }}>{T.photosTitle}</h3>
        <p style={pStyle}>{T.photosText}</p>

        <h3 style={{ color: '#e8cc7a', marginBottom: '0.5rem', marginTop: '1.5rem' }}>{T.contactTitle}</h3>
        <p style={pStyle}>{T.contactText}</p>
      </div>

      {/* Accessibility */}
      <div style={sectionStyle}>
        <h2 style={h2Style}>♿ {T.accessTitle}</h2>
        <p style={pStyle}>{T.accessText}</p>

        <h3 style={{ color: '#e8cc7a', marginBottom: '1rem', marginTop: '1.5rem' }}>{T.accessFeatures}</h3>
        <ul style={{ color: '#d4c4a0', lineHeight: '2', paddingRight: isHe ? '1.5rem' : '0', paddingLeft: isHe ? '0' : '1.5rem' }}>
          <li>{T.feature1}</li>
          <li>{T.feature2}</li>
          <li>{T.feature3}</li>
          <li>{T.feature4}</li>
          <li>{T.feature5}</li>
        </ul>

        <p style={{ ...pStyle, marginTop: '1.5rem' }}>{T.accessContact}</p>
        <p style={{ ...pStyle, fontStyle: 'italic', color: '#8a6a1f' }}>{T.accessLevel}</p>
      </div>
    </div>
  )
}

export default Legal