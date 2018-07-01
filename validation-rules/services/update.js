module.exports = {
  "required": ["_id", "name", "company_id"],
  "properties": {
    "_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "name": {
      "type": "string"
    },
    "company_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "documents": {
      "type": "array",
      "items": [
        { "type": "string" }
      ]
    },
    "description": {
      "type": "string"
    },
    "is_active": {
      "type": "boolean"
    },
    "created_by": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "created_at": { "type": "string" },
    "updated_at":  { "type": "string" }
  },
  "additionalProperties": true
};