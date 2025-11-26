import Dialog from '@corvu/dialog'
import { IoCloseSharp } from '../icons/solid'

interface DialogCloseButtonProps {
  variant: 'modal' | 'image'
  class?: string
}

export const DialogCloseButton = (props: DialogCloseButtonProps) => {
  const baseClasses = 'rounded-full p-1 transition-colors focus-ring'

  const imageVariantClasses = `${baseClasses} bg-white/95 backdrop-blur-sm border border-white/30 shadow-lg hover:scale-105`
  const modalVariantClasses = `${baseClasses} hover:scale-105`

  const iconClasses = () =>
    props.variant === 'image' ? 'h-6 w-6 text-black' : 'h-6 w-6'
  const classes = () =>
    props.variant === 'image' ? imageVariantClasses : modalVariantClasses

  return (
    <Dialog.Close
      class={`${classes()} ${props.class || ''}`}
      aria-label="Close dialog"
    >
      <IoCloseSharp class={iconClasses()} />
    </Dialog.Close>
  )
}

export default DialogCloseButton
