const { Init, CryptographicInit, TencentInit } = require("../dist/main.js");

const imgproxy1 =  new Init("https://imgproxy.example.com");

console.log("url1:" + imgproxy1.getNewUrl({
  url: "https://imgproxy.com/jjd.jpg",
  width: 250,
  height: 50,
  quality: 90,
  format: "webp"
}));

const imgproxy2 =  new CryptographicInit({
  salt: "bf70f0921ac408cb499adec05fe07bcce8336bd60adb0239327ba74834d45712",
  key: "e6c95a590ac25aa4cc75fe770bb5ce50787197b963ce9daf8b6c540ab17685cf",
  baseUrl: "https://imgproxy.example.com"
});

console.log("url2:" + imgproxy2.getNewUrl({
  url: "https://imgproxy.com/YYJdslldjjd.jpg",
  gravity: "so",
  width: 600,
  height: 50,
  quality: 70
}));

const imgproxy3 =  new TencentInit({
  bucket: "wu-1250000000",
  region: "ap-shanghai",
  protocol: "https"
});

console.log("url3:" + imgproxy3.getNewUrl({
  url: "https://example.com/gf/YYJdslldjjd.jpg",
  gravity: "so",
  width: 600,
  height: 50,
  quality: 70,
  format: "webp"
}));