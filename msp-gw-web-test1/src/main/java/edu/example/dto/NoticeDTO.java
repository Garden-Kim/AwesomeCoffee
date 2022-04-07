package edu.example.dto;

import java.sql.Date;

public class NoticeDTO {
	private String loginId;
	private String title;	
	private String content;
	private String seqNo;
	private String imgUrl;
	private Date regDate;
	
	
	public String toString() {
		return 	"loginId="+loginId
			+	"\n title="+title
			+	"\n content="+content
			+	"\n seqNo="+seqNo
			+	"\n imgUrl="+imgUrl
			+	"\n regDate="+regDate;
	}


	public String getLoginId() {
		return loginId;
	}


	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public String getSeqNo() {
		return seqNo;
	}


	public void setSeqNo(String seqNo) {
		this.seqNo = seqNo;
	}


	public String getImgUrl() {
		return imgUrl;
	}


	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}


	public Date getRegDate() {
		return regDate;
	}


	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	
}
