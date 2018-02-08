module.exports = {
  "required": ["_id", "title", "company_id"],
  "properties": {
    "_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
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
          "type": "object",
          "properties": {
            "uuid": { "type": "string" },
            "name": { "type": "string" },
            "path": { "type": "string" },
            "id": { "type": "string" }
          }
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
    "service": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
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