import express from "express";
import { Bot,webhookCallback } from "grammy";
import fetch from "node-fetch"
import {} from 'dotenv/config'
const bot = new Bot(process.env.BOT_TOKEN);


// huong dan
bot.command('start', async (ctx) => {
    const chatId = ctx.message.chat.id
    if (chatId != "-1001959268889") {
      ctx.replyWithPhoto("https://i.imgur.com/KeA0dm9.png", {caption: `<i><b>Để sử dụng được công cụ - Bạn làm theo các bước sau đây!</b></i>
      \n<b>Bước 1:</b> Tìm đến trang sản phẩm bạn muốn truy vấn.
      \n<b>Bước 2:</b> Nhấn nút chia sẻ sản phẩm (như hình) và copy link chia sẻ sản phẩm.
      \n<b>Bước 3:</b> Tham gia group https://t.me/CoNenChotDon và paste link sản phẩm vô Giỏ Live, rồi ấn Gửi.
      \n<b>Bước 4:</b> Chờ đợi máy chủ hoàn thành add giỏ live!!`, parse_mode: "HTML"})
    } 
  });
  

  bot.on('message', async (ctx, next) => {
    const chatId = ctx.message.chat.id
    const threadID = ctx.message.message_thread_id
    const fromID = ctx.message.from.id
    const lastName = (ctx.message.from.last_name == undefined) ? "":ctx.message.from.last_name;
    const fullName = `${ctx.message.from.first_name} ${lastName}`
    // const messID = ctx.message.message_id
    console.log(chatId + " - " + fromID) 
    const tagName = `<a href="tg://user?id=${fromID}">${fullName}</a>`
    if (chatId == "5229925261" || chatId == "-1001959268889" && threadID == "1464") {
        const message = ctx.message.text;
        const linkRegex = /(https?:\/\/[^\s]+)/;
        const pee = /https:\/\/sh/;
        if (linkRegex.test(message)) {
            const url = message.match(linkRegex)[0]
            if (pee.test(url)){
                let retryCount = 0;
                const maxRetries = 500000;
                while (retryCount < maxRetries) {
                try {
                  
 await fetch("https://clgt.top/proxy.php/https://shopeesale.live/", {
                    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://shopeesale.live/",
      "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": `add-product1=1&url=${encodeURIComponent(url)}&ref=&referer=`,
                    "method": "POST",
      "mode": "cors",
      "credentials": "include"
    })

.then(response => response.text()).
then(data => {
    console.log(data)
 if(data.match(/khi th/gm)){
    ctx.reply(`Lỗi không mong muốn! Gửi lại nhé! ${tagName}`, {message_thread_id: threadID, parse_mode: "HTML"} )
    return next();
 }   
    
  if(data.match(/ProductId":""/gm)  ){
    ctx.reply(`Opps! Có vẻ như đây không phải link sản phẩm! Vui lòng kiểm tra lại nhé! ${tagName}`, {message_thread_id: threadID, parse_mode: "HTML"} )
    return next();
    }   
    const liveStream = JSON.parse(data).data.LiveStream
    if (liveStream.length > 0 ){
  
      if(liveStream.length === 2){
    
         const live1 = liveStream[0].url.split("?")[0]
         console.log(live1)
         const live2 = liveStream[1].url.split("?")[0]  
         console.log(live2)     
                         
                             
        const strMess = `<b>VỊ TRÍ ĐẦU (1 - 50) giỏ live</b> nhé ${tagName} \n\n<b>Cả 2 live đều được Add nhé!</b>`
    ctx.reply(strMess, {message_thread_id: threadID, reply_markup: {
                            inline_keyboard: [
                            /* Inline buttons. 2 side-by-side */
                            [ { text: "💯 Live 1 💯", url: `https://shope.ee/an_redir?origin_link=${encodeURIComponent(live1)}&affiliate_id=17384020006&sub_id=tagsLive2` }, { text: "💯 Add Video 💯", url: "https://t.me/CoNenChotDon/14113" },
                            { text: "💯 Live 2 💯", url: `https://shope.ee/an_redir?origin_link=${encodeURIComponent(live2)}&affiliate_id=17384020006&sub_id=tagsLive2` }],
                
                            /* One button */
                            //[ { text: "❓Hướng Dẫn", url: "https://t.me/ChotDonBot" }, { text: "🔥 15 Voucher 50K", url: "https://www.facebook.com/groups/salelameofficial/"}]
                            ]
                            }
                            , parse_mode: "HTML"}); 
          return next();
                          } else {
                      const live1 = liveStream[0].url.split("?")[0] 
                      console.log(live1) 
                      const strMess = `<b>VỊ TRÍ ĐẦU (1 - 50) giỏ live</b> nhé ${tagName}\n\n<i>Nếu bị trôi sản phẩm. Hãy đợi sản phẩm mất giỏ rồi tiến hành add giỏ lại để sản phẩm lên ĐẦU nhé!</i>`
    ctx.reply(strMess, {message_thread_id: threadID, reply_markup: {
    inline_keyboard: [
                      /* Inline buttons. 2 side-by-side */
                      [ { text: "💯 Xem Ngay 💯", url: `https://shope.ee/an_redir?origin_link=${encodeURIComponent(live1)}&affiliate_id=17384020006&sub_id=tagsLive2` }, { text: "💯 Add Video 💯", url: "https://t.me/CoNenChotDon/14113" }],
          
                      /* One button */
                      //[ { text: "❓Hướng Dẫn", url: "https://t.me/ChotDonBot" }, { text: "🔥 15 Voucher 50K", url: "https://www.facebook.com/groups/salelameofficial/"}]
                      ]
                      }
                      , parse_mode: "HTML"});                      

                      }
                        }
})
                

   

                  
                
                        break;
                    } catch (ers) {
                      console.log(ers)
                      retryCount++;
                    }
                  }
    if (retryCount === maxRetries) {
    ctx.reply(`Máy chủ gặp sự cố trong quá trình truy xuất, hãy thử lại nhé! ${tagName}`,{parse_mode: "HTML"} )
    // Handle the case when the maximum number of retries is reached
   // await ctx.deleteMessage(message.message_id); 
                  }

                }
            }
        }
    })
        
    
    
 
    if (process.env.NODE_ENV === "production") {
      const app = express();
      app.use(express.json());
      app.use(webhookCallback(bot, "express"));
    
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Bot listening on port ${PORT}`);
      });
    } else {
      bot.start();
    }
  
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
