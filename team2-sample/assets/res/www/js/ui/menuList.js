/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,MNet, module, config, SERVER_PATH, window){

  var page = {
    els:  {
      $btnModify : null,
      $btnTop : null,
      $infoDetail : null,
      $btnWrap : null,
    },
    data: {
      lastSeqNum : null,
    },
    init: function init(){
      this.els.$btnModify = $('#btn-modify');
      this.els.$btnTop = $('.btn-top');
      this.els.$infoBox = $('#info-detail');
      this.els.$btnWrap = $('#btn-more');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      // 화면에서 세팅할 동적데이터
      var self = this;
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      if(M.data.global('grade') == 'store'){
        document.querySelector('#btn-modify').classList.remove('none');
        document.querySelector('#emp-side').classList.remove('none');
        document.querySelector('#mem-side').classList.add('none');
        MNet.sendHttp({
          path: SERVER_PATH.MENU_CATEGORYEMPLIST,
          data: {
            "categoryNum" : "2",
          },
          succ: function (data) {
            console.log(data);
            var items = "";
            $.each(data.list, function (index, item) {
              console.log(item);
              console.log(item.goodsImage);
              //http://211.241.199.241:28040/resources/img/1647853076507.jpg
              items += "<li id='"+ item.goodsName +"' class ='menu'>";
              items += "<div class='thumbnail-wrap click-d' id='"+ item.goodsName +"'>";
              items += "<div class='thumbnail'>";
              items += "<img src='" + M.data.global('imgHttp') +item.goodsImage +" ' alt=''/>";
              items += "</div>";
              items += "<span class='label-info none'>";
              items += "<img src= '" + M.data.global('imgHttp') + item.goodsImage + "' alt='50%'/>";
              items += "</span>";
              items += "</div>";
              items += "<div class='info-box'>";
              items += "<div class='info-box-top'>";
              items += "<strong class='ellipsis_1'>";
              items += item.goodsName;
              items += "</strong>";
              items += "</div>";
              items += "<span class='info-box-btm'>";
              items += "<p style='text-align:right;' class='ellipsis_1'>";
              items += Number(item.goodsPrice).toLocaleString() + ' 원';
              items += "</p>";
              items += "</span>";
              items += "</div>";
              items += "</li>";
            });
            $("#card").append(items);
            $('button[data="Exist goods in wishlist"]').attr('class', 'hurt');
          },
          error: function (data) {
            console.log(data);
            alert("리스트를 가져오지 못했습니다.");
          },
        });
      }else{
        MNet.sendHttp({
          path: SERVER_PATH.MENU_CATEGORYLIST,
          data: {
            "categoryNum" : "2",
          },
          succ: function (data) {
            console.log(data);
            var items = "";
            $.each(data.list, function (index, item) {
              console.log(item);
              console.log(item.goodsImage);
              //http://211.241.199.241:28040/resources/img/1647853076507.jpg
              items += "<li id='"+ item.goodsName +"' class ='menu'>";
              items += "<div class='thumbnail-wrap click-d' id='"+ item.goodsName +"'>";
              items += "<div class='thumbnail'>";
              items += "<img src='" + M.data.global('imgHttp') +item.goodsImage +" ' alt=''/>";
              items += "</div>";
              items += "<span class='label-info none'>";
              items += "<img src= '" + M.data.global('imgHttp') + item.goodsImage + "' alt='50%'/>";
              items += "</span>";
              items += "</div>";
              items += "<div class='info-box'>";
              items += "<div class='info-box-top'>";
              items += "<strong class='ellipsis_1'>";
              items += item.goodsName;
              items += "</strong>";
              items += "</div>";
              items += "<button type='button' id='"+ item.goodsNum +"' class='interest' data='"+ item.wishlist +"'></button>";
              items += "<span class='info-box-btm'>";
              items += "<p style='text-align:right;' class='ellipsis_1'>";
              items += Number(item.goodsPrice).toLocaleString() + ' 원';
              items += "</p>";
              items += "</span>";
              items += "</div>";
              items += "</li>";
              console.log(item.wishlist);
            });
            $("#card").append(items);
            $('button[data="Exist goods in wishlist"]').attr('class', 'hurt');
          },
          error: function (data) {
            console.log(data);
            alert("리스트를 가져오지 못했습니다.");
          },
        });    
      }
    },
    initEvent : function initEvent(){
      var self = this;
      var id = M.data.global('id');
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      $('.btn-search').on('click', function(){
        var search = "";
        search = $('#value').val();
        if(M.data.global('grade') == 'store'){
          MNet.sendHttp({
            path: SERVER_PATH.MENU_EMPSERCH,
            data: {
              goodsName : search,
            },
            succ: function (data) {
              console.log(data);
              var items = "";
              $.each(data.list, function (index, item) {
                console.log(item);
                console.log(item.goodsImage);
                //http://211.241.199.241:28040/resources/img/1647853076507.jpg
                items += "<li id='"+ item.goodsName +"' class ='menu'>";
                items += "<div class='thumbnail-wrap click-d' id='"+ item.goodsName +"'>";
                items += "<div class='thumbnail'>";
                items += "<img src='" + M.data.global('imgHttp') +item.goodsImage +" ' alt=''/>";
                items += "</div>";
                items += "<span class='label-info none'>";
                items += "<img src= '" + M.data.global('imgHttp') + item.goodsImage + "' alt='50%'/>";
                items += "</span>";
                items += "</div>";
                items += "<div class='info-box'>";
                items += "<div class='info-box-top'>";
                items += "<strong class='ellipsis_1'>";
                items += item.goodsName;
                items += "</strong>";
                items += "</div>";
                items += "<span class='info-box-btm'>";
                items += "<p style='text-align:right;' class='ellipsis_1'>";
                items += Number(item.goodsPrice).toLocaleString() + ' 원';
                items += "</p>";
                items += "</span>";
                items += "</div>";
                items += "</li>";
                console.log(item.wishlist);
              });
              $("#card").html(items);
              $('button[data="Exist goods in wishlist"]').attr('class', 'hurt');
              document.querySelector('.category li.on').classList.remove('on');
              $('#value').text(search);
            },
            error: function (data) {
              console.log(data);
              alert('에러!');
            }
          });
        
        }else{
          MNet.sendHttp({
            path: SERVER_PATH.MENU_SEARCH,
            data: {
              goodsName : search,
            },
            succ: function (data) {
              console.log(data);
              var items = "";
              $.each(data.list, function (index, item) {
                console.log(item);
                console.log(item.goodsImage);
                //http://211.241.199.241:28040/resources/img/1647853076507.jpg
                items += "<li id='"+ item.goodsName +"' class ='menu'>";
                items += "<div class='thumbnail-wrap click-d' id='"+ item.goodsName +"'>";
                items += "<div class='thumbnail'>";
                items += "<img src='" + M.data.global('imgHttp') +item.goodsImage +" ' alt=''/>";
                items += "</div>";
                items += "<span class='label-info none'>";
                items += "<img src= '" + M.data.global('imgHttp') + item.goodsImage + "' alt='50%'/>";
                items += "</span>";
                items += "</div>";
                items += "<div class='info-box'>";
                items += "<div class='info-box-top'>";
                items += "<strong class='ellipsis_1'>";
                items += item.goodsName;
                items += "</strong>";
                items += "</div>";
                items += "<button type='button' id='"+ item.goodsNum +"' class='interest' data='"+ item.wishlist +"'></button>";
                items += "<span class='info-box-btm'>";
                items += "<p style='text-align:right;' class='ellipsis_1'>";
                items += Number(item.goodsPrice).toLocaleString() + ' 원';
                items += "</p>";
                items += "</span>";
                items += "</div>";
                items += "</li>";
                console.log(item.wishlist);
              });
              $("#card").html(items);
              $('button[data="Exist goods in wishlist"]').attr('class', 'hurt');
              document.querySelector('.category li.on').classList.remove('on');
              $('#value').text(search);
            },
            error: function (data) {
              console.log(data);
              alert('에러!');
            }
          });
        }
        
      });  
      // 카테고리
      const tabList = document.querySelectorAll('.category li');
      for(var i = 0; i < tabList.length; i++){
        tabList[i].querySelector('.btn-category').addEventListener('click', function(){
          for(var j = 0; j < tabList.length; j++){
            tabList[j].classList.remove('on');
          }
          var ctg = $(this).parent('li').attr('id');
          this.parentNode.classList.add('on');
          console.log("ctg = "+ctg);
          if(M.data.global('grade') == 'store'){
            MNet.sendHttp({
              path: SERVER_PATH.MENU_CATEGORYEMPLIST,
              data: {
                "categoryNum" : ctg,
              },
              succ: function (data) {
                console.log(data);
                var items = "";
                $.each(data.list, function (index, item) {
                  console.log(item);
                  console.log(item.goodsImage);
                  //http://192.168.0.31:8080/view/goods/upload/{goodsImage}
                  //http://211.241.199.241:28040/resources/img/1647853076507.jpg
                  items += "<li id='"+ item.goodsName +"' class ='menu'>";
                  items += "<div class='thumbnail-wrap click-d' id='"+ item.goodsName +"'>";
                  items += "<div class='thumbnail'>";
                  items += "<img src='" + M.data.global('imgHttp') +item.goodsImage +" ' alt=''/>";
                  items += "</div>";
                  items += "<span class='label-info none'>";
                  items += "<img src= '" + M.data.global('imgHttp') + item.goodsImage + "' alt='50%'/>";
                  items += "</span>";
                  items += "</div>";
                  items += "<div class='info-box'>";
                  items += "<div class='info-box-top'>";
                  items += "<strong class='ellipsis_1'>";
                  items += item.goodsName;
                  items += "</strong>";
                  items += "</div>";
                  items += "<span class='info-box-btm'>";
                  items += "<p style='text-align:right;' class='ellipsis_1'>";
                  items += Number(item.goodsPrice).toLocaleString() + ' 원';
                  items += "</p>";
                  items += "</span>";
                  items += "</div>";
                  items += "</li>";
                });
                $("#card").html(items);
                $('button[data="Exist goods in wishlist"]').attr('class', 'hurt');
              },
              error: function (data) {
                console.log(data);
                alert("리스트를 가져오지 못했습니다.");
              },
            });
          
          }else{
            MNet.sendHttp({
              path: SERVER_PATH.MENU_CATEGORYLIST,
              data: {
                "categoryNum" : ctg,
              },
              succ: function (data) {
                console.log(data);
                var items = "";
                $.each(data.list, function (index, item) {
                  console.log(item);
                  console.log(item.goodsImage);
                  //http://192.168.0.31:8080/view/goods/upload/{goodsImage}
                  //http://211.241.199.241:28040/resources/img/1647853076507.jpg
                  items += "<li id='"+ item.goodsName +"' class ='menu'>";
                  items += "<div class='thumbnail-wrap click-d' id='"+ item.goodsName +"'>";
                  items += "<div class='thumbnail'>";
                  items += "<img src='" + M.data.global('imgHttp') +item.goodsImage +" ' alt=''/>";
                  items += "</div>";
                  items += "<span class='label-info none'>";
                  items += "<img src= '" + item.goodsImage + "' alt='50%'/>";
                  items += "</span>";
                  items += "</div>";
                  items += "<div class='info-box'>";
                  items += "<div class='info-box-top'>";
                  items += "<strong class='ellipsis_1'>";
                  items += item.goodsName;
                  items += "</strong>";
                  items += "</div>";
                  items += "<button type='button' id='"+ item.goodsNum +"' class='interest' data='"+ item.wishlist +"'></button>";
                  items += "<span class='info-box-btm'>";
                  items += "<p style='text-align:right;' class='ellipsis_1'>";
                  items += Number(item.goodsPrice).toLocaleString() + ' 원';
                  items += "</p>";
                  items += "</span>";
                  items += "</div>";
                  items += "</li>";
                });
                $("#card").html(items);
                $('button[data="Exist goods in wishlist"]').attr('class', 'hurt');
              },
              error: function (data) {
                console.log(data);
                alert("리스트를 가져오지 못했습니다.");
              },
            });        
          }
        });
      };
      // 관심상품 버튼
      $('#card').on('click', '.interest', function( ) {
        var goodsNum = $(this).attr('id' );
        MNet.sendHttp({
          path: SERVER_PATH.WISH_REGIST,
          data: {
            goodsNum : goodsNum,
          },
          succ: function (data) {
            alert('관심상품에 등록하셨습니다.');
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
        $(this).attr('class', 'hurt');
      });
      $('#card').on('click', '.hurt', function() {
        var goodsNum = $(this).attr('id' );
        MNet.sendHttp({
          path: SERVER_PATH.WISH_REGIST,
          data: {
            goodsNum : goodsNum,
          },
          succ: function (data) {
            alert('관심상품을 해제하셨습니다.');
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
        $(this).attr('class', 'interest');
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
        M.page.replace('./menuList.html');
      });
      $('#m-storeList').on('click', function(){
        M.page.html('./storeList.html');
      });
      $('#m-userInfo').on('click', function(){
        M.page.html('./userInfo.html');
      });
      $('#m-cart').on('click', function(){
        M.page.html('./cart.html');
      });
      $('#m-interest').on('click', function(){
        M.page.html('./wishList.html');
      });
      $('#m-payList').on('click', function(){
        M.page.html('./payList.html');
      });
      $('#m-logout').on('click', function(){
        MNet.sendHttp({
          path: SERVER_PATH.LOGOUT,
          data: {
            "loginId": M.data.global('id')
          },
          succ: function (data) {
            M.data.removeGlobal('id');
            M.data.removeGlobal('grade');
            M.data.removeStorage('AUTO_LOGIN_AUTH');
            alert("로그아웃되셨습니다.");
            M.page.html({
                    url: "./intro.html",
                    actionType: "CLEAR_TOP"
            });
          }
        });
      });
// 관리자 사이드바
      $('#menu-order-food').on('click', function(){
        M.page.html('./foodOrder.html');
      });      
      $('#menu-payment-list').on('click', function(){
        M.page.html('./foodTransferList.html');
      });       
      $('#menu-sales').on('click', function(){
        M.page.html('./sales.html');
      });      
      $('#menu-menu').on('click', function(){
        M.page.replace('./menuList.html');
      });          
      $('#menu-member-info').on('click', function(){
        M.page.html('./memberList.html');
      });   
      $('#menu-store-info').on('click', function(){
        M.page.html('./storeList.html');
      });
      $('#menu-logout').on('click', function(){
        MNet.sendHttp({
          path: SERVER_PATH.LOGOUT,
          data: {
            "loginId": M.data.global('id')
          },
          succ: function (data) {
            M.data.removeGlobal('id');
            M.data.removeGlobal('grade');
            M.data.removeStorage('AUTO_LOGIN_AUTH');
            alert("로그아웃되셨습니다.");
            M.page.html({
                    url: "./intro.html",
                    actionType: "CLEAR_TOP"
            });
          }
        });
      });
      
      this.els.$btnModify.on('click', function(){
        M.page.html('./write-menu.html');
      });
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      $('#card').on('click', '.click-d', function( ) {
        var goodsName = $(this).attr('id' );
        MNet.sendHttp({
          path: SERVER_PATH.MENU_INFO,
          data: {
            goodsName : goodsName,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              M.page.html('./goodsDetail.html',{param : {goodsName	: goodsName}} );
            } else {
              alert('페이지를 열 수 없습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
      });
      /*  
        $('.wrapper').on('click', '.test', function( ) {
          var seqNo = $(this).attr('id' );
          alert(seqNo);
        });
      */
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
  });/*
  M.onRestore(function() {
    pageFunc.initView();
  });*/
  
})(jQuery,M,__page__,window);