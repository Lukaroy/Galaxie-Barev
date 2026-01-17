type Props = {
  message: string
  type?: "error" | "success"
}

export default function Alert({ message, type = "error" }: Props) {
  if (!message) return null

  return (
    <div className={`alert ${type}`} role="alert">
      {message}
    </div>
  )
}
