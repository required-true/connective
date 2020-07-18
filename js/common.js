$(document).ready(function(){
  headerEffect(); //헤더 메뉴영역 효과
  topBtnEffect(); // 위로 가기 탑버튼 효과
})

function headerEffect(){
  var $mainMenu=$('.mainmenu_list').children().children('a');
  var $subMenuBg=$('<div class="submenu_bg"></div>');
  var $menuBar=$('<div class="submenu_bar"></div>');
  var $subMenu=$('.submenu_list');
  var menuWidth=$mainMenu.innerWidth();
  var navLeft=$(".mainmenu").offset().left;
  var menuIndex;

  // 이벤트
  $mainMenu.on('mouseenter focus',overMenu); //메인메뉴 오버시, 접근성 포커스 이벤트
  $('#header_wrap').on('mouseleave',outMenu); // 메인메뉴 아웃시 이벤트
  $subMenu.children().children('a').last().on('focusout',outMenu); // 접근성 마지막 포커스아웃시 이벤트

  // 함수
  function overMenu(){ //메인메뉴 오버시 실행함수
    menuIndex=$mainMenu.index($(this));
    showSubMenu(menuIndex)
  }
  function outMenu(){ //메인메뉴 아웃시 실행함수
    $menuBar.css({'left':0}).remove();
    $subMenu.css({'left':200}).hide();
    $('.submenu_bg').remove();
  }
  function showSubMenu(menuIndex){ //서브메뉴 활성화 실행함수
    $subMenuBg.appendTo('#header_wrap');
    $menuBar.appendTo('#header_wrap');
    $menuBar.stop().animate({"left":navLeft+(menuWidth*menuIndex)+(20*menuIndex)},300,"easeOutCubic")
    $('.submenu_bg').hide();
    $subMenu.hide();
    if(menuIndex===2){
      $('.submenu_bg').show();
      $subMenu.show().stop().animate({'left':0,'opacity':1},300,'easeOutCubic')
    }
  }
}
function topBtnEffect(){
	var progressPath = document.querySelector('.progress-wrap path');
	var pathLength = progressPath.getTotalLength();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
	progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	progressPath.style.strokeDashoffset = pathLength;
	progressPath.getBoundingClientRect();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
	var updateProgress = function () {
		var scroll = $(window).scrollTop();
		var height = $(document).height() - $(window).height();
		var progress = pathLength - (scroll * pathLength / height);
		progressPath.style.strokeDashoffset = progress;
	}
	updateProgress();
	$(window).scroll(updateProgress);	
	var offset = 50;
	var duration = 550;
	jQuery(window).on('scroll', function() {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.progress-wrap').addClass('active-progress');
		} else {
			jQuery('.progress-wrap').removeClass('active-progress');
		}
	});				
	jQuery('.progress-wrap').on('click', function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	})
}