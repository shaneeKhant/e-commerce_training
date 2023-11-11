import Swal from "sweetalert2";
import { products } from "../core/data";
import { cart_body, cart_count_item_nav, cart_frg, cart_item_count, total_cost, } from "../core/selector"

export const createCart = ({ id, title, price, image }) => {
    const clone = cart_frg.content.cloneNode(true);
    const cart_image = clone.querySelector(".cart-item-img");
    const cart_price = clone.querySelector(".cart-item-price");
    const cart_title = clone.querySelector(".cart-item-title");
    const cart_main = clone.querySelector(".cart-item");
    const cart_cost = clone.querySelector(".cart-item-cost");


    cart_main.setAttribute("item-id", id);
    cart_image.src = image;
    cart_price.innerText = price;
    cart_title.innerText = title;
    cart_cost.innerText = price;




    return clone;

};

export const addToCart = (productId) => {

    const currentP_id = products.find(el => el.id == productId)


    cart_body.append(createCart(currentP_id))
};


export const cart_CostTotal = () => {
    const type = [...cart_body.querySelectorAll(".cart-item-cost")].reduce((pv, cv) => {

        return pv + parseFloat(cv.innerText)

    }, 0);

    return (type.toFixed(2))
}

export const cart_ItemTotal = () => {

    const count = cart_body.querySelectorAll(".cart-item").length;

    return (count);

}


export const cartObserver = () => {


    const process = () => {
        total_cost.innerText = cart_CostTotal();
        cart_count_item_nav.innerText = cart_ItemTotal();
        cart_item_count.innerText = cart_ItemTotal();
    };

    const options = {
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver(process);

    observer.observe(cart_body, options);
};


export const cart_del_handler = (id) => {

    const mainDiv = cart_body.querySelector(`[item-id='${id}'`);

    const mainId = mainDiv.getAttribute("item-id");

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            mainDiv.classList.add("animate__animated", "animate__hinge");
            mainDiv.addEventListener("animationend", () => { mainDiv.remove() })


            const product_card_main = app.querySelector(`[productid='${mainId}']`);
            const toggelBtn = product_card_main.querySelector("#cart_btn_add");
            toggelBtn.classList.remove("bg-secondary-700", "text-white");
            toggelBtn.innerText = "Add to cart";
            toggelBtn.disabled = false;



            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Deleted successfully!'
            })



        }
    })

};

// quality increase
export const item_increase = (id) => {
    const mainDiv_For_add = cart_body.querySelector(`[item-id="${id}"]`)
    const price = mainDiv_For_add.querySelector(".cart-item-price");
    const cost = mainDiv_For_add.querySelector(".cart-item-cost");
    const qua = mainDiv_For_add.querySelector(".amount-item");


    qua.innerText = parseInt(qua.innerText) + 1;

    cost.innerText = price.innerText * qua.innerText;
};

// quality decrease
export const item_decrease = (id) => {

    const mainDiv_For_minus = cart_body.querySelector(`[item-id="${id}"]`);
    const price = mainDiv_For_minus.querySelector(".cart-item-price");
    const cost = mainDiv_For_minus.querySelector(".cart-item-cost");
    const qua = mainDiv_For_minus.querySelector(".amount-item");

    if (qua.innerText > 1) {



        qua.innerText = parseInt(qua.innerText) - 1;

        cost.innerText = price.innerText * qua.innerText;

    }
};


export const cart_Delete = (event) => {

    if (event.target.classList.contains("cart-del-btn")) {

        const mainDiv = event.target.closest(".cart-item");
        const mainId = mainDiv.getAttribute("item-id");


        cart_del_handler(mainId);


        // add btn process
    } else if (event.target.classList.contains("btn-amount-add")) {
        // const prevSibiling = event.target.previousElementSibling;
        const mainDiv = event.target.closest(".cart-item");
        const mainId = mainDiv.getAttribute("item-id");

        item_increase(mainId);


        // minus btn process
    } else if (event.target.classList.contains("btn-amount-minus")) {
        // const nextSibiling = event.target.nextElementSibling;

        const mainDiv = event.target.closest(".cart-item");
        const mainId = mainDiv.getAttribute("item-id");

        item_decrease(mainId);

    };


}



