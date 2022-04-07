package awesomeCoffee.dto;

public class MemberDTO {
	
	private String memberNum;
	private String memberName;	
	private String memberPhone;
	private String memberId;
	private String memberPw;	
	private String memberEmail;	
	
	public String toString() {
		return 	"memberNum="+memberNum
			+	"\n memberName="+memberName
			+	"\n memberPhone="+memberPhone
			+	"\n memberId="+memberId
			+	"\n memberPw="+memberPw
			+	"\n memberEmail="+memberEmail;
	}

	public String getMemberNum() {
		return memberNum;
	}

	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberPhone() {
		return memberPhone;
	}

	public void setMemberPhone(String memberPhone) {
		this.memberPhone = memberPhone;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getMemberPw() {
		return memberPw;
	}

	public void setMemberPw(String memberPw) {
		this.memberPw = memberPw;
	}

	public String getMemberEmail() {
		return memberEmail;
	}

	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}
}
