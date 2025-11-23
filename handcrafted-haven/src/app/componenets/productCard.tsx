type Props = {
  title: string;
  price: string;
  rating: number;
  image: string;
};

export default function ProductCard({ title, price, rating, image }: Props) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <img src={image} alt={title} className="rounded mb-4 w-full h-40 object-cover" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm">{price}</p>
      <div className="text-yellow-500 mt-2">
        {'★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '')}
      </div>
    </div>
  );
}