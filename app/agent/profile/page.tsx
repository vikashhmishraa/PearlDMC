'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, LogOut, Loader2, Building2, Phone, Globe } from 'lucide-react';

export default function AgentProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [agentProfile, setAgentProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser(authUser);

          // Load agent profile
          const { data: profile } = await supabase
            .from('agent_profiles')
            .select('*')
            .eq('user_id', authUser.id)
            .single();

          if (profile) {
            setAgentProfile(profile);
            setFormData({
              first_name: profile.first_name || '',
              last_name: profile.last_name || '',
              company_name: profile.company_name || '',
              phone: profile.phone || '',
              website: profile.website || '',
            });
          }
        }
      } catch (error) {
        console.error('[v0] Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setUpdating(true);
      if (agentProfile) {
        const { error } = await supabase
          .from('agent_profiles')
          .update(formData)
          .eq('id', agentProfile.id);

        if (error) throw error;
        setAgentProfile({ ...agentProfile, ...formData });
        setEditMode(false);
        alert('Profile updated successfully');
      }
    } catch (error: any) {
      console.error('[v0] Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/agent/auth/login');
    } catch (error) {
      console.error('[v0] Error logging out:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      setUpdating(true);
      await supabase.auth.resetPasswordForEmail(user?.email, {
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
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agent Profile</h1>
        <p className="text-muted-foreground">Manage your agent account and company information</p>
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
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="font-medium text-green-900">Travel Agent</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Account Status</label>
              <div className={`p-3 rounded-lg ${
                agentProfile?.status === 'approved' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <span className={`font-medium ${
                  agentProfile?.status === 'approved' 
                    ? 'text-green-900' 
                    : 'text-yellow-900'
                }`}>
                  {agentProfile?.status?.charAt(0).toUpperCase() + agentProfile?.status?.slice(1)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Member Since</label>
              <div className="p-3 bg-muted rounded-lg">
                <span className="font-medium">
                  {agentProfile?.created_at ? new Date(agentProfile.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Company Information */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Company Information</h2>
            {!editMode && (
              <Button
                onClick={() => setEditMode(true)}
                variant="outline"
                size="sm"
              >
                Edit
              </Button>
            )}
          </div>

          {editMode ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  placeholder="Company name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <Input
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveProfile}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
                <Button
                  onClick={() => setEditMode(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">First Name</p>
                  <p className="font-medium">{formData.first_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Name</p>
                  <p className="font-medium">{formData.last_name || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Company Name
                </p>
                <p className="font-medium">{formData.company_name || 'N/A'}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </p>
                  <p className="font-medium">{formData.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Website
                  </p>
                  {formData.website ? (
                    <a 
                      href={formData.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      {formData.website}
                    </a>
                  ) : (
                    <p className="font-medium">N/A</p>
                  )}
                </div>
              </div>
            </div>
          )}
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
            Sign out from your agent account. You will need to log in again to access your dashboard.
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
