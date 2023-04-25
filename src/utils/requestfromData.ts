export const requestFormData = (
    urlPath: string,
    params: { [key: string]: any }
  ) => {
    const method = 'POST';
    const path = `${window.config.API_URL}${urlPath}`;

 
    const bodyParams = new FormData();
    Object.keys(params).forEach((v) => {
      bodyParams.append(v, params[v]);
    });
    return fetch(path, {
      method,
      body: bodyParams,
    }).then((result) => result.json());
  };