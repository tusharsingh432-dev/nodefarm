module.exports = (cardTemplate, el) => {
    let card = cardTemplate.replace(/{%PRODUCTNAME%}/g, el.productName);
    card = card.replace(`{%QUANTITY%}`, el.quantity);
    card = card.replace(/{%FROM%}/g, el.from);
    card = card.replace(`{%ID%}`, el.id);
    card = card.replace(/{%IMAGE%}/g, el.image);
    card = card.replace(/{%NUTRIENTS%}/g, el.nutrients);
    card = card.replace(`{%NOT_ORGANIC%}`, el.organic ? `` : `not-organic`);
    card = card.replace(/{%DESCRIPTION%}/g, el.description);
    card = card.replace(/{%PRICE%}/g, el.price);
    return card;
}