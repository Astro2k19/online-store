
let sectionNameField = "sectionName";
let subsectionNameField = "subsectionName";
let productNameField = "productName";
let productDescrField = "productDescription";
let productAmountField = "productAmount";
let productPriceField = "productPrice";
let productImgField = "productImg";

let productImgPath = "/frontend/source/product/";

const product = {};

const selectSection = d3.select("#select-section");
const selectSubsection = d3.select("#select-subsection");

selectSection.on("change", () => {
    product[sectionNameField] = selectSection.property("value");

    selectSubsection.selectAll("*").remove();
    selectSubsection.append("option").text("Выберите подраздел").property("selected", true);

    switch (product[sectionNameField]) {
        case "Ноутбуки и компьютерная техника":
            selectSubsection.append("option").attr("value", "Ноутбуки").text("Ноутбуки");
            selectSubsection.append("option").attr("value", "Компьютеры, серверы").text("Компьютеры, серверы");
            selectSubsection.append("option").attr("value", "Комплектующие").text("Комплектующие");
            selectSubsection.append("option").attr("value", "Периферия").text("Периферия");
            break;
        case "Смартфоны и телефоны":
            selectSubsection.append("option").attr("value", "Смартфоны").text("Смартфоны");
            selectSubsection.append("option").attr("value", "Мобильные телефоны").text("Мобильные телефоны");
            selectSubsection.append("option").attr("value", "Планшеты").text("Планшеты");
            break;
        case "Бытовая техника":
            selectSubsection.append("option").attr("value", "Крупная бытовая техника").text("Крупная бытовая техника");
            selectSubsection.append("option").attr("value", "Встраиваемая техника").text("Встраиваемая техника");
            selectSubsection.append("option").attr("value", "Бытовая техника для дома").text("Бытовая техника для дома");
            break;
        default:
            console.log("default");
            break;
    }
});

selectSubsection.on("change", () => {
    product[subsectionNameField] = selectSubsection.property("value");
});



const productNameInput = d3.select("#product-name");
productNameInput.on("input", () => {
    product[productNameField] = productNameInput.property("value");
});

const productDescrInput = d3.select("#product-descr");
productDescrInput.on("input", () => {
    product[productDescrField] = productDescrInput.property("value");
});

const productAmountInput = d3.select("#product-amount");
productAmountInput.on("input", () => {
    product[productAmountField] = productAmountInput.property("value");
});

const productPriceInput = d3.select("#product-price");
productPriceInput.on("input", () => {
    product[productPriceField] = productPriceInput.property("value");
});


const productImgInput = d3.select("#product-img");
productImgInput.on("input", (event) => {
    console.log(productImgInput.node().files);
    product[productImgField] = productImgPath + productImgInput.node().files[0].name;
});


/*
d3.select("form").on("submit", (event) => {
    event.preventDefault();
    
});
*/
var answer
 const submitBtn = d3.select("#submit-btn");
 submitBtn.on("click", (event) => {

let url = '/addProduct'
let fetchData = {
method: 'POST',
body: JSON.stringify(product),
headers: { "Content-type": "application/json;charset=utf-8" }
}

fetch(url, fetchData)
    .then(response => response.json())
    .then(data => alert(data))
  // await location.reload()
 });
