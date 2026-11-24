export interface AppConfig {
  whatsapp: string;
  email: string;
  upi: string;
  payee: string;
  GST_RATE: number;
}

export const CFG: AppConfig = {
  whatsapp: "919891520850",
  email: "compliance.apexlegal@gmail.com",
  // TODO: Replace with the client's verified UPI VPA before production launch
  upi: "9891520850@centralbank",
  payee: "Apex Legal",
  GST_RATE: 18, // Default 18% GST rate in India
};

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  if (CFG.upi === "9891520850@centralbank") {
    console.warn(
      "[Apex Legal] Warning: UPI VPA is currently configured with placeholder 'yourupi@bank'. Please update lib/config.ts with the official recipient VPA."
    );
  }
}
