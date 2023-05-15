function fetchData(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Failed to fetch data: ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => reject(new Error('Failed to fetch data'));
      xhr.send();
    });
  }

  function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request
}

function fazPost(urlPost){
    let request = new XMLHttpRequest();
    request.open("POST", urlPost);
    request.send();
    location.reload();
  }

  function fazPostBody(url, body){
    let request = new XMLHttpRequest();
    request.open("POST", url, true);
      request.setRequestHeader("Content-type", "application/json");
      request.onreadystatechange = function() {
          if (request.readyState === 4 && request.status === 200) {
              location.reload();
          }
      };
      request.send(body);
  }

  function fazPut(urlPut, body) {
    let request = new XMLHttpRequest();
    request.open("PUT", urlPut);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
      location.reload();
    });
    request.send(body);
  }
  
