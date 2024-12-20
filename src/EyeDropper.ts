interface EyeDropperResult {
  sRGBHex: string; // The selected color in rgba format.
}

interface EyeDropper {
  open(): Promise<EyeDropperResult>; // Method to trigger the eyedropper and get the selected color.
}

interface EyeDropperConstructor {
  new (): EyeDropper; // Constructor for creating an EyeDropper instance.
}

// Extend the Window interface
declare global {
  interface Window {
    EyeDropper?: EyeDropperConstructor; // Optional since it's not supported in all browsers.
  }
}
