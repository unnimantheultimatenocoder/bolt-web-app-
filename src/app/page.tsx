import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Welcome to Gaming Platform
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Join free tournaments, play matches, and compete with players worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Tournaments</h2>
              <p className="text-gray-600">
                Join competitive tournaments and compete in exciting matches - completely free!
              </p>
              <Link href="/tournaments" className="mt-auto">
                <Button>Browse Tournaments</Button>
              </Link>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Matches</h2>
              <p className="text-gray-600">
                View your ongoing and upcoming matches, track your progress
              </p>
              <Link href="/matches" className="mt-auto">
                <Button>View Matches</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}