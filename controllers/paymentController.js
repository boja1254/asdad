
const crypto = require("crypto");
const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {
  try {
    const amount = 5000;

    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Order creation failed" });
  }
};

exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};
