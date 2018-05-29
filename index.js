function footerAlign() {
  $('footer').css('display', 'block');
  $('footer').css('height', 'auto');
  const footerHeight = $('footer').outerHeight();
  $('body').css('padding-bottom', footerHeight);
  $('footer').css('height', footerHeight);
}
/**
 *
 *This function displays the streamers that are currently live.
 * @param {any} live
 * @returns
 */
function dispLive(live) {
  let livht = '';
  for (let i = 0; i < live.length; i++) {
    livht += `<div class="box text-center live"><a href="${
      live[i].url
    }" target = "_blank"><h3>${live[i].name}</h3></a><h4>Game: ${
      live[i].game
    }<br>Viewers: ${String(live[i].viewers)}<br>Online</h4></div>`;
  }
  return livht;
}
/**
 *
 * This function displays the streamers that are currently offline.
 * @param {any} offline
 * @returns
 */
function dispOff(offline) {
  let offht = '';
  for (let i = 0; i < offline.length; i++) {
    offht += `<div class="box text-center offline"><a href="${
      offline[i].url
    }" target = "_blank"><h3>${offline[i].name}</h3></a><p>Offline</p></div>`;
  }
  return offht;
}
/**
 *
 * This class is what makes up each streamer.
 * @class Stream
 */
class Stream {
  constructor(name, url, status, game, viewers) {
    // Change this constructor
    this.name = name;
    this.url = url;
    this.status = status;
    this.game = game;
    this.viewers = viewers;
  }
}

$(document).ready(() => {
  footerAlign();
  $('#option-one').prop('checked', 'checked');
  const live = [];
  const offline = [];
  let html = '';
  const streamArr = [
    'Oroboro',
    'Bustin',
    'freecodecamp',
    'Mightmouseufc125',
    'JonjonTV',
    'TheHaleyBaby',
    'summit1g',
    'FeverReaver',
    'Tansrue',
    'ExcessiveProfanity',
    'Bajheera',
    'sodapoppin'
  ];

  const Output = [];

  for (let i = 0; i < streamArr.length; i++) {
    const link = `https://wind-bow.gomix.me/twitch-api/streams/${
      streamArr[i]
    }?callback=?`;
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: link,
      async: false,
      contentType: 'application/json; charset=utf-8',
      success(data) {
        const name = data._links.channel.slice(38);
        const url = `https://www.twitch.tv/${name}`;

        if (data.stream == null) {
          var status = 'Offline';
        } else {
          var status = 'Live';
        }
        if (status == 'Live') {
          var game = data.stream.game;
          var viewers = data.stream.viewers;
        }
        const strm = new Stream(name, url, status, game, viewers);
        Output.push(strm);
      }
    });
  }
  $(document).ajaxStop(() => {
    for (let i = 0; i < Output.length; i++) {
      if (Output[i].status === 'Live') {
        live.push(Output[i]);
      } else {
        offline.push(Output[i]);
      }
    }

    const Hlive = dispLive(live);
    const Olive = dispOff(offline);

    html += Hlive + Olive;
    $('#strmbox').html(html);
  });
  $('#option-one').click(() => {
    const Hlive = dispLive(live);
    const Olive = dispOff(offline);

    html = Hlive + Olive;
    $('#strmbox').html(html);
  });
  $('#option-two').click(() => {
    const Hlive = dispLive(live);
    html = Hlive;
    $('#strmbox').html(html);
  });
  $('#option-three').click(() => {
    const Olive = dispOff(offline);

    html = Olive;
    $('#strmbox').html(html);
  });
});
