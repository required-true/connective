$(document).ready(function(){
  mainVisualEffect(); // 메인비주얼영역 슬라이드 효과
  connectboxEffect(); // 커넥트박스영역 슬라이드 효과
  resultCountEffect(); // 성과영역 카운트효과
  connectorSlideEffect(); //베스트커넥터영역 슬라이드 효과
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
function connectboxEffect(){
  var $movingbox=$('.connectbox_inner');

  // 이벤트
  $('.connect_left_btn').on('click',slideLeft); // 전문커넥터버튼클릭이벤트
  
  // 함수
  function slideLeft(){ //전문커넥터영역 활성화 함수
    $movingbox.stop().animate({'left':-800},500,'easeOutCubic',function(){
      $('.connect_right_btn').on('click',slideRight); //html로 새로 넣어줬기 때문에 이벤트 다시 지정해주는게 필요
    });
    $('.connect_title_box').html('<p class="title_box_title">일반 커넥터</p><p class="title_box_text">구매 대행부터 까지 해외 현지의<br>필요한 요구사항을 커넥터가<br>대신 해드립니다.</p><div class="connect_right_btn"><a href="#;"></a></div>')
    $('.connect_title_box').addClass('box_selected'); //백그라운드 컬러 변경을 위한 클래스 추가
    $('.normal_connect_wrap').stop().animate({'opacity':0},0,'easeOutCubic');
    $('.pro_connect_wrap').stop().animate({'opacity':1},1000,'easeOutCubic');
  }
  function slideRight(){ //일반커넥터영역 활성화 함수
    $movingbox.stop().animate({'left':0},500,'easeOutCubic',function(){
      $('.connect_left_btn').on('click',slideLeft); //html로 새로 넣어줬기 때문에 이벤트 다시 지정해주는게 필요
    })
    $('.connect_title_box').html('<p class="title_box_title">전문 커넥터</p><p class="title_box_text">전문성을 가진 커넥터가<br>시장조사, 부동산거래, 법률문제 등<br>현지의 전문적인 업무를 대신 해드립니다.</p><div class="connect_left_btn"><a href="#;"></a></div>')
    $('.connect_title_box').removeClass('box_selected');
    $('.normal_connect_wrap').stop().animate({'opacity':1},1000,'easeOutCubic');
    $('.pro_connect_wrap').stop().animate({'opacity':0},0,'easeOutCubic');
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
      isdone=true;
    }
  }
  function count(){ // 카운트함수
    $('.count').each(function () {
      $(this).prop('Counter',100).animate({
        Counter: $(this).text()
      }, {
        duration: 3000,
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
  var $slideWrap=$(".best_connector_list");
  var $connectorLi=$slideWrap.children("li");
  var listWidth=$connectorLi.innerWidth();
  var marginX=parseInt($connectorLi.css("margin-right")); // 값이 px로 나와서 number로 변환 필요
  var movingX=(listWidth*3)+(marginX*3)+(4*3); // 슬라이드 범위 
  var currentX;

  // 이벤트
  $(".best_left_btn").on("click",slideLeft); // 왼쪽버튼 클릭 이벤트
  $(".best_right_btn").on("click",slideRight); // 오른쪽버튼 클릭 이벤트

  // 함수
  function slideLeft(){ //왼쪽버튼 클릭함수
    currentX=$slideWrap.position().left;
    if(currentX<0){
      $('.best_connector_list:not(:animated)').animate({"left":currentX+movingX},500,"easeOutCubic") // 연속클릭 시 좌표 불균형을 방지하기 위해 notanimate로 지정
    }
  }
  function slideRight(){ //오른쪽버튼 클릭함수
    currentX=$slideWrap.position().left;
    if(currentX>-movingX){
      $('.best_connector_list:not(:animated)').animate({"left":currentX-movingX},500,"easeOutCubic") // 연속클릭 시 좌표 불균형을 방지하기 위해 notanimate로 지정
    }
  }
}