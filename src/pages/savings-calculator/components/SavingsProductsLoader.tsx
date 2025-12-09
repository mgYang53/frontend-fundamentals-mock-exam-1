import { useSavingsProducts } from '../hooks';
import type { SavingsProduct } from '../types';

interface SavingsProductsLoaderProps {
  children: (products: SavingsProduct[]) => React.ReactNode;
}

export default function SavingsProductsLoader({ children }: SavingsProductsLoaderProps) {
  const products = useSavingsProducts();
  return <>{children(products)}</>;
}
