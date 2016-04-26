import $ from 'jquery';

export function getAllBooleans(callback) {
  $.ajax({
      url: '/api/booleans/',
      dataType: 'json',
      cache: false,
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        callback([{name: "Matt", id: "2393", canFight: false}, {name: "Tom", id: "2394", canFight: true}]);
        // console.error('/api/booleans', status, err.toString());
      }
  });
}

export function getBoolean(id, callback) {
  $.ajax({
      url: '/api/boolean/' + id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        var bool = {name: "Matt",
          streaks: {wins: 2, losses: 1, streak: 1},
          stats: [{name: "strong", has: false}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
          alive: true};
        callback(bool);
        // console.error('/api/boolean/' + this.props.params.id, status, err.toString());
      }
  });
}

export function getMyBooleans(callback) {
  $.ajax({
      url: '/api/booleans/mine',
      dataType: 'json',
      cache: false,
      success: function(data) {
        callback(data)
      }.bind(this),
      error: function(xhr, status, err) {
        callback([{name: "Matt",
          id: "2393",
          streaks: {wins: 2, losses: 1, streak: 1},
          stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
          alive: true},
          {name: "Matt2",
            id: "2395",
            streaks: {wins: 2, losses: 1, streak: 1},
            stats: [{name: "strong", has: true}, {name: "happy", has: false}, {name: "smart", has: false}, {name: "a dank memer", has: true}],
            alive: true}]);
        // console.error('/api/booleans/mine', status, err.toString());
      }
  });
}
