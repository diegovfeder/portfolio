import { createSignal, JSX } from 'solid-js'
import Dialog from '@corvu/dialog'
import { DialogCloseButton } from './dialog-close-button'

interface DialogImageProps {
  src: string
  alt: string
  trigger: JSX.Element // The clickable element that opens the image
}

export const DialogImage = (props: DialogImageProps) => {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <Dialog.Trigger class="focus-pulse">{props.trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-[60] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2">
          <div class="relative">
            <img
              src={props.src}
              alt={props.alt}
              loading="lazy"
              decoding="async"
              class="w-full h-auto max-h-[80vh] object-cover bg-white rounded-lg shadow-lg"
              style={{
                'image-rendering': 'crisp-edges',
              }}
            />
            <div class="absolute right-4 top-4">
              <DialogCloseButton variant="image" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export default DialogImage
