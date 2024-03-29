import React from "react";

export type GENERAL_EVENTS = {
  onClick: React.MouseEventHandler<Element>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export type GENERAL_DATA_TYPES = {
  NUMBER: number;
  STRING: string;
  BOOLEAN: boolean;
  DATE: Date;
  OBJECT: Record<string, any>;
  ARRAY: any[]; // You can specify a more specific type if needed
};





