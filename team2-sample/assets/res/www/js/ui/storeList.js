/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){
  var seqNo = '0';
  var page = {
    els: {
      $back: null,
      $announcementWrite: null,
      $announcementMore: null,
      $btnTop: null,

      $thumbnailWrapper: null,
    },
    data: {},
    init: function () {
      this.els.$back = $('#back'); // input
      this.els.$announcementWrite = $('#announcementWrite');
      this.els.$announcementMore = $('.btn-point-color');
      this.els.$btnTop = $('#btnTop');
      this.els.$thumbnailWrapper = $('.numSend');
    },
    initView: function () {
      //화면에서 세팅할 동적데이터
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.STORE_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<ul data='" + item.storeName + "' class='numSend metro-wrap store bg-white' >";
            items += "<li class='img-wrap storeM'>";
            items += "<div class='img storeE'>";
            items += "<img src='./img/ico-alarm.png' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            items += "<img src='./img/ico-alarm.png' alt='50%'/>";
            items += "</span>";
            items += "</li>";
            items += "<li class='info-box storeList'>";
            items += "<div class='info-box-top'>";
            items += "<strong class='membOderList' >";
            items += item.storeName;
            items += "</strong>";
            items += "</div>";
            items += "<div class='info-box-btm storeS'>";
            items += "<strong style='text-align:left;' class='membOderList'>";
            items += item.storeAddr;
            items += "</strong>";
            items += "</div>";
            items += "<div class='info-box-btm storeA'>";
            items += "<strong class='membOderList'>";
            items += "거리";
            items += "</strong>";
            items += "</div>";
            items += "</li>";
            items += "</ul>";
          });
          $(".metro-wrap").append(items);
        },
        error: function (data) {
          $(".btn-point-color").css("display", "none");
          console.log(data);
        }
      });
    },
    initEvent: function initEvent() {
      var self = this;
      // Dom Event 바인딩
      $('.btn-back').on('click', function () {
        M.page.back();
      });
      $('.btn-modify').on('click', function(){
        M.page.html('./write-store.html');
      });
      // 사이드바 
      $('.btn-menu').on('click', function () {
        console.log('메뉴클릭');
        $('.position').attr('style', 'position: absolute; top:0;right:0px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 0.3);
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;pointer-events: none;cursor: default;');
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 1);
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;');
      });
// 회원 사이드바
      $('#m-orderList').on('click', function(){
        M.page.html('./menuList.html');
      });
      $('#m-storeList').on('click', function(){
        M.page.replace('./storeList.html');
      });
      $('#m-userInfo').on('click', function(){
        M.page.html('./userInfo.html');
      });
      $('#m-cart').on('click', function(){
        M.page.html('./cart.html');
      });
      $('#m-payList').on('click', function(){
        // M.page.replace('./menuList.html');
      });

      //  게시글 클릭시 게시글 상세보기 동작
      $('.metro-wrap').on('click', '.numSend', function () {
        storeName = $(this).attr("data");

        MNet.sendHttp({
          path: SERVER_PATH.STORE_INFO,
          data: {
            storeName : storeName,
          },
          succ: function (data) {
            content = data.storeAddr;
            title = data.storeName;
            self.addrSearch();
          },
        });
      });
      /*.on('click', '.numSend', function () {
        var seqNo = $(this).attr('data');
        console.log(seqNo);

        M.data.global({
          'seqNoSend': seqNo
        });
        console.log(M.data.global('seqNoSend'));
        self.bulletinDetail();
      });*/
      //뒤로가기
      this.els.$back.on('click', function () {
        M.page.back();
      });
    },
    addrSearch: function(){
      var geocoder = new kakao.maps.services.Geocoder();
      // 지도를 생성합니다    
    
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(content, function (result, status) {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          M.page.html("./storeDetail.html", {
            'param':{
              'seqNum':seqNum,
              'title': title,
              'content':content
            }
          });
        }else{
          alert("지도를 불러오지 못했습니다.");
          M.page.html("./goodsDetail.html", {
            'param':{
              'seqNum':seqNum
            }
          });
        }
      });
    },
    moreBtn: function () {
      // Load More를 위한 클릭 이벤트e
      if ($(".cont-wrap").length == 0) { // 숨겨진 항목이 있는지 체크
        alert("더 이상 항목이 없습니다"); // 더 이상 로드할 항목이 없는 경우 경고
      }
    },
    top: function () {
      $('.cont-wrap').scrollTop(0);
    },
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__,__difinition__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);