import ReviewForm from '@/components/user/ReviewForm';
import UserReviewCard from '@/components/user/UserReviewCard';

export default function ReviewsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Reviews</h1>
      
      <div className="space-y-8">
        {/* Pending Reviews */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Reviews</h2>
          <ReviewForm tourId="1" tourName="Goa Beach Tour" />
        </div>
        
        {/* Published Reviews */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Published Reviews</h2>
          <UserReviewCard />
        </div>
      </div>
    </div>
  );
}