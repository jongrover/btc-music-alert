$(function () {

  var bitstamp_btcusd = 'https://www.bitstamp.net/api/ticker/',
      bitstamp_btceur = 'https://www.bitstamp.net/api/v2/ticker/btceur',
      bitstamp_xrpusd = 'https://www.bitstamp.net/api/v2/ticker/xrpusd',
      bitstamp_xrpeur = 'https://www.bitstamp.net/api/v2/ticker/xrpeur',
      bitstamp_ltcusd = 'https://www.bitstamp.net/api/v2/ticker/ltcusd',
      bitstamp_ltceur = 'https://www.bitstamp.net/api/v2/ticker/ltceur',
      bitstamp_ethusd = 'https://www.bitstamp.net/api/v2/ticker/ethusd',
      bitstamp_etheur = 'https://www.bitstamp.net/api/v2/ticker/etheur',
      bitstamp_bchusd = 'https://www.bitstamp.net/api/v2/ticker/bchusd',
      bitstamp_bcheur = 'https://www.bitstamp.net/api/v2/ticker/bcheur',
      mercado_btcbrl = 'https://www.mercadobitcoin.net/api/BTC/ticker/',
      mercado_xrpbrl = 'https://www.mercadobitcoin.net/api/XRP/ticker/',
      mercado_ltcbrl = 'https://www.mercadobitcoin.net/api/LTC/ticker/',
      mercado_ethbrl = 'https://www.mercadobitcoin.net/api/ETH/ticker/',
      mercado_bchbrl = 'https://www.mercadobitcoin.net/api/BCH/ticker/',
      api = bitstamp_btcusd,
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
      livePer = 0.0,
      $livePer = $('#live-per'),
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

  function bitstampSuccess(data) {
    //console.log(data);
    livePrice = currency(parseFloat(data.last));
    liveOpen = currency(parseFloat(data.open));
    liveHigh = currency(parseFloat(data.high));
    liveLow = currency(parseFloat(data.low));
    liveVol = parseFloat(data.volume);
    livePer = Math.round((((livePrice - liveOpen)/liveOpen)*100)*100)/100;
    $livePrice.text(livePrice);
    $liveOpen.text(liveOpen);
    $liveHigh.text(liveHigh);
    $liveLow.text(liveLow);
    $liveVol.text(liveVol);
    $livePer.text(livePer);
    if (livePer >= 0) {
      $livePer.addClass('stat');
      $livePer.removeClass('neg-stat');
    } else {
      $livePer.addClass('neg-stat');
      $livePer.removeClass('stat');
    }
    if (active) {
      checkAlert();
    }
  }

  function mercadoSuccess(data) {
    //console.log(data);
    livePrice = currency(parseFloat(data.ticker.last));
    liveOpen = currency(parseFloat(data.ticker.open));
    liveHigh = currency(parseFloat(data.ticker.high));
    liveLow = currency(parseFloat(data.ticker.low));
    liveVol = parseFloat(data.ticker.vol);
    livePer = Math.round((((livePrice - liveOpen)/liveOpen)*100)*100)/100;
    $livePrice.text(livePrice);
    $liveOpen.text(liveOpen);
    $liveHigh.text(liveHigh);
    $liveLow.text(liveLow);
    $liveVol.text(liveVol);
    $livePer.text(livePer);
    if (livePer >= 0) {
      $livePer.addClass('stat');
      $livePer.removeClass('neg-stat');
    } else {
      $livePer.addClass('neg-stat');
      $livePer.removeClass('stat');
    }
    if (active) {
      checkAlert();
    }
  }

  function updatePrice() {
    switch(api) {
      //-----------------------------BTC
      case bitstamp_btcusd:
        $.ajax({
          url: bitstamp_btcusd,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case bitstamp_btceur:
        $.ajax({
          url: bitstamp_btceur,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case mercado_btcbrl:
        $.ajax({
          url: mercado_btcbrl,
          type: 'get',
          dataType: 'json',
          success: mercadoSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      //-----------------------------XRP
      case bitstamp_xrpusd:
        $.ajax({
          url: bitstamp_xrpusd,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case bitstamp_xrpeur:
        $.ajax({
          url: bitstamp_xrpeur,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case mercado_xrpbrl:
        $.ajax({
          url: mercado_xrpbrl,
          type: 'get',
          dataType: 'json',
          success: mercadoSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      //-----------------------------LTC
      case bitstamp_ltcusd:
        $.ajax({
          url: bitstamp_ltcusd,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case bitstamp_ltceur:
        $.ajax({
          url: bitstamp_ltceur,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case mercado_ltcbrl:
        $.ajax({
          url: mercado_ltcbrl,
          type: 'get',
          dataType: 'json',
          success: mercadoSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      //-----------------------------ETH
      case bitstamp_ethusd:
        $.ajax({
          url: bitstamp_ethusd,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case bitstamp_etheur:
        $.ajax({
          url: bitstamp_etheur,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case mercado_ethbrl:
        $.ajax({
          url: mercado_ethbrl,
          type: 'get',
          dataType: 'json',
          success: mercadoSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      //-----------------------------BCH
      case bitstamp_bchusd:
        $.ajax({
          url: bitstamp_bchusd,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case bitstamp_bcheur:
        $.ajax({
          url: bitstamp_bcheur,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      case mercado_bchbrl:
        $.ajax({
          url: mercado_bchbrl,
          type: 'get',
          dataType: 'json',
          success: mercadoSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
        break;
      //-----------------------------Default: BTCUSD
      default:
        $.ajax({
          url: bitstamp_btcusd,
          type: 'post',
          dataType: 'json',
          success: bitstampSuccess,
          complete:function (data) {
           setTimeout(updatePrice, checkInterval);
          }
        });
      }
    }
  updatePrice();

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

  $('#trading-pair').change(function () {
    var choice = $(this).val();
    switch (choice) {
      case 'BTCUSD':
        api = bitstamp_btcusd;
        break;
      case 'BTCEUR':
        api = bitstamp_btceur;
        break;
      case 'BTCBRL':
        api = mercado_btcbrl;
        break;
      case 'XRPUSD':
        api = bitstamp_xrpusd;
        break;
      case 'XRPEUR':
        api = bitstamp_xrpeur;
        break;
      case 'XRPBRL':
        api = mercado_xrpbrl;
        break;
      case 'LTCUSD':
        api = bitstamp_ltcusd;
        break;
      case 'LTCEUR':
        api = bitstamp_ltceur;
        break;
      case 'LTCBRL':
        api = mercado_ltcbrl;
        break;
      case 'ETHUSD':
        api = bitstamp_ethusd;
        break;
      case 'ETHEUR':
        api = bitstamp_etheur;
        break;
      case 'ETHBRL':
        api = mercado_ethbrl;
        break;
      case 'BCHUSD':
        api = bitstamp_bchusd;
        break;
      case 'BCHEUR':
        api = bitstamp_bcheur;
        break;
      case 'BCHBRL':
        api = mercado_bchbrl;
        break;
      default:
        api = bitstamp_btcusd;
    }
  });

});
