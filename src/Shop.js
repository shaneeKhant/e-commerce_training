import { cartObserver, cart_Delete } from "./app/cart";
import { category_btn_handler } from "./app/category";
import { addCart_handler } from "./app/product";
import { categories, products } from "./core/data";
import { cardBtnHandler, categoryRender, productRender, search_btn_Handler, search_del_btn_handler, search_input_Handler } from "./core/handler";
import { cart_body, cart_btn, cart_close_btn, categoryList, product_list, search_btn, search_del_btn, search_input } from "./core/selector";

class Shop {

    observer() {
        cartObserver();
    }


    intiRender() {
        categoryRender(categories);
        productRender(products);
    };


    listerers() {
        // card-box toggles 
        search_btn.addEventListener("click", search_btn_Handler);
        search_input.addEventListener("keyup", search_input_Handler);
        cart_btn.addEventListener("click", cardBtnHandler);
        cart_close_btn.addEventListener("click", cardBtnHandler);
        product_list.addEventListener("click", addCart_handler);
        cart_body.addEventListener("click", cart_Delete);
        categoryList.addEventListener("click", category_btn_handler);
        search_del_btn.addEventListener("click", search_del_btn_handler)

    }

    functions() {
    }


    init() {
        console.log("Start.......");
        this.observer();
        this.intiRender();
        this.listerers();
        this.functions();

    };
};

export default Shop;