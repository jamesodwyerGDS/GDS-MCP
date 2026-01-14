/**
 * JSON Schema for Design Documentation
 * Used with OpenAI Structured Outputs to guarantee 100% reliable formatting
 */

export const DESIGN_DOC_SCHEMA = {
  type: "object",
  properties: {
    componentName: {
      type: "string",
      description: "Name of the component, token, or concept being documented"
    },
    description: {
      type: "string",
      description: "One or two sentence description"
    },
    sections: {
      type: "array",
      description: "Documentation sections in order",
      items: {
        type: "object",
        properties: {
          heading: {
            type: "string",
            description: "Section heading (e.g., 'When to Use', 'Variants')"
          },
          type: {
            type: "string",
            enum: ["list", "table", "paragraph"],
            description: "Type of content: list (bullets), table (rows/columns), or paragraph (text)"
          },
          listContent: {
            type: ["array", "null"],
            items: { type: "string" },
            description: "Array of bullet points (only use when type is 'list')"
          },
          tableContent: {
            type: ["object", "null"],
            properties: {
              headers: {
                type: "array",
                items: { type: "string" },
                description: "Column headers"
              },
              rows: {
                type: "array",
                items: {
                  type: "array",
                  items: { type: "string" }
                },
                description: "Table rows, each row is array of cell values"
              }
            },
            required: ["headers", "rows"],
            additionalProperties: false,
            description: "Table data (only use when type is 'table')"
          },
          paragraphContent: {
            type: ["string", "null"],
            description: "Plain text content (only use when type is 'paragraph')"
          }
        },
        required: ["heading", "type", "listContent", "tableContent", "paragraphContent"],
        additionalProperties: false
      }
    }
  },
  required: ["componentName", "description", "sections"],
  additionalProperties: false
};

export default DESIGN_DOC_SCHEMA;
