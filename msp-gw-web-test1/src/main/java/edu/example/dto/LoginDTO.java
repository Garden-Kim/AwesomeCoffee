package edu.example.dto;

public class LoginDTO {
	
	private String loginId;
	private String password;
	
	public String toString() {
		return 	"loginId="+loginId
			+	"\n password="+password;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
