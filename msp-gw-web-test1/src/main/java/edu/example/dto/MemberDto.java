package edu.example.dto;

import java.sql.Date;

public class MemberDto {
	
	private String loginId;
	private String password;	
	private String userNm;
	private String birthDate;
	private String gender;	
	private String cellPhone;	
	private String email;
	private Date regDate;
	
	public String toString() {
		return 	"loginId="+loginId
			+	"\n password="+password
			+	"\n userNm="+userNm
			+	"\n birthDate="+birthDate
			+	"\n gender="+gender
			+	"\n cellPhone="+cellPhone
			+	"\n email="+email
			+	"\n regDate="+regDate;
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

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	
}
