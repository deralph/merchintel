export type Tone =
  | "primary"
  | "accent"
  | "success"
  | "muted"
  | "warning"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5";

const toneToCssVariable: Record<Tone, string> = {
  primary: "--primary",
  accent: "--accent",
  success: "--success",
  muted: "--muted-foreground",
  warning: "--warning",
  "chart-1": "--chart-1",
  "chart-2": "--chart-2",
  "chart-3": "--chart-3",
  "chart-4": "--chart-4",
  "chart-5": "--chart-5",
};

export const toneTextClass: Record<Tone, string> = {
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
  muted: "text-muted-foreground",
  warning: "text-warning",
  "chart-1": "text-chart-1",
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3",
  "chart-4": "text-chart-4",
  "chart-5": "text-chart-5",
};

export const toneBackgroundStyle = (tone: Tone) => {
  const variable = toneToCssVariable[tone] ?? "--primary";
  return {
    backgroundColor: `hsl(var(${variable}) / 0.14)`,
    color: `hsl(var(${variable}))`,
  };
};

export const toneBorderStyle = (tone: Tone) => {
  const variable = toneToCssVariable[tone] ?? "--primary";
  return {
    borderColor: `hsl(var(${variable}) / 0.35)`,
  };
};

export const toneColorStyle = (tone: Tone) => {
  const variable = toneToCssVariable[tone] ?? "--primary";
  return {
    color: `hsl(var(${variable}))`,
  };
};
