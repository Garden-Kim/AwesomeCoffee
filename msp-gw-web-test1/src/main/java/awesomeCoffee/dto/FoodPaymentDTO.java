package awesomeCoffee.dto;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FoodPaymentDTO {

	
	String foodPaymentNum; 
	String storeNum; 
	int foodPaymentPrice;       
	Date foodPaymentDate;
	@Override
	public String toString() {
		return "FoodPaymentDTO [foodPaymentNum=" + foodPaymentNum + ", storeNum=" + storeNum + ", foodPaymentPrice="
				+ foodPaymentPrice + ", foodPaymentDate=" + foodPaymentDate + "]";
	}
	public String getFoodPaymentNum() {
		return foodPaymentNum;
	}
	public void setFoodPaymentNum(String foodPaymentNum) {
		this.foodPaymentNum = foodPaymentNum;
	}
	public String getStoreNum() {
		return storeNum;
	}
	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
	public int getFoodPaymentPrice() {
		return foodPaymentPrice;
	}
	public void setFoodPaymentPrice(int foodPaymentPrice) {
		this.foodPaymentPrice = foodPaymentPrice;
	}
	public String getFoodPaymentDate() {
		DateFormat date = new SimpleDateFormat("yyyy-MM-dd");
		String strDate = date.format(foodPaymentDate);
		return strDate;
	}
	public void setFoodPaymentDate(Date foodPaymentDate) {
		this.foodPaymentDate = foodPaymentDate;
	} 
	
	
}
