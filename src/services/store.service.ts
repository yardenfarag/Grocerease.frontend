import { Icon } from '../models/icon'
import { Product } from '../models/product'
import { Store } from '../models/store'
import { storageService } from './storage.service'
import { utilService } from './util.service'
import { Place } from '../models/place'

export const storeService = {
  getStores,
  getStoreById,
  deleteStore,
  saveStore,
  getEmptyStore,
  getProducts,
  getStoresWithUserId
}

const STORE_KEY = 'store_db'

const DUMMY_PRODUCTS = [
  {
    "title": "שמן זית כתית אורגני",
    "barcode": "123456789012",
    "desc": "שמן זית אורגני באיכות גבוהה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798829/7290110556235_r67bsp.jpg",
    "manufacturer": "זיתוס"
  },
  {
    "title": "מלח ים יבש",
    "barcode": "234567890123",
    "desc": "מלח ים טבעי לשימור ותיבול",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798824/7290004063016_sgtguw.jpg",
    "manufacturer": "מלח נטורלי"
  },
  {
    "title": "חלב סויה אורגני",
    "barcode": "345678901234",
    "desc": "חלב סויה אורגני ללא לקטוז",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798821/5411188133490_ccfrgz.jpg",
    "manufacturer": "סויה טבעית"
  },
  {
    "title": "קפה ערביקה מקורי",
    "barcode": "456789012345",
    "desc": "קפה טחון איכותי מאזורי הגידול הטובים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798831/7296073393115_ir8h20.jpg",
    "manufacturer": "קפה רואה"
  },
  {
    "title": "דג סלמון צלוי",
    "barcode": "567890123456",
    "desc": "דג סלמון טרי צלוי בציפוי תבלינים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798830/7290117261545_mdotod.jpg",
    "manufacturer": "דגי ים טריים"
  },
  {
    "title": "פסטה פרפקטה איטלקית",
    "barcode": "678901234567",
    "desc": "פסטה איכותית מאיטליה למנות טעימות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798826/7290014534674_i7shjj.jpg",
    "manufacturer": "איטליה נוצצת"
  },
  {
    "title": "שמפו אורגני לשיער",
    "barcode": "789012345678",
    "desc": "שמפו אורגני עשיר לשיער רגיל",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798824/7290006185518_clxsnm.jpg",
    "manufacturer": "שמפו"
  },
  {
    "title": "חטיף דגנים טבעי",
    "barcode": "890123456789",
    "desc": "חטיף דגנים טבעי בטעם שוקולד",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798822/3560071013196_lovhb0.jpg",
    "manufacturer": "דגני בריאות"
  },
  {
    "title": "שמן חמניות אורגני",
    "barcode": "901234567890",
    "desc": "שמן חמניות אורגני לבישול וצימוח",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798827/7290017142388_wvngux.jpg",
    "manufacturer": "חמניות בר"
  },
  {
    "title": "סבון נוזלי טבעי",
    "barcode": "012345678901",
    "desc": "סבון נוזלי טבעי בריח מנדרינה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798828/7290019075684_nuanpt.jpg",
    "manufacturer": "טבע טהור"
  },
  {
    "title": "ממרח ארטישוק וחמאת בוטנים",
    "barcode": "123450987654",
    "desc": "ממרח ייחודי וטעים מארטישוק טרי וחמאת בוטנים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798830/7290117901243_sv5ncp.jpg",
    "manufacturer": "טעמים מרוכזים"
  },
  {
    "title": "דגני בוקר אורגניים",
    "barcode": "987654321012",
    "desc": "דגני בוקר מורכבים מחיטה מלאה, קינואה ושועל",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798830/7290112495006_zl19ay.jpg",
    "manufacturer": "בוקר בריא"
  },
  {
    "title": "חמאת בוטנים טבעית",
    "barcode": "678905432109",
    "desc": "חמאת בוטנים טבעית לשימור בריאות הלב",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798830/7290113197169_j16gya.jpg",
    "manufacturer": "בוטנים טבעיים"
  },
  {
    "title": "שקדים טבעיים",
    "barcode": "987654321987",
    "desc": "שקדים טבעיים טחונים עדינים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798834/Pricez132304_yaiily.jpg",
    "manufacturer": "טבע טעים"
  },
  {
    "title": "חטיפי ירקות צ'יפס",
    "barcode": "654321987654",
    "desc": "חטיפי ירקות צ'יפס בטעם תפו''א",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798829/7290111353451_lqrtgc.jpg",
    "manufacturer": "צ'יפס חירות"
  },
  {
    "title": "סוכר חום טבעי",
    "barcode": "321987654321",
    "desc": "סוכר חום טבעי לשתייה ולאפייה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798824/7290001990094_gtpvws.jpg",
    "manufacturer": "מתוק טבעי"
  },
  {
    "title": "שמנת בטעם וניל",
    "barcode": "789654321012",
    "desc": "שמנת טבעית עם טעם וניל איכותי",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798824/7290004125370_stkdub.jpg",
    "manufacturer": "שמנת טעימה"
  },
  {
    "title": "חטיף עיטורי גרנולה",
    "barcode": "987321654012",
    "desc": "חטיף עיטורי גרנולה בטעם שוקולד וקישוא",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798828/7290017390390_y2ktik.jpg",
    "manufacturer": "עיטורי טעימים"
  },
  {
    "title": "רוטב עגבניות אורגני",
    "barcode": "012345678999",
    "desc": "רוטב עגבניות אורגני לתיבול ולמרינדה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798823/7290000209722_bv0vcp.jpg",
    "manufacturer": "אורגנו"
  },
  {
    "title": "מי גזר אורגניים",
    "barcode": "789012345678",
    "desc": "מי גזר אורגניים טריים ומתוקים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798827/7290016682250_xe94oc.jpg",
    "manufacturer": "טבעי ומתוק"
  },
  {
    "title": "בצל ירוק טרי",
    "barcode": "890123456789",
    "desc": "בצל ירוק טרי לתיבול ולשימור",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798828/7290017487441_ozomoy.jpg",
    "manufacturer": "טרי טרי"
  },
  {
    "title": "קינואה אורגנית",
    "barcode": "901234567890",
    "desc": "קינואה אורגנית טחונה לתיבול ולכניות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798825/7290011254032_m4mgdj.jpg",
    "manufacturer": "קינואה בריאה"
  },
  {
    "title": "קפה אספרסו מוקה",
    "barcode": "123456789012",
    "desc": "קפה אספרסו עשיר ואיכותי במיוחד",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798829/7290104065187_yhxzx1.jpg",
    "manufacturer": "מוקה קפה"
  },
  {
    "title": "טחינה טהורה אורגנית",
    "barcode": "234567890123",
    "desc": "טחינה טהורה אורגנית בטעם עודפת רכה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798823/7290001407936_fkflto.jpg",
    "manufacturer": "טחינה בריאה"
  },
  {
    "title": "שמנת צמחית",
    "barcode": "345678901234",
    "desc": "שמנת צמחית טבעית לשימור ולתיבול",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798824/7290004124847_nzsyqk.jpg",
    "manufacturer": "טבע טעים"
  },
  {
    "title": "חמאת שקדים טבעית",
    "barcode": "456789012345",
    "desc": "חמאת שקדים טבעית ובריאה לשימור הבריאות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798826/7290011426859_zdgcv2.jpg",
    "manufacturer": "שקדי הבר"
  },
  {
    "title": "בננות אורגניות",
    "barcode": "567890123456",
    "desc": "בננות אורגניות טריות וטעימות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798832/Pricez65907_fro03j.jpg",
    "manufacturer": "בננה נטורלי"
  },
  {
    "title": "קמח מלא טחון אורגני",
    "barcode": "678901234567",
    "desc": "קמח מלא טחון אורגני למאפים ולבישול",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798823/7290000211374_gvg2bb.jpg",
    "manufacturer": "קמח טעים"
  },
  {
    "title": "תימין טחינה חמאת חלב",
    "barcode": "789012345678",
    "desc": "תימין טחינה חמאת חלב טבעית ואיכותית",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798825/7290010002405_ciktgs.jpg",
    "manufacturer": "תימין טחינה"
  },
  {
    "title": "חלב סויה אורגני",
    "barcode": "890123456789",
    "desc": "חלב סויה אורגני לתוספת חלבון צמחי",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798829/7290110327033_d7epv3.jpg",
    "manufacturer": "סויה בריאה"
  },
  {
    "title": "שוקולית מרירה אורגנית",
    "barcode": "901234567890",
    "desc": "שוקולית מרירה אורגנית בטעם איכותי",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798823/110572532_ji4xwj.jpg",
    "manufacturer": "שוקולית אורגנית"
  },
  {
    "title": "צ'יפס טבעיים בטעם מלח",
    "barcode": "123456789012",
    "desc": "צ'יפס טבעיים וקריספיים בטעם מלח טבעי",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798822/7290000178721_pif5aq.jpg",
    "manufacturer": "טבע טעים"
  },
  {
    "title": "עוגיות שוקולד מריר",
    "barcode": "234567890123",
    "desc": "עוגיות מרירות וטעימות עם רכיבי איכות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798830/7290112331953_biy8xq.jpg",
    "manufacturer": "עוגיות טעימות"
  },
  {
    "title": "מיני פיצות עם גבינה",
    "barcode": "345678901234",
    "desc": "מיני פיצות עם גבינה טריות וטעימה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798830/7296073254263_wdbz22.png",
    "manufacturer": "פיצה טעימה"
  },
  {
    "title": "כמון טחון",
    "barcode": "456789012345",
    "desc": "כמון טחון איכותי לתיבול והוספת טעמים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798825/7290008636193_xeqba9.jpg",
    "manufacturer": "טעם מיוחד"
  },
  {
    "title": "פפריקה מתוקה",
    "barcode": "567890123456",
    "desc": "פפריקה מתוקה באיכות גבוהה להוספת צבע וטעם",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798826/7290011254117_i5hnkf.jpg",
    "manufacturer": "תבלינים משובחים"
  },
  {
    "title": "קימל טחון",
    "barcode": "678901234567",
    "desc": "קימל טחון טרי להוספת ריח וטעם ייחודי",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798821/7290000134680_hkx0s8.jpg",
    "manufacturer": "טבליה בריאה"
  },
  {
    "title": "כורכום טחון",
    "barcode": "789012345678",
    "desc": "כורכום טחון איכותי עם טעם וצבע עשירים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798831/7296073485322_txexf8.jpg",
    "manufacturer": "תבלינים מיוחדים"
  },
  {
    "title": "תיבול מקסיקני",
    "barcode": "890123456789",
    "desc": "תיבול מקסיקני עם תערובת תבלינים מרעננת",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798827/7290015324663_z4q4wi.jpg",
    "manufacturer": "טבליה מקסיקנית"
  },
  {
    "title": "תיבול איטלקי",
    "barcode": "901234567890",
    "desc": "תיבול איטלקי עם תערובת תבלינים מסוגננת",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798831/7296073266594_qeqx5i.jpg",
    "manufacturer": "טבליה איטלקית"
  },
  {
    "title": "תפוחים ירוקים",
    "barcode": "123456789012",
    "desc": "תפוחים ירוקים ומרעננים בטעם מתוק",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798833/Pricez65939_jfjwng.jpg",
    "manufacturer": "פירות טריים"
  },
  {
    "title": "אבטיח מתוק",
    "barcode": "234567890123",
    "desc": "אבטיח מתוק ורענן לקיץ החם",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798833/Pricez68496_ldwn0m.jpg",
    "manufacturer": "אבטיח בריא"
  },
  {
    "title": "תפוחי עץ אורגניים",
    "barcode": "345678901234",
    "desc": "תפוחי עץ אורגניים טריים ועסיסיים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798833/Pricez80443_vuudxi.jpg",
    "manufacturer": "תפוחי הגן"
  },
  {
    "title": "מלפפון טרי",
    "barcode": "456789012345",
    "desc": "מלפפון טרי וצעיר לשימור הבריאות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798832/Pricez65716_dkov4q.jpg",
    "manufacturer": "ירקות טריים"
  },
  {
    "title": "גזר אורגני",
    "barcode": "567890123456",
    "desc": "גזר אורגני טרי ומתוק לשיפור תפריטי האוכל",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798833/Pricez65762_dxbk6n.jpg",
    "manufacturer": "גזר טבעי"
  },
  {
    "title": "סלק סורי אורגני",
    "barcode": "678901234567",
    "desc": "סלק סורי אורגני בצבע אדום איכותי",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798832/Pricez65810_t4gjaj.jpg",
    "manufacturer": "סלק בריא"
  },
  {
    "title": "חלב טרי",
    "barcode": "789012345678",
    "desc": "חלב טרי וטעים מאיכותי",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798834/Pricez89735_jyp2ij.jpg",
    "manufacturer": "חלב טרי"
  },
  {
    "title": "גבינת פטה אורגנית",
    "barcode": "890123456789",
    "desc": "גבינת פטה אורגנית טרייה וטעימה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798822/7290000049458_d0pia2.jpg",
    "manufacturer": "גבינות אורגניות"
  },
  {
    "title": "יוגורט גרגר",
    "barcode": "901234567890",
    "desc": "יוגורט גרגר טבעי ובריא לתפסיק בוקר מעורר",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798829/7290102393176_yebojh.jpg",
    "manufacturer": "יוגורט בריא"
  },
  {
    "title": "בוטנים טחון",
    "barcode": "123456789012",
    "desc": "בוטנים טחון איכותיים לשימור הבריאות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798833/Pricez73578_zo6v6h.jpg",
    "manufacturer": "בוטנים בריאים"
  },
  {
    "title": "גבינה לבנה",
    "barcode": "234567890123",
    "desc": "גבינה לבנה טבעית וטעימה לפינוקים קלים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798821/7290000048185_yryulf.jpg",
    "manufacturer": "גבינות טעימות"
  },
  {
    "title": "מרגרינה אורגנית",
    "barcode": "345678901234",
    "desc": "מרגרינה אורגנית באיכות גבוהה לשימור הטעם",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798832/8719200998001_piuzq8.jpg",
    "manufacturer": "מרגרינה בריאה"
  },
  {
    "title": "שניצל עוף",
    "barcode": "456789012345",
    "desc": "שניצל עוף טרי ומקורי לארוחה בריאה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798826/7290014749764_irfvys.jpg",
    "manufacturer": "בשר עוף טרי"
  },
  {
    "title": "סטייק בקר",
    "barcode": "567890123456",
    "desc": "סטייק בקר איכותי לטעימות ומרירות מושלמת",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798834/Pricez89557_w0zhpq.jpg",
    "manufacturer": "בשר בקר טעים"
  },
  {
    "title": "סלמון צלוי",
    "barcode": "678901234567",
    "desc": "סלמון צלוי בטעם עשיר ותפאורה מעולה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798825/7290008347730_me1imt.jpg",
    "manufacturer": "דג סלמון טרי"
  },
  {
    "title": "פילה עוף",
    "barcode": "789012345678",
    "desc": "פילה עוף איכותית וטרייה למנות בריאות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798834/Pricez178003_v9gv6p.jpg",
    "manufacturer": "בשר עוף איכותי"
  },
  {
    "title": "גידון עגל",
    "barcode": "890123456789",
    "desc": "גידון עגל מבשר טרי וטעים לארוחות משפחתיות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798834/Pricez76723_wwdph0.jpg",
    "manufacturer": "בשר עגל איכותי"
  },
  {
    "title": "גזר בשר טחון",
    "barcode": "901234567890",
    "desc": "גזר בשר טחון איכותי לשימור הבריאות והטעם",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798835/Pricez91091_t1ddhl.jpg",
    "manufacturer": "בשר עגל טחון"
  },
  {
    "title": "לחם שיפון",
    "barcode": "123456789012",
    "desc": "לחם שיפון טרי וטעים לארוחות משפחתיות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798825/7290008713917_wi1d0q.jpg",
    "manufacturer": "לחם טרי"
  },
  {
    "title": "פיתות מרוקנות",
    "barcode": "234567890123",
    "desc": "פיתות מרוקנות טריות ואווריריות לסנדוויץ' טעים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798832/7296073415862_y8vifc.png",
    "manufacturer": "מאפים מקומיים"
  },
  {
    "title": "חלות גרעינים",
    "barcode": "345678901234",
    "desc": "חלות גרעינים עשירה ומזינה לארוחות טעימות",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798832/Pricez65548_zczbry.jpg",
    "manufacturer": "מאפים איכותיים"
  },
  {
    "title": "שוקולד מריר 70%",
    "barcode": "456789012345",
    "desc": "שוקולד מריר עם 70% קקאו לאהבי הטעמים המרים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798828/7290017641720_jnpfyj.jpg",
    "manufacturer": "שוקולט טעים"
  },
  {
    "title": "שוקולד חלב עם קרמל",
    "barcode": "567890123456",
    "desc": "שוקולד חלב מתוק עם קרמל מפנק",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798832/7622201050757_bm8ypd.jpg",
    "manufacturer": "מתוקים שוקולד"
  },
  {
    "title": "טראפל תות",
    "barcode": "678901234567",
    "desc": "טראפל תות בשוקולד לח להתפנקות מתוקה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798825/7290008750677_peer4l.jpg",
    "manufacturer": "שוקולט מפנק"
  },
  {
    "title": "מיץ תפוחים טרי",
    "barcode": "789012345678",
    "desc": "מיץ תפוחים טרי ומרענן להזרמת אנרגיה",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798827/7290016682366_ppjvg5.jpg",
    "manufacturer": "מיצים טריים"
  },
  {
    "title": "קולה זירו",
    "barcode": "890123456789",
    "desc": "קולה קלה מתוקה ומרעננת לשקיעת הצמא",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798826/7290013585387_dkcuqe.jpg",
    "manufacturer": "משקאות קלים"
  },
  {
    "title": "שייק תות",
    "barcode": "901234567890",
    "desc": "שייק תות קר ומפנק להנאת הטעם",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798827/7290016682311_e2msdg.jpg",
    "manufacturer": "שייקים מעוררים"
  },
  {
    "title": "קפה אספרסו",
    "barcode": "123456789012",
    "desc": "קפה אספרסו כהה וארומטי לשגשוג הטעמים",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798831/8000070032835_k1trzn.jpg",
    "manufacturer": "קפה איכותי"
  },
  {
    "title": "מיץ תפוזים טרי",
    "barcode": "234567890123",
    "desc": "מיץ תפוזים טרי ומתוק לרענון הגוף",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798829/7290110114954_mxefqd.jpg",
    "manufacturer": "מיצים טעימים"
  },
  {
    "title": "קוקה קולה",
    "barcode": "345678901234",
    "desc": "קוקה קולה מתוקה וקרה לשקיעת הצמא",
    "imgUrl": "https://res.cloudinary.com/dfz8mxb4f/image/upload/v1685798823/7290001594155_h9xv6i.jpg",
    "manufacturer": "משקאות מרעננים"
  }
]

// const gStores: Store[] = [
//   {
//     _id: 'l101',
//     userIds: ['u1'],
//     title: 'הבית במושב',
//     color: '#fbf',
//     shoppingList: [{ id: 'g101', title: 'לחם' }, { id: 'g102', title: 'קפה' }, { id: 'g103', title: 'חלב' }, { id: 'g104', title: 'שוקולד' }, { id: 'g105', title: 'במבה' }],
//     places: [
//       {
//         id: 'p101',
//         title: 'מקרר',
//         items: [
//           { id: 'i101', title: 'חלב', expiry: '2023-06-12', quantity: 2 },
//           { id: 'i102', title: 'ביצים', expiry: '2023-06-19', quantity: 12 },
//           { id: 'i103', title: 'גזר', expiry: '2023-07-20', quantity: 4 },
//           { id: 'i104', title: 'גבינה צהובה', expiry: '2023-06-01', quantity: 1 }
//         ]
//       },
//       {
//         id: 'p102',
//         title: 'ארון מעל התנור',
//         items: [
//           { id: 'i105', title: 'פסטה', expiry: '2023-08-09', quantity: 5 },
//           { id: 'i106', title: 'אורז', expiry: '2023-08-08', quantity: 2 },
//           { id: 'i107', title: 'קמח', expiry: '2023-10-12', quantity: 3 },
//           { id: 'i108', title: 'סוכר', expiry: '2023-09-09', quantity: 1 },
//           { id: 'i109', title: 'מלח', expiry: '2023-09-09', quantity: 2 }
//         ],
//       },
//       {
//         id: 'p103',
//         title: 'ארון קפה',
//         items: [
//           { id: 'j3123', title: 'קפה', expiry: '2023-06-15', quantity: 1 },
//           { id: 'k2131', title: 'שוקו', expiry: '2023-06-29', quantity: 1 },
//           { id: 'l4434', title: 'תה', expiry: '2023-06-08', quantity: 2 }
//         ]
//       },
//       {
//         id: 'p104345',
//         title: 'ארון תבלינים',
//         items: [
//           { id: 'i1234', title: 'מלח', expiry: '2023-07-01', quantity: 1 },
//           { id: 'i189596', title: 'פלפל', expiry: '2023-08-02', quantity: 1 },
//           { id: 'i1136354555', title: 'פפריקה מתוקה', expiry: '2023-05-09', quantity: 2 },
//           { id: 'i117772', title: 'פפריקה חריפה', expiry: '2023-07-06', quantity: 2 },
//           { id: 'i1139898', title: 'צילי', expiry: '2024-04-08', quantity: 1 },
//           { id: 'i656552', title: 'כורכום', expiry: '2024-12-12', quantity: 1 },
//           { id: 'i17676', title: 'קינמון', expiry: '2024-03-25', quantity: 1 },
//           { id: 'i1121212', title: 'קארי', expiry: '2024-02-14', quantity: 1 },
//           { id: 'i1242424', title: 'גינגר', expiry: '2024-01-22', quantity: 1 },
//           { id: 'i1444444', title: 'אורגנו', expiry: '2024-04-09', quantity: 2 }
//         ]
//       }
//     ]
//   },
//   {
//     _id: 'l103',
//     title: 'דירה בב"ש',
//     userIds: ['u2'],
//     color: '#bce',
//     shoppingList: [{ id: 'g121', title: 'לחם' }, { id: 'g122', title: 'קפה' }, { id: 'g123', title: 'חלב' }, { id: 'g124', title: 'שוקולד' }, { id: 'g125', title: 'במבה' }],
//     places: [
//       {
//         id: 'p1045',
//         title: 'מקרר',
//         items: [
//           { id: 'a', title: 'חלב', expiry: '2023-06-12', quantity: 2 },
//           { id: 'b', title: 'ביצים', expiry: '2023-06-19', quantity: 12 },
//           { id: 'c', title: 'גזר', expiry: '2023-07-20', quantity: 4 },
//           { id: 'd', title: 'גבינה צהובה', expiry: '2023-06-01', quantity: 1 }
//         ]
//       },
//       {
//         id: 'p134',
//         title: 'ארון מעל התנור',
//         items: [
//           { id: 'e', title: 'פסטה', expiry: '2023-08-09', quantity: 5 },
//           { id: 'f', title: 'אורז', expiry: '2023-08-08', quantity: 2 },
//           { id: 'g', title: 'קמח', expiry: '2023-10-12', quantity: 3 },
//           { id: 'h', title: 'סוכר', expiry: '2023-09-09', quantity: 1 },
//           { id: 'i', title: 'מלח', expiry: '2023-09-09', quantity: 2 }
//         ]
//       },
//       {
//         id: 'p167',
//         title: 'ארון קפה',
//         items: [
//           { id: 'j', title: 'קפה', expiry: '2023-06-15', quantity: 1 },
//           { id: 'k', title: 'שוקו', expiry: '2023-06-29', quantity: 1 },
//           { id: 'l', title: 'תה', expiry: '2023-06-08', quantity: 2 }
//         ]
//       }
//     ]
//   },
//   // {_id: 'l103434', 
//   // title: 'מטבחון בחוץ', 
//   // color: '#0dc', 
//   // shoppingList: [{id: 'g1331', title: 'לחם'}, {id: 'g132', title: 'קפה'}, {id: 'g133', title: 'חלב'},{id: 'g134', title: 'שוקולד'},{id: 'g135', title: 'במבה'}],
//   // places: [
//   //     {
//   //         id: 'p145',
//   //         title: 'מקרר',
//   //         items: [
//   //           { id: 'm', title: 'חלב', expiry: new Date().toISOString(), quantity: 2 },
//   //           { id: 'n', title: 'ביצים', expiry: new Date().toISOString(), quantity: 12 },
//   //           { id: 'o', title: 'גזר', expiry: new Date().toISOString(), quantity: 4 },
//   //           { id: 'p', title: 'גבינה צהובה', expiry: new Date().toISOString(), quantity: 1 }
//   //         ]
//   //       },
//   //       {
//   //         id: 'p10266',
//   //         title: 'ארון שמאלי',
//   //         items: [
//   //           { id: 'q', title: 'פסטה', expiry: new Date().toISOString(), quantity: 5 },
//   //           { id: 'r', title: 'אורז', expiry: new Date().toISOString(), quantity: 2 },
//   //           { id: 's', title: 'קמח', expiry: new Date().toISOString(), quantity: 3 },
//   //           { id: 't', title: 'סוכר', expiry: new Date().toISOString(), quantity: 1 },
//   //           { id: 'u', title: 'מלח', expiry: new Date().toISOString(), quantity: 2 }
//   //         ]
//   //       },
//   //       {
//   //         id: 'p10345',
//   //         title: 'ארון קפה',
//   //         items: [
//   //           { id: 'v', title: 'קפה', expiry: new Date().toISOString(), quantity: 1 },
//   //           { id: 'w', title: 'שוקו', expiry: new Date().toISOString(), quantity: 1 },
//   //           { id: 'x', title: 'תה', expiry: new Date().toISOString(), quantity: 2 }
//   //         ]
//   //       }
//   // ]}
// ]

function getStoresWithUserId(userId: string): Store[] {
  const stores = _loadStores() || []
  let filteredStores = stores.filter((store:Store) => store.userIds?.includes(userId))
  return filteredStores
}

function getStores() {
  try {
    return _loadStores()
  } catch (error) {
    console.log('Cannot get stores ', error)
  }
}

function getStoreById(id: string) {
  try {
    const stores = _loadStores()
    const store = stores.find((store: Store) => store._id === id)
    return store
  } catch (error) {
    console.log('Cannot get store ', error)
  }
}

function deleteStore(id: string) {
  try {
    const stores = _loadStores()
    const storeIdx = stores.findIndex((store: Store) => store._id === id)
    if (storeIdx !== -1) {
      stores.splice(storeIdx, 1)
    }
    storageService.store(STORE_KEY, stores)
    return stores
  } catch (error) {
    console.log('Cannot delete store ', error)
  }
}

function _updateStore(store: Store) {
  try {
    const stores = _loadStores()
    const storeIdx = stores.findIndex((s: Store) => s._id === store._id)
    if (storeIdx !== -1) {
      stores[storeIdx] = store
    }
    storageService.store(STORE_KEY, stores)
  } catch (error) {
    console.log('Cannot update store ', error)
  }
}

function _addStore(store: Store) {
  try {
    let stores = _loadStores()
    store._id = utilService.makeId()
    if (!stores) {
      stores = [store]
    } else {
      stores.push(store)
    }
    storageService.store(STORE_KEY, stores)
    return stores
  } catch (error) {
    console.log('Cannot add store ', error)
  }
}

function saveStore(store: Store) {
  return store._id ? _updateStore(store) : _addStore(store)
}

function getEmptyStore():Store {
  return {
    title: '',
    color: '',
    places: [],
    shoppingList: [],
    userIds: []
  }
}

function _loadStores() {
  let stores = storageService.load(STORE_KEY)
  // if (!stores || !stores.length) stores = gStores
  storageService.store(STORE_KEY, stores)
  return stores
}

function getProducts(txt: string) {
  
  const regex = new RegExp(txt, 'iu')
  const filteredProducts = DUMMY_PRODUCTS.filter((product: Product) =>
  regex.test(product.title)
  )
  return filteredProducts

}


