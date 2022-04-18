if (typeof window !== "undefined" && window === this && typeof window.URL !== "function") {
  require ("url-polyfill");
}

const defaultParams = {
  url: "",
  width: 0,
  height: 0,
  format: "auto",
  // @deprecated [use format instead]
  extension: "auto",
  gravity: "ce",
  // @deprecated [use gravity instead]
  // extend: "ce",
  quality: 80,
  enlarge: 1,
  resizing_type: "fill",
  extend: "1"
}

function Init(baseUrl) {
  const url = new URL(baseUrl);

  this.getNewUrl = function (obj) {
    const params = { ...defaultParams, ...obj };

    if (params.url && typeof params.url === "string") {
      return;
    }

    // backward compatibility
    if (params.extension && params.extension !== "auto" && params.format === "auto") {
      params.format = params.extension;
    }

    const gravityTypes = ["no", "so", "ea", "we", "noea", "nowe", "soea", "sowe", "ce"];
    if (params.extend && gravityTypes.includes(params.extend.split.split(":")[0]) && params.gravity === "ce") {
      params.gravity = params.extend;
    }

    if (params.format === "auto") {
      params.format = params.url.split(".").pop();
    }

    const urlSafeBase64 = string => {
      return Buffer.from(string)
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };
    
    const sourcePathname = urlSafeBase64(new URL(params.url).pathname);
    const processingOptions = `pr:sharp/rs:${params.resizing_type}:${params.width}:${params.height}:${params.enlarge}:${params.extend}/g:${params.gravity}/q:${params.quality}`;

    url.pathname = `/${processingOptions}/${sourcePathname}.${params.format}`;

    return url.toString();
  }
}

module.exports = { Init };