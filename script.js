//webform
const form = document.getElementById('form');
const result = document.getElementById('result');
//insta
const endpoint = "https://api.instagram.com/oauth/access_token"
const code = 'AQAfOFyXaAnWriDzRE4MlES3cbkkck5WnlUiIESVyxTTnZmkrx0V5-Iqi1lOQv5rA--L7ncUaNY8fOOLLg9YfTPg84ZbvXOCxLnct45lUShuxkSIrIGYwDLW99PaUuX2kBVNI-5oUMbPBIeuS2MHWGXRk9S-3bryUtOT9wo5v31qsSWkJE8jCsQ8WoAQdLrXpXeMzPxmzVSixYK1V2RaDOweKEZFfqTIY_S6YN2Cny-4aA';
const id_c = '525413989187648';
const secret_c = 'd3bbe5ccf4385bc0d7aa1a61b8042890';
const redirect_url = 'https://www.racing.stewielab.it/';
const endpoint_media = 'https://graph.instagram.com/me/';

let usr_id;
let access_tk;

//script webform
form.addEventListener('submit', function(e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

  fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function() {
      form.reset();

      setTimeout(() => {
        result.style.display = "none";

      }, 3000);

    });
});

function off_modale(event) {
  const key = event.key;
  if (key === "Escape") {
    const article = document.querySelector("#modale");
    article.classList.remove("modale");
    article.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }
}
//html
function close_menu(event) {
  const key = event.key;
  if (key === "Escape") {
    const container_menu = document.querySelector("#container_menu");
    container_menu.classList.remove("modale");
    container_menu.classList.add("hidden");
  }
}
//fine html
function modale() {
  const article = document.querySelector("#modale");
  article.classList.remove("hidden");
  article.classList.add("modale");
  document.body.classList.add("no-scroll");
  window.addEventListener('keydown', off_modale);
  const event={
    key:"Escape",
  };
  close_menu(event);

}

//script insta
function onResponse(response) {
  return response.json();
}

function onJsonMedia(json) {
  const container = document.querySelector('.feed');
  const len = 6;
  if (json.length < 6) {
    len = json.length;
  }
  for (let i = 0; i < len; i++) {
    if (json.data[i].media_type === 'VIDEO') {
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = json.data[i].thumbnail_url;
      div.appendChild(img);
      container.appendChild(div);
    } else {
      const div = document.createElement('div');
      const img = document.createElement('img');
      img.src = json.data[i].media_url;
      div.appendChild(img);
      container.appendChild(div);
    }
  }
}

function onJson(json) {
  usr_id = json.user_id;
  access_tk = json.access_token;
  let url_media = endpoint_media + 'media?fields=media_type,thumbnail_url,media_url&access_token=' + access_tk;
  fetch(url_media).then(onResponse).then(onJsonMedia);
}

fetch(endpoint, {
  method: 'POST',
  body: 'client_id=' + id_c + '&client_secret=' + secret_c + '&grant_type=authorization_code&redirect_uri=' + redirect_url + '&code=' + code,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}).then(onResponse).then(onJson);

// webform
const collab_prev = document.querySelector("#collab_prev1");
collab_prev.addEventListener('click', modale);
//html

function open_menu() {
  const container_menu = document.querySelector("#container_menu");
  container_menu.classList.remove("hidden");
  container_menu.classList.add("modale");
  document.body.classList.add("no-scroll");
  window.addEventListener('keydown', close_menu);
  const collab_prev1 = document.querySelector("#collab_prev");
  collab_prev1.addEventListener('click', modale);
}
const menu = document.querySelector(".option");
menu.addEventListener('click', open_menu);
