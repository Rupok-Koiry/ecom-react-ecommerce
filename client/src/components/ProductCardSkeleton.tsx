import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = ({ items }: { items: number }) => {
  return Array.from({ length: items }, (_, index) => (
    <div
      key={index}
      className="relative bg-primary-background p-4 rounded-lg shadow-md"
    >
      <Skeleton className="w-full h-52 rounded-lg mb-4" />
      <Skeleton width={80} height={20} className="absolute top-4 right-4" />
      <Skeleton width="60%" height={24} className="mb-2" />
      <Skeleton width="40%" height={20} className="mb-4" />

      <div className="flex justify-between gap-3">
        <Skeleton width={48} height={36} />
        <Skeleton width={48} height={36} />
      </div>
    </div>
  ));
};

export default ProductCardSkeleton;
