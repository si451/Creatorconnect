import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white font-mono">404</h1>
        <h2 className="text-2xl font-semibold text-[#00FF94] font-mono">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-[#00FF94] text-black hover:bg-[#00FF94]/90 font-bold font-mono">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
} 