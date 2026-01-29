import React from "react";

export interface Tab {
  name: string;
  path: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}