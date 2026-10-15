export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-[calc(100%-32px)] max-w-[1490px] sm:w-[calc(100%-64px)] lg:w-[calc(100%-88px)] 2xl:w-[calc(100%-110px)] ${className}`}>
      {children}
    </div>
  );
}