export interface Category {
  id: string;
  label: string;
  path: string;
  title: string;
}

export const categories: Category[] = [
  { id: 'valentine', label: 'Valentine', path: '/valentine', title: "Valentine's Day Cakes" },
  { id: 'birthday', label: 'Birthday', path: '/birthday', title: 'Birthday Cakes' },
  { id: 'anniversary', label: 'Anniversary', path: '/anniversary', title: 'Anniversary Cakes' },
  { id: 'theme', label: 'Theme Cakes', path: '/theme-cakes', title: 'Theme Cakes' },
  { id: 'customized', label: 'Custom', path: '/customized-cakes', title: 'Customized Cakes' },
  { id: 'desserts', label: 'Desserts', path: '/desserts', title: 'Desserts' },
];
