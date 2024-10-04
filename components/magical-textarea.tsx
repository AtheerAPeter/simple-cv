interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function MagicalTextarea(props: Props) {
  return (
    <div className="relative h-40 z-20">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-75 blur-sm -z-10" />
      <textarea
        className={`
            w-full p-4 rounded-lg
            focus:outline-none resize-none h-40
            `}
        {...props}
      />
    </div>
  );
}
