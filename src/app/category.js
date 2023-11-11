import { products } from "../core/data";
import { productRender } from "../core/handler";
import { categoryList, category_frg } from "../core/selector";

export const createCategory = (title) => {
    // const ctg = document.createElement("div")

    // ctg.innerHTML = `
    //  <button class="category-btn ">${title}</button>
    // `

    const clone = category_frg.content.cloneNode(true);
    const ctg = clone.querySelector("button");
    ctg.innerText = title;

    return ctg;

};

export const category_btn_handler = (event) => {
    if (event.target.classList.contains("category-btn")) {
        const active_remove = categoryList.querySelector(".active");
        active_remove.classList.remove("active");
        event.target.classList.add("active");
        const currentProduct = event.target.innerText;
        const result_item = products.filter(el => el.category == currentProduct || currentProduct == "All");
        productRender(result_item);
    }
}