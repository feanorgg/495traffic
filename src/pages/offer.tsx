import CookieService from "@/services/CookieService";
import styles from "@/styles/TextPage.module.scss";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function OfferPage() {
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
                    <h1 className={styles.title}>{locale == 'ru' ? "ПУБЛИЧНАЯ ОФЕРТА" : "PUBLIC OFFER"}</h1>
                </div>
                <div className={styles.content}>
                    <p>{locale == 'ru' ? `о заключении договора купли-продажи товаров дистанционным способом

⸻

1. Общие положения

1.1. Настоящая публичная оферта является официальным предложением Индивидуального предпринимателя Садывакасова Дмитрия Шухратовича (ОГРНИП 325774600387818, ИНН 771618905209), далее — Продавец, заключить договор купли-продажи товаров дистанционным способом с любым дееспособным физическим лицом (далее — Покупатель) в соответствии со статьями 435 и 437 Гражданского кодекса РФ.

1.2. Оформляя Заказ на сайте https://495traffic.com, Покупатель подтверждает согласие с условиями настоящей Оферты и заключает с Продавцом договор купли-продажи.

1.3. Настоящая Оферта действует бессрочно и может быть изменена Продавцом в одностороннем порядке. Изменения вступают в силу с момента публикации на сайте, если иное не указано в новой редакции.

⸻

2. Термины
 • Покупатель — физическое лицо, оформившее Заказ на сайте.
 • Товар — одежда, аксессуары и иные изделия бренда 495TRAFFIC.
 • Кастом — индивидуально изготовленный или доработанный товар по запросу Покупателя. Возврату не подлежит, за исключением брака.
 • Предзаказ — заказ товара, находящегося в производстве или недоступного на складе. Сроки уточняются индивидуально.
 • Заказ — оформленный на сайте запрос на покупку Товара.
 • Сайт — https://495traffic.com, включая все его поддомены и мобильные версии.
 • Службы доставки — СДЭК и иные логистические компании, привлекаемые Продавцом.

⸻

3. Предмет договора

3.1. Продавец обязуется передать Покупателю выбранный Товар, а Покупатель — оплатить и принять его на условиях настоящей Оферты.

⸻

4. Оформление заказа и оплата

4.1. Заказ оформляется через Сайт Покупателем самостоятельно.

4.2. Оплата производится банковской картой через платёжный сервис ЮKassa.

4.3. Договор считается заключённым с момента поступления полной оплаты на счёт Продавца.

4.4. Срок обработки Заказа составляет от 1 до 2 рабочих недель.
В отдельных случаях (высокая загрузка, индивидуальный пошив, кастом) срок может быть увеличен, о чём Покупатель будет уведомлён.

4.5. При отсутствии оплаты в течение 30 минут Заказ аннулируется автоматически. Покупатель может оформить новый Заказ повторно.

⸻

5. Доставка

5.1. Доставка по РФ осуществляется через службу СДЭК. Стоимость доставки рассчитывается автоматически при оформлении Заказа и оплачивается Покупателем.

5.2. Сроки доставки после отправки составляют 3–7 рабочих дней (по России), зависят от региона и не включают время на обработку Заказа.

5.3. Международная доставка возможна по запросу через социальные сети. В будущем оформление через сайт может быть доступно.

5.4. После отправки Заказа Продавец предоставляет Покупателю трек-номер для отслеживания.

5.5. Продавец не несёт ответственности за действия служб доставки, но оказывает содействие в решении возникающих вопросов.

⸻

6. Возврат, обмен, гарантия

6.1. Возврат товара надлежащего качества возможен в течение 7 календарных дней с момента получения, при условии:
 • сохранности товарного вида, бирок, упаковки;
 • отсутствия следов носки или использования;
 • предоставления подтверждающих документов (чек, подтверждение заказа).

6.2. Кастомные и предзаказные изделия не подлежат возврату, за исключением случаев производственного брака. Это связано с индивидуальными характеристиками таких товаров.

6.3. При выявлении брака Покупатель обязуется предоставить доказательства неисправности — фото/видео с распаковки на пункте выдачи, либо иные материалы.

6.4. Обмен товара возможен при наличии подходящего размера/модели и по согласованию с Продавцом.

6.5. Срок рассмотрения претензий составляет до 10 рабочих дней.

6.6. Возврат денежных средств осуществляется в течение 10 календарных дней после подтверждения возврата. Комиссии платёжных систем не компенсируются.

⸻

7. Гарантия

7.1. Продавец гарантирует соответствие товара описанию, размещённому на сайте, и отсутствие производственного брака.

7.2. Гарантия не распространяется на повреждения, возникшие вследствие неправильного использования, ухода, механического воздействия или естественного износа.

⸻

8. Форс-мажор

8.1. Продавец не несёт ответственности за неисполнение обязательств, вызванное обстоятельствами непреодолимой силы (форс-мажор): стихийные бедствия, сбои в работе платёжных или логистических систем, военные действия, блокировки и запреты со стороны властей и пр.

⸻

9. Персональные данные

9.1. Обработка персональных данных осуществляется на основании согласия Покупателя и в целях исполнения настоящего Договора.

9.2. Персональные данные обрабатываются в соответствии с Федеральным законом №152-ФЗ и Политикой конфиденциальности, размещённой на сайте.

9.3. Данные передаются третьим лицам только в объёме, необходимом для исполнения Заказа (службы доставки, платёжные системы) и строго в рамках законодательства РФ.

⸻

10. Ответственность сторон

10.1. Стороны несут ответственность за неисполнение своих обязательств в соответствии с законодательством РФ.

10.2. Продавец не несёт ответственности за:
 • ошибки, допущенные Покупателем при оформлении Заказа;
 • задержки, вызванные транспортными компаниями;
 • технические особенности отображения цветов на устройствах Покупателя.

10.3. В случае отмены Заказа по инициативе Продавца (например, при отсутствии товара), Покупателю возвращается полная сумма оплаты.

⸻

11. Разрешение споров

11.1. Все споры разрешаются в досудебном порядке путём переписки.

11.2. При невозможности урегулирования спор подлежит рассмотрению в суде по месту регистрации Продавца.

⸻

12. Заключительные положения

12.1. Оформляя Заказ, Покупатель подтверждает, что ознакомлен и согласен с условиями настоящей Оферты и Политикой конфиденциальности.

12.2. Нажатие кнопки «Оформить заказ» на сайте считается акцептом настоящей Оферты и равносильно заключению договора купли-продажи.

⸻

13. Реквизиты Продавца

Индивидуальный предприниматель
Садывакасов Дмитрий Шухратович
ИНН: 771618905209
ОГРНИП: 325774600387818
Адрес: 129281, г. Москва, Староватутинский проезд, д.13, кв.144
E-mail: 495traffic@gmail.com
Телефон: +7 (968) 495-69-69` :
`On the Conclusion of a Distance Sale and Purchase Agreement

⸻

1. General Provisions

1.1. This public offer is an official proposal by Sole Proprietor Dmitry Shukhratovich Sadyvakasov (OGRNIP 325774600387818, INN 771618905209), hereinafter referred to as the Seller, to conclude a distance sale and purchase agreement with any legally capable individual (hereinafter referred to as the Buyer) in accordance with Articles 435 and 437 of the Civil Code of the Russian Federation.

1.2. By placing an Order on the website https://495traffic.com, the Buyer confirms their agreement with the terms of this Offer and enters into a sale and purchase agreement with the Seller.

1.3. This Offer is valid indefinitely and may be amended unilaterally by the Seller. Amendments come into force upon publication on the website, unless otherwise specified in the updated version.

⸻

2. Terms
• Buyer — an individual who has placed an Order on the website.
• Product — clothing, accessories, and other items under the 495TRAFFIC brand.
• Custom — a product individually made or modified upon the Buyer’s request. Non-returnable, except in case of defect.
• Pre-order — an order for a product that is in production or currently unavailable in stock. Delivery times are specified individually.
• Order — a request for the purchase of a Product submitted on the website.
• Website — https://495traffic.com, including all its subdomains and mobile versions.
• Delivery Services — CDEK and other logistics companies engaged by the Seller.

⸻

3. Subject of the Agreement

3.1. The Seller undertakes to deliver the selected Product to the Buyer, and the Buyer agrees to pay for and accept the Product under the terms of this Offer.

⸻

4. Order Placement and Payment

4.1. Orders are placed independently by the Buyer through the Website.

4.2. Payment is made by bank card via the YooKassa payment service.

4.3. The Agreement is deemed concluded upon receipt of full payment to the Seller’s account.

4.4. Order processing time is from 1 to 2 business weeks.
In certain cases (high workload, custom tailoring, customization), the period may be extended, and the Buyer will be informed accordingly.

4.5. If payment is not made within 30 minutes, the Order is automatically canceled. The Buyer may place a new Order again.

⸻

5. Delivery

5.1. Delivery within the Russian Federation is carried out via the CDEK service. The delivery cost is calculated automatically during Order placement and is paid by the Buyer.

5.2. Delivery time after shipment is 3–7 business days (within Russia), depending on the region and excluding Order processing time.

5.3. International delivery is available upon request via social media. In the future, it may become available through the website.

5.4. After shipment, the Seller provides the Buyer with a tracking number.

5.5. The Seller is not responsible for the actions of delivery services but assists in resolving related issues.

⸻

6. Returns, Exchanges, Warranty

6.1. Return of a Product in proper condition is possible within 7 calendar days from the date of receipt, provided that:
• the product appearance, tags, and packaging are preserved;
• there are no signs of wear or use;
• supporting documents are provided (receipt, order confirmation).

6.2. Custom and pre-ordered items are not subject to return, except in cases of manufacturing defects. This is due to the individual nature of such products.

6.3. In the event of a defect, the Buyer must provide evidence of the issue — photo/video from unpacking at the pickup point or other materials.

6.4. Product exchange is possible if the required size/model is available and upon agreement with the Seller.

6.5. Claims are reviewed within up to 10 business days.

6.6. Refunds are made within 10 calendar days after the return is confirmed. Payment system fees are non-refundable.

⸻

7. Warranty

7.1. The Seller guarantees the conformity of the Product to the description provided on the Website and the absence of manufacturing defects.

7.2. The warranty does not cover damage resulting from improper use, care, mechanical impact, or natural wear and tear.

⸻

8. Force Majeure

8.1. The Seller is not liable for failure to fulfill obligations due to force majeure circumstances: natural disasters, failures in payment or logistics systems, military actions, bans and restrictions imposed by authorities, etc.

⸻

9. Personal Data

9.1. The processing of personal data is carried out based on the Buyer’s consent and for the purpose of fulfilling this Agreement.

9.2. Personal data is processed in accordance with Federal Law No. 152-FZ and the Privacy Policy published on the Website.

9.3. Data is transferred to third parties only to the extent necessary for Order fulfillment (delivery services, payment systems) and strictly within the framework of Russian legislation.

⸻

10. Liability of the Parties

10.1. The Parties are liable for failure to fulfill their obligations in accordance with the laws of the Russian Federation.

10.2. The Seller is not liable for:
• errors made by the Buyer when placing the Order;
• delays caused by transport companies;
• technical features of color rendering on the Buyer’s devices.

10.3. In case the Order is canceled at the initiative of the Seller (e.g., product unavailability), the Buyer will receive a full refund.

⸻

11. Dispute Resolution

11.1. All disputes are to be resolved in a pre-trial procedure via correspondence.

11.2. If resolution is not achieved, the dispute shall be submitted to the court at the Seller’s place of registration.

⸻

12. Final Provisions

12.1. By placing an Order, the Buyer confirms that they have read and agreed to the terms of this Offer and the Privacy Policy.

12.2. Clicking the “Place Order” button on the website constitutes acceptance of this Offer and is equivalent to entering into a sale and purchase agreement.

⸻

13. Seller Details

Sole Proprietor
Dmitry Shukhratovich Sadyvakasov
INN: 771618905209
OGRNIP: 325774600387818
Address: 129281, Moscow, Starovatutinsky proezd, building 13, apt. 144
E-mail: 495traffic@gmail.com
Phone number: +7 (968) 495-69-69`}</p>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const locale = req.cookies.locale || 'ru';
    const messages = (await import(`./../messages/${locale}.json`)).default;

    return {
        props: {
            messages,
            locale
        }
    };
};
