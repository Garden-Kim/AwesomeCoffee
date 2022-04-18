/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){
  var page = {
    els:  {
      $iptTitle : null,
      $menuSelect: null,
      $iptContent : null,
      $iptPrice : null,
      $iptKal : null,
      $iptImg : null,
      $btnLine : null,
      $btnPoint : null,
    },
    data: {
      title : '',
      content : '',
      imgPath : null,
      goodsNum : '',
    },
    init: function init(){
      this.els.$iptTitle = $('#ipt-title');
      this.els.$menuSelect = $('.menu-select');
      this.els.$iptContent = $('#ipt-content');
      this.els.$iptPrice = $('#ipt-price');
      this.els.$iptKal = $('#ipt-Kal');
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
      var gN = M.data.param('goodsName');
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      if(!module.isEmpty(gN)){
        MNet.sendHttp({
          path: SERVER_PATH.MENU_INFO,
          data: {
            "goodsName" : gN
          },
          succ: function (data) {
            console.log(data);
            $('#is-write').text('수정');
            self.els.$iptTitle.val(data.goodsName);
            self.els.$iptContent.val(data.goodsContent);
            self.els.$iptPrice.val(data.goodsPrice);
            self.els.$iptKal.val(data.goodsKal);
            self.els.$iptImg.val(data.originalFile);
            self.els.$menuSelect.val(data.categoryNum);
            self.data.imgPath = data.goodsImage;
            self.data.goodsNum = data.goodsNum;
            goodsNum = data.goodsNum;
            console.log(goodsNum);
            console.log(self.data.goodsNum);
            console.log(data.originalFile);
            console.log(self.data.imgPath);
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
      this.els.$btnLine.on('click', function(){
      // 이미지선택
        self.setImagePath();
      });
      this.els.$btnPoint.on('click', function(){
      // 작성버튼
        var gN = M.data.param('goodsName');
        var ctg = $('.menu-select').val();
        var title = self.els.$iptTitle.val().trim();
        var content = self.els.$iptContent.val().trim();
        var price = self.els.$iptPrice.val().trim();
        var kal = self.els.$iptKal.val().trim();
        var imgN = self.els.$iptImg.val().trim();
            console.log(goodsNum);
            console.log(self.data.goodsNum);
            console.log(self.data.imgPath);
        ////////////////////////////////////////// 수정
        if(!module.isEmpty(gN)){  // 수정
          if(module.isEmpty(title)){
            return alert('제품명을 입력해주세요.');
          }
          if(ctg == ''){
            return alert('카테고리를 선택해주세요.');
          }
          if(module.isEmpty(content)){
            return alert('설명을 입력해주세요.');
          }
          if(module.isEmpty(price)){
            return alert('가격을 설정해주세요.');
          }
          if(module.isEmpty(kal)){
            return alert('칼로리를 입력해주세요.');
          }
          console.log(imgN);
          if(module.isEmpty(imgN)){
            return alert('이미지를 선택해주세요.');
          }
/*          if(!module.isEmpty(self.data.imgPath)){ // 새로 이미지파일을 설정했다면
            self.modifyWithUpload(goodsNum, title, content, price, kal, ctg, self.data.imgPath);
          }else{ 
          ///////////////////////////////////////////////////////////////////오리지널명으로 교체*/
          self.modifyWithUpload(goodsNum, title, content, price, kal, ctg, self.data.imgPath);
//          }
        
        }else{
        ////////////////////////////////////////// 등록
          self.writeWithUpload();
        }
      });
      $('.l-fix').on('click', function(){
        M.page.back();
      });
    },
    ////////////////////////////////////////// 등록
    writeWithUpload: function writeWithUpload() {
      var self = this;
      var ctg = $('.menu-select').val();
      var title = self.els.$iptTitle.val().trim();
      var content = self.els.$iptContent.val().trim();
      var price = self.els.$iptPrice.val().trim();
      var kal = self.els.$iptKal.val().trim();
      var imgN = self.els.$iptImg.val().trim();
      var goodsImg = self.data.imgPath;
      if(module.isEmpty(title)){
        return alert('제품명을 입력해주세요.');
      }
      if(ctg == ''){
        return alert('카테고리를 선택해주세요.');
      }
      if(module.isEmpty(content)){
        return alert('설명을 입력해주세요.');
      }
      if(module.isEmpty(price)){
        return alert('가격을 설정해주세요.');
      }
      if(module.isEmpty(kal)){
        return alert('칼로리를 입력해주세요.');
      }
      if(module.isEmpty(imgN)){
        return alert('이미지를 선택해주세요.');
      }
      var body = [
        { name: "goodsImage", content: goodsImg, type: "FILE" },
        { name: "goodsContent", content: content, type: "TEXT" },
        { name: "goodsName", content: title, type: "TEXT" },
        { name: "goodsPrice", content: price, type: "TEXT" },
        { name: "goodsKal ", content: kal, type: "TEXT" },
        { name: "categoryNum", content: ctg, type: "TEXT" },
        { name: "originalFile", content: imgN, type: "TEXT" },
      ]
      console.log(body);
      MNet.fileHttpSend({
        path: SERVER_PATH.MENU_REGIST,
        body: body,
        succ: function (data) {
          console.log(data);
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          alert('등록 완료되었습니다.');
          M.page.replace('./menuempList.html');
        },
        progress: function (head) {
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          console.log(head);
          alert('등록 완료');
          M.page.replace('./menuempList.html');
        },
        error : function (head) {
          console.log(head);
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          alert('등록이 완료되었습니다.');
          M.page.replace('./menuempList.html');
        }
      })
    },  
    // 이미지 포함 
    modifyWithUpload: function modifyWithUpload(goodsNum, title, content, price, kal, ctg, goodsImg) {
      var self = this;
      var imgN = self.els.$iptImg.val().trim();
      var body = [
        { name: "goodsNum", content: goodsNum, type: "TEXT" },
        { name: "goodsImage", content: goodsImg, type: "FILE" },
        { name: "goodsContent", content: content, type: "TEXT" },
        { name: "goodsName", content: title, type: "TEXT" },
        { name: "goodsPrice", content: price, type: "TEXT" },
        { name: "goodsKal ", content: kal, type: "TEXT" },
        { name: "categoryNum", content: ctg, type: "TEXT" },
        { name: "originalFile", content: imgN, type: "TEXT" },
      ]
      console.log(body);
      MNet.fileHttpSend({
        path: SERVER_PATH.MENU_UPDATE_FILE,
        body: body,
        succ: function () {
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);    
          M.page.remove(pagelist[2].key);   
          alert('이미지를 포함한 상품 수정이 완료되었습니다.');
          M.page.replace('./menuList.html');  
        },
        progress: function () {
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);        
          M.page.remove(pagelist[2].key);
          alert('이미지 및 상품 수정이 완료되었습니다.');
          M.page.replace('./menuList.html');
        },
        error : function () {
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);        
          M.page.remove(pagelist[2].key);
          alert('상품 수정이 완료되었습니다.');
          M.page.replace('./menuList.html');
        }
      })
    },  
    setImagePath(){
      var self = this;
      M.media.picker({
        mode: "SINGLE",
        media: "PHOTO",
        column: 3,
        callback: function( status, result ) {
          if(status == 'SUCCESS'){
             self.data.imgPath = result.fullpath;      
             self.els.$iptImg.val(result.name);   
          }else{
            self.data.imgPath = null;
            self.els.$iptImg.val('');
          }
        }        
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