
export default function AIBubble({text}:{text:string}) {
  return (
    <>
      <div className="rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-br-none my-1">
        {text}
      </div>
    </>
  )
}
