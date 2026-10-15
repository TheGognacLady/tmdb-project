import { toast } from 'react-toastify'

type ErrorToastOptions = {
  toastId?: string
}

export const errorToast = (message: string, options?: ErrorToastOptions) => {
  const text = message.trim()

  if (!text) return

  toast.error(text, { toastId: options?.toastId ?? text })
}
