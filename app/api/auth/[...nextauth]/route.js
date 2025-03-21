import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/app/lib/mongodb copy";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await connectMongoDB();
          const user = await User.findOne({ email: credentials.email });
          console.log(user);
          if (!user) {
            return null;
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            return null;
          }
          // Return the user object with role
          return {
            id: user._id,
            email: user.email,
            name: user.name, // Assuming you have a name field
            role: user.role, // Assuming you have a role field in your User model
          };
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    //signOut: '/logout',
    //error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      // If the user object is available (during sign-in), add the role to the token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      try {
        // Add the role to the session object
        session.user.role = token.role;
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return null;
      }
    },
    async redirect({ url, baseUrl }) {
      return typeof url === "string" && url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
