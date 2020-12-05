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
  salt: "hgjd",
  key: "iimjmee",
  baseUrl: "https://imgproxy.example.com"
});

console.log("url2:" + imgproxy1.getNewUrl({
  url: "https://imgproxy.com/YYJdslldjjd.jpg",
  extend: "ce",
  width: 600,
  height: 50,
  quality: 70
}));