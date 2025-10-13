import { useState } from "react"
import { Star, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  petName: string
  petBreed: string
  service: string
  ownerName: string
  rating: number
  date: string
  comment: string
  hasReply: boolean
  reply?: string
  replyDate?: string
}

export function ReviewsPage() {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      petName: "Buddy",
      petBreed: "Golden Retriever",
      service: "General Checkup",
      ownerName: "John Smith",
      rating: 5,
      date: "2025-09-07",
      comment: "",
      hasReply: true,
      reply: "Thank you for your feedback!",
      replyDate: "2025-09-15",
    },
    {
      id: "2",
      petName: "Buddy",
      petBreed: "Golden Retriever",
      service: "General Checkup",
      ownerName: "John Smith",
      rating: 5,
      date: "2025-09-07",
      comment:
        "Excellent service! Luna's vaccination went smoothly and Dr. Sarah provided great aftercare instructions. The appointment was on time and the clinic was very clean.",
      hasReply: false,
    },
    {
      id: "3",
      petName: "Buddy",
      petBreed: "Golden Retriever",
      service: "General Checkup",
      ownerName: "John Smith",
      rating: 5,
      date: "2025-09-07",
      comment:
        "Excellent service! Luna's vaccination went smoothly and Dr. Sarah provided great aftercare instructions. The appointment was on time and the clinic was very clean.",
      hasReply: false,
    },
  ])

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return

    const today = new Date().toISOString().split("T")[0] // yyyy-mm-dd format

    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              hasReply: true,
              reply: replyText,
              replyDate: today,
            }
          : review,
      ),
    )

    setReplyText("")
    setReplyingTo(null)
  }

  const handleCancelReply = () => {
    setReplyText("")
    setReplyingTo(null)
  }

  const ratingBreakdown = [
    { stars: 5, count: 3 },
    { stars: 4, count: 1 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ]

  const totalReviews = ratingBreakdown.reduce((sum, item) => sum + item.count, 0)
  const averageRating =
    ratingBreakdown.reduce((sum, item) => sum + item.stars * item.count, 0) / totalReviews

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reviews & Ratings</h2>
          <p className="text-gray-600 text-lg">View and respond to client reviews</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Rating Overview */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Rating Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-800 mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? "fill-orange-400 text-orange-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Based on {totalReviews} reviews</p>
              </div>

              <div className="space-y-2">
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-2">{item.stars}</span>
                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-400 h-2 rounded-full"
                        style={{
                          width: `${
                            totalReviews > 0 ? (item.count / totalReviews) * 100 : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-4">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Status */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Quick Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Reviews</span>
                <span className="font-semibold text-gray-800">{totalReviews}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">5 Star Reviews</span>
                <span className="font-semibold text-gray-800">{ratingBreakdown[0].count}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reply To</span>
                <span className="font-semibold text-gray-800">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Response rate</span>
                <span className="font-semibold text-gray-800">40%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=${review.petName.toLowerCase()}`}
                    />
                    <AvatarFallback className="bg-orange-200 text-orange-800">
                      {review.petName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{review.petName}</h4>
                        <p className="text-sm text-gray-600">
                          {review.petBreed} - {review.service}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-orange-400 text-orange-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>

                    {review.comment && (
                      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                    )}

                    {/* Reply Section */}
                    {review.hasReply && review.reply && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            Your Reply
                          </span>
                          <span className="text-xs text-gray-500">
                            {review.replyDate || ""}
                          </span>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">{review.reply}</p>
                        </div>
                      </div>
                    )}

                    {/* Reply Form */}
                    {replyingTo === review.id ? (
                      <div className="space-y-3">
                        <textarea
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[100px] w-full border border-gray-300 rounded p-2"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleSendReply(review.id)}
                            className="bg-orange-600 text-white hover:bg-orange-700"
                          >
                            Send reply
                          </Button>
                          <Button variant="outline" onClick={handleCancelReply}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      !review.hasReply && (
                        <Button
                          variant="outline"
                          onClick={() => setReplyingTo(review.id)}
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
