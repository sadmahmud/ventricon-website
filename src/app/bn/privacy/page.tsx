import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Layout";

export const metadata: Metadata = buildMetadata({
  title: "গোপনীয়তা নীতি — VENTRICON",
  description: "VENTRICON কীভাবে আপনার তথ্য ব্যবহার ও সুরক্ষিত রাখে।",
  path: "/bn/privacy",
});

export default function BanglaPrivacyPage() {
  return (
    <>
      <PageHero
        size="compact"
        eyebrow="আইনি তথ্য"
        title="গোপনীয়তা নীতি"
        titleAccent="গোপনীয়তা "
        breadcrumbs={[{ label: "হোম", href: "/bn" }, { label: "গোপনীয়তা নীতি" }]}
        lede={<p>আপনি VENTRICON-কে যে তথ্য দেন, তা আপনার সাথে যোগাযোগ ও প্রজেক্ট পরিচালনার প্রয়োজনেই ব্যবহার করা হয়।</p>}
      />
      <Section spacing="compact">
        <Container>
          <div className="prose prose-invert max-w-3xl prose-p:text-slate-400 prose-headings:text-white">
            <h2>আমরা কোন তথ্য সংগ্রহ করি</h2>
            <p>আপনার নাম, ব্যবসার নাম, ইমেইল, ফোন নম্বর, প্রয়োজনীয় সেবা এবং প্রজেক্টের বিবরণ সংগ্রহ করা হতে পারে।</p>
            <h2>কেন ব্যবহার করি</h2>
            <p>আপনার অনুরোধের উত্তর দেওয়া, প্রজেক্টের scope বোঝা এবং প্রয়োজনীয় ব্যবসায়িক যোগাযোগ পরিচালনার জন্য এই তথ্য ব্যবহার করা হয়।</p>
            <h2>তথ্য সুরক্ষা</h2>
            <p>আপনার তথ্য আমরা ব্যবসায়িক প্রয়োজনের বাইরে বিক্রি করি না এবং অপ্রয়োজনীয় তৃতীয় পক্ষের কাছে শেয়ার করি না।</p>
            <h2>যোগাযোগ</h2>
            <p>গোপনীয়তা সম্পর্কে কোনো প্রশ্ন থাকলে VENTRICON-এর যোগাযোগ পেজের মাধ্যমে আমাদের জানান।</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
