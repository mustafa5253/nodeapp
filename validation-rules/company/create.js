module.exports = {
  "required": ["name", "owner_id", "address"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 3
    },
    "owner_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "address": {
      "type": "object",
      "required": ["city"],
      "properties": {
        "state": {
          "type": "object",
          "properties": {
            "code": { "type": "string" },
            "name": { "type": "string" },
          },
          "additionalProperties": false
        },
        "city": { "type": "string" },
        "postal_code": { "type": "string" },
        "address_line1": { "type": "string" },
        "address_line2": { "type": "string" },
        "gst_number": { "type": "string" },
      },
      "additionalProperties": false
    },
    "country": {
      "type": "object",
      "properties": {
        "code": { "type": "string" },
        "name": { "type": "string" },
      },
      "additionalProperties": false
    },
    "subscription": {
      "type": "object",
      "properties": {
        "start_date": { "type": "string" },
        "end_date": { "type": "string" }
      },
      "additionalProperties": false
    },
    "created_by": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "created_at": { "type": "string" },
    "updated_at": { "type": "string" }
  },
  "additionalProperties": true
};