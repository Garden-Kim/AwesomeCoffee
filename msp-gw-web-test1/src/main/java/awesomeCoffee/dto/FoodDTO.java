package awesomeCoffee.dto;

public class FoodDTO {
	String foodNum; 
	String foodPrice;       
	String foodName;
	@Override
	public String toString() {
		return "FoodDto [foodNum=" + foodNum + ", foodPrice=" + foodPrice + ", foodName=" + foodName + "]";
	}
	public String getFoodNum() {
		return foodNum;
	}
	public void setFoodNum(String foodNum) {
		this.foodNum = foodNum;
	}
	public String getFoodPrice() {
		return foodPrice;
	}
	public void setFoodPrice(String foodPrice) {
		this.foodPrice = foodPrice.trim();
	}
	public String getFoodName() {
		return foodName;
	}
	public void setFoodName(String foodName) {
		this.foodName = foodName;
	} 
	
	
	
}
