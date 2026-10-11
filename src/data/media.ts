import rawPortfolio from './portfolio.json';
import { categories, findCategory } from './categories';

export interface AnimationSpec {
  src: string;
  type?: string;
  poster?: string;
  alt?: string;
}

export interface Artwork {
  title: string;
  /** Slug or human label from categories.ts. */
  category: string;
  /** Resolved category slug — use this in templates, not `category`. */
  categorySlug: string;
  categoryLabel: string;
  /** Static image: always required. Also the poster for animations. */
  image: string;
  medium?: string;
  year?: string;
  alt?: string;
  featured?: boolean;
  /** Optional looping MP4/WebM. Omit for stills and GIFs. */
  animation?: AnimationSpec;
  /** True when this piece should render as a looping <video>. */
  isVideo: boolean;
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];
const PATH_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Turn a bare path from portfolio.json into an absolute, base-aware URL.
 * "images/foo.png" -> "/my-repo/images/foo.png" when deployed under a subpath.
 */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const clean = path.replace(/^\//, '');
  return `${PATH_BASE}/${clean}`;
}

function normalize(entry: Record<string, unknown>): Artwork {
  const rawCategory = String(entry.category ?? '');
  const matched = findCategory(rawCategory);

  if (!matched) {
    console.warn(
      `[portfolio] "${String(entry.title ?? 'Untitled')}" has unknown category "${rawCategory}". ` +
        `Known categories: ${categories.map((c) => c.slug).join(', ')}. Falling back to "sketch".`,
    );
  }
  const category = matched ?? findCategory('sketch')!;

  const animation = entry.animation as AnimationSpec | undefined;
  const animSrc = animation?.src ?? '';
  const isVideo =
    VIDEO_EXTENSIONS.some((ext) => animSrc.toLowerCase().endsWith(ext)) ||
    (animation?.type ?? '').startsWith('video/');

  return {
    title: String(entry.title ?? 'Untitled'),
    category: rawCategory,
    categorySlug: category.slug,
    categoryLabel: category.label,
    image: String(entry.image ?? ''),
    medium: entry.medium ? String(entry.medium) : undefined,
    year: entry.year ? String(entry.year) : undefined,
    alt: entry.alt ? String(entry.alt) : undefined,
    featured: Boolean(entry.featured),
    animation,
    isVideo,
  };
}

export const artworks: Artwork[] = (rawPortfolio as Record<string, unknown>[]).map(normalize);

/** Everything, newest first — entries that declare `featured` float to the top. */
export function byCategory(slug: string): Artwork[] {
  if (slug === 'all') return artworks;
  return artworks.filter((piece) => piece.categorySlug === slug);
}

export function countFor(slug: string): number {
  return byCategory(slug).length;
}
