import HomepageHeader from '../components/HomepageHeader'
import styles from './HomePage.module.scss'

export const HomePage = () => {
    return (
        <div className={styles['home-page']}>
            <HomepageHeader />
            <main className={styles['home-page-content']}>
                <div className={styles.text}>
                    {/* <h1>בלה בלהבלה בלה בלה בלה.</h1> */}
                    <h1 className={styles.h1}>לורם איפסום דולור סיט אמט</h1>
                    {/* <p>ברוכים הבאים לגרושריז, האפליקציה המושלמת לכל מי שרוצה לפשט את חווית קניית המצרכים שלו. המערכת החכמה שלנו מאפשרת מעקב אחר מצרכים, ניהול מלאי ביתי והשוואת מחירים. הצטרפו עוד היום!</p> */}
                    <p className={styles.p}>לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי קוואזי במר מודוף. </p>
                    <button className={styles.button}>הרשמה</button>
                    {/* <button className='btn-call-to-action'><Link to='/store'>יש לי חשבון</Link></button> */}
                </div>
                <img className={styles.img} src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685284044/My_project_yyaa5h.png" alt="hero" />
            </main>
        </div>
    )
}
