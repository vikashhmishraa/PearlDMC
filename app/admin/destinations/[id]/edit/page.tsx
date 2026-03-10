'use client';

import { use } from 'react';
import { adminStore } from '@/lib/admin-store';
import { DestinationForm } from '@/components/admin/destination-form';

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditDestinationPage({ params }: EditPageProps) {
  const { id } = use(params);
  const destination = adminStore.getDestination(id);

  if (!destination) {
    return <div className="text-center py-12">Destination not found</div>;
  }

  return <DestinationForm destination={destination} isEdit />;
}
