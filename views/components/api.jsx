import $ from 'jquery';

function get(url, callback) {
  $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
  });
}

export function getAllBooleans(callback) {
  get('/api/booleans', callback);
}

export function getBoolean(id, callback) {
  get('/api/boolean/' + id, callback);
}

export function getMyBooleans(callback) {
  get('/api/booleans/mine', callback);
}

export function getFightResult(id1, id2, callback) {
  get('/api/fight-result/' + id1 + '/' + id2, callback);
}

export function createBoolean(name, callback) {
  get('/api/createBoolean/' + name, callback);
}

export function deleteBoolean(id, callback) {
  get('/api/boolean/delete/' + id, callback);
}

export function killBoolean(id, callback) {
  get('/api/boolean/kill/' + id, callback);
}
