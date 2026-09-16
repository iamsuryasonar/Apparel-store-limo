/**
 * Pushes a GA4 ecommerce event to the GTM dataLayer.
 * Clears the previous ecommerce object first, per GA4's recommendation,
 * to avoid old event params bleeding into the new one.
 */
export const pushEcommerceEvent = (eventName, ecommerce) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
        event: eventName,
        ecommerce,
    });
};
