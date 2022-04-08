package awesomeCoffee.dto;


public class StoreDTO {
	String storeNum;  
	String storeName;  
	String storeAddr; 
	String storePhone;  
	String storeId;  
	String storePw; 
	String state;
	@Override
	public String toString() {
		return "StoreDto [storeNum=" + storeNum + ", storeName=" + storeName + ", storeAddr=" + storeAddr
				+ ", storePhone=" + storePhone + ", storeId=" + storeId + ", storePw=" + storePw + ", state=" + state
				+ "]";
	}
	public String getStoreNum() {
		return storeNum;
	}
	public void setStoreNum(String storeNum) {
		this.storeNum = storeNum;
	}
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public String getStoreAddr() {
		return storeAddr;
	}
	public void setStoreAddr(String storeAddr) {
		this.storeAddr = storeAddr;
	}
	public String getStorePhone() {
		return storePhone;
	}
	public void setStorePhone(String storePhone) {
		this.storePhone = storePhone;
	}
	public String getStoreId() {
		return storeId;
	}
	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}
	public String getStorePw() {
		return storePw;
	}
	public void setStorePw(String storePw) {
		this.storePw = storePw;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}   
}
