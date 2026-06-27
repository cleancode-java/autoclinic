function changeLanguage(lang) {

    localStorage.setItem("selectedLanguage", lang);


    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");


        if (translations[lang] && translations[lang][key]) {

            element.textContent = translations[lang][key];

        }

    });



    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.getAttribute("data-i18n-placeholder");


        if (translations[lang] && translations[lang][key]) {

            element.placeholder = translations[lang][key];

        }

    });



    const select = document.getElementById("lang-select");

    if(select){

        select.value = lang;

    }

}





document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLanguage") || "es";
    changeLanguage(savedLang);

    const select = document.getElementById("lang-select");

    if(select){
        select.addEventListener("change", (e)=>{
            changeLanguage(e.target.value);
        });
    }

});