package awesomeCoffee.dto;

import java.sql.Date;

public class PaymentDTO {
	
	private String orderNum;
	private String paymentKind;
	private Date paymentDate;
	private String paymentPrice;
	
	private String monthSum;
	private String month;
	
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
		this.paymentPrice = paymentPrice.trim();
	}
	public String getMonthSum() {
		return monthSum;
	}
	public void setMonthSum(String monthSum) {
		this.monthSum = monthSum;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	
	@Override
	public String toString() {
		return "PaymentDTO [orderNum=" + orderNum + ", paymentKind=" + paymentKind + ", paymentDate=" + paymentDate
				+ ", paymentPrice=" + paymentPrice + ", monthSum=" + monthSum + ", month=" + month + "]";
	}

	
}
