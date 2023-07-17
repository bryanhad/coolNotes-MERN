
export default function MainContainer({children, className, color='bg-white'}: {children: React.ReactNode, className?: string, color?:string}) {
  return (
    <div className={`rounded-md ${color} ${className ? className : ''}`}>
      {children}
    </div>
  )
}
