package awesomeCoffee.dto;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StoreOrderDTO {
	
	String storeOrderNum;
	String storeNum;
	String foodNum;
	int storeOrderQty;
	Date storeOrderDate;
	int storeOrderPrice;
	@Override
	public String toString() {
		return "StoreOrderDTO [storeOrderNum=" + storeOrderNum + ", storeNum=" + storeNum + ", foodNum=" + foodNum
				+ ", storeOrderQty=" + storeOrderQty + ", storeOrderDate=" + storeOrderDate + ", storeOrderPrice="
				+ storeOrderPrice + "]";
	}
	public String getStoreOrderNum() {
		return storeOrderNum;
	}
	public void setStoreOrderNum(String storeOrderNum) {
		this.storeOrderNum = storeOrderNum;
	}
	public String getStoreNum() {
		return storeNum;
	}
	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
	public String getFoodNum() {
		return foodNum;
	}
	public void setFoodNum(String foodNum) {
		this.foodNum = foodNum;
	}
	public int getStoreOrderQty() {
		return storeOrderQty;
	}
	public void setStoreOrderQty(int storeOrderQty) {
		this.storeOrderQty = storeOrderQty;
	}
	public String getStoreOrderDate() {
		DateFormat date = new SimpleDateFormat("yyyy-MM-dd");
		String strDate = date.format(storeOrderDate);
		return strDate;
	}
	public void setStoreOrderDate(Date storeOrderDate) {
		this.storeOrderDate = storeOrderDate;
	}
	public int getStoreOrderPrice() {
		return storeOrderPrice;
	}
	public void setStoreOrderPrice(int storeOrderPrice) {
		this.storeOrderPrice = storeOrderPrice;
	}
	
	
	
	
	
}
