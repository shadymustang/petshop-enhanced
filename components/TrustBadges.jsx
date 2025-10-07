export default function TrustBadges() {
  const badges = [
    { label: 'SSL Secured', icon: '/icons/ssl.svg' },
    { label: 'Money-back', icon: '/icons/moneyback.svg' },
    { label: 'Vet Approved', icon: '/icons/vet.svg' },
  ];
  return (
    <div className="flex gap-6 items-center justify-center my-6">
      {badges.map(b => (
        <div key={b.label} className="flex flex-col items-center gap-2">
          <img src={b.icon} alt={b.label} className="w-14 h-14" />
          <div className="text-xs text-gray-600">{b.label}</div>
        </div>
      ))}
    </div>
  );
}
