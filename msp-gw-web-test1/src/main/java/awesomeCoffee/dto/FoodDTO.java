package awesomeCoffee.dto;

public class FoodDTO {
	String foodNum; 
	int foodPrice;       
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
	public int getFoodPrice() {
		return foodPrice;
	}
	public void setFoodPrice(int foodPrice) {
		this.foodPrice = foodPrice;
	}
	public String getFoodName() {
		return foodName;
	}
	public void setFoodName(String foodName) {
		this.foodName = foodName;
	} 
	
	
	
}
