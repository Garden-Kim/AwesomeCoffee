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
      $content: null,

      $cartBtn: null,
      $payment: null,
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

      this.els.$cartBtn = $('#cartBtn');
      this.els.$payment = $('#payment');
      this.els.$goodsPrice = $('#goodsPrice').text();
      this.els.$qtyPlus = $('#qtyPlus');
      this.els.$goodsQty = $('#goodsQty').text();

      this.els.$qtyMinus = $('#qtyMinus');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var seqNo = M.data.param("seqNo");
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.global('id'),
          "seqNo": seqNo
        },
        succ: function (data) {
          console.log(data);
          $('#title').text(data.title);
          $('#regDate').html(data.regDate);
          $('#content').html(data.content);
          seqNoNext = data.seqNo;
          console.log(data.imgUrl);
          if (data.imgUrl != null) {
            $('#imgUrl').attr('src', data.imgUrl);
            $('#imgUrl1').attr('src', data.imgUrl);
            $('#imgUrl2').attr('src', data.imgUrl);
            $('#imgUrl3').attr('src', data.imgUrl);
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
      // Dom Event 바인딩
      $('.btn-back').on('click', function () {
        M.page.back();
      });
      // 사이드바 
      $('.btn-menu').on('click', function () {
        console.log('메뉴클릭');
        $('.position').attr('style', 'position: absolute; top:0;right:0px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 0.3);
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 1);
      });
      $('#recipe-write').on('click', function(){
        M.page.html('./write-recipe.html');
      });
      $('#modiBtn').on('click', function(){
        M.page.html('./write-menu.html',{param : { seqNo : M.data.param('seqNo')}});
      });
      $('#delBtn').on('click', function(){
        if (confirm("메뉴를 삭제하시겠습니까?") == true){
          alert("완료되었습니다.");
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.page.replace('./menuList.html');
        }else return;
      });
      this.els.$qtyPlus.on('click', function () {

        self.qtyPlus();

      });
      this.els.$qtyMinus.on('click', function () {
        if ($('#goodsQty').html() != 1) {
          self.qtyMinus();
        }
      });
      this.els.$cartBtn.on('click', function () {
        if (confirm("장바구니로 이동하시겠습니까?") == true){
          M.page.replace('./cart.html');
        }else return;
      });
      this.els.$payment.on('click', function () {
        M.page.html('./payment.html', {param : {seqNo	: M.data.param("seqNo")}});
      });
    },
    qtyMinus: function () {
      var self = this;
      var ser = Number($('#goodsQty').html()) - 1;
      $('#goodsPrice').html(5000 * ser);

      $('#goodsQty').html(ser);
    },
    qtyPlus: function () {
      var self = this;
      var ser = Number($('#goodsQty').html()) + 1;
      $('#goodsPrice').html(5000 * ser);
      $('#goodsQty').html(ser);

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