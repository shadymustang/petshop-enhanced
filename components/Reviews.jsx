import { FaStar } from 'react-icons/fa';

function Stars({ value = 0 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={`inline ${i < Math.round(value) ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

export default function Reviews({ reviews = [] }) {
  if (!reviews.length) return <div>No reviews yet</div>;
  return (
    <div className="space-y-4">
      {reviews.map(r => (
        <div key={r.id} className="p-3 border rounded">
          <div className="flex items-start gap-3">
            <img src={r.photo} className="w-12 h-12 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <div className="font-semibold">{r.name}</div>
                <Stars value={r.rating} />
              </div>
              <div className="text-sm text-gray-600">{r.comment}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
