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
      imgPath : '',
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
      var sn = M.data.param('seqNo');
      console.log(sn);
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      if(!module.isEmpty(sn)){
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: id,
            seqNo	: sn,
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
      var foodNum = 1;
// 사이드바 
      $('.btn-menu').on('click', function () {
        console.log('메뉴클릭');
        $('.position').attr('style', 'position: absolute; top:0;right:0px;bottom:0;transition:1s ease;');
        $('.container').fadeTo("fast", 0.3);
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.container').fadeTo("fast", 1);
      });
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      $('#food-plus').on('click', function(){
        var items = "";
        items += "<div class='ipt-form-row plus-food' id="+foodNum +">"
        items += "<div class='select-box recipe-select'>"
        items +=   "<select name='catergory' >"
        items +=     "<option value=''>식자재 등록</option>"
        items +=     "<option value='커피(원두)'>커피(원두)</option>"
        items +=     "<option value='우유'>우유</option>"
        items +=     "<option value='초코시럽'>초코시럽</option>"
        items +=     "<option value='휘핑크림'>휘핑크림</option>"
        items +=   "</select>"
        items += "</div>"
        items += "<button class='btn-line' id='del' type='button' >"
        items +=   "식자재 삭제"
        items += "</button>"
        items += "</div>"
        $("#food-select").append(items);
      });
      foodNum = foodNum + 1;
      
      $("#food-select").on("click", "#del", function(){
        $(this).parent().remove();
      });
      
      this.els.$btnPoint.on('click', function(){
      // 작성버튼
        var title = self.els.$iptTitle.val().trim();
        var content = self.els.$iptContent.val().trim();
        var sn = M.data.param('seqNo');
        if(!module.isEmpty(sn)){
          if(module.isEmpty(title)){
            return alert('제목을 입력해주세요.');
          }
          if(module.isEmpty(content)){
            return alert('내용을 입력해주세요.');
          }
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
              path : SERVER_PATH.NOTICE_UPDATE,
              data: {
                loginId : M.data.global('id'),
                seqNo : sn,
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
          self.writeOk();
        }
      });
    },
    writeOk : function(){
      var self = this;
      var title = self.els.$iptTitle.val().trim();
      var content = self.els.$iptContent.val().trim();
      var imgN = self.els.$iptImg.val().trim();
      if(module.isEmpty(title)){
        return alert('제목을 입력해주세요.');
      }
      if(module.isEmpty(content)){
        return alert('내용을 입력해주세요.');
      }
      if(!module.isEmpty(imgN)){
        return alert('레시피관련 미완성');
      }else{
        MNet.sendHttp({
          path : SERVER_PATH.NOTICE_WRITE,
          data: {
            loginId : M.data.global('id'),
            title : title,
            content : content,
          },
          succ: function(data){
            if(data.rsltCode == '0000'){
              alert('등록 완료');
              var pagelist = M.info.stack();
              console.log(pagelist);
              M.page.remove(pagelist[1].key);
              M.page.replace('./list.html');
            }else{
              return alert('등록에 실패하셨습니다.');
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