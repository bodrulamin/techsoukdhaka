/**
 * Attribute types
 */

export enum AttributeType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
}

export interface AttributeValue {
  value: string;
  sortOrder: number;
}

export interface Attribute {
  id: string;
  code: string;
  displayName: string;
  description?: string;
  type: AttributeType;
  filterable: boolean;
  searchable: boolean;
  variantDefining: boolean;
  values: AttributeValue[];
}

export interface CreateAttributeRequest {
  name: string;
  description?: string;
  attributeType: AttributeType;
  allowedValues?: Array<{
    value: string;
    displayOrder: number;
  }>;
}
