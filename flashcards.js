jQuery(function ($) {
  function shuffle(array) { // Fisher-Yates algorithm
    var i = array.length;
    if (i == 0) return false;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var tempi = array[i];
      var tempj = array[j];
      array[i] = tempj;
      array[j] = tempi;
    }
  }
  
  var cards = [];
  var headings = [];
  $("table").each(function (t, table) {
    $(this).addClass("hidden");
    $(table).find("thead tr:first-child th").each(function () {
      headings.push($(this).text());
    });
    $("tbody tr", table).each(function (n) {
      var card = {};
      card["number"] = n + 1;
      for (var i=0; i<headings.length; i++)
        card[headings[i]] = $(this).find("td:eq(" + i + ")").text();
      cards.push(card);
    });
  });
  shuffle(cards);
  
  var $card = $(".card").removeClass("hidden");
  var $text = $(".text", $card);
  var $label = $(".label", $card);
  
  var index = -1;
  var update = function update() {
    if (index < 0) {
      index = -1;
      $label.text("Start");
      $text.html($("#instructions").html());
      return;
    }
	console.log(index)
	console.log(headings.length)
    var c = Math.floor(index / headings.length);
    var h = headings[index % headings.length];
    $label.text("Card " + (c + 1) + " of " + cards.length + " - " + h);
    $("#completed").html("<span style='width: " + 100 * ((c + 1) / cards.length) + "%'></span>");
    $text.text(cards[c][h]);
  };
  var forward = function forward() {
    index++;
    if (index >= cards.length * headings.length) index = -1;
    update();
  };
  var back = function back() {
    index--;
    if (index < -1) index = cards.length * headings.length - 1;
    update();
  };
  
  $(document).keydown(function (e) {
    if (e.which == 32 || e.which == 39) {
      forward();
      return false;
    }
    if (e.which == 37 || e.which == 8) {
      back();
      return false;
    }
  });
  {
    $card.click(function (e) {
      if (e.clientX - $card.offset().left > $card.width() / 2) {
        forward();
      } else {
        back();
      }
      return false;
    });
    $("#completed").click( function(e)
             { 
               var parentOffset = $(this).parent().offset(); 
               //or $(this).offset(); if you really just want the current element's offset
               var relX = e.pageX - parentOffset.left;
               var relY = e.pageY - parentOffset.top;
               var x = e.pageX - this.offsetLeft;
               var y = e.pageY - this.offsetTop;
              alert(x);
                           
             }
        );
  }
  update();
  $(window).load(function () {
    setTimeout(function () { window.scrollTo(0, 1); }, 0);
  });
});
