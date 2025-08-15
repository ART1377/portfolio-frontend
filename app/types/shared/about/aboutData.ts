export interface Feature {
  title: string;
  description: string;
  icon: "Code" | "Palette" | "Zap";
}

export interface AboutData {
  description: string[];
  skills: string[];
  features: Feature[];
}
