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
                const maxRetries = 8;
    
                      const addlive = await fetch("https://api.bloggiamgia.vn/api/amusement/add-shop-live-cart", {
                        "headers": {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
                        "authorization": "",
                        "content-type": "application/json",
                        "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://bloggiamgia.vn/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                        },
                        "body": `{\"link\":\"${url}\"}`,
                        "method": "POST"
                        })
const check = await addlive.text(); 
console.log(check)
if(check.match(/error-link/g)){
    ctx.reply(`Opps! Có vẻ như đây không phải link sản phẩm! Vui lòng kiểm tra lại nhé! ${tagName}`, {message_thread_id: threadID, parse_mode: "HTML"} )
    return next();
    }                         
    const obj = await JSON.parse(check)
    const itemId =  await obj.itemid
    //console.log(itemId)
     if(itemId.length == 0){
    ctx.reply(`Opps! Có vẻ như đây không phải link sản phẩm! Vui lòng kiểm tra lại nhé! ${tagName}`, {message_thread_id: threadID, parse_mode: "HTML"} )
    return next();
     }           
    const shopId =  await obj.shopid
    console.log(shopId)
    
    //ctx.reply(`Đang thực hiện tác vụ... ${tagName}`, {message_thread_id: threadID, parse_mode: "HTML"})
    while (retryCount < maxRetries) {
      try { 

        const sleep = function(time) {
          var stop = new Date().getTime();
          while (new Date().getTime() < stop + time) {;
          }
          return new Promise((r, _) => r())
        }
        console.log("đang lên")
        sleep(3000 * 1).then(() => console.log("awake"))

                        //addlive   
const getLive =  await fetch("https://api.bloggiamgia.vn/api/amusement/get-shop-live-product", {
                        "headers": {
                        "accept": "application/json, text/plain, */*",
                        "accept-language": "en-US,en;q=0.9,vi;q=0.8,zh-CN;q=0.7,zh;q=0.6",
                        "authorization": "",
                        "content-type": "application/json",
                        "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "Referer": "https://bloggiamgia.vn/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                        },
                        "body": `{\"shopid\":\"${shopId}\",\"itemid\":\"${itemId}\"}`,
                        "method": "POST"
                        }).then(response => response.text())
                        .then(data => {
                          //console.log(data)
                        const listItem = JSON.parse(data).recommendLivestreams
                        const items = listItem.map((item) => [item.product.itemid, item.product.shopid,
                        item.product.liveid, item.product.indexInLive, item.product.name, item.product.image])
                        console.log(items)
                        const target = items.filter((z) => z[0] === itemId)
                        if (target.length >= 1) {
                          const link = `https://shope.ee/an_redir?origin_link=${encodeURIComponent(`https://shopee.vn/SHOPEE-ALIVE-i.${shopId}.${itemId}`)}&affiliate_id=17384020006&sub_id=productsLive`
                          console.log('hahahahahaaaaaaaaa' + link)
                          //console.log(`https://down-vn.img.susercontent.com/${target[0][5].replace(/'/g,'')}`)
                        const strMess = `<i><a href="${link}">${target[0][4]}</a></i>\n\n<b>VỊ TRÍ SỐ: ${target[0][3]} giỏ live</b> nhé ${tagName} \n\nVô Live Luôn Kẻo Mất Giỏ 👇`
                         ctx.replyWithPhoto(`https://down-vn.img.susercontent.com/${target[0][5]}`,{caption: strMess, message_thread_id: threadID, reply_markup: {
                        inline_keyboard: [
                        /* Inline buttons. 2 side-by-side */
                        [ { text: "💯 Đến Giỏ Live Ngay 💯", url: `https://shope.ee/an_redir?origin_link=${encodeURIComponent('https://live.shopee.vn/middle-page?type=live&id=')}${target[0][2]}&affiliate_id=17384020006&sub_id=tagsLive` }],
            
                        /* One button */
                        //[ { text: "❓Hướng Dẫn", url: "https://t.me/ChotDonBot" }, { text: "🔥 15 Voucher 50K", url: "https://www.facebook.com/groups/salelameofficial/"}]
                        ]
                        }
                        , parse_mode: "HTML"});
                       
                            ctx.reply(`1. Các bạn vào sau nếu gửi link không lên giỏ, là chưa mở live nha!\n\n2. Cứ để lại link cần add giỏ, sản phẩm sẽ tự lên giỏ ở phiên live sau! Có thông báo cho bạn!\n\n3. Nếu số thứ tự 4 chữ số thì vui lòng để ý kĩ vì hiển thị giỏ bị khuất số!\n\n4. Nếu vào giỏ bị chậm, không thấy sản phẩm vui lòng gửi lại link, lấy số mới và vô liền!`,{message_thread_id: threadID, parse_mode: "HTML"} )  
            
                        } else {
                        ctx.reply(`Sản phẩm hiện chưa có sẵn tag Live! ${tagName}\n Thử lại nha!`,{message_thread_id: threadID, parse_mode: "HTML"} )  
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
    await ctx.deleteMessage(message.message_id); 
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

    async function shortshp(urltoshort) {
      console.log(encodeURIComponent(urltoshort))
      const link = `url=${encodeURIComponent(urltoshort)}&name_url=&submit=`
      const shortLink = await fetch("https://shp.zone/", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "Referer": "https://shp.zone/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `${link}`,
        "method": "POST"
      }).then(response => response.text())
      .then(data => {
  console.log(data)
  const shortarget = data.match(/https:\/\/shp\.zone\/....">/g)
  console.log(shortarget)
const shortaff = shortarget.toString().replace(/">/g, '')
return shortaff
})
return shortLink
    }
