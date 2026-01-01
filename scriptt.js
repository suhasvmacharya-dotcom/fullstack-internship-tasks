function getISTTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (5.5 * 60 * 60 * 1000));
}

function isPaymentAllowed() {
    const ist = getISTTime();
    const hour = ist.getHours();
    return hour >= 10 && hour < 11;
}

function subscribe(plan, price, tweets) {
    const status = document.getElementById("status");

    if (price > 0 && !isPaymentAllowed()) {
        status.innerHTML = `
            <p class="error">❌ Payment not allowed now.</p>
            <p>Payments allowed only between <b>10:00 AM – 11:00 AM IST</b></p>
        `;
        return;
    }

    // Simulate payment gateway
    setTimeout(() => {
        const invoiceId = "INV-" + Math.floor(Math.random() * 1000000);
        const email = "user@example.com";

        status.innerHTML = `
            <p class="success">✅ Payment Successful!</p>
            <p><b>Plan:</b> ${plan}</p>
            <p><b>Amount Paid:</b> ₹${price}</p>
            <p><b>Tweet Limit:</b> ${tweets}</p>
            <p><b>Invoice ID:</b> ${invoiceId}</p>
            <p>📧 Invoice & plan details sent to <b>${email}</b></p>
        `;

        console.log("Email Sent (Simulated)", {
            to: email,
            plan,
            amount: price,
            tweets,
            invoiceId
        });
    }, 1000);
}
