/**
 * @file : 메인 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var checkId;
  var page = {
    els: {
      $announcementBtn: null,
      $btnTxt: null,
      $userInfoBtn: null,
      $memberOrderBtn : null,
      $storeList : null,
    },
    data: {},
    init: function init() {
      this.els.$announcementBtn = $('#announcementBtn');
      this.els.$btnTxt = $('#btn-txt1');
      this.els.$userInfoBtn = $('#userInfoBtn');
      this.els.$memberOrderBtn = $('.memberOrderBtn');
      this.els.$storeList = $('#storeList');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      
      $('.announcementFour').on('click', '.ellipsis', function () {
        var seqNo = $(this).attr('data');
        console.log(seqNo);

        M.data.global({
          'seqNoSend': seqNo
        });
        console.log(M.data.global('seqNoSend'));
        self.bulletinDetail();
      })

      //  버튼 클릭시 동작

      var self = this;
      
       this.els.$memberOrderBtn.on('click', function () {
              M.page.html('./list.html');
            })
    
      this.els.$storeList.on('click', function () {
        M.page.html('./storeList.html');
      })


    },

   





  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);