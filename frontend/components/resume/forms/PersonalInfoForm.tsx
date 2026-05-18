"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResumeStore } from "@/lib/store/resume.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  title: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoForm() {
  const { currentResume, updatePersonalInfo } = useResumeStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: currentResume?.personalInfo?.fullName || "",
      title: currentResume?.personalInfo?.title || "",
      email: currentResume?.personalInfo?.email || "",
      phone: currentResume?.personalInfo?.phone || "",
      location: currentResume?.personalInfo?.location || "",
      website: currentResume?.personalInfo?.website || "",
      linkedin: currentResume?.personalInfo?.linkedin || "",
      github: currentResume?.personalInfo?.github || "",
    },
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    updatePersonalInfo(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="fullName" className="text-slate-300">
          Full Name *
        </Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          {...register("fullName")}
          className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
        />
        {errors.fullName && (
          <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="title" className="text-slate-300">
          Professional Title
        </Label>
        <Input
          id="title"
          placeholder="Senior Software Engineer"
          {...register("title")}
          className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-slate-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-slate-300">
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            {...register("phone")}
            className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="location" className="text-slate-300">
          Location
        </Label>
        <Input
          id="location"
          placeholder="San Francisco, CA"
          {...register("location")}
          className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
        />
      </div>

      <div>
        <Label htmlFor="website" className="text-slate-300">
          Website
        </Label>
        <Input
          id="website"
          type="url"
          placeholder="https://johndoe.com"
          {...register("website")}
          className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
        />
        {errors.website && (
          <p className="text-red-400 text-sm mt-1">{errors.website.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin" className="text-slate-300">
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            {...register("linkedin")}
            className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>

        <div>
          <Label htmlFor="github" className="text-slate-300">
            GitHub
          </Label>
          <Input
            id="github"
            placeholder="github.com/johndoe"
            {...register("github")}
            className="mt-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <Button type="submit" className="w-full mt-6">
        Save Personal Information
      </Button>
    </form>
  );
}
