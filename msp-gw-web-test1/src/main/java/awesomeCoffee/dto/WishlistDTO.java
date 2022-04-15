package awesomeCoffee.dto;

import java.sql.Date;

public class WishlistDTO {
	private String memberNum;
	private String goodsNum;
	private Date wishlistDate ;
	private String goodsName;
	private String goodsPrice;
	private String goodsImage;
	
	@Override
	public String toString() {
		return "WishlistDTO [memberNum=" + memberNum + ", goodsNum=" + goodsNum + ", wishlistDate=" + wishlistDate
				+ ", goodsName=" + goodsName + ", goodsPrice=" + goodsPrice + ", goodsImage=" + goodsImage + "]";
	}
	public String getMemberNum() {
		return memberNum;
	}
	public void setMemberNum(String memberNum) {
		this.memberNum = memberNum;
	}
	public String getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
	}
	public Date getWishlistDate() {
		return wishlistDate;
	}
	public void setWishlistDate(Date wishlistDate) {
		this.wishlistDate = wishlistDate;
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
	public String getGoodsImage() {
		return goodsImage;
	}
	public void setGoodsImage(String goodsImage) {
		this.goodsImage = goodsImage;
	}
	
	

	
}
