'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types/auth';

export default function ProfileForm() {
  const [user, setUser] = useState<Partial<User>>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Update user profile API call
      console.log('Updated user data:', user);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={user.firstName || ''}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={user.lastName || ''}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={user.phone || ''}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={user.dateOfBirth || ''}
            onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={(value: 'male' | 'female' | 'other') => setUser({ ...user, gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Address</h3>
        
        <div>
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            value={user.address?.street || ''}
            onChange={(e) => setUser({
              ...user,
              address: { ...user.address, street: e.target.value }
            })}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={user.address?.city || ''}
              onChange={(e) => setUser({
                ...user,
                address: { ...user.address, city: e.target.value }
              })}
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={user.address?.state || ''}
              onChange={(e) => setUser({
                ...user,
                address: { ...user.address, state: e.target.value }
              })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={user.address?.country || ''}
              onChange={(e) => setUser({
                ...user,
                address: { ...user.address, country: e.target.value }
              })}
            />
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              value={user.address?.zipCode || ''}
              onChange={(e) => setUser({
                ...user,
                address: { ...user.address, zipCode: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
}