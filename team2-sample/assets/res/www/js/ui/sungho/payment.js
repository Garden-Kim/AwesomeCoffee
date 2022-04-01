/**
 * @file : 게시글 상세보기 페이지
 * @author : 최성호
 * @date : 22.03.25
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
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

      this.els.$updateBtn = $('#modiBtn');
      
      this.els.$imgUrl = $('#imgUrl');
      this.els.$title = $('#title');
      this.els.$content = $('#content');


      this.els.$payment = $('#payment');
      this.els.$goodsPrice = $('#goodsPrice').text();
      this.els.$qtyPlus = $('#qtyPlus');
      this.els.$goodsQty = $('#goodsQty').text();
      
      this.els.$qtyMinus = $('#qtyMinus');
 
      





    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터

      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.global('userIdSend'),
          "seqNo": M.data.global('seqNoSend')
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
      // Dom Event 바인딩

      this.els.$qtyPlus.on('click', function () {
        if($('#goodsQty').html() !=1 ){
          self.qtyPlus();
        }
          
       })

       this.els.$qtyMinus.on('click', function () {
        self.qtyMinus();  
       })

        this.els.$updateBtn.on('click', function () {
         self.updatePage();  
        })

     
    },
    
    qtyMinus:function(){
      var self = this;
      var ser =  Number($('#goodsQty').html())-1;
     
      
      $('#goodsPrice').html(5000*ser);
      
      $('#goodsQty').html(ser);
    },

    qtyPlus: function () {
      var self = this;
      var ser =  Number($('#goodsQty').html())+1;
     
      
      $('#goodsPrice').html(5000*ser);
      
      $('#goodsQty').html(ser);
      
      
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