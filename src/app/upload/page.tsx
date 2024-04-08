"use client";

import { useRouter } from 'next/navigation'


import { UploadButton } from "@/utils/uploadthing";
import { doPDF } from "../action";

export default function Upload() {
    const router = useRouter()

  return (
    <main className="flex  flex-col items-center justify-between p-24 bg-black ">
      <h1 className="text-3xl font-bold">Upload your PDF</h1>
      <div className="my-20">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            // console.log("Files: ", res);
            //   res[0].url
            const url = res[0].url;
            const r = await doPDF(url);

            // const r = await CreateEmbedding('hello hi')
            // console.log(r);

            alert("Upload Completed");

            router.push('/chat')
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </main>
  );
}
