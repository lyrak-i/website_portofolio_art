/**
 * The five gallery categories. Ordered as they appear in the filter bar.
 *
 * `slug` is the stable id used in portfolio.json's `category` field — you may
 * write either the slug or the label there; both work.
 */
export interface Category {
  slug: string;
  label: string;
  /** One line shown under the page heading when this filter is active. */
  blurb: string;
}

export const categories: Category[] = [
  {
    slug: 'lineless',
    label: 'Lineless',
    blurb: 'Edge-free paintings built from colour and light alone.',
  },
  {
    slug: 'full-render',
    label: 'Full Render',
    blurb: 'Finished pieces taken through light, texture and atmosphere.',
  },
  {
    slug: 'sketch',
    label: 'Sketch',
    blurb: 'Studies, gesture work and unfinished thoughts.',
  },
  {
    slug: 'animation',
    label: 'Animation',
    blurb: 'Short looping cycles and motion tests.',
  },
  {
    slug: 'previous-commissions',
    label: 'Previous Commissions',
    blurb: 'Work made for clients. Slots are full; shown as reference.',
  },
];

/** Look up a category by slug or label, ignoring case and spacing. */
export function findCategory(value: string): Category | undefined {
  const needle = value.trim().toLowerCase().replace(/[\s_]+/g, '-');
  return categories.find(
    (category) => category.slug === needle || category.label.toLowerCase() === value.trim().toLowerCase(),
  );
}
