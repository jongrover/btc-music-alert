$(function () {

var api = 'https://www.bitstamp.net/api/ticker/',
    checkInterval = 1000; // milliseconds (max requests 800 requests per minute)

  function checkPriceAlert1() {
    var $parent = $('#alert-1'),
        $currPrice = $('#current-price'),
        $audio = $parent.find('audio'),
        option = $parent.data('opt'),
        trigger = parseFloat($parent.data('trigger'));
    $.ajax({
      url: api,
      type: 'post',
      success: function (data){
       var currPrice = parseFloat(data.last);
       $currPrice.text(currPrice);
       if (option == 'greater') {
         if (currPrice >= trigger) {
           console.log('Price greater than your alert!');
           $audio[0].play();
         }
       } else {
         if (currPrice <= trigger) {
           console.log('Price less than your alert!');
           $audio[0].play();
         }
       }
      },
      complete:function(data){
       setTimeout(checkPriceAlert1, checkInterval);
      }
     });
  }

  function checkPriceAlert2() {
    var $parent = $('#alert-2'),
        $currPrice = $('#current-price'),
        $audio = $parent.find('audio'),
        option = $parent.data('opt'),
        trigger = parseFloat($parent.data('trigger'));
    $.ajax({
      url: api,
      type: 'post',
      success: function (data){
       var currPrice = parseFloat(data.last);
       $currPrice.text(currPrice);
       if (option == 'greater') {
         if (currPrice >= trigger) {
           console.log('Price greater than your alert!');
           $audio[0].play();
         }
       } else {
         if (currPrice <= trigger) {
           console.log('Price less than your alert!');
           $audio[0].play();
         }
       }
      },
      complete:function(data){
       setTimeout(checkPriceAlert2, checkInterval);
      }
     });
  }

  $('form').submit(function (event) {
    event.preventDefault();
    var $form = $(this),
        $parent = $form.parent(),
        id = $parent.attr('id'),
        $audio = $parent.find('audio'),
        $price = $form.find('.price'),
        $opt = $form.find('.opt'),
        $optChoice = $parent.find('.opt-choice'),
        $alertPrice = $parent.find('.alert-price');
    $audio[0].pause();
    $audio[0].currentTime = 0;
    $parent.data('trigger', $price.val());
    $parent.data('opt', $opt.val());
    $optChoice.text($parent.data('opt')+' than');
    $alertPrice.text($parent.data('trigger'));
    if (id == 'alert-1') {
      checkPriceAlert1();
    } else {
      checkPriceAlert2();
    }
  });

  $('.clear').click(function (event) {
    event.preventDefault();
    $form = $(this).parent();
    $parent = $form.parent();
    id = $parent.attr('id'),
    $audio = $parent.find('audio'),
    $price = $form.find('.price'),
    $optChoice = $parent.find('.opt-choice'),
    $alertPrice = $parent.find('.alert-price');
    $audio[0].pause();
    $audio[0].currentTime = 0;
    $price.val('');
    $parent.data('trigger', '');
    $parent.data('opt', '');
    $optChoice.text('');
    $alertPrice.text('0.00');
  });

});
