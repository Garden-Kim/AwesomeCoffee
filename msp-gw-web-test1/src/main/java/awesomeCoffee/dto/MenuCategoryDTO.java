package awesomeCoffee.dto;


public class MenuCategoryDTO {
	
	private String categoryName;
	private String categoryContent;
	private String categoryNum;
	
	@Override
	public String toString() {
		return "MenuCategoryDTO [categoryName=" + categoryName + ", categoryContent=" + categoryContent
				+ ", categoryNum=" + categoryNum + "]";
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryContent() {
		return categoryContent;
	}

	public void setCategoryContent(String categoryContent) {
		this.categoryContent = categoryContent;
	}

	public String getCategoryNum() {
		return categoryNum;
	}

	public void setCategoryNum(String categoryNum) {
		this.categoryNum = categoryNum;
	}

	


}
