const TelegramBot = require('node-telegram-bot-api');
const Jimp = require('jimp');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Replace with your Telegram Bot API token
const token = 'Y7108443696:AAHSxmjjYtYrGQZWfAgf3M_xje1bZ6FACbE';
const bot = new TelegramBot(token, { polling: true });

// Replace with the path to your overlay image
const overlayImagePath = path.join(__dirname, 'punch-3.png');

// Function to add overlay to the image
const addOverlay = async (imagePath, overlayPath) => {
  const image = await Jimp.read(imagePath);
  const overlay = await Jimp.read(overlayPath);

  overlay.resize(image.bitmap.width, Jimp.AUTO);
  image.composite(overlay, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacitySource: 0.5
  });

  const editedImagePath = path.join(__dirname, 'edited.png');
  await image.writeAsync(editedImagePath);
  return editedImagePath;
};

// Handler for image messages
bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  const fileId = msg.photo[msg.photo.length - 1].file_id;
  
  try {
    // Get the image file URL
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    
    // Download the image
    const response = await axios({
      url: fileUrl,
      responseType: 'stream'
    });
    const imagePath = path.join(__dirname, 'downloaded.png');
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);
    
    writer.on('finish', async () => {
      // Add overlay to the image
      const editedImagePath = await addOverlay(imagePath, overlayImagePath);
      
      // Send the edited image back to the user
      await bot.sendPhoto(chatId, editedImagePath);
      
      // Clean up the files
      fs.unlinkSync(imagePath);
      fs.unlinkSync(editedImagePath);
    });
    
    writer.on('error', (error) => {
      console.error('Error writing the image file:', error);
      bot.sendMessage(chatId, 'Sorry, something went wrong while processing the image.');
    });
  } catch (error) {
    console.error('Error processing the image:', error);
    bot.sendMessage(chatId, 'Sorry, something went wrong while processing the image.');
  }
});
