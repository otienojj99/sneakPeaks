export const AUDIENCE_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
  { value: 'unisex', label: 'Unisex' },
] as const;

export type Audience = typeof AUDIENCE_OPTIONS[number]['value'];