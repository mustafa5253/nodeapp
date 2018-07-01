module.exports = {
  "required": ["user_id", "amount", "razorpay_payment_id"],
  "properties": {
    "user_id": { "type": "string" },
    "amount": { "type": "number" },
    "razorpay_payment_id": { "type": "string" }
  },
  "additionalProperties": true
};