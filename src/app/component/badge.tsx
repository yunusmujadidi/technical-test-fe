interface BadgeProps {
  type: string;
}

export const Badge = ({ type }: BadgeProps) => {
  return (
    <div className="inline-block border-l-2 border-red-700 rounded">
      <span className="bg-gray-300 px-1 py-0.5 text-xs rounded-r">{type}</span>
    </div>
  );
};
