import { products } from "../core/data";
import { app, cart_body, cart_box, cart_btn, product_frg } from "../core/selector"
import { addToCart, createCart } from "./cart";

export const createProduct = ({ id, title, description, price, rating: { rate, count }, image }) => {
    const clone = product_frg.content.cloneNode(true);
    const product_card_UI = clone.querySelector(".product-card");


    const img = clone.querySelector("img");
    const card_title = clone.querySelector(".card-title");
    const card_body_text = clone.querySelector(".card-body-text");
    const main_price = clone.querySelector(".main-price");
    const rating_text = clone.querySelector(".rating-text");
    const rating_stars = clone.querySelector(".rating-stars");
    const add_card = clone.querySelector(".add-card");


    product_card_UI.setAttribute("productId", id)
    card_title.innerText = title;
    card_body_text.innerText = description;
    main_price.innerText = price;
    rating_text.innerText = ` ( ${rate} / ${count} ) `;
    img.src = image;
    rating_stars.innerHTML = ratingStars(rate);

    const isExist = cart_body.querySelector(`[item-id='${id}']`);

    if (isExist) {
        add_card.classList.add("bg-secondary-700", "text-white");
        add_card.innerText = "Added";
        add_card.disabled = true;
    }


    return product_card_UI;

};

export const ratingStars = (rate) => {

    let starUI = "";

    for (let i = 1; i <= 5; i++) {
        starUI += `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6  h-6 stroke-secondary-500 ${i <= rate.toFixed(0) && "fill-secondary-300"}">
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
        `
    }

    return starUI;

};


export const addCart_handler = (event) => {

    if (event.target.classList.contains("add-card")) {
        const mainDiv = event.target.closest(".product-card");
        const divID = mainDiv.getAttribute("productId");

        const add_btn = mainDiv.querySelector("#cart_btn_add");


        const currentImg = mainDiv.querySelector(".product-image");
        const current_img_pos = currentImg.getBoundingClientRect();
        const cart_btn_pos = cart_btn.getBoundingClientRect();
        const newImage = new Image();
        newImage.src = currentImg.src;
        newImage.classList.add("fixed", "h-32", "z-50");
        app.append(newImage);
        newImage.style.top = current_img_pos.top + "px";
        newImage.style.left = current_img_pos.left + "px";


        let keyframe;

        if (cart_box.classList.contains("translate-x-full")) {
            keyframe = [{
                top: current_img_pos.top + "px",
                left: current_img_pos.left + "px",
            },
            {
                top: cart_btn_pos.top + 10 + "px",
                left: cart_btn_pos.left + 10 + "px",
                height: 10 + "px",
                rotate: "2turn",
            }
            ];
        } else {

            const lastchild_position = document.querySelector(".cart-item:last-child")?.getBoundingClientRect();

            const def_top = lastchild_position ? lastchild_position.top + 30 : cart_body.getBoundingClientRect().top;
            const def_left = lastchild_position ? lastchild_position.left + 30 : cart_body.getBoundingClientRect().left;

            keyframe = [{
                top: current_img_pos.top + "px",
                left: current_img_pos.left + "px",
            },
            {
                top: def_top + "px",
                left: def_left + "px",
                height: 10 + "px",
                rotate: "2turn",
            }
            ];
        }

        const options = {
            duration: 500,
            iterations: 1,
            fill: "both",

        };

        const animate_Image = newImage.animate(keyframe, options);
        animate_Image.addEventListener("finish", () => {

            newImage.remove();
            addToCart(divID);

            cart_btn.classList.add("animate__tada");
            cart_btn.addEventListener("animationend", () => {
                cart_btn.classList.remove("animate__tada");

            })
        })

        add_btn.classList.add("bg-secondary-700", "text-white");
        add_btn.innerText = "Added";
        add_btn.disabled = true;

    }

}

