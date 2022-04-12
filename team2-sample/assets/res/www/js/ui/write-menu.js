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
      imgPath : '',
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
      var gN = M.data.param('goodsNum');
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      if(!module.isEmpty(gN)){
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId : id,
            goodsNum : gN,
          },
          succ: function (data) {
            self.els.$iptTitle.val(data.title);
            self.els.$iptContent.val(data.content);
            if(!module.isEmpty(data.imgUrl)){
              self.els.$iptImg.val(data.imgUrl.substring(data.imgUrl.lastIndexOf("/")+1));
            }
            console.log(data.imgUrl)
            console.log(self.els.$iptImg.val());
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
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      this.els.$btnLine.on('click', function(){
      // 이미지선택
        self.setImagePath();
      });
      this.els.$btnPoint.on('click', function(){
      // 작성버튼
        var gN = M.data.param('goodsNum');
        var ctg = $('.menu-select').val();
        var title = self.els.$iptTitle.val().trim();
        var content = self.els.$iptContent.val().trim();
        var price = self.els.$iptPrice.val().trim();
        var kal = self.els.$iptKal.val().trim();
        var imgN = self.els.$iptImg.val().trim();
        var imgPath = "/storage/emulated/0/Pictures/" + imgN;
        if(!module.isEmpty(gN)){  // 수정
          if(module.isEmpty(title)){
            return alert('제목을 입력해주세요.');
          }
          if(module.isEmpty(content)){
            return alert('내용을 입력해주세요.');
          }
          console.log(imgN);
          console.log(self.data.imgPath);
          if(!module.isEmpty(self.els.$iptImg)){
            if(!module.isEmpty(self.data.imgPath)){ // 새로 이미지파일을 설정했다면
              self.modifyWithUpload(title, content, self.data.imgPath);
            }else{ // 기존 등록한 이미지를 사용하려면
            ////////////////////////////주소 조정 필요
              self.modifyWithUpload(title, content, imgPath);
            }
          }else{
            MNet.sendHttp({
              path : SERVER_PATH.MENU_UPDATE,
              data: {
                loginId : M.data.global('id'),
                title : title,
                content : content,
              },
              succ: function(data){
                if(data.rsltCode == '0000'){
                  alert('수정 완료');
                  var pagelist = M.info.stack();
                  M.page.remove(pagelist[1].key);
                  M.page.replace('./list.html');
                }else{
                  return alert('수정에 실패하셨습니다.');
                }
              }
            });          
          }
        
        }else{
          self.writeWithUpload();
        }
      });
    },
    writeWithUpload: function writeWithUpload() {
      var self = this;
      var ctg = $('.menu-select').val();
      var title = self.els.$iptTitle.val().trim();
      var content = self.els.$iptContent.val().trim();
      var price = self.els.$iptPrice.val().trim();
      var kal = self.els.$iptKal.val().trim();
      var imgN = self.els.$iptImg.val().trim();
      var imgPath = "/storage/emulated/0/Pictures/" + imgN;
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
      var body = [
        { name: "goodsImage", content: goodsImg, type: "FILE" },
        { name: "goodsContent", content: content, type: "TEXT" },
        { name: "goodsName", content: title, type: "TEXT" },
        { name: "goodsPrice", content: price, type: "TEXT" },
        { name: "goodsKal ", content: kal, type: "TEXT" },
        { name: "categoryNum", content: ctg, type: "TEXT" },
      ]
      console.log(body);
      MNet.fileHttpSend({
        path: SERVER_PATH.MENU_REGIST,
        body: body,
        succ: function (head) {
          console.log(head);
         
          alert('이미지를 포함한 상품 등록이 완료되었습니다.');
          /*M.page.replace('./menuList.html');
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);*/
        },
        progress: function (head) {
          console.log(head);
          console.log(status);
        },
        error : function (head) {
          console.log(head);
          alert('등록 에러!');
        }
      })
    },  
    // 이미지 포함 
    modifyWithUpload: function modifyWithUpload(title, content, imgPath) {
      var sn = M.data.param('seqNo');
      var body = [//////////////////////
        { name: "file", content: imgPath, type: "FILE" },
        { name: "content", content: content, type: "TEXT" },
        { name: "title", content: title, type: "TEXT" },
        { name: "loginId", content: M.data.global('id'), type: "TEXT" },
        { name: "seqNo", content: sn, type: "TEXT" },
      ]
      console.log(body);
      MNet.fileHttpSend({
        path: SERVER_PATH.MENU_UPDATE_FILE,
        body: body,
        succ: function () {
          alert('이미지를 포함한 상품 수정이 완료되었습니다.');
          M.page.replace('./menulist.html');
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);       
        },
        progress: function () {
          console.log(head);
          console.log(status);
        },
        error : function () {
          console.log(head);
          alert('수정 에러!');
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