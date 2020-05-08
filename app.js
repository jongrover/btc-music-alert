$(function () {

  var api = 'https://www.bitstamp.net/api/ticker/',
      checkInterval = 200, // in milliseconds (max requests 800 requests per minute)
      livePrice = 0.00,
      $livePrice = $('#live-price'),
      liveOpen = 0.00,
      $liveOpen = $('#live-open'),
      liveHigh = 0.00,
      $liveHigh = $('#live-high'),
      liveLow = 0.00,
      $liveLow = $('#live-low'),
      liveVol = 0.00,
      $liveVol = $('#live-vol'),
      $audio1 = $('#alert-1').find('audio'),
      $audio2 = $('#alert-2').find('audio'),
      $audio3 = $('#alert-3').find('audio'),
      trigger1 = '', trigger2 = '', trigger3 = '',
      opt1 = '', opt2 = '', opt3 = '',
      active = false;

  function checkAlert() {
    if (trigger1 !== '' && opt1 !== '') {
      if (opt1 === 'greater') {
        if (livePrice >= trigger1) {
          $audio1[0].play();
          $audio1.parent().addClass('triggered');
          console.log('alert 1 triggered: price greater than $'+trigger1);
        }
      } else {
        if (livePrice <= trigger1) {
          $audio1[0].play();
          $audio1.parent().addClass('triggered');
          console.log('alert 1 triggered: price less than $'+trigger1);
        }
      }
    }
    if (trigger2 !== '' && opt2 !== '') {
      if (opt2 === 'greater') {
        if (livePrice >= trigger2) {
          $audio2[0].play();
          $audio2.parent().addClass('triggered');
          console.log('alert 2 triggered: price greater than $'+trigger2);
        }
      } else {
        if (livePrice <= trigger2) {
          $audio2[0].play();
          $audio2.parent().addClass('triggered');
          console.log('alert 2 triggered: price less than $'+trigger2);
        }
      }
    }
    if (trigger3 !== '' && opt3 !== '') {
      if (opt3 === 'greater') {
        if (livePrice >= trigger3) {
          $audio3[0].play();
          $audio3.parent().addClass('triggered');
          console.log('alert 3 triggered: price greater than $'+trigger3);
        }
      } else {
        if (livePrice <= trigger3) {
          $audio3[0].play();
          $audio3.parent().addClass('triggered');
          console.log('alert 3 triggered: price less than $'+trigger3);
        }
      }
    }
  }

  function upDatePrice() {
    $.ajax({
      url: api,
      type: 'post',
      success: function (data){
       livePrice = parseFloat(data.last);
       liveOpen = parseFloat(data.open);
       liveHigh = parseFloat(data.high);
       liveLow = parseFloat(data.low);
       liveVol = parseFloat(data.volume);
       $livePrice.text(livePrice);
       $liveOpen.text(liveOpen);
       $liveHigh.text(liveHigh);
       $liveLow.text(liveLow);
       $liveVol.text(liveVol);
       //console.log('price updated to: $'+livePrice);
       if (active) {
         checkAlert();
       }
      },
      complete:function(data){
       setTimeout(upDatePrice, checkInterval);
      }
     });
  }
  upDatePrice();

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
    $parent.removeClass('triggered');
    $audio[0].pause();
    $audio[0].currentTime = 0;
    if (id == 'alert-1') {
      trigger1 = parseFloat($price.val());
      opt1 = $opt.val();
      $optChoice.text(opt1+' than');
      $alertPrice.text(trigger1);
    } else if (id == 'alert-2') {
      trigger2 = parseFloat($price.val());
      opt2 = $opt.val();
      $optChoice.text(opt2+' than');
      $alertPrice.text(trigger2);
    } else if (id == 'alert-3') {
      trigger3 = parseFloat($price.val());
      opt3 = $opt.val();
      $optChoice.text(opt3+' than');
      $alertPrice.text(trigger3);
    }
    active = true;
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
    $parent.removeClass('triggered');
    $price.val('');
    if (id === 'alert-1') {
      trigger1 = '';
      opt1 = '';
      console.log('clear alert 1!');
    } else if (id === 'alert-2') {
      trigger2 = '';
      opt2 = '';
      console.log('clear alert 2!');
    } else if (id === 'alert-3') {
      trigger3 = '';
      opt3 = '';
      console.log('clear alert 3!');
    }
    $optChoice.text('...');
    $alertPrice.text('...');
  });

});
