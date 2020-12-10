const { Init, CryptographicInit } = require("../dist/main.js");

const imgproxy1 =  new Init("https://imgproxy.example.com");

console.log("url1:" + imgproxy1.getNewUrl({
  url: "https://imgproxy.com/jjd.jpg",
  width: 250,
  height: 50,
  quality: 90,
  extension: "webp"
}));

const imgproxy2 =  new CryptographicInit({
  salt: "bf70f0921ac408cb499adec05fe07bcce8336bd60adb0239327ba74834d45712",
  key: "e6c95a590ac25aa4cc75fe770bb5ce50787197b963ce9daf8b6c540ab17685cf",
  baseUrl: "https://imgproxy.example.com"
});

console.log("url2:" + imgproxy2.getNewUrl({
  url: "https://imgproxy.com/YYJdslldjjd.jpg",
  extend: "ce",
  width: 600,
  height: 50,
  quality: 70
}));