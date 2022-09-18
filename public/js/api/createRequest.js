/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';
    let queryParams = '';
    
    if (options.data) {
        if (options.method === 'GET') {
            queryParams = '?' + Object.entries(options.data).map(
                ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&');
        } else {
            Object.entries(options.data).forEach(v => formData.append(...v));
        }
    }

if (options.callback) {
    xhr.onload = () => {
        let err = null;
        let resp = null; 

        try {
          if(xhr.response?.success) {
            resp = xhr.response;
          } else {
            err = xhr.response;
          }
        } catch (e) {
            err = e;
          } 
            
        options.callback(err, resp);
    };
    xhr.onerror = () => { 
    options.callback(xhr.statusText, null);
      };

};
  
  xhr.open(options.method, options.url + queryParams);
  xhr.send(formData);

};