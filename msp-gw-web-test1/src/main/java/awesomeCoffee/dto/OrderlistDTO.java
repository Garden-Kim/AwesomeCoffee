package awesomeCoffee.dto;

public class OrderlistDTO {
	private String orderNum;
	private String goodsNum;
	private String orderlistQty;
	private String orderlistSum;

	private String orderPrice;
	private String goodsName;
	private String goodsPrice;
	private String price;
	
	
	@Override
	public String toString() {
		return "OrderlistDTO [orderNum=" + orderNum + ", goodsNum=" + goodsNum + ", orderlistQty=" + orderlistQty
				+ ", orderlistSum=" + orderlistSum + ", orderPrice=" + orderPrice + ", goodsName=" + goodsName
				+ ", goodsPrice=" + goodsPrice + ", price=" + price + "]";
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
	public String getOrderPrice() {
		return orderPrice;
	}
	public void setOrderPrice(String orderPrice) {
		this.orderPrice = orderPrice;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public String getGoodsPrice() {
		return goodsPrice;
	}
	public void setGoodsPrice(String goodsPrice) {
		this.goodsPrice = goodsPrice;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	
	
	
	
	
	
	
}
