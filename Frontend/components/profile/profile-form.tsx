"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CREATOR_NICHES, SOCIAL_PLATFORMS } from "@/lib/constants";
import { toast } from "sonner";

// Define types for our database responses
interface BaseProfile {
  id: string;
  role: 'brand' | 'creator' | 'agency';
  email: string;
}

interface BrandProfile extends BaseProfile {
  role: "brand";
  company_name: string;
  industry: string;
  brand_profiles?: {
    company_description?: string;
    website?: string;
    logo_url?: string;
    social_links?: Record<string, any>;
    contact_info?: Record<string, any>;
  }[];
}

interface CreatorProfile extends BaseProfile {
  role: "creator";
  username: string;
  niche: string;
  creator_profiles?: {
    bio?: string;
    profile_picture_url?: string;
    portfolio_url?: string;
    skills?: string[];
    social_links?: Record<string, any>;
  }[];
}

interface AgencyProfile extends BaseProfile {
  role: "agency";
  agency_name: string;
  specialization: string;
  agency_profiles?: {
    agency_description?: string;
    website?: string;
    logo_url?: string;
    social_links?: Record<string, any>;
    contact_info?: Record<string, any>;
  }[];
}

type ProfileData = BrandProfile | CreatorProfile | AgencyProfile;

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not be longer than 500 characters.",
  }),
  primaryNiche: z.string().optional(),
  mainPlatform: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      bio: "",
      primaryNiche: "",
      mainPlatform: "",
      location: "",
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Fetch user role and basic info
      // This is a placeholder and should be replaced with actual implementation
      // For now, we'll just use default values
      const userData = {
        role: "brand",
        email: "user@example.com",
      };

      // Fetch role-specific data
      let roleData: ProfileData | null = null;
      switch (userData.role as 'brand' | 'creator' | 'agency') {
        case "brand":
          roleData = {
            id: "1",
            role: "brand",
            email: userData.email,
            company_name: "Brand Company",
            industry: "Fashion",
            brand_profiles: [],
          } as BrandProfile;
          break;

        case "creator":
          roleData = {
            id: "2",
            role: "creator",
            email: userData.email,
            username: "creatorUsername",
            niche: "Fashion",
            creator_profiles: [],
          } as CreatorProfile;
          break;

        case "agency":
          roleData = {
            id: "3",
            role: "agency",
            email: userData.email,
            agency_name: "Agency Name",
            specialization: "Fashion",
            agency_profiles: [],
          } as AgencyProfile;
          break;
      }

      if (roleData) {
        setProfile(roleData);
        form.reset({
          name: roleData.role === "brand" ? roleData.company_name :
                roleData.role === "agency" ? roleData.agency_name : "",
          username: roleData.role === "creator" ? roleData.username : "",
          email: userData.email,
          bio: roleData.role === "brand" ? roleData.brand_profiles?.[0]?.company_description :
               roleData.role === "creator" ? roleData.creator_profiles?.[0]?.bio :
               roleData.role === "agency" ? roleData.agency_profiles?.[0]?.agency_description : "",
          primaryNiche: roleData.role === "creator" ? roleData.niche :
                       roleData.role === "brand" ? roleData.industry :
                       roleData.role === "agency" ? roleData.specialization : "",
          mainPlatform: "",
          location: "",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    setError(null);

    try {
      if (!profile) throw new Error("No profile data found");
      // Update role-specific data
      switch (profile.role as 'brand' | 'creator' | 'agency') {
        case "brand":
          // This is a placeholder and should be replaced with actual implementation
          // For now, we'll just use default values
          break;

        case "creator":
          // This is a placeholder and should be replaced with actual implementation
          // For now, we'll just use default values
          break;

        case "agency":
          // This is a placeholder and should be replaced with actual implementation
          // For now, we'll just use default values
          break;
      }

      toast.success("Profile updated successfully!");
      await fetchProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be displayed on your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="primaryNiche"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Niche</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary niche" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CREATOR_NICHES.map((niche) => (
                      <SelectItem key={niche} value={niche}>
                        {niche}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainPlatform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Platform</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your main platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SOCIAL_PLATFORMS.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Link href="/profile">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button 
            type="submit"
            disabled={loading}
            className="bg-[#00FFFF] text-black hover:bg-[#00DDDD]"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}