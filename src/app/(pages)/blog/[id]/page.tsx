"use client";

import Image from "next/image";
import Link from "next/link";
import blogData from "../blog-data.json";
import { useParams } from "next/navigation";
import { BlogPost } from "@/src/@types/blog/id/index.type";
import { ChevronRight } from "lucide-react";

export default function BlogDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const postId = parseInt(id);
    const post = blogData.find((p: BlogPost) => p.id === postId);

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD] flex items-center justify-center">
                <div
                    className="text-center"
                    style={{ fontFamily: "var(--font-almarai)" }}
                >
                    <h1 className="text-4xl font-bold text-[#5A5E4D] mb-4">
                        المقال غير موجود
                    </h1>
                    <Link
                        href="/blog"
                        className="text-rose-500 hover:text-rose-600"
                    >
                        العودة للمدونة
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-[#FDFFF7] to-[#ECF1DD]"
            dir="rtl"
        >
            <main>
                {/* Page Title Section */}
                <section className="pt-8 pb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-[#5A5E4D] hover:text-[#4A4E3D] transition-colors mb-4"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            <ChevronRight className="w-5 h-5" />
                            العودة للمدونة
                        </Link>
                        <div className="flex items-center gap-3 mb-3">
                            <span
                                className="bg-[#5A5E4D] text-white px-3 py-1 rounded-full text-sm"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-[36px] font-bold leading-[40px] text-[#2D3319] mb-2 tracking-[0px]">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-3 text-[14px] text-[#5A5E4D]">
                            <span style={{ fontFamily: "var(--font-almarai)" }}>
                                {post.author}
                            </span>
                            <span>•</span>
                            <span style={{ fontFamily: "var(--font-almarai)" }}>
                                {post.date}
                            </span>
                            <span>•</span>
                            <span style={{ fontFamily: "var(--font-almarai)" }}>
                                {post.readTime}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                {/* Featured Image */}
                                <div className="relative h-64 mx-16 mt-8 rounded-xl overflow-hidden shadow-md">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 600px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>

                                <div className="p-8">
                                    {/* Tags Section */}
                                    <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-200">
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Article Content */}
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: post.content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <style jsx>{`
                    .prose h3 {
                        color: #5a5e4d;
                        font-weight: bold;
                        font-size: 1.5rem;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        font-family: var(--font-almarai);
                    }
                    .prose p {
                        margin-bottom: 1.25rem;
                        line-height: 1.8;
                        color: #4b5563;
                        font-family: var(--font-almarai);
                    }
                    .prose ul {
                        margin: 1.5rem 0;
                        padding-right: 1.5rem;
                    }
                    .prose li {
                        margin-bottom: 0.75rem;
                        color: #4b5563;
                        font-family: var(--font-almarai);
                    }
                `}</style>

                {/* Related Articles */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2
                                className="text-3xl font-bold text-[#5A5E4D] mb-3"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                مقالات ذات صلة
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {blogData
                                .filter((p: BlogPost) => p.id !== postId)
                                .slice(0, 3)
                                .map((relatedPost: BlogPost) => (
                                    <article
                                        key={relatedPost.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                                    >
                                        <div className="relative h-52">
                                            <Image
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <span
                                                    className="bg-[#5A5E4D] text-white px-3 py-1 rounded-full text-sm"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {relatedPost.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3
                                                className="text-lg font-bold text-[#5A5E4D] mb-2 line-clamp-2"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {relatedPost.title}
                                            </h3>

                                            <p
                                                className="text-gray-600 mb-4 line-clamp-3 flex-grow"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                {relatedPost.excerpt}
                                            </p>

                                            <Link
                                                href={`/blog/${relatedPost.id}`}
                                                className="inline-block bg-[#5A5E4D] text-white px-6 py-2 rounded-lg hover:bg-[#4A4E3D] transition-colors w-full text-center mt-auto"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-almarai)",
                                                }}
                                            >
                                                اقرأ المزيد
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
