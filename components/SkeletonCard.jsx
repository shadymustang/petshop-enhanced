export default function SkeletonCard() {
  return (
    <div className="animate-pulse p-4 bg-white rounded-lg">
      <div className="h-44 bg-gray-200 rounded" />
      <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/3" />
    </div>
  );
}
