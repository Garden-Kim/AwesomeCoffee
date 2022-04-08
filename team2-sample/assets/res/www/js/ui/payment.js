/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){
  var seqNoSend;
  var page = {
    els: {
      $payment: null,
      $imgUrl: null,
      $title: null,
      $content: null,

      $goodsPrice: null,
      $qtyPlus: null,
      $goodsQty: null,
      $qtyMinus: null,
    },
    data: {},
    init: function init() {

      this.els.$imgUrl = $('#imgUrl');
      this.els.$title = $('#title');
      this.els.$content = $('#content');
      this.els.$payment = $('#payment');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터

      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.global('id'),
          "seqNo": M.data.param('seqNo')
        },
        succ: function (data) {
          console.log(data);
          $('#title').text(data.title);
          $('#regDate').html(data.regDate);
          $('#content').html(data.content);
          seqNoNext = data.seqNo;
          console.log(data.imgUrl);
          if (data.imgUrl != null) {
            $('#imgUrl5').attr('src', data.imgUrl);
          }
        },
        error: function (data) {
          console.log(data);
          alert("실패");
        }
      });
    },
    initEvent: function initEvent() {
      var self = this;
      $('#payBtn').on('click', function(){
        
        alert('결제 완료되었습니다.');
        M.page.html('./main.html');
      });
      
      // Dom Event 바인딩
      $('.btn-back').on('click', function () {
        M.page.back();
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
    }  

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