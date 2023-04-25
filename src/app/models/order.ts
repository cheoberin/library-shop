export class Order {
    customerId: string;
    customerName: string;
    status: string;
    phone: string;
    addressId: string;
    orderItemsList: OrderItem[];

    constructor(
        customerId: string,
        customerName: string,
        status: string,
        phone: string,
        addressId: string,
        orderItemsList: OrderItem[]
    ) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.status = status;
        this.phone = phone;
        this.addressId = addressId;
        this.orderItemsList = orderItemsList;
    }
}

export class OrderItem {
    bookId: string;
    bookName: string;
    price: number;
    quantity: number;

    constructor(bookId: string, bookName: string, price: number, quantity: number) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.price = price;
        this.quantity = quantity;
    }
}