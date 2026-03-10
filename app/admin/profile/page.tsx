'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, LogOut, Loader2 } from 'lucide-react';

export default function AdminProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser(authUser);
          setEmail(authUser.email || '');
        }
      } catch (error) {
        console.error('[v0] Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('[v0] Error logging out:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      setUpdating(true);
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      alert('Password reset link has been sent to your email');
    } catch (error: any) {
      console.error('[v0] Error resetting password:', error);
      alert('Error sending password reset email');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Profile</h1>
        <p className="text-muted-foreground">Manage your admin account settings</p>
      </div>

      <div className="space-y-6">
        {/* Account Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">{user?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Account Type</label>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="font-medium text-blue-900">Administrator</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Member Since</label>
              <div className="p-3 bg-muted rounded-lg">
                <span className="font-medium">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              For security purposes, we recommend changing your password regularly.
            </p>
            <Button
              onClick={handleChangePassword}
              disabled={updating}
              variant="outline"
              className="w-full"
            >
              {updating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Password Reset Email'
              )}
            </Button>
          </div>
        </Card>

        {/* Logout */}
        <Card className="p-6 border-red-200 bg-red-50">
          <h2 className="text-xl font-semibold mb-4 text-red-900">Sign Out</h2>
          <p className="text-sm text-red-800 mb-4">
            Sign out from this admin account. You will need to log in again to access the admin panel.
          </p>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );
}
