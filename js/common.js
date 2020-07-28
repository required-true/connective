$(document).ready(function(){
  headerEffect(); //헤더 메뉴영역 효과
  openLangWrap(); // 언어메뉴 클릭시 언어선택영역 열기
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


function openLangWrap(){
  var langBtn=$('.global_lang').children('a');
  var langCloseBtn=$('.lang_close_btn')
  // 이벤트
  langBtn.on('click',openLangWrap);
  langCloseBtn.on('click',closeLangWrap);
  // 함수
  function openLangWrap(){
    $('body').css({'overflow':'hidden'})
    $('.lang_wrap').css({'display':'block'});
  }
  function closeLangWrap(){
    $('.lang_wrap').css({'display':'none'});
    $('body').css({'overflow':'inherit'})
  }
}