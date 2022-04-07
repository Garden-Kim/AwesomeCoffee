package awesomeCoffee.dto;


public class MenuDTO {
	
	private String goodsNum;
	private String goodsName;
	private String goodsPrice;
	private String goodsContent;
	private String goodsImage;
	private String goodsKal;
	private String storeNum;
	private String categoryNum;
	private String originalFile;
	
	
	@Override
	public String toString() {
		return "MenuDTO [goodsNum=" + goodsNum + ", goodsName=" + goodsName + ", goodsPrice=" + goodsPrice
				+ ", goodsContent=" + goodsContent + ", goodsImage=" + goodsImage + ", goodsKal=" + goodsKal
				+ ", storeNum=" + storeNum + ", categoryNum=" + categoryNum + ", originalFile=" + originalFile + "]";
	}
	public String getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(String goodsNum) {
		this.goodsNum = goodsNum;
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
	public String getGoodsContent() {
		return goodsContent;
	}
	public void setGoodsContent(String goodsContent) {
		this.goodsContent = goodsContent;
	}
	public String getGoodsImage() {
		return goodsImage;
	}
	public void setGoodsImage(String goodsImage) {
		this.goodsImage = goodsImage;
	}
	public String getGoodsKal() {
		return goodsKal;
	}
	public void setGoodsKal(String goodsKal) {
		this.goodsKal = goodsKal;
	}
	public String getStoreNum() {
		return storeNum;
	}
	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
	public String getCategoryNum() {
		return categoryNum;
	}
	public void setCategoryNum(String categoryNum) {
		this.categoryNum = categoryNum;
	}
	public String getOriginalFile() {
		return originalFile;
	}
	public void setOriginalFile(String originalFile) {
		this.originalFile = originalFile;
	}
	
	

}
