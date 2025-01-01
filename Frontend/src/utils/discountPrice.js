export function discountedPrice(price, discount){
    const discountPrice = Math.ceil((Number(price) * Number(discount))/100);
    const actualPrice = Number(price) - Number(discountPrice);
    
    return actualPrice;
}