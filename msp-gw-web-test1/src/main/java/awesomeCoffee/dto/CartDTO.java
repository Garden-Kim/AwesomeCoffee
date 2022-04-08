package awesomeCoffee.dto;

public class CartDTO {
	private String memberNum;
	private String goodsNum;
	private String qty ;
	@Override
	public String toString() {
		return "CartDTO [memberNum=" + memberNum + ", goodsNum=" + goodsNum + ", qty=" + qty + "]";
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
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}


}
