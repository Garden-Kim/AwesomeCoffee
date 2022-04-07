package awesomeCoffee.dto;

public class AuthInfo {
	
	private String memberId;
	private String memberPw;
	
	public String toString() {
		return 	"memberId="+memberId
			+	"\n memberPw="+memberPw;
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


}
