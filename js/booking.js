document
.getElementById('booking-form')
.addEventListener('submit', function(e){


e.preventDefault();



const name =
document.getElementById('client-name').value;


const phone =
document.getElementById('client-phone').value;


const plate =
document.getElementById('car-plate').value;


const carModel =
document.getElementById('car-model').value;


const service =
document.getElementById('service-type').value;


const date =
document.getElementById('booking-date').value;


const time =
document.getElementById('booking-time').value;


const desc =
document.getElementById('issue-desc').value;



const message = 
`Вітаю! Хочу записатися на обслуговування через сайт.

Автомобіль:
${carModel}

Номер автомобіля:
${plate}

Послуга:
${service}

Дата:
${date}

Час:
${time}

Клієнт:
${name}

Телефон:
${phone}

Проблема:
${desc}`;



const ownerPhone =
"34668575113";



const whatsappLink =
`https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;



window.open(
whatsappLink,
"_blank"
);


});



/*
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки

    // 1. Збираємо значення з полів форми
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const plate = document.getElementById('car-plate').value;
    const carModel = document.getElementById('car-model').value;
    const service = document.getElementById('service-type').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const desc = document.getElementById('issue-desc').value;

    // 2. Формуємо красивий текст для повідомлення
    const message = `Hola! Новий запис через сайт:
• Ім'я: ${name}
• Тел: ${phone}
• Авто: ${carModel} (${plate})
• Послуга: ${service}
• Дата/Час: ${date} о ${time}
• Опис: ${desc}`;

    // 3. Кодуємо текст для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Номер телефону власника в Барселоні (без + і пробілів)
    const ownerPhoneNumber = ""; 
    
    // 4. Створюємо фінальне посилання та відкриваємо WhatsApp
    const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});

*/
