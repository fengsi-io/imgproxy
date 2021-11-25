# @fengsi/imgproxy

<h3>Using npm</h3>
<pre>npm install @fengsi/imgproxy</pre>

<h3>Require</h3>
<pre>
import { Init, CryptographicInit } from "@fengsi/imgproxy";

const imgproxy =  new Init("https://imgproxy.example.com");
// or
const imgproxy =  new CryptographicInit({
  salt: process.env.IMGPROXY_SALT,
  key: process.env.IMGPROXY_KEY,
  baseUrl: "https://imgproxy.example.com"
})

const url = imgproxy.getNewUrl({
  url: "https://example.com/01.jpg",
  width: 250,
  height: 50,
  quality: 90,
  gravity: "ce",
  format: "webp"
})

// https://imgproxy.example.com/pr:sharp/rs:fill:250:50:1/g:ce/q:90/LzAxLmpwZw.webp

// https://imgproxy.example.com/Oril43v9g8FpI0Y9oxkiulRVRuFZGlxehZ6_AD2Q-v0/rs:fill:250:50:1/g:ce/q:90/LzAxLmpwZw.webp
</pre>

<h3>腾讯云对象储存图片处理</h3>
<pre>
import { TencentInit } from "@fengsi/imgproxy";

const imgproxy =  new TencentInit({
  bucket: "bucketName-1250000000",
  region: "ap-shanghai",
  protocol: "https",
  key: "imageMogr2"
})

const url = imgproxy.getNewUrl({
  url: "https://example.com/gf/YYJdslldjjd.jpg",
  gravity: "so",
  width: 600,
  height: 50,
  quality: 70,
  format: "webp"
})

// https://bucketName-1250000000.cos.ap-shanghai.myqcloud.com/gf/YYJdslldjjd.jpg?imageMogr2/crop/600x50/gravity/south/quality/70/format/webp

const imgproxy =  new TencentInit({
  baseUrl: "https://imgproxy.example.com"
});

const url = imgproxy.getNewUrl({
  url: "https://example.com/gf/YYJdslldjjd.jpg",
  gravity: "so",
  width: 600,
  height: 50,
  quality: 70,
  format: "webp"
});

// https://imgproxy.example.com/gf/YYJdslldjjd.jpg?null/crop/600x50/gravity/south/quality/70/format/webp
</pre>

<p>Default</p>
<table>
    <thead>
        <tr>
            <th>Prop</th>
            <th>Type(s)</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>url</td>
            <td>String</td>
            <td>null(Don't empty)</td>
        </tr>
        <tr>
            <td>width</td>
            <td>Number, String</td>
            <td>0</td>
        </tr>
        <tr>
            <td>height</td>
            <td>Number, String</td>
            <td>0</td>
        </tr>
        <tr>
            <td>format</td>
            <td>String</td>
            <td>auto</td>
        </tr>
        <tr>
            <td>gravity</td>
            <td>String</td>
            <td>ce</td>
        </tr>
        <tr>
            <td>quality</td>
            <td>Number,String</td>
            <td>80</td>
        </tr>
        <tr>
            <td>enlarge</td>
            <td>Number,String</td>
            <td>1</td>
        </tr>
        <tr>
            <td>resizing_type</td>
            <td>String</td>
            <td>fill</td>
        </tr>
    </tbody>
</table>

<h3>related articles</h3>
<a href="https://docs.imgproxy.net/#/generating_the_url_basic?id=format-definition">imgproxy</a>
