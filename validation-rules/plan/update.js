module.exports = {
    "required": ["_id", "name", "validity_in_days", "price", "currency", "country"],
    "properties": {
        "_id": {
            "type": "string",
            "minLength": 24,
            "maxLength": 24
        },
        "name": {
            "type": "string"
        },
        "validity_in_days": {
            "type": "number",
        },
        "price": {
            "type": "number",
        },
        "currency": {
            "type": "object",
            "properties": {
                "code": { "type": "string" },
                "name": { "type": "string" },
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
        "created_by": {
            "type": "string",
            "minLength": 24,
            "maxLength": 24
        },
        "created_at": { "type": "string" },
        "updated_at": { "type": "string" }
    },
    "additionalProperties": false
};