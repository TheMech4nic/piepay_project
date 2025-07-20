const Offer = require('../models/offer');

exports.createOffers = async (req, res) => {
    try {
        const flipkartOfferApiResponse = req.body.flipkartOfferApiResponse;
        const offers = flipkartOfferApiResponse.offers.offerList;

        let noOfOffersIdentified = offers.length;
        let noOfNewOffersCreated = 0;

        for (const offerData of offers) {
            const existingOffer = await Offer.findOne({ offerId: offerData.offerDescription.id });
            if (!existingOffer) {
                const newOffer = new Offer({
                    offerId: offerData.offerDescription.id,
                    provider: offerData.provider,
                    offerText: offerData.offerText.text,
                    offerDescription: offerData.offerDescription.text,
                    paymentInstruments: offerData.paymentInstruments || []
                });
                await newOffer.save();
                noOfNewOffersCreated++;
            }
        }

        res.status(201).json({
            noOfOffersIdentified,
            noOfNewOffersCreated
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHighestDiscount = async (req, res) => {
    try {
        const { amountToPay, bankName, paymentInstrument } = req.query;

        let query = { provider: bankName };
        if (paymentInstrument) {
            query.paymentInstruments = paymentInstrument;
        }

        const offers = await Offer.find(query);

        let highestDiscountAmount = 0;

        for (const offer of offers) {
            const discount = calculateDiscount(offer, amountToPay);
            if (discount > highestDiscountAmount) {
                highestDiscountAmount = discount;
            }
        }

        res.status(200).json({ highestDiscountAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function calculateDiscount(offer, amountToPay) {
    const offerText = offer.offerDescription.toLowerCase();
    let discount = 0;

    if (offerText.includes('flat')) {
        const matches = offerText.match(/flat ₹?([\d,]+)/);
        if (matches && matches[1]) {
            discount = parseInt(matches[1].replace(/,/g, ''));
        }
    } else if (offerText.includes('%')) {
        const percentage = parseInt(offerText.match(/(\d+)%/)[1]);
        let maxDiscount = Infinity;
        if (offerText.includes('up to')) {
            maxDiscount = parseInt(offerText.match(/up to ₹?([\d,]+)/)[1].replace(/,/g, ''));
        }
        discount = (amountToPay * percentage) / 100;
        if (discount > maxDiscount) {
            discount = maxDiscount;
        }
    } else if (offerText.includes('cashback')) {
        const matches = offerText.match(/₹?([\d,]+) cashback/);
        if (matches && matches[1]) {
            discount = parseInt(matches[1].replace(/,/g, ''));
        }
    }

    return discount;
}
