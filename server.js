const nightMare = require('nightmare')()

checkPrice()


async function checkPrice(){
    try{
        
        const priceString =  await nightMare.goto("https://www.amazon.in/Galaxy-Watch4-Classic-4-6cm-Black/dp/B09DG7YQR1")
                                            .wait("#corePriceDisplay_desktop_feature_div")
                                            .evaluate(()=>
                                                document.getElementById("corePriceDisplay_desktop_feature_div").innerText)
                                            .end()

        const regex = /(?<=-?\d+% ₹)[\d,]+/;
        const match = priceString.match(regex);
        const extractedNumber = match ? match[0].replace(',', '') : null;
        const price = parseFloat(extractedNumber.replace('₹', ''))

        if(price < 1000){
        console.log(`Price is low!!! Only for ₹${price}, Buy quickly.`)
        }
        else{
        console.log(`Price is high as usual!!! Not worth ₹${price}, Come back later.`)
        }
    }
    catch(ex){
        console.log(ex)
    }
}