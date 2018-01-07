module.exports = {
  "required": ["title", "company_id"],
  "properties": {
    "title": {
      "type": "string"
    },
    "priority": {
      "type": "string"
    },
    "is_active": {
      "type": "boolean"
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
      "items": {
          "url": { "type": "string" },
          "name": { "type": "string" }
      }
    },
    "comments": {
      "type": "array",
      "items": {
          "message": { "type": "string" },
          "user_id": { "type": "string" },
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
    "created_at": { "type": "string"},
    "updated_at":  { "type": "string"}
  },
  "additionalProperties": false
};