let lang = "Marathi";

if(localStorage.lang) {
    lang = localStorage.getItem("lang")
}

const LANG = {
    APP_NAME: lang == "English" ? "Agrowon Animal Care" : "अ‍ॅग्रोगोथा",
    BLOG_POST: lang == "English" ? "News and feeds" : "बातम्या आणि फीड",
    FEEDBACK: lang == "English" ? "Feeback " : "अभिप्राय",
    REPLIES: lang == "English" ? "Replies" : "प्रत्युत्तरे",
    ANIMAL: lang == "English" ? "Animal Manager" : "प्राणी व्यवस्थापक",
    FARM: lang == "English" ? "Farm Manager" : "बातम्या आणि फीड",
    USERS: lang == "English" ? "User Management" : "वापरकर्ता व्यवस्थापक",
    ANIMAL_CATEGORY: lang == "English" ? "Animal Types" : "प्राण्यांचा प्रकार",

    CSE: lang == "English" ? "Customer Service Executive" : "ग्राहक सेवा कार्यकारी",
    ADMIN: lang == "English" ? "ADMIN" : "प्रशासन",

    PROFILE: lang == "English" ? "Profile" : "प्रोफाइल",
    MY_ACCOUNT: lang == "English" ? "Profile" : "माझे खाते",
    LOGOUT: lang == "English" ? "Logout" : "बाहेर पडणे",

    SEARCH_HERE: lang == "English" ? "Search Here" : "येथे शोधा",

    LOGIN: lang == "English" ? "Login" : "लॉगिन",
    PHONE_NUMEBR: lang == "English" ? "Phone Number" : "फोन नंबर",
    PASSWORD: lang == "English" ? "Password" : "संकेतशब्द",

    LOADING: lang == "English" ? "Loading ..." : "लोड करीत आहे ..",

}
export default LANG;