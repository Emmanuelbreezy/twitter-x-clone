"use client";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/modal";
import { useStore } from "@/hooks/useStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Spinner } from "@/components/spinner";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { BASE_URL } from "@/lib/base-url";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import CoverImageUpload from "./_common/CoverImageUpload";
import ProfileImageUpload from "./_common/ProfileImageUpload";

const EditProfileModal = () => {
  const { isEditModalOpen, closeEditModal } = useStore();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useCurrentUser();
  const currentUser = data?.currentUser ?? {};
  const { mutate } = useUser(data?.currentUser?.username);

  const formSchema = z.object({
    name: z.string().min(1, { message: "Username is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    bio: z.string(),
    coverImage: z.string(),
    profileImage: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      username: "",
      coverImage: "",
      profileImage: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setLoading(true);
        await axios.patch(`${BASE_URL}api/edit`, {
          name: values.name,
          bio: values.bio,
          profileImage: values.profileImage,
          username: values.username,
          coverImage: values.coverImage,
        });
        mutate();
        toast({
          title: "Sucess",
          description: "Updated profile successfully",
          variant: "default",
        });
        closeEditModal();
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [closeEditModal, mutate]
  );

  useEffect(() => {
    if (currentUser?.id) {
      const profileImage = currentUser?.profileImage || currentUser?.image;

      form.setValue("name", currentUser?.name || "");
      form.setValue("bio", currentUser?.bio || "");
      form.setValue("username", currentUser?.username);
      form.setValue("coverImage", currentUser?.coverImage || "");
      form.setValue("profileImage", profileImage || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <Spinner size="icon" />
      </div>
    );
  }

  return (
    <Modal
      title="Edit Profile"
      subTitle=""
      showLogo={false}
      isOpen={isEditModalOpen}
      onClose={closeEditModal}
      body={
        <div className="w-full flex flex-col gap-4">
          <div className="w-full bg-neutral-900 h-44 relative">
            <CoverImageUpload
              value={form?.getValues().coverImage}
              onChange={(image: string) => {
                form.setValue("coverImage", image);
              }}
              onRemove={() => {
                form.resetField("coverImage");
              }}
            />
            <div className="absolute -bottom-16 left-4">
              <ProfileImageUpload
                value={form?.getValues().profileImage}
                name={form?.getValues()?.name}
                onChange={(image: string) => {
                  form.setValue("profileImage", image);
                }}
              />
            </div>
          </div>
          <div className="w-full mt-14">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex h-full w-full flex-col items-center justify-center space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          disabled={false}
                          className="form--input w-full focus:border-0 dark:border-[rgba(255,255,255,0.5)]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          disabled={false}
                          className="form--input w-full focus:border-0 dark:border-[rgba(255,255,255,0.5)]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Bio"
                          disabled={false}
                          className="form--input !h-[85px] w-full focus:border-0 dark:border-[rgba(255,255,255,0.5)]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="brandPrimary"
                  width="full"
                  size="brandsm"
                  className="!mt-5 gap-1"
                  disabled={isLoading}
                >
                  {loading && <Spinner size="default" />}
                  Update
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      }
    />
  );
};

export default EditProfileModal;
