export default function UserBubble({ text }: { text: string }) {
  return (
    <>
      <div className="text-right my-1">
        <span className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-bl-none">
          {text}
        </span>
      </div>
    </>
  );
}
