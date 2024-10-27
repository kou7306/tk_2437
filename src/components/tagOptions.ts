// src/utils/tagOptions.ts
const tagOptions = [
  "Technology",
  "Health",
  "Education",
  "Finance",
  "Art",
] as const;

export type TagOption = (typeof tagOptions)[number]; // タグオプションの型を定義
export default tagOptions;
