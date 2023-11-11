import { createCategory } from "../app/category";
import { createProduct } from "../app/product";
import { categories, products } from "./data";
import { app, cart_box, category, categoryList, product_list, search_box, search_btn, search_input } from "./selector"

export const cardBtnHandler = () => {
    cart_box.classList.toggle("translate-x-full")
    !cart_box.classList.contains("duration-300") && cart_box.classList.add("duration-300")
};

export const categoryRender = (categoryArray) => {

    // for (let el of categoryArray) {
    //     categoryList.append(createCategory(el))
    // };

    categoryArray.forEach(element => {
        categoryList.append(createCategory(element))
    });

};

export const productRender = (productArray) => {
    // productArray.forEach(el => {
    //     product_list.append(createProduct(el.title, el.description, el.price, el.rating))
    // })

    product_list.innerHTML = "";


    productArray.forEach(el => {
        product_list.append(createProduct(el))
    })
};

export const search_btn_Handler = () => {

    search_box.classList.toggle("opacity-0");
    search_box.classList.toggle("-translate-y-full");
    search_btn.classList.toggle("bg-secondary-700");
    search_btn.classList.toggle("text-neutral-200");
    search_input.focus();

};

export const search_input_Handler = (event) => {
    const keywords = search_input.value;
    const main = category.querySelector(".active");


    const for_keys = products.filter(
        (el) =>
            el.title.toLowerCase().search(keywords) != -1 ||
            el.description.toLowerCase().search(keywords) != -1
    )

    if (main.innerText == "All") {
        productRender(for_keys)
    } else {
        const res_new = main.innerText;
        const arry_new = [...products.filter(el => el.category == res_new)];
        const new_array_keys = arry_new.filter(
            (el) =>

                el.title.toLowerCase().search(keywords) != -1 ||
                el.description.toLowerCase().search(keywords) != -1

        )
        productRender(new_array_keys)
    }
};


export const search_del_btn_handler = (event) => {
    search_input.value = null;
    const main = category.querySelector(".active");

    console.log(main.innerText);
    if (main.innerText == "All") {
        productRender(products);
    } else {
        const res_new = main.innerText;
        const arry_new = [...products.filter(el => el.category == res_new)];

        productRender(arry_new)
    }
}

