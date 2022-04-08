package awesomeCoffee.dto;

public class RecipeDTO {
	
	
	String foodNum;   
	String goodsNum;   
	String recipeFoodQty;
	@Override
	public String toString() {
		return "RecipeDTO [foodNum=" + foodNum + ", goodsNum=" + goodsNum + ", recipeFoodQty=" + recipeFoodQty + "]";
	}
	public String getFoodNum() {
		return foodNum;
	}
	public void setFoodNum(String foodNum) {
		this.foodNum = foodNum;
	}
	public String getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
	}
	public String getRecipeFoodQty() {
		return recipeFoodQty;
	}
	public void setRecipeFoodQty(String recipeFoodQty) {
		this.recipeFoodQty = recipeFoodQty;
	}
	
	
}
