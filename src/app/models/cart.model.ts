export interface CartItem{
    bookCover: string;
    name:string;
    price:number;
    quantity:number;
    id:string;
}

export interface Cart{
    items:Array<CartItem>;
}