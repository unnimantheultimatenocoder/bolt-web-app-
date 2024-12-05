import { useState, useEffect } from 'react';
import { User } from '@/types';
import { UserService } from '@/lib/services/user.service';
import { useSupabase } from '@/components/providers/supabase-provider';
import { toast } from 'react-hot-toast';

export function useProfile() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSupabase();

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const data = await UserService.getUserProfile(user.id);
        setProfile(data);
      } catch (error) {
        toast.error('Failed to load profile');
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<User>) => {
    if (!user || !profile) return;

    try {
      const updatedProfile = await UserService.updateUserProfile(user.id, updates);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  return {
    profile,
    loading,
    updateProfile
  };
}