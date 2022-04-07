package awesomeCoffee.dto;

import java.sql.Date;

public class WishlistDTO {
	private String memberNum;
	private String goodsNum;
	private Date wishlistDate ;

	@Override
	public String toString() {
		return "WishlistDTO [memberNum=" + memberNum + ", goodsNum=" + goodsNum + ", wishlistDate=" + wishlistDate
				+ "]";
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
	
}
