import connectDB from "@/config/db";
import User from "@/models/User";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart" });

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-create" },
  { event: "cleark/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
    }
    await connectDB()
    await User.create(userData)
  }
);

export const syncUserUpdation = inngest.createFunction(
    { id: "sync-user-update" },
    { event: "cleark/user.updated" },
    async ({ event }) => {
      const { id, first_name, last_name, email_addresses, image_url } =
        event.data;
      const userData = {
          name: `${first_name} ${last_name}`,
          email: email_addresses[0].email_address,
          imageUrl: image_url,
      }
      await connectDB()
      await User.findByIdAndUpdate(id, userData)
    }
)

export const syncUserDeletion = inngest.createFunction(
    { id: "sync-user-delete" },
    { event: "cleark/user.deleted" },
    async ({ event }) => {
      const { id } =
        event.data;
      await connectDB()
      await User.findByIdAndDelete(id)
    }
)  