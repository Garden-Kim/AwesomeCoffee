package awesomeCoffee.dto;

import java.sql.Date;

public class StoreOrderDTO {
	
	String storeOrderNum;
	String storeNum;
	String foodNum;
	String foodName;
	int storeOrderQty;
	Date storeOrderDate;
	int storeOrderPrice;
	String listPrice;
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
	public String getFoodName() {
		return foodName;
	}
	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}
	public int getStoreOrderQty() {
		return storeOrderQty;
	}
	public void setStoreOrderQty(int storeOrderQty) {
		this.storeOrderQty = storeOrderQty;
	}
	public Date getStoreOrderDate() {
		return storeOrderDate;
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
	public String getListPrice() {
		return listPrice;
	}
	public void setListPrice(String listPrice) {
		this.listPrice = listPrice;
	}
	@Override
	public String toString() {
		return "StoreOrderDTO [storeOrderNum=" + storeOrderNum + ", storeNum=" + storeNum + ", foodNum=" + foodNum
				+ ", foodName=" + foodName + ", storeOrderQty=" + storeOrderQty + ", storeOrderDate=" + storeOrderDate
				+ ", storeOrderPrice=" + storeOrderPrice + ", listPrice=" + listPrice + "]";
	}
	

	
}
