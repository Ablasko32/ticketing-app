export interface IToast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}
