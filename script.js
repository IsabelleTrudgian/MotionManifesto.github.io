/* GAME */

var floor = 4;
var step = 0;
var empty = {'left':floor,'top':1};
var container = $('#game .canvas');

function init()
{
  for(let t=1;t<=floor;t++) {
    for(let l=1;l<=floor;l++) {
      if (t == empty.top && l == empty.left)
        continue; /*skip is last position. used as empty position*/

      /*create object and set attribute	*/
      let width = 100 / floor;
      let pos = ((t - 1) * floor) + l;
      let obj = $('<div class="tile" style="width:' + width + '%;height:' + width + '%;" onClick="swap(this);check();">' + pos + '</div>');
      obj.attr('origin-left',l).attr('origin-top',t).attr('pos-left',l).attr('pos-top',t);

      /*display as image*/
      obj.css('background-image','url(ScreenSaver_Square.gif)')
        .css('background-size',(floor * 100) + '% ' + (floor * 100) + '%')
        .css('background-position',((100 / (floor - 1)) * (l - 1)) + '% ' + ((100 / (floor - 1)) * (t - 1)) + '%');

      container.append(obj);
    }
  }

  redraw();

  /*reshufle floor * 200 times*/
  for(let i=1;i<=floor * 500;i++)
    reshuffle();
}

function redraw()
{
  container.find('.tile').each(function() {
    let top = parseInt($(this).attr('pos-top')) - 1;
    let left = parseInt($(this).attr('pos-left')) - 1;

    /*set css position*/
    $(this).css('top', (100 / floor * top) + '%').css('left',(100 / floor * left) + '%');
  });
}

function reshuffle()
{
  let rands = [];
  if (empty.top > 1)
    rands.push([empty.top - 1, empty.left]); /*go up*/
  if (empty.top < floor)
    rands.push([empty.top + 1, empty.left]); /*go down*/
  if (empty.left > 1)
    rands.push([empty.top, empty.left - 1]); /*go left*/
  if (empty.left < floor)
    rands.push([empty.top, empty.left + 1]); /*go right*/

  /*generate random*/
  let rand = rands[Math.round(Math.random(rands.length))];

  /*swap*/
  swap($('.tile[pos-top=' + rand[0] + '][pos-left=' + rand[1] + ']'));
}

function swap(obj)
{
  let j = $(obj);
  let top = parseInt(j.attr('pos-top'));
  let left = parseInt(j.attr('pos-left'));

  if (
    (top == empty.top && left == empty.left - 1) /*if on left*/
    || (top == empty.top && left == empty.left + 1) /*if on right*/
    || (top == empty.top - 1 && left == empty.left) /*if on top*/
    || (top == empty.top + 1 && left == empty.left) /*if on bottom*/
  ) {
    /*swap element <> empty position*/
    j.attr('pos-top',empty.top);
    j.attr('pos-left',empty.left);

    empty.top = top;
    empty.left = left;

    redraw();
  }
}

function check()
{
  step += 1;
  var onPos = 0;

  container.find('.tile').each(function() {
    let originTop = parseInt($(this).attr('origin-top'));
    let originLeft = parseInt($(this).attr('origin-left'));

    let posTop = parseInt($(this).attr('pos-top'));
    let posLeft = parseInt($(this).attr('pos-left'));

    if (originTop == posTop && originLeft == posLeft)
      onPos++;
  });
  if (onPos == (floor * floor) - 1) {
    setTimeout(function() {
      alert('CONGRATS' + step + ' langkah');
    }, 350);
  }
}

init();

/*SCROLL*/

$('a[href^="#"]').click(function(event) {
		var id = $(this).attr("href");
		var target = $(id).offset().top;
		$('html, body').animate({scrollTop:target}, 200);
		event.preventDefault();
	});

function getTargetTop(elem){
	var id = elem.attr("href");
	var offset = 60;
	return $(id).offset().top - offset;
}


	$(window).scroll(function(e){
		isSelected($(window).scrollTop())
	});

var sections = $('a[href^="#"]');

function isSelected(scrolledTo){
   
	var threshold = 100;
	var i;

	for (i = 0; i < sections.length; i++) {
		var section = $(sections[i]);
		var target = getTargetTop(section);
	   
		if (scrolledTo > target - threshold && scrolledTo < target + threshold) {
			sections.removeClass("active");
			section.addClass("active");
		}

	};
}

/*STICK*/

const gnbArea = document.querySelector('.gnb_area') ; 
	const gnbTop = gnbArea.getBoundingClientRect().top ; 

	window.addEventListener('scroll', function() {
		console.log( window.scrollY )
		if ( 2050 < window.scrollY ) {
			gnbArea.classList.add('fixed');
		} else {
			gnbArea.classList.remove('fixed');
		} 
	}) ;

/* END STICK*/

/* INVERT */

            const body = document.querySelector("html"),
toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => toggle.classList.toggle("active"));
            
            toggle.addEventListener("click", () => {body.classList.toggle("dark");})

/* INVERT END*/
