package awesomeCoffee.dto;

public class MemberOrderDTO {
	private String orderNum;
	private String orderPrice;
	private String orderTime;
	private String takeout ;
	private String memberNum;
	private String cookState;

	private String goodsNum;
	private String qty;
	private String priceSum;
	private String goodsName;
	private String goodsImage;
	
	@Override
	public String toString() {
		return "MemberOrderDTO [orderNum=" + orderNum + ", orderPrice=" + orderPrice + ", orderTime=" + orderTime
				+ ", takeout=" + takeout + ", memberNum=" + memberNum + ", cookState=" + cookState + ", goodsNum="
				+ goodsNum + ", qty=" + qty + ", priceSum=" + priceSum + ", goodsName=" + goodsName + ", goodsImage="
				+ goodsImage + "]";
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

	public String getGoodsNum() {
		return goodsNum;
	}

	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getPriceSum() {
		return priceSum;
	}

	public void setPriceSum(String priceSum) {
		this.priceSum = priceSum;
	}

	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	public String getGoodsImage() {
		return goodsImage;
	}

	public void setGoodsImage(String goodsImage) {
		this.goodsImage = goodsImage;
	}
	
	
	
	
	
}
