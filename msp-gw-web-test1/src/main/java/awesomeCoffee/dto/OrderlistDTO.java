package awesomeCoffee.dto;

public class OrderlistDTO {
	private String orderNum;
	private String goodsNum;
	private String orderlistQty;
	private String orderlistSum;
	
	@Override
	public String toString() {
		return "OrderlistDTO [orderNum=" + orderNum + ", goodsNum=" + goodsNum + ", orderlistQty=" + orderlistQty
				+ ", orderlistSum=" + orderlistSum + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	public String getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}
	public String getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
	}
	public String getOrderlistQty() {
		return orderlistQty;
	}
	public void setOrderlistQty(String orderlistQty) {
		this.orderlistQty = orderlistQty;
	}
	public String getOrderlistSum() {
		return orderlistSum;
	}
	public void setOrderlistSum(String orderlistSum) {
		this.orderlistSum = orderlistSum;
	}
	
	
	
	
	
}
