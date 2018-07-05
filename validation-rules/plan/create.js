module.exports = {
    "required": ["name", "validity_in_days", "price"],
    "properties": {
        "name": {
            "type": "string"
        },
        "validity_in_days": {
            "type": "number",
        },
        "price": {
            "type": "number",
        },
        "storage_limit": {
            "type":  ["number", "null"],
        },
        "number_of_users": {
            "type": ["number", "null"],
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