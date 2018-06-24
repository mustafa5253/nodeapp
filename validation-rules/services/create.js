module.exports = {
  "required": ["name", "company_id"],
  "properties": {
    "name": {
      "type": "string"
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
    "company_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "is_active": {
      "type": "boolean"
    },
    "created_by": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "created_at": { "type": "string"},
    "updated_at":  { "type": "string"}
  },
  "additionalProperties": false
};