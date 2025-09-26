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

  return (
    <>
      {props.variant === 'image' ? (
        <Dialog.Close class={`${imageVariantClasses} ${props.class || ''}`}>
          <IoCloseSharp class="h-6 w-6" />
        </Dialog.Close>
      ) : (
        <Dialog.Close class={`${modalVariantClasses} ${props.class || ''}`}>
          <IoCloseSharp class="h-6 w-6" />
        </Dialog.Close>
      )}
    </>
  )
}

export default DialogCloseButton
