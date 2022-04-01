/**
 * @file : 게시글 작성
 * @author : 김정원
 * @date :  2022-03-25
 */
// 페이지단위 모듈
(function ($, M, MNet, SERVER_PATH, window) {
  var id;
  var seqNum;
  var element_layer = document.getElementById('layer');
  var page = {
    els: {
      $btnBack: null,
      $btnWrite: null,
      $titleIpt: null,
      $contentIpt: null,
      $img: null,
      $btnLine: null,

    },
    data: {},
    init: function init() {
      if (M.data.storage("AUTO_LOGIN_AUTH")) {
        id = M.data.storage("AUTO_LOGIN_AUTH").id;
      } else {
        id = M.data.global("userId");
      }

      this.els.$btnBack = $('.btn-back');
      this.els.$btnWrite = $('.btn-point-color');
      this.els.$titleIpt = $('#title');
      this.els.$contentIpt = $('#content');
      this.els.$btnLine = $('.btn-line');
      this.els.$addr = $('#addr');
    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      if (M.data.param('seqNum')) {
        seqNum = M.data.param('seqNum');
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: id,
            seqNo: seqNum,
          },
          succ: function (data) {
            if (data.isMyNoticeYn != 'Y') {
              $('.btn-wrap').hide();
            }
            if (data.imgUrl) {
              var split = data.imgUrl.lastIndexOf('/');
              var imgName = data.imgUrl.toString().substring(split + 1, );
              $('#addr').val(imgName);
            }
            $('#title').val(data.title);
            $('#content').val(data.content);
          }
        });
      }
    


    },
    initEvent: function initEvent() {
      // initEvent 바인딩
      var self = this;
      $('#btnCloseLayer').on('click', function(){
        element_layer.style.display = 'none';
      });
      self.els.$btnBack.on('click', function () {
        M.page.back();
      });
      self.els.$btnWrite.on('click', function () {
        self.write();
      });
      self.els.$btnLine.on('click', function () {
        self.getAddr();
      });
    },

    write: function () {
      var title = this.els.$titleIpt.val().trim();
      var content = this.els.$contentIpt.val().trim();
      if (title == '') {
        return alert("제목을 입력해주세요.");
      }
      if (content == '') {
        return alert("내용을 입력해주세요.");
      }
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_WRITE,
        data: {
          loginId: id,
          title: title,
          content: content,

        },
        succ: function (data) {

          M.page.html("./list.html");

        },

      });
    },
    getAddr: function () {
      var self = this;
      new daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                
            
            } else {
               
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("content").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_layer.style.display = 'none';
        },
        width : '100%',
        height : '100%',
        maxSuggestItems : 5
    }).embed(element_layer);
    
    // iframe을 넣은 element를 보이게 한다.
    element_layer.style.display = 'block';

    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
    self.initLayerPosition();
      

    },
    initLayerPosition:function initLayerPosition(){
      var width = 300; //우편번호서비스가 들어갈 element의 width
      var height = 400; //우편번호서비스가 들어갈 element의 height
      var borderWidth = 5; //샘플에서 사용하는 border의 두께

      // 위에서 선언한 값들을 실제 element에 넣는다.
      element_layer.style.width = width + 'px';
      element_layer.style.height = height + 'px';
      element_layer.style.border = borderWidth + 'px solid';
      // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
      element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
      element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
  },
    writeWithUpload: function writeWithUpload(imgPath) {
      var self = this;
      var title = self.els.$titleIpt.val().trim();
      var content = self.els.$contentIpt.val().trim();

      if (title == '') {
        return alert("제목을 입력해주세요.");
      }
      if (content == '') {
        return alert("내용을 입력해주세요.");
      }
      var body = [{
          name: "file",
          content: imgPath,
          type: "FILE"
        },
        {
          name: "content",
          content: content,
          type: "TEXT"
        },
        {
          name: "title",
          content: title,
          type: "TEXT"
        },
        {
          name: "loginId",
          content: id,
          type: "TEXT"
        },
      ]
      // { content: "파일업로드", type: "TEXT" },
      // { name: "imgs", content: "test.zip", type: "FILE" },
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_WRITE_IMG,
        body: body,
        succ: function () {
          alert('성공~');
          console.log(arguments);
          M.page.replace({
            url: './list.html',
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        progress: function () {
          console.log(arguments);
        },
        error: function () {
          alert('실패');
        }
      })
    },
    updateWithUpload: function updateWithUpload(imgPath) {
      var self = this;
      var title = self.els.$titleIpt.val().trim();
      var content = self.els.$contentIpt.val().trim();

      if (title == '') {
        return alert("제목을 입력해주세요.");
      }
      if (content == '') {
        return alert("내용을 입력해주세요.");
      }
      var body = [{
          name: "file",
          content: imgPath,
          type: "FILE"
        },
        {
          name: "content",
          content: content,
          type: "TEXT"
        },
        {
          name: "title",
          content: title,
          type: "TEXT"
        },
        {
          name: "loginId",
          content: id,
          type: "TEXT"
        },
        {
          name: "seqNo",
          content: seqNum,
          type: "TEXT"
        },
      ]
      // { content: "파일업로드", type: "TEXT" },
      // { name: "imgs", content: "test.zip", type: "FILE" },
      $.fileHttpSend({
        path: SERVER_PATH.NOTICE_UPDATE_IMG,
        body: body,
        succ: function () {
          alert('업데이트성공~');
          console.log(arguments);
          M.page.replace({
            url: './detail.html',
            param: {
              'seqNum': seqNum
            },
          });
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
        },
        progress: function () {
          console.log(arguments);
        },
        error: function () {
          alert('업데이트실패');
        }
      })
    },

  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __serverpath__, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
  });
})(jQuery, M, __page__, window);