import CookieService from "@/services/CookieService";
import styles from "@/styles/TextPage.module.scss";
import { useEffect, useState } from "react";

export default function PrivacyPage() {
    const [locale, setLocale] = useState<string>('ru');
    useEffect(() => {
        const _locale = CookieService.getCookie('locale');
        if(_locale != null) {
            setLocale(_locale);
        }
    }, []);

    return(
        <div className={styles.TextPage__root}>
            <div className={styles.wrapper}>
                <div className={styles.head}>
                    <h1 className={styles.title}>{locale == 'ru' ? "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ" : "PRIVACY POLICY"}</h1>
                </div>
                <div className={styles.content}>
                    <p>{locale == 'ru' ? `в отношении обработки персональных данных

⸻

1. Общие положения

1.1. Настоящая Политика составлена в соответствии с Федеральным законом РФ от 27.07.2006 №152-ФЗ «О персональных данных» и определяет порядок обработки и защиты персональных данных, предоставляемых пользователями сайта https://495traffic.com.

1.2. Оператором персональных данных является:
ИП Садывакасов Дмитрий Шухратович
ИНН: 771618905209
ОГРНИП: 325774600387818
E-mail: 495traffic@gmail.com

1.3. Настоящая Политика применяется ко всем персональным данным, которые Оператор может получить от пользователя при использовании сайта, включая оформление заказов, подписку, участие в акциях, обратную связь и иные формы взаимодействия.

1.4. Цель Политики — защита прав и свобод человека при обработке его персональных данных, обеспечение их безопасности и соблюдение конфиденциальности.

⸻

2. Правовые основания обработки данных

2.1. Обработка персональных данных осуществляется на следующих основаниях:
 • получение согласия пользователя при заполнении форм на сайте;
 • исполнение договора купли-продажи товаров (оферты);
 • выполнение требований законодательства, включая налоговые и бухгалтерские цели;
 • законные интересы Оператора, например для защиты своих прав и улучшения работы сайта.

⸻

3. Какие данные мы собираем

3.1. Персональные данные:
 • ФИО;
 • номер телефона;
 • e-mail;
 • адрес доставки;
 • история заказов и взаимодействия с сайтом;
 • иная информация, которую пользователь добровольно передаёт при оформлении заказов или заполнении форм.

3.2. Обезличенные данные:
 • cookies;
 • IP-адрес;
 • данные браузера и устройства;
 • поведение на сайте;
 • данные аналитики (Google Analytics, Яндекс.Метрика и др.).
Это данные, которые не позволяют напрямую идентифицировать пользователя.

⸻

4. Цели обработки данных

4.1. Оператор использует персональные данные только в целях:
 • оформления, оплаты и доставки заказов;
 • связи с пользователями по вопросам заказов;
 • рассылки уведомлений (если пользователь дал согласие);
 • выполнения требований законодательства;
 • аналитики и улучшения работы сайта.

⸻

5. Согласие пользователя

5.1. Пользователь предоставляет согласие на обработку своих персональных данных:
 • при заполнении форм на сайте;
 • при оформлении заказа;
 • при подписке на рассылку;
 • при использовании сайта с включёнными cookies.

5.2. Пользователь вправе отозвать согласие в любой момент, направив письмо на 495traffic@gmail.com с темой «Отзыв согласия на обработку персональных данных».

⸻

6. Хранение и удаление данных

6.1. Персональные данные хранятся:
 • в течение 3 лет с момента последнего взаимодействия или оформления заказа;
 • либо в течение срока, установленного законодательством (например, по бухгалтерии — 5 лет).

6.2. После истечения срока данные удаляются или обезличиваются, если иное не предусмотрено законом.

⸻

7. Передача и трансграничная передача данных

7.1. Данные могут быть переданы третьим лицам только в следующих случаях:
 • платёжным системам — для приёма оплаты;
 • службам доставки — для отправки заказов;
 • государственным органам — по законным требованиям.

7.2. Мы используем аналитические и технические сервисы (Google, Meta, Яндекс), которые могут находиться за пределами РФ. Передача данных за границу осуществляется при условии соблюдения требований к защите персональных данных.

⸻

8. Cookies и автоматизированная обработка

8.1. Мы используем файлы cookies и пиксели для аналитики, сохранения предпочтений и улучшения пользовательского опыта.

8.2. Пользователь может отключить cookies в настройках браузера. Отключение может повлиять на функциональность сайта.

8.3. На сайте не применяется автоматизированное принятие решений, влекущее юридические последствия (например, профилирование по поведению).

⸻

9. Права пользователя

Пользователь имеет право:
 • запрашивать информацию о своих персональных данных;
 • требовать исправления, блокировки или удаления данных;
 • отзывать согласие на обработку;
 • обжаловать действия Оператора в Роскомнадзор.

⸻

10. Ответственность пользователя

10.1. Пользователь обязуется предоставлять только достоверную информацию.

10.2. Оператор не несёт ответственности за убытки, возникшие в результате предоставления пользователем недостоверных данных.

⸻

11. Заключительные положения

11.1. Настоящая Политика действует бессрочно до момента её замены новой редакцией.

11.2. Оператор вправе вносить изменения в Политику. Актуальная версия всегда доступна по адресу https://495traffic.com/privacy.

11.3. Все вопросы, связанные с обработкой данных, направляются на 495traffic@gmail.com.` : 
`Regarding the Processing of Personal Data

⸻

1. General Provisions

1.1. This Policy is drafted in accordance with Federal Law of the Russian Federation No. 152-FZ dated 27.07.2006 "On Personal Data" and defines the procedure for processing and protecting personal data provided by users of the website https://495traffic.com.

1.2. The personal data operator is:
Sole Proprietor Dmitry Shukhratovich Sadyvakasov
INN: 771618905209
OGRNIP: 325774600387818
E-mail: 495traffic@gmail.com

1.3. This Policy applies to all personal data that the Operator may receive from the user when using the website, including order placement, subscription, participation in promotions, feedback, and other forms of interaction.

1.4. The purpose of the Policy is to protect human rights and freedoms when processing their personal data, to ensure data security, and to maintain confidentiality.

⸻

2. Legal Grounds for Data Processing

2.1. Personal data is processed on the following grounds:
• user consent obtained when filling out forms on the website;
• execution of a sale and purchase agreement (offer);
• compliance with legal requirements, including for tax and accounting purposes;
• the Operator's legitimate interests, such as protecting their rights and improving the website’s operation.

⸻

3. What Data We Collect

3.1. Personal data:
• full name;
• phone number;
• e-mail address;
• delivery address;
• order and interaction history with the website;
• other information voluntarily provided by the user when placing orders or filling out forms.

3.2. Non-personal (anonymized) data:
• cookies;
• IP address;
• browser and device data;
• website usage behavior;
• analytics data (Google Analytics, Yandex.Metrica, etc.).
These are data that do not allow the user to be directly identified.

⸻

4. Purposes of Data Processing

4.1. The Operator uses personal data solely for the following purposes:
• order placement, payment, and delivery;
• communication with users regarding orders;
• sending notifications (if the user has given consent);
• compliance with legal requirements;
• analytics and website improvement.

⸻

5. User Consent

5.1. The user gives consent to the processing of their personal data:
• when filling out forms on the website;
• when placing an order;
• when subscribing to the newsletter;
• when using the website with cookies enabled.

5.2. The user has the right to withdraw consent at any time by sending an email to 495traffic@gmail.com with the subject “Withdrawal of Consent for Personal Data Processing.”

⸻

6. Data Storage and Deletion

6.1. Personal data is stored:
• for 3 years from the date of last interaction or order placement;
• or for the period established by law (e.g., for accounting — 5 years).

6.2. After the expiration of the storage period, data is deleted or anonymized, unless otherwise provided by law.

⸻

7. Data Transfer and Cross-Border Transmission

7.1. Data may be transferred to third parties only in the following cases:
• to payment systems — for processing payments;
• to delivery services — for shipping orders;
• to government authorities — upon lawful request.

7.2. We use analytical and technical services (Google, Meta, Yandex) that may be located outside the Russian Federation. Cross-border data transfer is carried out in compliance with personal data protection requirements.

⸻

8. Cookies and Automated Processing

8.1. We use cookies and pixels for analytics, preference storage, and to improve user experience.

8.2. Users may disable cookies in their browser settings. Disabling cookies may affect the website’s functionality.

8.3. No automated decision-making is applied on the website that entails legal consequences (e.g., behavioral profiling).

⸻

9. User Rights

The user has the right to:
• request information about their personal data;
• demand correction, blocking, or deletion of data;
• withdraw consent to data processing;
• file a complaint to Roskomnadzor about the Operator's actions.

⸻

10. User Responsibility

10.1. The user agrees to provide only accurate and truthful information.

10.2. The Operator is not liable for losses resulting from the user's submission of inaccurate data.

⸻

11. Final Provisions

11.1. This Policy is valid indefinitely until it is replaced with a new version.

11.2. The Operator reserves the right to make changes to the Policy. The current version is always available at https://495traffic.com/privacy.

11.3. All questions related to data processing should be directed to 495traffic@gmail.com.`}</p>
                </div>
            </div>
        </div>
    );
}