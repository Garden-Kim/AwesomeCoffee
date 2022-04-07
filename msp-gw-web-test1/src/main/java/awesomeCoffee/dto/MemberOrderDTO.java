package awesomeCoffee.dto;

public class MemberOrderDTO {
	private String orderNum;
	private String orderPrice;
	private String orderTime;
	private String takeout ;
	private String memberNum;
	
	public String toString() {
		return 	"orderNum="+orderNum
			+	"\n orderPrice="+orderPrice
			+	"\n orderTime="+orderTime
			+	"\n takeout="+takeout
			+	"\n memberNum="+memberNum;
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
}
