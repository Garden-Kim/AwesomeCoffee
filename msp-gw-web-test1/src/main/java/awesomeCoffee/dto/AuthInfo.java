package awesomeCoffee.dto;

public class AuthInfo {
	
	private String loginId;
	private String password;
	private String grade;
	@Override
	public String toString() {
		return "AuthInfo [loginId=" + loginId + ", password=" + password + ", grade=" + grade + "]";
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
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	
	

}
