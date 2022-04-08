package awesomeCoffee.dto;

import java.sql.Date;

public class PaymentDTO {
	@Override
	public String toString() {
		return "PaymentDTO [orderNum=" + orderNum + ", paymentKind=" + paymentKind + ", paymentDate=" + paymentDate
				+ ", paymentPrice=" + paymentPrice + "]";
	}
	private String orderNum;
	private String paymentKind;
	private Date paymentDate;
	private String paymentPrice;
	
	public String getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}
	public String getPaymentKind() {
		return paymentKind;
	}
	public void setPaymentKind(String paymentKind) {
		this.paymentKind = paymentKind;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public String getPaymentPrice() {
		return paymentPrice;
	}
	public void setPaymentPrice(String paymentPrice) {
		this.paymentPrice = paymentPrice;
	}

	
	
}
