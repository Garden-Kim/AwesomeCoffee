/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,MNet, module, config, SERVER_PATH, window){

  var page = {
    els:  {
    },
    data: {
      requset: {
        loginId: M.data.global('id'),
        lastSeqNo: '0',
        cnt: '100000'
      },
    },
    init: function init(){
    },
    initView : function initView(){
      var self = this;
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      console.log(M.data.param('paymentDate'));
      $('#inputDate').val(M.data.param('paymentDate'))
      MNet.sendHttp({
        path: SERVER_PATH.PAYMENT_DATELIST,
        data: {
          "paymentDate" : M.data.param('paymentDate'),
        },
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<ul class='paymentList'>"
            items += "<li class='list'>";
            items += item.orderNum;
            items += "</li>";
            items += "<li class='list'>";
            items += item.paymentKind;
            items += "</li>";
            items += "<li class='list'>";
            items += item.paymentDate;
            items += "</li>";
            items += "<li class='list'>";
            items += item.paymentPrice;
            items += "</li>";
            items += "</ul>"
          });
          $(".paymentList").append(items);
        },
        error: function (data) {
          console.log(data);
          alert(" 리스트를 가져오지 못했습니다. ");
        },
      });
      MNet.sendHttp({
        path: SERVER_PATH.PAYMENT_DAYSUM,
        data: {
          "paymentDate" : M.data.param('paymentDate')
        },
        succ: function (data) {
          $('#paymentSum').html(data.dayPaymentSum);
        },
        error: function (data) {
          console.log(data);
          alert(" 데이터를 가져오지 못했습니다. ");
        },
      });
    },
    initEvent : function initEvent(){
      $('.btn-search').on('click', function(){
        var paymentDate = "";
        paymentDate = document.getElementById('inputDate').value;
        console.log(paymentDate);
        MNet.sendHttp({
          path: SERVER_PATH.PAYMENT_DATELIST,
          data: {
            "paymentDate" : paymentDate
          },
          succ: function (data) {
            M.page.replace('./saleSearch.html',{param : {paymentDate	: paymentDate}});
          },
          error: function (data) {
            console.log(data);
            alert(" 데이터를 가져오지 못했습니다. ");
          },
        });

      });
       
      $('.l-fix').on('click', function(){
        M.page.back();
      });
     
    },
  };
  window.__page__ = page;
})(jQuery, M,__mnet__, __util__, __config__, __serverPath__,  window);
/*
$.each(data.lists, function(index, item){
  items += "<tr>";
  items += "<td><a href='/'>"+ item.memberNum + "</a></td>";
  items += "<td>"+ item.memberNum +"</td>";
  items += "<td><input type='' name='' value='" + item.memberNum + "'></td>";
  items += "</tr>";    
})*/

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);