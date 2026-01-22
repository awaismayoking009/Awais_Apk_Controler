// AM MVC - Global Intelligence Engine
const statusText = document.getElementById('status-text');
const aiResponse = document.getElementById('ai-response');
const micBtn = document.getElementById('micBtn');

// زبان کی ترتیب (Default: English)
let currentLang = 'en-US';

function changeLanguage(langCode) {
    currentLang = langCode === 'ur' ? 'ur-PK' : (langCode === 'hi' ? 'hi-IN' : 'en-US');
    alert("Language changed to: " + currentLang);
    closeNav();
}

// آواز سننے کا فنکشن (Speech Recognition)
function startVoiceAction() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
        alert("Your browser does not support Voice Commands.");
        return;
    }

    const rec = new Recognition();
    rec.lang = currentLang;
    rec.continuous = false;

    rec.onstart = () => {
        micBtn.classList.add('listening');
        statusText.innerHTML = "Listening...";
    };

    rec.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        aiResponse.innerHTML = `You said: "${command}"`;
        processCommand(command);
    };

    rec.onend = () => {
        micBtn.classList.remove('listening');
        statusText.innerHTML = "Online & Ready";
    };

    rec.start();
}

// کمانڈ پر عمل کرنے کا سسٹم (Mobile Control Logic)
function processCommand(cmd) {
    // ۱. واٹس ایپ کنٹرول
    if (cmd.includes("open whatsapp") || cmd.includes("whatsapp kholo")) {
        speak("Opening WhatsApp, Boss.");
        window.location.href = "whatsapp://";
    }
    // ۲. نیٹ فلکس یا مووی کنٹرول
    else if (cmd.includes("play") || cmd.includes("chalao")) {
        speak("Searching and playing on Netflix.");
        window.location.href = "https://www.netflix.com/search?q=" + cmd.replace("play", "");
    }
    // ۳. یوٹیوب کنٹرول
    else if (cmd.includes("youtube")) {
        speak("Opening YouTube.");
        window.location.href = "https://www.youtube.com";
    }
    // ۴. گوگل سرچ (Gemini Style)
    else {
        speak("Searching my database for " + cmd);
        window.open("https://www.google.com/search?q=" + cmd);
    }
}

// آواز نکالنے کا فنکشن (Text-to-Speech)
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang;
    window.speechSynthesis.speak(utterance);
}

// Sidebar Controls
function openNav() { document.getElementById("mySidebar").style.width = "250px"; }
function closeNav() { document.getElementById("mySidebar").style.width = "0"; }
      
