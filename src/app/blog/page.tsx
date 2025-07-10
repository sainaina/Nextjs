"use client";
import BlogComponent from "@/components/BlogComponent";
import { BlogType } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";
// import { use } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const metadata: Metadata = {
  title: {
    template: "%s | This is Blog page",
    default: "Blog Page",
  },
  openGraph: {
    title: "Blog page",
    description: "Blog page",
    images: [
      {
        url: "https://i.pinimg.com/736x/35/6d/e2/356de2b00221461d2046800fd23f41ff.jpg",
        width: 800,
        height: 650,
        alt: "Car",
        type: "image/png",
      },
    ],
  },
};
export default async function BlogPage() {
  const res = await fetch(BASE_URL);
  const dataRes: BlogType[] = await res.json();

  return (
    <div className="container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {dataRes.map((post) => (
        <Link href={`/blog/${post.id} `} key={post.id}>
          <BlogComponent
            key={post.id}
            id={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
          />
        </Link>
      ))}
    </div>
  );
}
