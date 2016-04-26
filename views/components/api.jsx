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
  get('/api/booleans', callback, [{name: "Matt", id: "2393", canFight: false}, {name: "Tom", id: "2394", canFight: true}]);
}

export function getBoolean(id, callback) {
  var bool = {name: "Matt",
    streaks: {wins: 2, losses: 1, streak: 1},
    stats: [{name: "strong", has: false}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
    alive: true};

  get('/api/boolean/' + id, callback, bool);
}

export function getMyBooleans(callback) {
  var dummy = [{name: "Matt",
    id: "2393",
    streaks: {wins: 2, losses: 1, streak: 1},
    stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
    alive: true},
    {name: "Matt2",
      id: "2395",
      streaks: {wins: 2, losses: 1, streak: 1},
      stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
      alive: true}];

  get('/api/booleans/mine', callback, dummy);
}

export function createBoolean(name) {
  $.ajax({
      url: '/api/createBoolean/' + name
  });
}
