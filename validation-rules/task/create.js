module.exports = {
  "required": ["title", "company_id"],
  "properties": {
    "title": {
      "type": "string"
    },
    "priority": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "assigned_to": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "assigned_by": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "company_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "branch_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "attachments": {
      "type": "array",
      "items": [
        {
          "type": "string",
        }
      ]
    },
    "checklists": {
      "type": "array"
    },
    "activities": {
      "type": "array"
    },
    "checkItems": {
      "type": "number"
    },
    "checkItemsChecked": {
      "type": "number"
    },
    "services": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 24,
        "maxLength": 24
      }
    },
    "comments": {
      "type": "array",
      "items": {
        "message": { "type": "string" },
        "user": { "type": "string" },
        "user_name": { "type": "string" },
        "time": { "type": "string" },
      }
    },
    "status": {
      "type": "string"
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