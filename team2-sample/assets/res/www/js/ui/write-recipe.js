/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){
  var page = {
    els:  {
      $iptTitle : null,
      $iptContent : null,
      $iptPrice : null,
      $iptImg : null,
      $btnLine : null,
      $btnPoint : null,
      $seqNo : null,
    },
    data: {
      title : '',
      content : '',
      li : '',
    },
    init: function init(){
      this.els.$iptTitle = $('#ipt-title');
      this.els.$iptContent = $('#ipt-content');
      this.els.$iptPrice = $('#ipt-price'); ///////////////////////////////////////////
      this.els.$iptImg = $('#ipt-img');
      this.els.$btnLine = $('.btn-line');
      this.els.$btnPoint = $('.btn-point-color');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      var self = this;
      var id = M.data.global('id');
      var recipeYn = M.data.param('recipeYn');
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      self.els.$iptTitle.val(M.data.param('goodsName'));
      
      var li = "";
      MNet.sendHttp({
        path: SERVER_PATH.FOOD_LIST,
        data: {
        },
        succ: function (data) {
          $.each(data.list, function (index, item) {
            li +="<option value='"+item.foodNum+"'>"+item.foodName+"</option>"
          })
          $('#first').append(li);
          self.data.li = li;
          console.log(self.data.li);
        }
      });
      
      if(M.data.param('recipeYn') == 'Y'){
        MNet.sendHttp({
          path: SERVER_PATH.RECIPE_INFO,
          data: { 
            goodsNum : M.data.param('goodsNum')
          },
          succ: function (data) {
            console.log(data);
            $('#modify').text('수정');
            self.els.$iptTitle.val(M.data.param('goodsName'));
            self.els.$iptContent.val(data.recipeContent);
            $('.catergory').val(data.list[0].foodNum);
            $('.food-qty').val(data.list[0].recipeFoodQty);
            
            for(i = 1; i < data.list.length; i ++){
              console.log(self.data.li);
              console.log(data.list[i].foodNum);
              var items = "";
              items += "<div class='ipt-form-row plus-food'>"
              items += "<div class='select-box recipe-select'>"
              items +=   "<select class='catergory plus' >"
              items +=     "<option value=''>식자재 등록</option>"
              items += self.data.li;
              items +=   "</select>"
              items += "</div>"
              items += "<div class='select-box recipe-select qty-select'> " 
              items +=   "<select class='food-qty plus'>"
              items +=     " <option value='1'>1 개</option>"
              items +=     " <option value='2'>2 개</option>"
              items +=     " <option value='3'>3 개</option>"
              items +=     "<option value='4'>4 개</option>"
              items +=     "<option value='5'>5 개</option>"
              items +=     "<option value='6'>6 개</option>"
              items +=     "<option value='7'>7 개</option>"
              items +=     "<option value='8'>8 개</option>"
              items +=     "<option value='9'>9 개</option>"
              items +=     "<option value='10'>10 개</option>"
              items +=   "</select>"
              items += "</div>"
              items += "<button class='btn-line' id='del' type='button' >"
              items +=   "식자재 삭제"
              items += "</button>"
              items += "</div>"
              $("#food-select").append(items);
            }
            var j = 1;
            $('.catergory.plus').each(function () {
              $(this).val(data.list[j].foodNum);
              $(this).parent().siblings('.qty-select').children('select').val(data.list[j].recipeFoodQty);
              j++;
            });
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });        
      }
      
    },
    initEvent : function initEvent(){
      var self = this;
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      $('#food-plus').on('click', function(){
        console.log(self.data.li);
        var items = "";
        items += "<div class='ipt-form-row plus-food'>"
        items += "<div class='select-box recipe-select'>"
        items +=   "<select class='catergory plus' >"
        items +=     "<option value=''>식자재 등록</option>"
        items += self.data.li;
        items +=   "</select>"
        items += "</div>"
        items += "<div class='select-box recipe-select qty-select'> " 
        items +=   "<select class='food-qty plus'>"
        items +=     " <option value='1'>1 개</option>"
        items +=     " <option value='2'>2 개</option>"
        items +=     " <option value='3'>3 개</option>"
        items +=     "<option value='4'>4 개</option>"
        items +=     "<option value='5'>5 개</option>"
        items +=     "<option value='6'>6 개</option>"
        items +=     "<option value='7'>7 개</option>"
        items +=     "<option value='8'>8 개</option>"
        items +=     "<option value='9'>9 개</option>"
        items +=     "<option value='10'>10 개</option>"
        items +=   "</select>"
        items += "</div>"
        items += "<button class='btn-line' id='del' type='button' >"
        items +=   "식자재 삭제"
        items += "</button>"
        items += "</div>"
        $("#food-select").append(items);
      });
      
      $("#food-select").on("click", "#del", function(){
        $(this).parent().remove();
      });
      
      this.els.$btnPoint.on('click', function(){
        self.writeOk();
      });
    },
    writeOk : function(){
      var self = this;
      var title = self.els.$iptTitle.val().trim();
      var content = self.els.$iptContent.val().trim();
      var ctg = $('.catergory').val();
      var fbody = [];
        console.log(ctg);
      if($('#first').val() == ''){
        return alert('식자재를 첫번째칸부터 선택해주세요.');
      }
      $(".catergory").each(function(){
        var foodNum = $(this).val();
        console.log(foodNum);
        if(foodNum != ''){
          var qty = $(this).parent().siblings('.qty-select').children('select').val();
          console.log(qty);
          _fbody = { "foodNum": foodNum, "recipeFoodQty" : qty };
          fbody.push(_fbody);
        }
      });
      console.log(fbody);
      if(module.isEmpty(title)){
        return alert('제목을 입력해주세요.');
      }
      if(module.isEmpty(content)){
        return alert('내용을 입력해주세요.');
      }
      if(M.data.param('recipeYn') == 'Y'){
        MNet.sendHttp({
          path : SERVER_PATH.RECIPE_UPDEATE,
          data: {
            "recipeContent": content,
            "goodsNum":M.data.param("goodsNum"),
            "list": fbody
          },
          succ: function(data){
            if(data.rsltCode == '0000'){
              var pagelist = M.info.stack();
              console.log(pagelist);
              M.page.remove(pagelist[1].key);
              alert('레시피 수정 완료');
              M.page.replace('./menuList.html');
            }else{
              return alert('레시피 수정에 실패하셨습니다.');
            }
          }
        });
      }else{
        MNet.sendHttp({
          path : SERVER_PATH.RECIPE_REGIST,
          data: {
            "recipeContent": content,
            "goodsNum":M.data.param("goodsNum"),
            "list": fbody
          },
          succ: function(data){
            if(data.rsltCode == '0000'){
              var pagelist = M.info.stack();
              console.log(pagelist);
              M.page.remove(pagelist[1].key);
              alert('레시피 등록 완료');
              M.page.replace('./menuList.html');
            }else{
              return alert('레시피 등록에 실패하셨습니다.');
            }
          }
        });
      }
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