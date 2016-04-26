import $ from 'jquery';

export function getAuth(callback) {
  $.ajax({
      url: '/auth/isAuthenticated/',
      dataType: 'json',
      cache: false,
      data: {userId: 0},
      success: function(data) {
        callback(data.auth);
      },
      error: function(xhr, status, err) {
        console.error('/auth/isAuthenticated', status, err.toString());
      }
  });
}
