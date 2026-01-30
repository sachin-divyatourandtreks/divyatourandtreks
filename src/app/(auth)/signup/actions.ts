'use server'

import { redirect } from 'next/navigation';
import { authAdmin } from '@/lib/firebase-admin'; 
import dbConnect from '@/lib/dbConnect';
import User from "@/models/User";
import admin from 'firebase-admin';

export type SignUpState = {
  message?: string;
  errors?: {
    email?: string;
    phoneNo?: string;
    username?: string;
    password?: string;
  };
};

export async function handleSignUp(
  prevState: SignUpState | undefined,
  formData: FormData
): Promise<SignUpState> {

  await dbConnect();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;
  const fullName = (formData.get('name') as string) || "Not given";
  const phoneNo = formData.get('phoneNo') as string;

  if (!email || !password) {
    return {
      errors: {
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined,
      }
    };
  }

  if (!username || !phoneNo) {
    return {
      errors: {
        username: !username ? "Username is required" : undefined,
        phoneNo: !phoneNo ? "Phone number is required" : undefined,
      }
    };
  }

  if (!/^\d{10}$/.test(phoneNo)) {
    return {
      errors: { phoneNo: "Enter a valid 10-digit phone number" }
    };
  }

  if (password.length < 6) {
    return {
      errors: { password: "Password must be at least 6 characters" }
    };
  }

  let userRecord;

  console.log(admin.app().options.credential.projectId);

  try {
    console.log("Firebase signup process started");
    userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: username,
    });

    console.log("Signed up successfully on firebase", userRecord);
    await User.create({
      firebaseId: userRecord.uid,
      email,
      username,
      fullName,
      phoneNo,
    });

    console.log("Signed Up Successfully.");
  } catch (error: any) {
    if (userRecord?.uid) {
      await authAdmin.deleteUser(userRecord.uid);
    }

    if (error.code === 'auth/email-already-exists') {
      return {
        errors: { email: "Email already registered" }
      };
    }

    return { message: "Failed to create account. Please try again." };
  }

  redirect('/login');
}
