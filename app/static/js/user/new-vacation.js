/* jshint unused:false, camelcase:false */
/* global AmCharts:true, google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addVacation);
  });

  function addVacation(e){
    var lat = $('input[name=lat]').val();

    if(!lat){
      var name = $('input[name=name]').val();
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: address}, function(results, status){
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      var name = results[0].formatted_address,
          lat = results[0].geometry.location.lat(),
          lng = results[0].geometry.location.lng();
      console.log(lat, lng, name);
      $('input[name=name]').val(name);
      $('input[name=lat]').val(lat);
      $('input[name=lng]').val(lng);

      // var data = $('form').serialize();
      // console.log(data);

      $('form').submit();

    });
  }
})();
