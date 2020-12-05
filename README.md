# js-imgproxy

<h3>Using npm</h3>
<pre>npm install wu-imgproxy</pre>

<h3>Require</h3>
<pre>
import { Init, CryptographicInit } from "js-imgproxy";

const imgproxy =  new Init("https://imgproxy.example.com");
// or
const imgproxy =  new CryptographicInit({
  salt: "hgjd",
  key: "iimjmee",
  baseUrl: "https://imgproxy.example.com"
})

const url = imgproxy.getNewUrl({
  url: "https://imgproxy.example.com",
  width: 250,
  height: 50,
  quality: 90,
  extension: "webp"
})
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
            <td>extension</td>
            <td>String</td>
            <td>auto</td>
        </tr>
        <tr>
            <td>extend</td>
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
