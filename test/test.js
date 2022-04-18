const { Init } = require("../src/index.js");

const imgproxy1 =  new Init("https://imgproxy.example.com");

console.log("url1: " + imgproxy1.getNewUrl({
  url: "https://imgproxy.com/jjd.jpg",
  width: 250,
  height: 50,
  quality: 90,
  extend: "ce"
}));
