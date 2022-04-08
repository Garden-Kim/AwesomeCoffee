package awesomeCoffee.dto;

public class MemberOrderDTO {
	private String orderNum;
	private String orderPrice;
	private String orderTime;
	private String takeout ;
	private String memberNum;
	private String cookState;
	@Override
	public String toString() {
		return "MemberOrderDTO [orderNum=" + orderNum + ", orderPrice=" + orderPrice + ", orderTime=" + orderTime
				+ ", takeout=" + takeout + ", memberNum=" + memberNum + ", cookState=" + cookState + "]";
	}
	public String getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}
	public String getOrderPrice() {
		return orderPrice;
	}
	public void setOrderPrice(String orderPrice) {
		this.orderPrice = orderPrice;
	}
	public String getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}
	public String getTakeout() {
		return takeout;
	}
	public void setTakeout(String takeout) {
		this.takeout = takeout;
	}
	public String getMemberNum() {
		return memberNum;
	}
	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}
	public String getCookState() {
		return cookState;
	}
	public void setCookState(String cookState) {
		this.cookState = cookState;
	} 
	
	
	
}
