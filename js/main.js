$(document).ready(function(){
  mainVisualEffect(); // 메인비주얼영역 슬라이드 효과
  searchDatePicker(); // 서치영역 달력효과
  connectboxEffect(); // 커넥트박스영역 슬라이드 효과
  resultCountEffect(); // 성과영역 카운트효과
  connectorSlideEffect(); //베스트커넥터영역 슬라이드 효과
  reviewParallaxEffect() // 리뷰영역 패러랙스스크롤 효과와 큰리뷰영역 활성화 효과 
  subVisualEffect(); // 서브비주얼 효과
  appAreaslideEffect(); // 앱영역 슬라이드 효과
  openLangWrap(); // 언어메뉴 클릭시 언어선택영역 열기
})

function mainVisualEffect(){
  var $visualWrap=$('#visual_wrap');
  var $visualList=$('.visual_list');
  var $visualLi=$visualList.children();
  var $visualImg=$visualLi.children('img')
  var visualCount=$visualLi.size();
  var visualNum=0;

  // 초기값
  var timer = setInterval(changeNext,5000) //오토플레이 실행함수

  // 이벤트
  $(window).on('resize',visualReset); // 리사이즈시마다 비주얼크기조절 이벤트
  $visualWrap.on('mouseenter',function(){clearInterval(timer)}) //오토플레이정지 이벤트
  $visualWrap.on('mouseleave',function(){timer = setInterval(changeNext,5000)}) //오토플레이재시작 이벤트
  $('.visual_left_btn').on('click',changePrev);
  $('.visual_right_btn').on('click',changeNext);

  // 함수
  function visualReset(){ // 비주얼크기조절 함수
    // $visualWrap.css({'height':$visualImg.innerHeight()})
    $visualList.css({'width':$visualLi.innerWidth()*visualCount})
    $visualLi.css({'width':$(window).innerWidth()})
  }
  function changePrev(){ // 이전버튼 클릭 이벤트
    visualNum--
    if(visualNum<0){
      visualNum=visualCount-1;
    }
    $visualList.stop().animate({'left':-($visualLi.innerWidth()*visualNum)},500,'easeOutCubic');
    $('.visualbar_inner').stop().animate({'width':$('.visualbar_wrap').innerWidth()/3*(visualNum+1)},500,'easeOutCubic')
  }
  function changeNext(){ // 다음버튼 클릭 이벤트
    visualNum++
    if(visualNum>=visualCount){
      visualNum=0;
    }
    $visualList.stop().animate({'left':-($visualLi.innerWidth()*visualNum)},500,'easeOutCubic');
    $('.visualbar_inner').stop().animate({'width':$('.visualbar_wrap').innerWidth()/3*(visualNum+1)},500,'easeOutCubic');
  }
}
function searchDatePicker(){
  $('.date_picker').datepicker({
    showOn:'focus',   // 포커스(텍스트필드) 또는 아이콘
    dateFormat:'yy.mm.dd',
    prevText:'이전 달',
    nextText:'다음 달',
    monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNames:['일','월','화','수','목','금','토'],
    dayNamesShort:['일','월','화','수','목','금','토'],
    dayNamesMin:['일','월','화','수','목','금','토'],
    showMonthAfterYear:true,
    yearSuffix:'년'
  })
}
function connectboxEffect(){
  var $movingbox=$('.moving_box');
  var $fixedBox=$(".fixed_box");
  // 이벤트
  $('.connect_left_btn').on('click',slideLeft); // 전문커넥터버튼클릭이벤트
  
  // 함수
  function slideLeft(){ //전문커넥터영역 활성화 함수
    $movingbox.css({"z-index":1});
    $fixedBox.css({'z-index':0});
    $movingbox.stop().animate({'left':-1200},500,'easeOutCubic',function(){
      $fixedBox.css({"left":-800}) // 가리면서 사라지는 효과 후 다음 이벤트를 위해 다시 배치
      $('.connect_right_btn').on('click',slideRight); //html로 새로 넣어줬기 때문에 이벤트 다시 지정해주는게 필요

    });
    $('.normal_connect_wrap').stop().animate({'opacity':0},500,'easeOutCubic');
    $('.pro_connect_wrap').stop().animate({'opacity':1},1000,'easeOutCubic');
  }
  function slideRight(){ //일반커넥터영역 활성화 함수
    $movingbox.css({'z-index':0});
    $fixedBox.css({'z-index':1});
    $fixedBox.stop().animate({'left':0},500,'easeOutCubic',function(){
      $movingbox.css({"left":0}) // 가리면서 사라지는 효과 후 다음 이벤트를 위해 다시 배치
      $('.connect_left_btn').on('click',slideLeft); //html로 새로 넣어줬기 때문에 이벤트 다시 지정해주는게 필요
    })
    $('.normal_connect_wrap').stop().animate({'opacity':1},1000,'easeOutCubic');
    $('.pro_connect_wrap').stop().animate({'opacity':0},500,'easeOutCubic');
  }
}
function resultCountEffect(){
  var startTop=$("#count_wrap").offset().top*0.5;
  var scrollHeight;
  var isdone=false;
  
  // 이벤트
  $(window).on('scroll',onScroll)

  // 함수
  function onScroll(){
    scrollHeight=$(document).scrollTop();
    if(scrollHeight>=startTop && isdone===false){
      count();
      $('.count_list').animate({'top':0,'opacity':1},500,"easeOutCubic");
      isdone=true;
    }
  }

  function count(){ // 카운트함수
    $('.count').each(function () {
      $(this).prop('Counter',100).animate({
        Counter: $(this).text()
      }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
          $(this).text(comma(Math.ceil(now)));
        }
      });
    });
  }
  function comma(num){ // 1000자리콤마 함수
    var len, point, str; 
    num = num + ""; 
    point = num.length % 3 ;
    len = num.length; 
    str = num.substring(0, point); 
    while (point < len) { 
        if (str != "") str += ","; 
        str += num.substring(point, point + 3); 
        point += 3; 
    } 
    return str;
  }
}
function connectorSlideEffect(){
  var $slideWrap=$('.best_connector_list');
  var $connectorLi=$slideWrap.children('li');
  var listWidth=$connectorLi.innerWidth();
  var marginX=parseInt($connectorLi.css('margin-right')); // 값이 px로 나와서 number로 변환 필요
  var movingX=(listWidth*3)+(marginX*3)+(4*3); // 슬라이드 범위 
  var currentX;

  // 이벤트
  $('.best_left_btn').on('click',slideLeft); // 왼쪽버튼 클릭 이벤트
  $('.best_right_btn').on('click',slideRight); // 오른쪽버튼 클릭 이벤트

  // 함수
  function slideLeft(){ //왼쪽버튼 클릭함수
    currentX=$slideWrap.position().left;
    if(currentX<0){
      $('.best_connector_list:not(:animated)').animate({'left':currentX+movingX},500,'easeOutCubic') // 연속클릭 시 좌표 불균형을 방지하기 위해 notanimate로 지정
    }
  }
  function slideRight(){ //오른쪽버튼 클릭함수
    currentX=$slideWrap.position().left;
    if(currentX>-movingX){
      $('.best_connector_list:not(:animated)').animate({'left':currentX-movingX},500,'easeOutCubic') // 연속클릭 시 좌표 불균형을 방지하기 위해 notanimate로 지정
    }
  }
}
function reviewParallaxEffect(){
  var $reviewWrap=$("#review_wrap");
  var $leftWrap=$(".review_left_wrap");
  var startTop=$reviewWrap.offset().top;
  var endTop=startTop+$reviewWrap.innerHeight()-$leftWrap.innerHeight();
  var scrollTop=$(document).scrollTop();
  // 이벤트
  $(window).on('scroll',onScroll); //리뷰패러랙스 이벤트

  // 함수
  function onScroll(){ //리뷰 패러렉스 함수
    var newTop=$(document).scrollTop();
    if(newTop>=startTop && newTop<=endTop){
      $leftWrap.css({"top":newTop-startTop})
    }
    scrollTop=newTop;
  }
}
function subVisualEffect(){
  var $movingWrap=$('.sub_test_list');
  var $textList=$('.sub_test_list').children('li');
  var $visualWrap=$('.sub_visual_list');
  var $visualList=$visualWrap.children('li');
  var listNum=$textList.size();
  var movingX=$textList.innerWidth();
  var clickIndex=0;

  // 이벤트
  $('.sub_left_btn').on('click',prevSlide); //왼쪽버튼 클릭 이벤트
  $('.sub_right_btn').on('click',nextSlide); // 오른쪽버튼 클릭 이벤트
  $visualWrap.on('click',nextSlide); // 비주얼이미지 클릭시 이벤트

  // 함수
  function prevSlide(){
      clickIndex--;
      if(clickIndex<0){
        clickIndex=$visualList.size()-1;
      }
      $movingWrap.css({'left':-(movingX*clickIndex)})
      $visualList.last().prependTo($visualWrap); // 마지막리스트를 첫번째위치로 이동
      $visualList=$visualWrap.children('li');
      $('.paging').text(clickIndex+1)
  }
  function nextSlide(){
      clickIndex++
      if(clickIndex>=$visualList.size()){
        clickIndex=0;
      }
      $movingWrap.css({'left':-(movingX*clickIndex)})
      $visualList.first().appendTo($visualWrap); // 첫번째리스트를 마지막위치로 이동
      $visualList=$visualWrap.children('li');
      $('.paging').text(clickIndex+1)
  }
}
function appAreaslideEffect(){
  var $movingWrap=$('.inner_img_list');
  var movingX=$(".inner_img_list").children('li').innerWidth();
  var $dotList=$('.app_dot_list').children('li')
  var dotIndex=0;

  $dotList.eq(dotIndex).addClass('active_dot')
  var timer = setInterval(autoPlay,3000); // 오토플레이 실행

  //이벤트
  $dotList.on('click',clickDot); // 도트 클릭시 이벤트
  $('.app_dot_list').on('mouseenter',stopPlay);
  $('.app_dot_list').on('mouseleave',function(){timer=setInterval(autoPlay,3000)})
  //함수
  function autoPlay(){ //오토플레이 함수
    dotIndex++
    if(dotIndex>=3){
      dotIndex=0;
    }
      $movingWrap.stop().animate({'left':-movingX*dotIndex},500,"easeOutCubic")
      $dotList.removeClass('active_dot')
      $dotList.eq(dotIndex).addClass('active_dot')
  }
  function stopPlay(){
    clearInterval(timer);
  }
  function clickDot(){ // 도트 클릭시 슬라이드 함수
    dotIndex=$dotList.index($(this));
    $movingWrap.stop().animate({'left':-movingX*dotIndex},500,"easeOutCubic")
    $dotList.removeClass('active_dot')
    $dotList.eq(dotIndex).addClass('active_dot')
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