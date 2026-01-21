import telebot
from flask import Flask
from threading import Thread

# آپ کی فراہم کردہ معلومات
API_TOKEN = '8503954959:AAGzrMTUqCTwgQ6QFAbsZIl_LNiILHJfpls'
ADMIN_ID = 6523586283

bot = telebot.TeleBot(API_TOKEN)
app = Flask('')

@app.route('/')
def home():
    return "The Guardian AI is Live!"

def run():
    app.run(host='0.0.0.0', port=8080)

@bot.message_handler(commands=['start'])
def welcome(message):
    if message.from_user.id == ADMIN_ID:
        bot.reply_to(message, "🛡️ **The Guardian AI System Active**\n\nWelcome Boss! I am connected to your mobile network. Give me a command.")
    else:
        bot.reply_to(message, "❌ Access Denied. Secure Connection Failed.")

# یہاں ہم مزید کمانڈز (Warn, Control) ایڈ کر سکتے ہیں

def start_bot():
    bot.infinity_polling()

if __name__ == "__main__":
    # ویب سرور اور بوٹ کو ایک ساتھ چلانا
    t = Thread(target=run)
    t.start()
    start_bot()
            
