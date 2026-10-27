export interface CreatePaymentPreferenceDto {
  usuarioId: number;
  items: Array<{
    title: string;
    quantity: number;
    unit_price: number;
  }>;
}
