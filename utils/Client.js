export const jsonParser = (res) => {
  if (res.status >= 200 && res.status <= 299) {
    return res.text().then((t) => {
      try {
        return JSON.parse(t);
      } catch (e) {
        return null;
      }
    });
  } else if (res.status === 401 || res.status === 403) {
    throw new Error("Acesso não autorizado.");
  } else {
    return res.text().then((t) => {
      throw new Error(t);
    });
  }
};

const secured = (url, params = {}) => {
  /* AsyncStorage.getItem(TOKEN_KEY).then((key) => {
    if (key !== null) {
      params.headers = Object.assign({}, params.headers, {
        Authorization: `Bearer ${key}`,
      });
    } */
  return fetch(baseUrl + url, params);
};

export const get = (url, params = {}) => {
  params.method = "GET";
  return secured(url, params);
};

export const del = (url, params = {}) => {
  params.method = "DELETE";
  return secured(url, params);
};

export const post = (url, params = {}) => {
  params.method = "POST";
  params.headers = Object.assign({}, params.headers, {
    "Content-Type": "application/json",
  });
  params.body = JSON.stringify(params.body);
  return secured(url, params);
};

export const put = (url, params = {}) => {
  params.method = "PUT";
  params.headers = Object.assign({}, params.headers, {
    "Content-Type": "application/json",
  });
  params.body = JSON.stringify(params.body);
  return secured(url, params);
};

export const form = (url, params = {}) => {
  params.method = "POST";
  params.headers = Object.assign({}, params.headers, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
  var pair = [];
  Object.entries(params.body).forEach(([k, v]) => pair.push(k + "=" + v));
  params.body = pair.join("&");
  return fetch(baseUrl + url, params);
};
