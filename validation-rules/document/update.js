module.exports = {
  "required": ["_id", "document_name", "document_type"],
  "properties": {
    "_id": {
      "type": "string",
      "minLength": 24,
      "maxLength": 24
    },
    "document_name": { "type": "string" },
    "document_type": { "enum": ["FIXED", "RECURRING"] },
    "fieldname": { "type": "string" },
    "originalname": { "type": "string" },
    "encoding": { "type": "string" },
    "mimetype": { "type": "string" },
    "destination": { "type": "string" },
    "filename": { "type": "string" },
    "path": { "type": "string" },
    "document_id": { "type": "string" },
    "size": { "type": "string" },
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