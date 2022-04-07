/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var seqNoSend;
  var page = {
    els: {
      $imgUrl: null,
      $title: null,
      $address: null,
      $storeOrder : null,
    },
    data: {},
    init: function init() {
      this.els.$imgUrl = $('#imgUrl');
      this.els.$title = $('#title');
      this.els.$address = $('#address');
      this.els.$storeOrder = $('#storeOrder');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터

      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.global('id'),
          "seqNo": M.data.param('seqNum')
        },
        succ: function (data) {
          console.log(data);
          $('#title').text(data.title);
          $('#address').html(data.regDate);
          $('#content').html(data.content);
          seqNoNext = data.seqNo;
          console.log(data.imgUrl);
          if (data.imgUrl != null) {
            $('#imgUrl').attr('src', data.imgUrl);
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
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      // Dom Event 바인딩
      this.els.$storeOrder.on('click', function () {
       self.storeOrder();  
      })
    },
    updatePage :function(){
      // 페이지 호출
      M.page.html({
        path: './write.html',
        param: {
          "seqNoNext": seqNoNext,
        }
      });
    },
    storeOrder : function(){
      M.page.html('./goodsList.html');
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