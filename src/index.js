if (typeof window !== "undefined" && window === this && typeof window.URL !== "function") {
  require ("url-polyfill");
}

const defaultParams = {
  url: "",
  width: 0,
  height: 0,
  format: "auto",
  gravity: "ce",
  quality: 80,
  enlarge: 1,
  resizing_type: "fill",
  extend: "1"
}

function Init(baseUrl) {
  const url = new URL(baseUrl);

  this.getNewUrl = function (obj) {
    const params = Object.assign({}, defaultParams);
    Object.assign(params, obj);

    const urlSafeBase64 = string => {
      return Buffer.from(string)
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    if (params.url && typeof params.url === "string") {
      if (params.format === "auto") {
        params.format = params.url.split(".").pop();
      }

      const sourcePathname = urlSafeBase64(new URL(params.url).pathname);
      const processingOptions = `pr:sharp/rs:${params.resizing_type}:${params.width}:${params.height}:${params.enlarge}:${params.extend}/g:${params.gravity}/q:${params.quality}`;

      url.pathname = `/${processingOptions}/${sourcePathname}.${params.format}`;

      return url.toString();
    }
  }
}

function CryptographicInit(init) {
  const initDefault = {
    salt: "",
    key: "",
    baseUrl: ""
  }

  Object.assign(initDefault, init);

  const createHmac = require("create-hmac");

  const urlSafeBase64 = string => {
    return Buffer.from(string)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const hexDecode = hex => Buffer.from(hex, "hex");

  const sign = (salt, target, secret) => {
    const hmac = createHmac("sha256", hexDecode(secret));
    hmac.update(hexDecode(salt));
    hmac.update(target);
    return urlSafeBase64(hmac.digest());
  };

  this.getNewUrl = function (obj) {
    const params = Object.assign({}, defaultParams);
    Object.assign(params, obj);

    if (params.url && typeof params.url === "string") {
      if (params.format === "auto") {
        params.format = params.url.split(".").pop();
      }

      const sourcePathname = new URL(params.url).pathname;
      const encodedSourceUrl = urlSafeBase64(sourcePathname);

      const processingOptions = `rs:${params.resizing_type}:${params.width}:${params.height}:${params.enlarge}/g:${params.gravity}/q:${params.quality}`;

      const target = `/${processingOptions}/${encodedSourceUrl}.${params.format}`;
      const signature = sign(
        initDefault.salt,
        target,
        initDefault.key
      );

      const url = new URL(initDefault.baseUrl);
      url.pathname = `/${signature}/${processingOptions}/${encodedSourceUrl}.${params.format}`;
      const result = url.toString();

      return result;
    }
  }
}

function TencentInit(init) {
  const initDefault = {
    baseUrl: null,
    bucket: "examplebucket-1250000000",
    region: "ap-shanghai",
    protocol: "http",
    key: "imageMogr2"
  }

  const gravity = {
    no: "north",
    so: "south",
    ea: "east",
    we: "west",
    noea: "northeast",
    nowe: "northwest",
    soea: "southeast",
    sowe: "southwest",
    ce: "center"
  }

  Object.assign(initDefault, init);

  const url = initDefault.baseUrl ? new URL(initDefault.baseUrl) : new URL(`${initDefault.protocol}://${initDefault.bucket}.cos.${initDefault.region}.myqcloud.com`);

  this.getNewUrl = function (obj) {
    const params = Object.assign({}, defaultParams);
    Object.assign(params, obj);

    if (params.url && typeof params.url === "string") {
      url.pathname = new URL(params.url).pathname

      let search = `?${initDefault.key}`

      if (params.width && !params.height) {
        search += `/thumbnail/${params.width}x`
      }

      if (!params.width && params.height) {
        search += `/thumbnail/x${params.height}`
      }

      if (params.width && params.height) {
        search += `/crop/${params.width}x${params.height}`
      }

      if (params.gravity) {
        search += `/gravity/${gravity[params.gravity]}`
      }

      if (params.quality) {
        search += `/quality/${params.quality}`
      }

      if (params.format !== "auto") {
        search += `/format/${params.format}`
      }

      if (search) {  
        url.search = search
      }

      return url.toString();
    }
  }
}

module.exports = { Init, CryptographicInit, TencentInit };