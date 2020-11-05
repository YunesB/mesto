export class Api {
    constructor({address, token, cohort}) {
        this._address = address;
        this._token = token;
        this._cohort = cohort;
    }
  
    getInitialCards() {
        return fetch(`${this._address}/${this._cohort}/cards`, 
        {
            headers: {
              authorization: this._token
            }
        })
        .then(res => {
              if (res.ok) {
                  return res.json();
              }
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        });
    }

    addCard(data) {
      return fetch(`${this._address}/${this._cohort}/cards`, {
          method: 'POST',
          headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: data.name,
              link: data.link
          }),
      })
      .then(res => {
          if(res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
          })
    }
}

    /*
    editInfoUser() {
        return fetch({
            url: this._url,
            headers: this._headers,
            body: this._body
        })
          .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        });
    }

    addNewCard(data) {
      return fetch(`${this._url}/${this._cohort}/cards`, {
          method: 'POST',
          headers: {
            authorization: this._token
          },
          body: JSON.stringify({
            name: data.name,
            link: data.link
          }),
      })
      .then(res => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(Ошибка: ${res.status});
    })
  }
}

  _fetchApi(url, method, additionalHeaders, body) {
    const fetchOptions = {
      method: method,
      headers: { ... this._headers, ...additionalHeaders },
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${url}`, fetchOptions).then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      });
  }

  //Операции с карточками
  getInitialsCards() {
    return this._fetchApi("/cards", "GET");
  }

  postCard(card) {
    return this._fetchApi("/cards", "POST", {"Content-Type": "application/json"}, card);
  }

  removeCard(cardId) {
    return this._fetchApi(`/cards/${cardId}`, "DELETE");
  }

  likeCard(cardId) {
    return this._fetchApi(`/cards/likes/${cardId}`, "PUT");
  }

  unlikeCard(cardId) {
    return this._fetchApi(`/cards/likes/${cardId}`, "DELETE");
  }

  //Операции с данными пользователя
  getUserInfo() {
    return this._fetchApi("/users/me", "GET");
  }

  editUserInfo(info) {
    return this._fetchApi("/users/me", "PATCH", {"Content-Type": "application/json"}, info);
  }

  editAvatar(link) {
    return this._fetchApi("/users/me/avatar", "PATCH", {"Content-Type": "application/json"}, {avatar: link});
  }
}

*/