if (typeof window !== "undefined" && window === this && typeof window.URL !== "function") {
  require ("url-polyfill");
}

const defaultParams = {
  url: "",
  width: 0,
  height: 0,
  extension: "auto",
  extend: "ce",
  quality: 80,
  enlarge: 1,
  resizing_type: "fill"
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
      if (params.extension === "auto") {
        params.extension = params.url.split(".").pop();
      }

      const sourcePathname = urlSafeBase64(new URL(params.url).pathname);
      const processingOptions = `pr:sharp/rs:${params.resizing_type}:${params.width}:${params.height}:${params.enlarge}/g:${params.extend}/q:${params.quality}`;

      url.pathname = `/${processingOptions}/${sourcePathname}.${params.extension}`;

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
      if (params.extension === "auto") {
        params.extension = params.url.split(".").pop();
      }

      const sourcePathname = new URL(params.url).pathname;
      const encodedSourceUrl = urlSafeBase64(sourcePathname);

      const processingOptions = `rs:${params.resizing_type}:${params.width}:${params.height}:${params.enlarge}/g:${params.extend}/q:${params.quality}`;

      const target = `/${processingOptions}/${encodedSourceUrl}.${params.extension}`;
      const signature = sign(
        initDefault.salt,
        target,
        initDefault.key
      );

      const url = new URL(initDefault.baseUrl);
      url.pathname = `/${signature}/${processingOptions}/${encodedSourceUrl}.${params.extension}`;
      const result = url.toString();

      return result;
    }
  }
}

module.exports = { Init, CryptographicInit };